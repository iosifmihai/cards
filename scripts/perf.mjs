import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

const renderer = await page.evaluate(() => {
  const gl = document.createElement('canvas').getContext('webgl2');
  const dbg = gl.getExtension('WEBGL_debug_renderer_info');
  return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : 'unknown';
});

/**
 * Drive the scrub entirely in-page (no CDP round-trips) and sample rAF deltas.
 * This is the true cost of Lenis -> ScrollTrigger -> scrub -> orbit render.
 */
const run = async (label, prep) => {
  const res = await page.evaluate(async ({ prepSrc }) => {
    // eslint-disable-next-line no-new-func
    if (prepSrc) new Function(prepSrc)();

    window.scrollTo(0, 0);
    window.__lenis.scrollTo(0, { immediate: true });
    await new Promise((r) => setTimeout(r, 400));

    const deltas = [];
    let last = performance.now();
    let running = true;
    const tick = (now) => {
      deltas.push(now - last);
      last = now;
      if (running) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const target = document.getElementById('hero').offsetHeight - window.innerHeight;
    window.__lenis.scrollTo(target, { duration: 5 });
    await new Promise((r) => setTimeout(r, 5400));
    running = false;

    const f = deltas.slice(8).filter((d) => d > 0 && d < 1000);
    const s = [...f].sort((a, b) => a - b);
    const pct = (p) => s[Math.min(s.length - 1, Math.floor(s.length * p))];
    return {
      samples: f.length,
      fps: +(1000 / (f.reduce((a, b) => a + b, 0) / f.length)).toFixed(1),
      median: +pct(0.5).toFixed(2),
      p95: +pct(0.95).toFixed(2),
      worst: +Math.max(...f).toFixed(2),
      over33ms: f.filter((d) => d > 33).length,
      degReached: document.getElementById('heroProgress').textContent,
    };
  }, { prepSrc: prep || null });
  console.log(label.padEnd(30), JSON.stringify(res));
  return res;
};

console.log('renderer:', renderer, '\n');

await run('baseline (as built)');
await run('grain+vignette removed', `document.querySelector('.grain').style.display='none'`);
await run('canvas hidden', `document.getElementById('orbitCanvas').style.visibility='hidden'`);

await browser.close();
