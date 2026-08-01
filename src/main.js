import './styles.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { OrbitStage } from './orbit-stage.js';
import { sectionClips } from './config.js';
import {
  brand, scrollCue, stats, pillarsSection, pillars,
  workSection, work, finale, footer,
} from './content.js';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (id) => document.getElementById(id);

/* ════════════════════════════ DOM composition ══════════════════════════════ */

/** Wrap every character in its own span so type can track in letter-by-letter. */
function splitChars(el, text) {
  el.textContent = '';
  const frag = document.createDocumentFragment();
  [...text].forEach((ch) => {
    const span = document.createElement('span');
    span.className = ch === ' ' ? 'char char--space' : 'char';
    span.textContent = ch === ' ' ? ' ' : ch;
    frag.appendChild(span);
  });
  el.appendChild(frag);
  return [...el.children];
}

function buildHero() {
  document.title = brand.documentTitle;
  $('heroSubtitle').textContent = brand.subtitle;
  $('heroCue').querySelector('.hero__cueLabel').textContent = scrollCue;
  return {
    top: splitChars($('wordmarkTop'), brand.wordmarkTop),
    bottom: splitChars($('wordmarkBottom'), brand.wordmarkBottom),
  };
}

function buildStats() {
  const grid = $('statsGrid');
  grid.innerHTML = '';
  return stats.map((s) => {
    const cell = document.createElement('div');
    cell.className = 'stat';

    // `unit` stays in the number's colour (it is part of the magnitude);
    // only `suffix` takes the accent.
    const value = document.createElement('div');
    value.className = 'stat__value';
    const num = document.createElement('span');
    num.setAttribute('data-num', '');
    num.textContent = '0';

    const suffix = document.createElement('em');
    suffix.textContent = s.suffix || '';

    value.append(
      document.createTextNode(s.prefix || ''),
      num,
      document.createTextNode(s.unit || ''),
      suffix
    );

    const label = document.createElement('div');
    label.className = 'stat__label';
    label.textContent = s.label;

    cell.append(value, label);
    grid.appendChild(cell);
    return { cell, numEl: value.querySelector('[data-num]'), spec: s };
  });
}

function buildPillars() {
  $('pillarsEyebrow').textContent = pillarsSection.eyebrow;
  $('pillarsHeading').textContent = pillarsSection.heading;

  const list = $('pillarsList');
  list.innerHTML = '';
  return pillars.map((p) => {
    const li = document.createElement('li');
    li.className = 'pillar';
    li.innerHTML = `
      <span class="pillar__index"></span>
      <h3 class="pillar__title"></h3>
      <p class="pillar__body"></p>`;
    li.querySelector('.pillar__index').textContent = p.index;
    li.querySelector('.pillar__title').textContent = p.title;
    li.querySelector('.pillar__body').textContent = p.body;
    list.appendChild(li);
    return li;
  });
}

function buildWork() {
  $('workEyebrow').textContent = workSection.eyebrow;
  $('workHeading').textContent = workSection.heading;

  const grid = $('workGrid');
  grid.innerHTML = '';
  return work.map((item) => {
    const card = document.createElement('article');
    card.className = 'card';

    if (item.metric) {
      const chip = document.createElement('span');
      chip.className = 'card__metric';
      chip.textContent = item.metric;
      card.appendChild(chip);
    }

    const inner = document.createElement('div');
    inner.className = 'card__inner';
    inner.innerHTML = `<h3 class="card__brand"></h3><p class="card__pitch"></p>`;
    inner.querySelector('.card__brand').textContent = item.brand;
    inner.querySelector('.card__pitch').textContent = item.pitch;
    card.appendChild(inner);

    // pointer-tracked glow
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });

    grid.appendChild(card);
    return card;
  });
}

function buildFinale() {
  $('finaleEyebrow').textContent = finale.eyebrow;
  const top = splitChars($('finaleTop'), finale.headingTop);
  const bottom = splitChars($('finaleBottom'), finale.headingBottom);
  $('finaleBody').textContent = finale.body;

  const actions = $('finaleActions');
  actions.innerHTML = '';
  finale.buttons.forEach((b) => {
    const a = document.createElement('a');
    a.className = `btn${b.primary ? ' btn--primary' : ''}`;
    a.href = b.href;
    a.innerHTML = `<span>${b.label}</span>`;
    actions.appendChild(a);
  });

  $('footerNote').textContent = footer.note;
  const links = $('footerLinks');
  links.innerHTML = '';
  footer.links.forEach((l) => {
    const a = document.createElement('a');
    a.href = l.href;
    a.textContent = l.label;
    if (/^https?:/.test(l.href)) { a.target = '_blank'; a.rel = 'noopener'; }
    links.appendChild(a);
  });

  return { top, bottom };
}

/** Floating holographic screens behind the pillars section. */
function buildHoloField() {
  const field = $('holoField');
  const panels = [];
  const layout = [
    [8, 18, 22, 28, -18, 0.55], [66, 12, 26, 34, 14, 0.75], [30, 58, 20, 24, -8, 0.4],
    [78, 56, 18, 26, 22, 0.62], [46, 8, 16, 20, 6, 0.9], [16, 66, 24, 22, -24, 0.5],
    [58, 72, 22, 20, 10, 0.7],
  ];
  layout.forEach(([l, t, w, h, ry, depth]) => {
    const p = document.createElement('div');
    p.className = 'holo__panel';
    Object.assign(p.style, {
      left: `${l}%`, top: `${t}%`, width: `${w}vw`, height: `${h}vh`,
      transform: `rotateY(${ry}deg) translateZ(${-depth * 180}px)`,
      opacity: String(0.25 + depth * 0.45),
    });
    p.dataset.depth = String(depth);
    field.appendChild(p);
    panels.push(p);
  });
  return panels;
}

/** Perspective corridor of glowing screens behind the work section. */
function buildGalleryField() {
  const field = $('galleryField');
  const panels = [];
  for (let i = 0; i < 8; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const step = Math.floor(i / 2);
    const p = document.createElement('div');
    p.className = 'gallery__panel';
    const z = -step * 340;
    p.style.left = side < 0 ? '4%' : '81%';
    p.style.transform =
      `translateY(-50%) translateZ(${z}px) rotateY(${side * 34}deg)`;
    p.style.opacity = String(0.85 - step * 0.16);
    p.dataset.z = String(z);
    p.dataset.side = String(side);
    field.appendChild(p);
    panels.push(p);
  }
  return panels;
}

/** Wire up the two section background clips if real footage was configured. */
function wireSectionClips() {
  const pairs = [
    [$('builderClip'), sectionClips.builder],
    [$('closerClip'), sectionClips.closer],
  ];
  pairs.forEach(([el, cfg]) => {
    if (!cfg?.src) { el.remove(); return; }
    el.src = cfg.src;
    if (cfg.poster) el.poster = cfg.poster;
    el.addEventListener('loadeddata', () => el.classList.add('is-live'));
    el.play().catch(() => {});
  });
}

/* ══════════════════════════════ animation ══════════════════════════════════ */

function animateHeroIntro(heroChars) {
  const tl = gsap.timeline({ delay: 0.15 });

  tl.to(heroChars.top, {
    y: '0%', rotate: 0, opacity: 1,
    duration: 1.15, ease: 'expo.out', stagger: 0.045,
  })
    .to(heroChars.bottom, {
      y: '0%', rotate: 0, opacity: 1,
      duration: 1.15, ease: 'expo.out', stagger: 0.045,
    }, '-=0.85')
    .to('#heroSubtitle', {
      y: 0, opacity: 1, duration: 1, ease: 'expo.out',
    }, '-=0.6');

  return tl;
}

function animateStats(cells) {
  cells.forEach(({ cell, numEl, spec }, i) => {
    const counter = { v: 0 };

    gsap.timeline({
      scrollTrigger: { trigger: cell, start: 'top 84%', once: true },
      delay: i * 0.08,
    })
      .fromTo(
        cell,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
          // the hairline rule wipes down as the cell arrives
          onStart: () => cell.classList.add('is-lit'),
        },
        0
      )
      .to(
        counter,
        {
          v: spec.value,
          duration: 1.9,
          ease: 'power2.out',
          onUpdate: () => {
            numEl.textContent = counter.v.toFixed(spec.decimals ?? 0);
          },
        },
        0.1
      );
  });
}

function animatePillars(items) {
  // Each pillar takes its turn as the section scrubs past.
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#pillars',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
    },
  });

  items.forEach((li, i) => {
    tl.to(li, {
      opacity: 1, y: 0, duration: 1, ease: 'power2.out',
    }, i * 0.9 + 0.4);
  });

  gsap.from('#pillarsHeading', {
    scrollTrigger: { trigger: '#pillars', start: 'top 70%', once: true },
    y: 60, opacity: 0, duration: 1.2, ease: 'expo.out',
  });
}

function animateWork(cards) {
  ScrollTrigger.batch(cards, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1, y: 0, duration: 1.05, ease: 'expo.out', stagger: 0.09,
      }),
  });

  gsap.from('#workHeading', {
    scrollTrigger: { trigger: '#work', start: 'top 72%', once: true },
    y: 70, opacity: 0, duration: 1.2, ease: 'expo.out',
  });
}

function animateBackdrops(holoPanels, galleryPanels) {
  holoPanels.forEach((p) => {
    const depth = parseFloat(p.dataset.depth);
    gsap.to(p, {
      scrollTrigger: {
        trigger: '#pillars', start: 'top bottom', end: 'bottom top', scrub: 1,
      },
      yPercent: -22 * depth * 4,
      ease: 'none',
    });
  });

  galleryPanels.forEach((p) => {
    const z = parseFloat(p.dataset.z);
    const side = parseFloat(p.dataset.side);
    gsap.fromTo(
      p,
      { z: z - 260 },
      {
        scrollTrigger: {
          trigger: '#work', start: 'top bottom', end: 'bottom top', scrub: 1,
        },
        z: z + 420,
        ease: 'none',
        onUpdate() {
          const cz = gsap.getProperty(p, 'z');
          p.style.transform =
            `translateY(-50%) translateZ(${cz}px) rotateY(${side * 34}deg)`;
        },
      }
    );
  });
}

function animateFinale(chars) {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '#finale', start: 'top 62%', once: true },
  });
  tl.to(chars.top, {
    y: '0%', rotate: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.05,
  })
    .to(chars.bottom, {
      y: '0%', rotate: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.05,
    }, '-=0.8')
    .from('#finaleBody', { y: 30, opacity: 0, duration: 0.9, ease: 'expo.out' }, '-=0.6')
    .from('#finaleActions .btn', {
      y: 26, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.1,
    }, '-=0.55');
}

/* ═══════════════════════════════ bootstrap ═════════════════════════════════ */

async function boot() {
  const heroChars = buildHero();
  const statCells = buildStats();
  const pillarItems = buildPillars();
  const workCards = buildWork();
  const finaleChars = buildFinale();
  const holoPanels = buildHoloField();
  const galleryPanels = buildGalleryField();
  wireSectionClips();

  // ── the central element ───────────────────────────────────────────────────
  const orbit = new OrbitStage($('orbitCanvas'));
  await orbit.init();

  $('loaderFill').style.width = '100%';
  setTimeout(() => $('loader').classList.add('is-done'), 320);

  // ── smooth scroll ─────────────────────────────────────────────────────────
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
  });

  // Lenis is the single source of scroll truth; ScrollTrigger reads from it.
  lenis.on('scroll', ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length) lenis.scrollTo(value, { immediate: true });
      return lenis.animatedScroll;
    },
  });

  // ── hero orbit scrub ──────────────────────────────────────────────────────
  // `scrubState.t` is what the stage reads. GSAP's `scrub` lag-smooths it so
  // wheel deltas never land as visible steps in the orbit.
  const scrubState = { t: 0 };
  gsap.to(scrubState, {
    t: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom bottom',
      scrub: reduceMotion ? true : 0.55,
      onUpdate: (self) => {
        const deg = Math.round(self.progress * 360);
        $('heroProgress').textContent = String(deg).padStart(3, '0');
        $('heroCue').style.opacity = self.progress > 0.04 ? '0' : '1';
      },
    },
  });

  if (import.meta.env?.DEV) { window.__stage = orbit; window.__lenis = lenis; }

  // ── one rAF loop drives everything ────────────────────────────────────────
  const frame = (now) => {
    lenis.raf(now);
    orbit.setProgress(scrubState.t);
    orbit.render(now * 0.001);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  // ── the rest of the page ──────────────────────────────────────────────────
  if (!reduceMotion) animateHeroIntro(heroChars);
  else gsap.set(['.char', '#heroSubtitle'], { opacity: 1, y: 0, rotate: 0 });

  animateStats(statCells);
  animatePillars(pillarItems);
  animateWork(workCards);
  animateBackdrops(holoPanels, galleryPanels);
  animateFinale(finaleChars);

  // ── resize ────────────────────────────────────────────────────────────────
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      orbit.resize();
      ScrollTrigger.refresh();
    }, 140);
  });

  ScrollTrigger.refresh();
}

boot();
