import { chromium } from 'playwright';
import crypto from 'node:crypto';
import fs from 'node:fs';

const OUT = new URL('../shots/', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--no-sandbox',
  ],
});

const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });

const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

// ── 1. did the WebGL stage come up? ──────────────────────────────────────────
const stage = await page.evaluate(() => {
  const c = document.getElementById('orbitCanvas');
  return { exists: !!c, w: c?.width, h: c?.height, loaderDone: document.getElementById('loader').classList.contains('is-done') };
});

// ── 2. hero type actually tracked in? ────────────────────────────────────────
const typeState = await page.evaluate(() => {
  const chars = [...document.querySelectorAll('#wordmarkTop .char')];
  const visible = chars.filter((c) => parseFloat(getComputedStyle(c).opacity) > 0.9).length;
  return { total: chars.length, visible, text: document.getElementById('wordmarkTop').textContent };
});

// ── 3. frame timing under a real wheel-driven scroll ─────────────────────────
await page.evaluate(() => {
  window.__frames = [];
  let last = performance.now();
  const tick = (now) => { window.__frames.push(now - last); last = now; requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
});

await page.mouse.move(800, 450);
for (let i = 0; i < 90; i++) {
  await page.mouse.wheel(0, 130);
  await page.waitForTimeout(16);
}
await page.waitForTimeout(600);

const timing = await page.evaluate(() => {
  const f = window.__frames.slice(5).filter((d) => d > 0 && d < 500);
  const sorted = [...f].sort((a, b) => a - b);
  const pct = (p) => sorted[Math.floor(sorted.length * p)];
  return {
    samples: f.length,
    avg: +(f.reduce((a, b) => a + b, 0) / f.length).toFixed(2),
    median: +pct(0.5)?.toFixed(2),
    p95: +pct(0.95)?.toFixed(2),
    worst: +Math.max(...f).toFixed(2),
    over33ms: f.filter((d) => d > 33).length,
    over50ms: f.filter((d) => d > 50).length,
  };
});

// ── 4. does the orbit actually rotate? sample distinct scroll depths ─────────
const heroH = await page.evaluate(() => document.getElementById('hero').offsetHeight - window.innerHeight);
const samples = [];
for (const frac of [0, 0.25, 0.5, 0.75, 0.99]) {
  await page.evaluate((y) => window.scrollTo(0, y), Math.round(heroH * frac));
  await page.waitForTimeout(1100);
  const deg = await page.textContent('#heroProgress');
  const buf = await page.locator('#orbitCanvas').screenshot();
  const hash = crypto.createHash('md5').update(buf).digest('hex').slice(0, 12);
  fs.writeFileSync(`${OUT}/orbit-${Math.round(frac * 100)}.png`, buf);
  samples.push({ frac, deg, hash });
}

// ── 5. downstream sections render + reveal ──────────────────────────────────
const sections = {};
for (const [name, sel] of [['stats', '#stats'], ['pillars', '#pillars'], ['work', '#work'], ['finale', '#finale']]) {
  await page.evaluate((s) => document.querySelector(s).scrollIntoView(), sel);
  await page.waitForTimeout(1400);
  if (name === 'pillars') {
    // scrub deeper so later pillars get their turn
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2.2));
    await page.waitForTimeout(1400);
  }
  sections[name] = await page.evaluate((s) => {
    const root = document.querySelector(s);
    const kids = [...root.querySelectorAll('.stat, .pillar, .card, .btn')];
    return {
      revealed: kids.filter((k) => parseFloat(getComputedStyle(k).opacity) > 0.85).length,
      total: kids.length,
    };
  }, sel);
  await page.screenshot({ path: `${OUT}/section-${name}.png` });
}

const counterValues = await page.evaluate(() =>
  [...document.querySelectorAll('.stat__value')].map((e) => e.textContent.trim())
);

console.log(JSON.stringify({ stage, typeState, timing, samples, sections, counterValues, errors }, null, 2));
await browser.close();
