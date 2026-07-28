import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, ContactShadows } from "@react-three/drei";
import type { Group, PerspectiveCamera as PerspectiveCameraImpl, PointLight } from "three";
import { PackModel } from "./PackModel";
import { computePackTransform, type PackSide } from "./heroChoreography";
import { PRODUCT_MODELS } from "@/data/products";

interface SceneProps {
  progressRef: RefObject<number>;
  selected: PackSide | null;
  mobile: boolean;
}

export function Scene({ progressRef, selected, mobile }: SceneProps) {
  const slowBurnGroup = useRef<Group>(null);
  const noLimitsGroup = useRef<Group>(null);
  const slowBurnLight = useRef<PointLight>(null);
  const noLimitsLight = useRef<PointLight>(null);
  const cameraRef = useRef<PerspectiveCameraImpl>(null);
  const slowBurnOpen = useRef(0);
  const noLimitsOpen = useRef(0);

  const spread = mobile ? 0.78 : 1.15;

  useFrame(() => {
    cameraRef.current?.lookAt(0, 0.08, 0);

    const p = progressRef.current;

    const a = computePackTransform(p, "slowBurn", selected, spread);
    const b = computePackTransform(p, "noLimits", selected, spread);

    if (slowBurnGroup.current) {
      slowBurnGroup.current.position.set(a.x, a.y, a.z);
      slowBurnGroup.current.rotation.y = a.rotationY;
      slowBurnGroup.current.scale.setScalar(a.scale);
    }
    if (noLimitsGroup.current) {
      noLimitsGroup.current.position.set(b.x, b.y, b.z);
      noLimitsGroup.current.rotation.y = b.rotationY;
      noLimitsGroup.current.scale.setScalar(b.scale);
    }
    if (slowBurnLight.current) slowBurnLight.current.intensity = a.lightIntensity * 9;
    if (noLimitsLight.current) noLimitsLight.current.intensity = b.lightIntensity * 9;
    slowBurnOpen.current = a.openAmount;
    noLimitsOpen.current = b.openAmount;
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={mobile ? 34 : 28}
        position={[0, 1.75, mobile ? 5.4 : 4.7]}
      />
      <ambientLight intensity={0.5} color="#5a2028" />
      <directionalLight position={[1.5, 4.5, 2.5]} intensity={0.9} color="#f5f1f2" />
      <directionalLight position={[-2, 2, -2]} intensity={0.25} color="#ff163d" />
      <pointLight ref={slowBurnLight} position={[-1.6, 1.9, 1.6]} color="#e0995f" intensity={1} distance={7} />
      <pointLight ref={noLimitsLight} position={[1.6, 1.9, 1.6]} color="#ff163d" intensity={1} distance={7} />

      <group ref={slowBurnGroup}>
        <PackModel productId="slowBurn" modelUrl={PRODUCT_MODELS.slowBurn} openRef={slowBurnOpen} />
      </group>
      <group ref={noLimitsGroup}>
        <PackModel productId="noLimits" modelUrl={PRODUCT_MODELS.noLimits} openRef={noLimitsOpen} />
      </group>

      <ContactShadows position={[0, -0.14, 0]} opacity={0.55} scale={8} blur={2.2} far={2} color="#000000" />
    </>
  );
}
