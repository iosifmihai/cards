import { heroSequence, theme } from './config.js';

/**
 * three is imported dynamically, and only by ProceduralBackend. It exists
 * purely for the stand-in subject, so once `heroSequence.useFrames` is true the
 * whole library drops out of the bundle instead of shipping ~500 kB of unused
 * renderer to visitors.
 */
let THREE;

/**
 * The central element: a subject in a black void, orbited 360° by the camera
 * as you scroll.
 *
 * Two interchangeable back-ends behind one `setProgress(t)` call:
 *
 *   FrameSequenceBackend — draws frame `t * count` from a preloaded image
 *                          sequence. This is the real one, used once footage
 *                          exists (`heroSequence.useFrames = true`).
 *
 *   ProceduralBackend    — renders a WebGL stand-in subject and orbits the
 *                          camera by the same `t`. Used while there is no
 *                          footage so the scrub can be built and verified now.
 *
 * Both are frame-rate independent and driven from a single rAF loop in main.js.
 */

/* ══════════════════════════════ frame sequence ══════════════════════════════ */

class FrameSequenceBackend {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.images = [];
    this.loaded = 0;
    this.current = -1;
    this.ready = false;
  }

  async init() {
    const { basePath, prefix, ext, pad, count, startIndex } = heroSequence;
    const urls = Array.from({ length: count }, (_, i) =>
      `${basePath}${prefix}${String(i + startIndex).padStart(pad, '0')}.${ext}`
    );

    // Decode the first frame before revealing, then stream the rest in the
    // background so the page is interactive immediately.
    const load = (url) =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => { this.loaded++; resolve(img); };
        img.onerror = () => { this.loaded++; resolve(null); };
        img.src = url;
      });

    this.images = new Array(count).fill(null);
    this.images[0] = await load(urls[0]);
    this.ready = true;

    urls.slice(1).forEach((url, i) => {
      load(url).then((img) => { this.images[i + 1] = img; });
    });
  }

  resize(w, h, dpr) {
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.current = -1; // force a redraw at the new size
  }

  setProgress(t) {
    if (!this.ready) return;
    const idx = Math.min(
      heroSequence.count - 1,
      Math.max(0, Math.round(t * (heroSequence.count - 1)))
    );
    if (idx === this.current) return;

    // Fall back to the nearest already-decoded frame so a partially loaded
    // sequence never flashes black mid-scrub.
    let img = this.images[idx];
    if (!img) {
      for (let d = 1; d < heroSequence.count; d++) {
        img = this.images[idx - d] || this.images[idx + d];
        if (img) break;
      }
    }
    if (!img) return;

    this.current = idx;
    this.#drawCover(img);
  }

  #drawCover(img) {
    const { ctx, canvas } = this;
    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.fillStyle = theme.ink;
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }
}

/* ════════════════════════════════ procedural ════════════════════════════════ */

class ProceduralBackend {
  constructor(canvas) {
    this.canvas = canvas;
    this.t = 0;
    this.ready = false;
  }

  async init() {
    THREE = await import('three');

    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(new THREE.Color(theme.ink), 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    this.renderer = renderer;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(new THREE.Color(theme.ink), 0.048);
    this.scene = scene;

    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

    this.subject = this.#buildSubject();
    scene.add(this.subject);
    scene.add(this.#buildFloorGlow());

    scene.add(this.#buildAtmosphere());
    this.#buildLights(scene);

    this.ready = true;
  }

  /**
   * A stand-in figure: head, shoulders, torso, crossed arms, legs — enough
   * silhouette to read as a person under hard rim light, which is all the
   * placeholder needs to do. Replaced wholesale by the frame sequence.
   */
  #buildSubject() {
    const group = new THREE.Group();

    // Near-black. The subject should read as a silhouette that only catches
    // light along its edges — a lit-up body kills the rim-light effect and
    // shows off crude placeholder geometry that is better left in shadow.
    const skin = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#080b12'),
      roughness: 0.42,
      metalness: 0.28,
    });

    const add = (geo, x, y, z, rot) => {
      const m = new THREE.Mesh(geo, skin);
      m.position.set(x, y, z);
      if (rot) m.rotation.set(rot[0], rot[1], rot[2]);
      group.add(m);
      return m;
    };

    // head + neck
    add(new THREE.SphereGeometry(0.2, 40, 40), 0, 2.66, 0).scale.set(0.86, 1.12, 0.95);
    add(new THREE.CylinderGeometry(0.072, 0.086, 0.18, 20), 0, 2.42, 0);

    // torso — a lathe tapers more like a body than a capsule does
    const profile = [
      [0.0, 0.0], [0.20, 0.04], [0.245, 0.26], [0.25, 0.60],
      [0.235, 0.92], [0.20, 1.16], [0.0, 1.24],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    const torso = new THREE.Mesh(new THREE.LatheGeometry(profile, 44), skin);
    torso.position.y = 1.14;
    torso.scale.set(1, 1, 0.66);
    group.add(torso);

    // shoulder caps, sunk into the torso so they read as a line, not as balls
    add(new THREE.SphereGeometry(0.105, 24, 24), -0.235, 2.24, 0).scale.set(1, 0.85, 0.9);
    add(new THREE.SphereGeometry(0.105, 24, 24), 0.235, 2.24, 0).scale.set(1, 0.85, 0.9);

    // crossed arms — forearms across the chest, upper arms down the sides
    const forearm = new THREE.CapsuleGeometry(0.062, 0.4, 8, 18);
    add(forearm, -0.05, 1.74, 0.19, [0, 0, Math.PI / 2.1]);
    add(forearm, 0.05, 1.65, 0.21, [0, 0, -Math.PI / 2.1]);
    const upper = new THREE.CapsuleGeometry(0.066, 0.34, 8, 18);
    add(upper, -0.255, 1.95, 0.03, [0, 0, 0.2]);
    add(upper, 0.255, 1.95, 0.03, [0, 0, -0.2]);

    // legs
    const leg = new THREE.CapsuleGeometry(0.095, 0.92, 8, 18);
    add(leg, -0.115, 0.55, 0);
    add(leg, 0.115, 0.55, 0);

    return group;
  }

  /**
   * A soft emerald pool at the subject's feet. Without it the figure floats in
   * undifferentiated black and the orbit loses its sense of ground.
   */
  #buildFloorGlow() {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, 'rgba(16,185,129,0.42)');
    g.addColorStop(0.45, 'rgba(16,185,129,0.10)');
    g.addColorStop(1, 'rgba(16,185,129,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 7),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(canvas),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = 0.01;
    return mesh;
  }

  /** Slow drifting motes so the void has depth and the orbit reads as 3D. */
  #buildAtmosphere() {
    const COUNT = 420;
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 3 + Math.random() * 7;
      const th = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(th) * r;
      pos[i * 3 + 1] = Math.random() * 6 - 0.5;
      pos[i * 3 + 2] = Math.sin(th) * r;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.motes = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: new THREE.Color(theme.emerald),
        size: 0.035,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    return this.motes;
  }

  /**
   * The rig is camera-relative, not world-fixed. With a fixed rig a 360° orbit
   * would swing the key lights around to the front and flatten the subject out
   * halfway through; keeping them behind the subject *from the viewer's angle*
   * holds the rim through the whole rotation. Positions are set in render().
   */
  #buildLights(scene) {
    scene.add(new THREE.AmbientLight(new THREE.Color(theme.navy), 0.35));

    this.rimA = new THREE.DirectionalLight(new THREE.Color(theme.emeraldBright), 11);
    this.rimB = new THREE.DirectionalLight(new THREE.Color(theme.emerald), 6.5);
    // barely-there frontal fill so the body separates from pure black
    this.fill = new THREE.DirectionalLight(new THREE.Color(theme.navy), 1.5);

    scene.add(this.rimA, this.rimB, this.fill);
  }

  /** Keep the rig locked to the camera's azimuth. */
  #placeLights(angle) {
    const at = (offset, radius, y) => [
      Math.cos(angle + offset) * radius,
      y,
      Math.sin(angle + offset) * radius,
    ];
    // ~150° off the viewing axis on each side = grazing edge light
    this.rimA.position.set(...at(2.62, 5, 4.2));
    this.rimB.position.set(...at(-2.62, 5, 2.6));
    this.fill.position.set(...at(0.35, 4.5, 3.0));
  }

  resize(w, h, dpr) {
    if (!this.ready) return;
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  setProgress(t) {
    this.t = t;
  }

  /** Called every rAF tick — `time` is seconds since start. */
  render(time) {
    if (!this.ready) return;

    // one full 360° orbit across the pinned section
    const angle = this.t * Math.PI * 2 - Math.PI / 2;
    const radius = 5.15 - this.t * 0.4;       // ease in very slightly
    const height = 1.74 + Math.sin(this.t * Math.PI) * 0.24;

    this.camera.position.set(
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius
    );
    this.camera.lookAt(0, 1.46, 0);

    // Slide the camera laterally so the subject sits right-of-centre, clear of
    // the wordmark. Dropped on narrow viewports, where the type stacks and the
    // subject wants the middle of the frame.
    const wide = this.camera.aspect > 1.05;
    if (wide) this.camera.translateX(-1.05 * Math.min(1, this.camera.aspect - 0.6));

    this.#placeLights(angle);

    if (this.motes) this.motes.rotation.y = time * 0.012;

    this.renderer.render(this.scene, this.camera);
  }
}

/* ══════════════════════════════════ facade ══════════════════════════════════ */

export class OrbitStage {
  constructor(canvas) {
    this.canvas = canvas;
    this.backend = heroSequence.useFrames
      ? new FrameSequenceBackend(canvas)
      : new ProceduralBackend(canvas);
    this.usesFrames = heroSequence.useFrames;
  }

  async init() {
    await this.backend.init();
    this.resize();
  }

  resize() {
    const native = window.devicePixelRatio || 1;
    // The WebGL stand-in is fill-rate bound across the whole viewport, so it
    // gets a tighter cap than the frame sequence (a plain 2D blit). At 1.6 the
    // difference is invisible under the grain, and it cuts fragment work ~35%
    // versus 2.0 on a retina display.
    const dpr = this.usesFrames ? Math.min(native, 2) : Math.min(native, 1.6);
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.backend.resize(w, h, dpr);
  }

  setProgress(t) {
    this.backend.setProgress(Math.min(1, Math.max(0, t)));
  }

  render(time) {
    if (this.backend.render) this.backend.render(time);
  }
}
