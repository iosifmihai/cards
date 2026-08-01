import { heroPhotos, theme } from './config.js';

/**
 * The hero, driven by stills instead of footage.
 *
 * Scroll cross-dissolves through the photo set, each shot drifting in scale
 * across its own segment so the sequence never sits still. On top of that sits
 * a grade, which is the part that actually matters: the source photography is
 * high-key white studio, and the page is ink-black. Dropped in raw, the shots
 * punch a bright rectangle through the design. The grade desaturates, crushes
 * the studio backdrop toward the page colour with a heavy vignette, pushes
 * shadows navy, and lifts one edge toward emerald so the subject reads as
 * rim-lit rather than cut out.
 *
 * Cost control: the per-photo half of the grade (filter + navy) is baked once
 * into an offscreen canvas at load. Per frame this only blends two bitmaps and
 * lays down two cached gradients.
 */
export class PhotoSequenceBackend {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.graded = [];
    this.ready = false;
    this.t = 0;
    this.lastKey = '';
  }

  async init() {
    const { sources } = heroPhotos;
    const loaded = await Promise.all(sources.map((src) => this.#load(src)));
    this.photos = loaded.filter(Boolean);
    if (!this.photos.length) throw new Error('photo-stage: no photos could be loaded');

    this.graded = this.photos.map((img) => this.#bake(img));
    this.ready = true;
  }

  #load(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  /** Per-photo half of the grade, computed once. */
  #bake(img) {
    const g = heroPhotos.grade;
    const c = document.createElement('canvas');
    // Cap the baked size: anything beyond this is invisible once the shot is
    // letterboxed into a hero and grained over.
    const max = 1800;
    const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    c.width = Math.round(img.naturalWidth * scale);
    c.height = Math.round(img.naturalHeight * scale);

    const x = c.getContext('2d');
    x.filter = `grayscale(${g.grayscale}) contrast(${g.contrast}) brightness(${g.brightness})`;
    x.drawImage(img, 0, 0, c.width, c.height);
    x.filter = 'none';

    // shadows toward navy
    x.globalCompositeOperation = 'multiply';
    x.fillStyle = this.#rgba(theme.navy, g.navy);
    x.fillRect(0, 0, c.width, c.height);

    // Feather the bitmap's own edges to transparent. Fitting a portrait by
    // height leaves bands of bare photo down each side, and the vignette —
    // being radial and centred on the subject — cannot hide a straight
    // vertical seam. Baking the falloff in costs nothing per frame and means
    // the shot dissolves into the page from every side.
    const f = heroPhotos.feather;
    x.globalCompositeOperation = 'destination-out';

    const gh = x.createLinearGradient(0, 0, c.width, 0);
    gh.addColorStop(0, 'rgba(0,0,0,1)');
    gh.addColorStop(f.x, 'rgba(0,0,0,0)');
    gh.addColorStop(1 - f.x, 'rgba(0,0,0,0)');
    gh.addColorStop(1, 'rgba(0,0,0,1)');
    x.fillStyle = gh;
    x.fillRect(0, 0, c.width, c.height);

    const gv = x.createLinearGradient(0, 0, 0, c.height);
    gv.addColorStop(0, `rgba(0,0,0,${f.top})`);
    gv.addColorStop(f.y, 'rgba(0,0,0,0)');
    gv.addColorStop(1 - f.y, 'rgba(0,0,0,0)');
    gv.addColorStop(1, `rgba(0,0,0,${f.bottom})`);
    x.fillStyle = gv;
    x.fillRect(0, 0, c.width, c.height);

    x.globalCompositeOperation = 'source-over';
    return c;
  }

  #rgba(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  }

  resize(w, h, dpr) {
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.lastKey = ''; // force a redraw at the new size
  }

  /** Where the subject sits in frame. Shared by the draw and the overlays. */
  #focus() {
    const { width: w, height: h } = this.canvas;
    return { x: w / h > 1.05 ? w * 0.63 : w * 0.5, y: h * 0.46 };
  }

  /**
   * The vignette and the emerald rim used to be gradient fills laid over the
   * whole canvas every frame. They are identical from frame to frame — only
   * the photograph underneath moves — so paying for them per frame was pure
   * waste, and measurably so: two full-canvas fills at 1.75 DPR dominated the
   * frame budget. They now live in `.hero__vignette` and `.hero__rim`, static
   * CSS layers the compositor rasterises once (see styles.css).
   */

  setProgress(t) {
    this.t = t;
  }

  render() {
    if (!this.ready) return;

    const { ctx, canvas } = this;
    const n = this.graded.length;
    const pos = this.t * (n - 1);
    const i = Math.min(n - 1, Math.floor(pos));
    const frac = pos - i;

    // Redraw only when the composite would actually differ.
    const key = `${i}:${frac.toFixed(3)}:${canvas.width}`;
    if (key === this.lastKey) return;
    this.lastKey = key;

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.fillStyle = theme.ink;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Outgoing shot, then the incoming one faded over it.
    this.#drawFitted(this.graded[i], this.#driftFor(i, frac), 1);
    if (frac > 0 && i + 1 < n) {
      this.#drawFitted(this.graded[i + 1], this.#driftFor(i + 1, 0), frac);
    }

    ctx.globalAlpha = 1;
  }

  /** Each shot eases from slightly oversized to its resting size. */
  #driftFor(index, frac) {
    const amount = heroPhotos.drift;
    return 1 + amount * (1 - frac) + (index % 2 === 0 ? 0 : amount * 0.15);
  }

  /**
   * Portrait source in a landscape hero, so this fits by HEIGHT rather than
   * cover-fitting. Cover would scale to the width and crop a standing figure
   * down to a torso fragment. Fitting the height keeps the whole subject in
   * frame and simply leaves the sides short — which is fine, because the
   * vignette is crushing them to page black anyway.
   */
  #drawFitted(src, scale, alpha) {
    const { ctx, canvas } = this;
    const cw = canvas.width;
    const ch = canvas.height;

    const base = (ch / src.height) * scale;
    const dw = src.width * base;
    const dh = src.height * base;

    // Sit the subject right of centre on wide screens so the wordmark, which
    // is anchored bottom-left, is not fighting it. Centred when narrow.
    const cx = this.#focus().x;

    ctx.globalAlpha = alpha;
    ctx.drawImage(src, cx - dw / 2, (ch - dh) * 0.42, dw, dh);
    ctx.globalAlpha = 1;
  }

  /** How many shots are in play — used by the hero's index readout. */
  get count() {
    return this.graded.length;
  }
}
