import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stageIndexFromProgress } from "./heroChoreography";

gsap.registerPlugin(ScrollTrigger);

export function useHeroScroll(pinnedRef: RefObject<HTMLElement | null>, enabled: boolean) {
  const progressRef = useRef(0);
  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [released, setReleased] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const el = pinnedRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "+=380%",
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        const next = stageIndexFromProgress(self.progress);
        setStage((prev) => (prev === next ? prev : next));
      },
      onLeave: () => setReleased(true),
      onEnterBack: () => setReleased(false),
    });

    return () => {
      trigger.kill();
    };
  }, [pinnedRef, enabled]);

  return { progressRef, stage, released };
}
