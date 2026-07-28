import { Suspense, useEffect, useMemo, useRef, useState, forwardRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Edges, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";
import { ErrorBoundaryModel } from "./ErrorBoundaryModel";
import { createMonogramTexture } from "@/lib/monogramTexture";

export type PackId = "slowBurn" | "noLimits";

interface PackTheme {
  base: string;
  lid: string;
  interior: string;
  accent: string;
  label: string;
}

const THEMES: Record<PackId, PackTheme> = {
  slowBurn: { base: "#241012", lid: "#2c1416", interior: "#6b0210", accent: "#dc9a63", label: "SB" },
  noLimits: { base: "#220208", lid: "#30030a", interior: "#8a0016", accent: "#ff163d", label: "NL" },
};

interface PackModelProps {
  productId: PackId;
  modelUrl: string;
  openRef: RefObject<number>;
}

const availabilityCache = new Map<string, boolean>();

function useModelAvailability(url: string): "checking" | "available" | "unavailable" {
  const [status, setStatus] = useState<"checking" | "available" | "unavailable">(
    availabilityCache.has(url) ? (availabilityCache.get(url) ? "available" : "unavailable") : "checking",
  );

  useEffect(() => {
    if (availabilityCache.has(url)) return;
    let cancelled = false;
    fetch(url, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        // SPA fallback hosting (Vite dev, Netlify-style rewrites) answers missing
        // assets with a 200 + index.html instead of a 404 — a text/html content
        // type there means "not actually a model file", not "available".
        const contentType = res.headers.get("content-type") ?? "";
        const ok = res.ok && !contentType.includes("text/html");
        availabilityCache.set(url, ok);
        setStatus(ok ? "available" : "unavailable");
      })
      .catch(() => {
        if (cancelled) return;
        availabilityCache.set(url, false);
        setStatus("unavailable");
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return status;
}

function GLTFPack({ url, productId, openRef }: { url: string; productId: PackId; openRef: RefObject<number> }) {
  const gltf = useGLTF(url);
  const groupRef = useRef<Group>(null);
  const smoothOpen = useRef(0);

  useFrame((_, delta) => {
    smoothOpen.current = THREE.MathUtils.damp(smoothOpen.current, openRef.current, 4.5, delta);
    const lid = groupRef.current?.getObjectByName("Lid");
    if (lid) lid.rotation.x = -Math.PI * 0.62 * smoothOpen.current;
  });

  return <primitive ref={groupRef} object={gltf.scene} userData={{ productId }} />;
}

/**
 * Every product model is architected around named sub-groups (Base, Lid, Tray, Deck, Cards)
 * so a sculpted .glb dropped at PRODUCT_MODELS[productId] slots in without touching the
 * scroll-choreography code — see PackModel below for the GLTF attempt + graceful fallback.
 */
export const ProceduralPack = forwardRef<Group, { productId: PackId; openRef: RefObject<number> }>(
  ({ productId, openRef }, ref) => {
    const theme = THEMES[productId];
    const lidRef = useRef<Group>(null);
    const cardsRef = useRef<Group>(null);
    const cardARef = useRef<THREE.Mesh>(null);
    const smoothOpen = useRef(0);

    const monogramTexture = useMemo(() => createMonogramTexture(theme.label), [theme.label]);

    useFrame((_, delta) => {
      smoothOpen.current = THREE.MathUtils.damp(smoothOpen.current, openRef.current, 4.5, delta);
      const o = smoothOpen.current;
      if (lidRef.current) lidRef.current.rotation.x = -Math.PI * 0.6 * o;
      if (cardsRef.current) cardsRef.current.position.y = 0.16 + o * 0.32;
      if (cardARef.current) {
        cardARef.current.position.z = -0.15 + o * 0.55;
        cardARef.current.rotation.y = o * Math.PI * 0.55;
      }
    });

    return (
      <group ref={ref} name={`Pack-${productId}`}>
        <group name="Base">
          <RoundedBox args={[1.16, 0.26, 1.66]} radius={0.05} smoothness={4} castShadow receiveShadow>
            <meshPhysicalMaterial
              color={theme.base}
              roughness={0.55}
              metalness={0.18}
              clearcoat={0.3}
              clearcoatRoughness={0.35}
            />
            <Edges scale={1.001} color={theme.accent} />
          </RoundedBox>
        </group>

        <group name="Tray" position={[0, 0.15, 0]}>
          <RoundedBox args={[0.98, 0.05, 1.42]} radius={0.03} castShadow receiveShadow>
            <meshStandardMaterial color={theme.interior} roughness={0.75} metalness={0.05} />
          </RoundedBox>
        </group>

        <group name="Deck" ref={cardsRef} position={[0, 0.19, 0]}>
          {Array.from({ length: 9 }).map((_, i) => (
            <RoundedBox
              key={i}
              args={[0.82, 0.011, 1.22]}
              radius={0.018}
              position={[0, i * 0.012, 0]}
              castShadow
            >
              <meshStandardMaterial color={i % 2 === 0 ? "#150f11" : "#1d1416"} roughness={0.4} metalness={0.1} />
            </RoundedBox>
          ))}
          <group name="Cards">
            <RoundedBox ref={cardARef} args={[0.8, 0.01, 1.2]} radius={0.018} position={[0, 0.12, -0.15]} castShadow>
              <meshStandardMaterial color={theme.interior} roughness={0.35} metalness={0.15} />
            </RoundedBox>
          </group>
        </group>

        <group name="Lid" ref={lidRef} position={[0, 0.135, -0.83]}>
          <group position={[0, 0.05, 0.83]}>
            <RoundedBox args={[1.16, 0.09, 1.66]} radius={0.05} smoothness={4} castShadow receiveShadow>
              <meshPhysicalMaterial
                color={theme.lid}
                roughness={0.35}
                metalness={0.25}
                clearcoat={0.5}
                clearcoatRoughness={0.2}
              />
              <Edges scale={1.001} color={theme.accent} />
            </RoundedBox>
            <mesh position={[0, 0.052, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.42, 0.42]} />
              <meshBasicMaterial map={monogramTexture} transparent opacity={0.9} />
            </mesh>
          </group>
        </group>
      </group>
    );
  },
);
ProceduralPack.displayName = "ProceduralPack";

export function PackModel({ productId, modelUrl, openRef }: PackModelProps) {
  const availability = useModelAvailability(modelUrl);

  if (availability !== "available") {
    return <ProceduralPack productId={productId} openRef={openRef} />;
  }

  return (
    <ErrorBoundaryModel fallback={<ProceduralPack productId={productId} openRef={openRef} />}>
      <Suspense fallback={<ProceduralPack productId={productId} openRef={openRef} />}>
        <GLTFPack url={modelUrl} productId={productId} openRef={openRef} />
      </Suspense>
    </ErrorBoundaryModel>
  );
}
