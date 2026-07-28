export type PackSide = "slowBurn" | "noLimits";

export const STAGE_BOUNDARIES = {
  appearEnd: 0.14,
  separateEnd: 0.34,
  rotateEnd: 0.54,
  selectEnd: 0.72,
};

export const STAGE_LABELS = [
  "Jocul începe nevinovat.",
  "Două moduri de a schimba seara.",
  "Build the tension. Break the limits.",
  "Choose your tension",
  "",
] as const;

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function mapRange(p: number, a: number, b: number): number {
  return clamp01((p - a) / (b - a));
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export interface PackTransform {
  x: number;
  y: number;
  z: number;
  rotationY: number;
  scale: number;
  lightIntensity: number;
  openAmount: number;
}

export function stageIndexFromProgress(p: number): 0 | 1 | 2 | 3 | 4 {
  const { appearEnd, separateEnd, rotateEnd, selectEnd } = STAGE_BOUNDARIES;
  if (p < appearEnd) return 0;
  if (p < separateEnd) return 1;
  if (p < rotateEnd) return 2;
  if (p < selectEnd) return 3;
  return 4;
}

export function computePackTransform(
  progress: number,
  side: PackSide,
  selected: PackSide | null,
  spread: number,
): PackTransform {
  const { appearEnd, separateEnd, rotateEnd, selectEnd } = STAGE_BOUNDARIES;
  const sign = side === "slowBurn" ? -1 : 1;

  const appearT = smoothstep(mapRange(progress, 0, appearEnd));
  const separateT = smoothstep(mapRange(progress, appearEnd, separateEnd));
  const rotateT = smoothstep(mapRange(progress, separateEnd, rotateEnd));
  const selectT = smoothstep(mapRange(progress, rotateEnd, selectEnd));
  const openT = smoothstep(mapRange(progress, selectEnd, 1));

  let x = sign * spread * separateT;
  const y = -0.5 + 0.5 * appearT;
  let z = 0;
  let rotationY = sign * -0.45 + rotateT * sign * 2.2;
  let scale = 0.8 + 0.2 * appearT + 0.06 * selectT;
  let lightIntensity = 0.15 + 0.85 * appearT;
  let openAmount = 0;

  if (selected) {
    const isChosen = selected === side;
    if (isChosen) {
      x = lerp(x, 0, openT);
      z = lerp(z, 0.2, openT);
      scale = lerp(scale, 1.32, openT);
      rotationY = lerp(rotationY, 0, openT);
      openAmount = openT;
      lightIntensity = lerp(lightIntensity, 1.4, openT);
    } else {
      scale = lerp(scale, 0.5, openT);
      z = lerp(z, -1.3, openT);
      lightIntensity = lerp(lightIntensity, 0.08, openT);
    }
  } else {
    openAmount = openT * 0.22;
  }

  return { x, y, z, rotationY, scale, lightIntensity, openAmount };
}
