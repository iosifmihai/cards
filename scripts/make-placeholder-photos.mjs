/**
 * Generates stand-in hero photos into public/photos/.
 *
 * These deliberately mimic the real source material — a dark-clothed subject on
 * a bright studio backdrop — because that is the case the hero's grade has to
 * survive. A placeholder that was already dark would prove nothing.
 *
 * Replace public/photos/hero-*.jpg with real shots; nothing else changes.
 *
 *   node scripts/make-placeholder-photos.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = new URL('../public/photos/', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1200, height: 1500 } });

const shots = [
  { pose: 'stand', shift: 0.0, zoom: 1.0 },
  { pose: 'desk', shift: 0.08, zoom: 1.06 },
  { pose: 'sit', shift: -0.06, zoom: 1.02 },
  { pose: 'stand', shift: 0.04, zoom: 1.1 },
];

for (const [i, s] of shots.entries()) {
  const dataUrl = await page.evaluate(({ pose, shift, zoom }) => {
    const W = 1200, H = 1500;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const x = c.getContext('2d');

    // studio backdrop: bright, softly lit from upper left
    const bg = x.createRadialGradient(W * 0.34, H * 0.26, 40, W * 0.5, H * 0.5, H * 0.95);
    bg.addColorStop(0, '#ffffff');
    bg.addColorStop(0.45, '#eceaea');
    bg.addColorStop(1, '#cfcdcd');
    x.fillStyle = bg;
    x.fillRect(0, 0, W, H);

    x.save();
    x.translate(W * (0.5 + shift), H * 0.52);
    x.scale(zoom, zoom);

    // cast shadow on the backdrop
    x.save();
    x.globalAlpha = 0.16;
    x.fillStyle = '#5a5560';
    x.beginPath();
    x.ellipse(150, 120, 210, 430, -0.12, 0, Math.PI * 2);
    x.fill();
    x.restore();

    // subject — dark tailored silhouette
    x.fillStyle = '#141319';
    const body = new Path2D();
    if (pose === 'sit') {
      body.ellipse(0, -330, 78, 92, 0, 0, Math.PI * 2);      // head
      body.moveTo(-120, -240);
      body.bezierCurveTo(-150, -60, -140, 120, -120, 250);
      body.lineTo(150, 250);
      body.bezierCurveTo(160, 90, 150, -70, 120, -240);
      body.closePath();
    } else {
      body.ellipse(0, -430, 74, 90, 0, 0, Math.PI * 2);      // head
      body.moveTo(-104, -340);
      body.bezierCurveTo(-136, -140, -128, 160, -112, 470);
      body.lineTo(112, 470);
      body.bezierCurveTo(128, 160, 136, -140, 104, -340);
      body.closePath();
    }
    x.fill(body);

    // hair mass, catching the key light
    x.fillStyle = '#b9986a';
    x.beginPath();
    x.ellipse(0, pose === 'sit' ? -368 : -468, 92, 74, 0, Math.PI, Math.PI * 2);
    x.fill();

    // a laptop, for the desk frame
    if (pose === 'desk') {
      x.fillStyle = '#8d9298';
      x.fillRect(-190, 40, 380, 14);
      x.save();
      x.transform(1, -0.42, 0, 1, 0, 0);
      x.fillRect(-165, 40, 330, 190);
      x.restore();
    }

    x.restore();

    // gentle lens falloff so it reads photographic
    const fall = x.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.78);
    fall.addColorStop(0, 'rgba(0,0,0,0)');
    fall.addColorStop(1, 'rgba(0,0,0,0.16)');
    x.fillStyle = fall;
    x.fillRect(0, 0, W, H);

    return c.toDataURL('image/jpeg', 0.9);
  }, s);

  const name = `hero-0${i + 1}.jpg`;
  fs.writeFileSync(OUT + name, Buffer.from(dataUrl.split(',')[1], 'base64'));
  console.log('wrote', name);
}

await browser.close();
