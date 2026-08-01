/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  MEDIA CONFIG — where the real footage drops in.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  The hero is a scroll-scrubbed frame sequence, exactly like the Digitz
 *  reference. Right now no footage exists (Seedance needs 108 credits, the
 *  account has 8, and your photos could not be reached from this environment),
 *  so the hero renders a PROCEDURAL 360° orbit instead — same scrub, same
 *  scroll wiring, placeholder subject.
 *
 *  TO SWITCH TO THE REAL HERO ORBIT:
 *    1. Export the clip to frames:
 *         ffmpeg -i hero-orbit.mp4 -vf fps=30,scale=1920:-1 -q:v 4 \
 *                public/frames/hero/hero_%04d.jpg
 *    2. Set `useFrames: true` below and set `count` to the number of frames.
 *  Nothing else changes — the scrubber already reads from here.
 */

/**
 *  ── THE HERO: PHOTOS ────────────────────────────────────────────────────────
 *
 *  Drop your shots in `public/photos/` and list them here, in the order they
 *  should appear. Scroll cross-dissolves through them. Any number works —
 *  three is enough to feel like a sequence, six or seven is plenty.
 *
 *  Set `enabled: false` to fall back to the WebGL stand-in.
 */
export const heroPhotos = {
  enabled: true,
  sources: [
    '/photos/hero-01.jpg',
    '/photos/hero-02.jpg',
    '/photos/hero-03.jpg',
    '/photos/hero-04.jpg',
  ],

  // How much each shot drifts in scale across its segment. 0 = static.
  drift: 0.09,

  /**
   *  How far each edge of the photo dissolves into the page, so no straight
   *  bitmap seam is ever visible.
   *    x       0..0.5  side falloff, as a fraction of image width
   *    y       0..0.5  top/bottom falloff, as a fraction of image height
   *    top     0..1    how hard the top edge is erased
   *    bottom  0..1    how hard the bottom edge is erased (higher, so the
   *                    subject sinks into the page rather than being cut off)
   */
  feather: { x: 0.2, y: 0.1, top: 0.8, bottom: 0.95 },

  /**
   *  The grade that makes white-studio photography sit on an ink-black page.
   *  Tune here rather than re-exporting images.
   *
   *    grayscale  0..1   how far to pull colour out (1 = fully mono)
   *    contrast   ~1.0+  punch; >1.3 starts blocking up shadows
   *    brightness ~0..1  <1 sinks the studio backdrop toward the page
   *    navy       0..1   strength of the navy multiply in the shadows
   *    vignette   0..1   edge falloff — the main tool for killing a white
   *                      backdrop. Lower it if your shots are already dark.
   *    emerald    0..1   strength of the screened emerald rim wash
   */
  grade: {
    grayscale: 0.85,
    contrast: 1.28,
    brightness: 0.52,
    navy: 0.5,
    vignette: 1,
    emerald: 0.18,
  },
};

export const heroSequence = {
  useFrames: false,
  // Frames are requested as `${basePath}${prefix}${paddedIndex}.${ext}`
  basePath: '/frames/hero/',
  prefix: 'hero_',
  ext: 'jpg',
  pad: 4,
  count: 240,
  // Frames start at this number (ffmpeg defaults to 1).
  startIndex: 1,
};

/**
 *  Background clips for the two lower sections. Drop an .mp4 in `public/video/`
 *  and set `src`. While `src` is null, each section renders its own CSS/WebGL
 *  environment — the holographic desk for the pillars, the glowing gallery
 *  corridor for the work section.
 */
export const sectionClips = {
  builder: { src: null, poster: null }, // clip 2 — THE BUILDER
  closer: { src: null, poster: null },  // clip 3 — THE CLOSER
};

/** Visual system. */
export const theme = {
  navy: '#0a2447',
  emerald: '#10b981',
  emeraldBright: '#34d399',
  cream: '#f4efe4',
  ink: '#04060b',
};
