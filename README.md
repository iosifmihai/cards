# emails by Andreea

Cinematic, scroll-driven personal portfolio. The hero is a scroll-scrubbed 360°
orbit around a central subject; the rest of the page is a sequence of
scroll-triggered reveals over dark, lit environments.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## The two things you need to edit

### 1. `src/content.js` — all the copy

Every string on the page lives in this one file. Anything marked `⟨PLACEHOLDER⟩`
is a stand-in and needs replacing with the real copy from emailsbyandreea.com.

The site could not be read from the build environment (outbound requests to
`emailsbyandreea.com`, Google Drive, and every non-allowlisted host are blocked
by the sandbox network policy), so no real stats, brand names, or links are
baked in — inventing revenue figures and client names for a live business is not
something to leave lurking in a codebase.

Sections size themselves from array length, so adding a fourth pillar or a
seventh work card needs no layout changes.

### 2. `src/config.js` — the footage

The hero currently renders a **procedural WebGL stand-in**: a rim-lit figure in a
black void, orbited by the camera. It exists so the scrub could be built and
measured before any footage existed. It is not a likeness of anyone.

To swap in the real hero orbit:

```bash
ffmpeg -i hero-orbit.mp4 -vf fps=30,scale=1920:-1 -q:v 4 \
       public/frames/hero/hero_%04d.jpg
```

then in `src/config.js`:

```js
export const heroSequence = {
  useFrames: true,   // ← was false
  count: 240,        // ← number of frames actually produced
  ...
};
```

Nothing else changes. `OrbitStage` swaps its backend behind one interface and
the scroll wiring is untouched.

The two lower sections take background clips the same way — drop an mp4 in
`public/video/` and set `sectionClips.builder.src` / `.closer.src`. While those
are `null`, each section renders its own CSS environment (a drifting
holographic-panel field, and a perspective corridor of glowing screens).

## Architecture

| File | Role |
| --- | --- |
| `src/content.js` | All copy. The only file most edits touch. |
| `src/config.js` | Media sources + palette. |
| `src/orbit-stage.js` | The hero. `FrameSequenceBackend` (real footage) and `ProceduralBackend` (stand-in) behind one `setProgress(t)` facade. |
| `src/main.js` | DOM composition from content, GSAP/ScrollTrigger wiring, the single rAF loop. |
| `src/styles.css` | Visual system. |

Scroll is owned by Lenis. ScrollTrigger reads from it via a scroller proxy, and
a single `requestAnimationFrame` loop drives Lenis, the scrub, and the render —
so there is exactly one place that touches the frame.

The hero scrub is lag-smoothed by GSAP (`scrub: 0.55`) rather than mapped
directly off scroll position, so wheel deltas never land as visible steps in the
orbit.

## Performance

`npm run perf` drives the scrub from inside the page (no CDP round-trips, which
otherwise dominate the measurement) and reports frame-time percentiles.
`npm run verify` renders every section, checks for console errors, and writes
screenshots to `shots/`.

Two findings worth keeping in mind if you touch the visuals:

- **The grain overlay is promoted and animated by `transform`, with only 12%
  overscan.** It started at `inset: -140%` — roughly 14× the viewport area — which
  cost ~17ms/frame. Rewriting it to animate `background-position` instead was
  worse still (~4×): the SVG `feTurbulence` tile is expensive to rasterise, so it
  must be rasterised once and thereafter only composited. It now costs ~0.
- **The WebGL stand-in caps DPR at 1.6**, the frame-sequence path at 2. The
  stand-in is fill-rate bound across the whole viewport; the sequence is a plain
  2D blit.

Measured in this repo's sandbox, frame cost tracks backing-pixel count almost
exactly (1.44M px → 83ms, 1.92M px → 83ms at a different viewport), which is the
signature of CPU rasterisation — that box has no GPU and falls back to
SwiftShader. With the canvas hidden the pipeline sits at a clean 16.7ms. The
scroll wiring is therefore not the bottleneck there, but **the scrub has not been
measured on real GPU hardware** — verify on a real machine before shipping.
