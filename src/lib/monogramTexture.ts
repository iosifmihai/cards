import * as THREE from "three";

const cache = new Map<string, THREE.CanvasTexture>();

export function createMonogramTexture(label: string, color = "#f5f1f2"): THREE.CanvasTexture {
  const key = `${label}-${color}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, 256, 256);
    ctx.fillStyle = color;
    ctx.font = "500 108px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = 0.92;
    ctx.fillText(label, 128, 138);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  cache.set(key, texture);
  return texture;
}
