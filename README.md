# emails by Andreea

Cinematic, scroll-driven personal portfolio. The hero is a scroll-scrubbed
photo sequence with a cinematic grade; the rest of the page is a sequence of
scroll-triggered reveals over dark, lit environments.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## The two things you need to edit

### 1. `src/content.js` — all the copy

Every string on the page lives in this one file. Stats, the three pillars, the
Brands Managed names, the closing copy, and all links are taken verbatim from
the live emailsbyandreea.com homepage source.

One thing is still marked `⟨PLACEHOLDER⟩`: the per-brand pitch lines in `work`.
The live site shows those logos with no copy attached, so there was nothing to
transcribe — and client results are not worth guessing at.

Sections size themselves from array length, so adding a fourth pillar or an
eighth work card needs no layout changes.

### 2. `src/config.js` — the photos

**The hero runs on photographs.** Scroll cross-dissolves through them, each shot
drifting in scale across its own segment.

To use your own:

1. Put them in `public/photos/` — portrait orientation, ideally 1200px+ on the
   short edge.
2. List them, in order, in `heroPhotos.sources`.

That's the whole job. Any number works; three feels like a sequence, six or
seven is plenty. The files currently in `public/photos/` are **generated
placeholders** (`npm run photos` remakes them) — a dark figure on a bright
studio backdrop, chosen to match the real source material so the grade is
tested against the case that actually matters.

#### The grade, and why it exists

The source photography is high-key white studio; the page is ink-black. Dropped
in raw, a shot punches a bright rectangle through the design. `heroPhotos.grade`
desaturates, sinks the backdrop toward the page, pushes shadows navy, and lays a
screened emerald rim behind the subject. `heroPhotos.feather` dissolves the
bitmap's own edges so no straight seam is ever visible — necessary because a
portrait fitted by height into a landscape hero leaves bands down each side that
a radial vignette cannot hide.

Tune both in `config.js` rather than re-exporting images. If your shots are
already dark, drop `vignette` and raise `brightness`.

#### Falling back

If `heroPhotos.enabled` is `false` — or every photo fails to load, which is
caught at runtime — the hero falls back to a **procedural WebGL stand-in**: a
rim-lit figure orbited by the camera. It exists so the scrub could be built and
measured before any photography existed, and it is not a likeness of anyone.

A pre-rendered frame sequence is also still supported (`heroSequence.useFrames`,
frames in `public/frames/hero/`), if a scrubbed clip is ever wanted. All three
sit behind one `setProgress(t)` interface, so the scroll wiring never changes.

The two lower sections take background clips the same way — drop an mp4 in
`public/video/` and set `sectionClips.builder.src` / `.closer.src`. While those
are `null`, each section renders its own CSS environment (a drifting
holographic-panel field, and a perspective corridor of glowing screens).

### Getting photos into this repo

The build environment can't reach emailsbyandreea.com, Google Drive, or chat
attachments — its egress policy allows package registries and GitHub only. The
working channel is therefore **git**:

```bash
git checkout claude/github-account-connection-6ttlo4
mkdir -p public/photos
cp ~/Pictures/andreea-*.jpg public/photos/
git add public/photos && git commit -m "add hero photos" && git push
```

## Architecture

| File | Role |
| --- | --- |
| `src/content.js` | All copy. The only file most edits touch. |
| `src/config.js` | Media sources + palette. |
| `src/photo-stage.js` | The hero's photo backend: cross-dissolve, drift, grade, edge feather. |
| `src/orbit-stage.js` | Picks a hero backend — photos, frame sequence, or WebGL stand-in — behind one `setProgress(t)` facade. |
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
- **DPR is capped per hero backend**: 1.6 for the WebGL stand-in (fill-rate
  bound across the whole viewport), 1.75 for photos (a blit, plus two
  full-canvas gradient fills per frame), 2 for a plain frame sequence.
- **The photo grade is baked once per image at load**, not applied per frame,
  and the composite is skipped entirely when scroll has not moved. Per-frame
  work is one or two `drawImage` calls, nothing else.
- **The vignette and emerald rim are one plain CSS layer**, not canvas fills and
  not blended layers. Measured on the photo hero: per-frame gradient fills cost
  166ms/frame baseline (133ms of it JS draw work); moving them to two
  `mix-blend-mode` layers cut the draw work to 50ms but pushed the baseline to
  183ms, because each blended layer is its own composited surface; collapsing
  both into a single un-blended layer landed at 100ms baseline / 50ms draw.
  Against an already desaturated photo, alpha-over-ink is indistinguishable
  from multiply.

Measured in this repo's sandbox, frame cost tracks backing-pixel count almost
exactly (1.44M px → 83ms, 1.92M px → 83ms at a different viewport), which is the
signature of CPU rasterisation — that box has no GPU and falls back to
SwiftShader. With the canvas hidden the pipeline sits at a clean 16.7ms. The
scroll wiring is therefore not the bottleneck there, but **the scrub has not been
measured on real GPU hardware** — verify on a real machine before shipping.
