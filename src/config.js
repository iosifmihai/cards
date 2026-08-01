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
