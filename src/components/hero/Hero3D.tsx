import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scene } from "./Scene";
import { LoadingScreen } from "./LoadingScreen";
import { HeroFallback } from "./HeroFallback";
import { useHeroScroll } from "./useHeroScroll";
import { STAGE_LABELS, type PackSide } from "./heroChoreography";
import { isLowPowerDevice, isWebGLAvailable, prefersReducedMotion } from "@/lib/webgl";

export function Hero3D() {
  const [capable] = useState<boolean>(
    () => isWebGLAvailable() && !prefersReducedMotion() && !isLowPowerDevice(),
  );
  const [mobile, setMobile] = useState(false);
  const [selected, setSelected] = useState<PackSide | null>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 860);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { progressRef, stage } = useHeroScroll(pinnedRef, capable);

  if (!capable) return <HeroFallback />;

  return (
    <section ref={pinnedRef} className="relative h-[100svh] overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 42% at 24% 32%, rgba(112,0,13,0.4), transparent 70%), radial-gradient(46% 40% at 78% 58%, rgba(255,22,61,0.24), transparent 70%)",
        }}
      />

      <Canvas
        className="!absolute inset-0"
        dpr={[1, mobile ? 1.5 : 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <Scene progressRef={progressRef} selected={selected} mobile={mobile} />
      </Canvas>

      <LoadingScreen />

      <div className="pointer-events-none absolute inset-0 flex flex-col">
        <div className="container-edit pointer-events-none flex flex-1 flex-col items-center justify-center pt-16 text-center">
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key="stage-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto flex max-w-2xl flex-col items-center"
              >
                <p className="eyebrow">Naughty Cards</p>
                <h1 className="mt-6 font-serif text-4xl leading-[1.05] text-bone sm:text-6xl">
                  Jocul începe nevinovat.
                </h1>
                <p className="mt-4 font-serif text-xl text-smoke sm:text-2xl">Tu alegi cât de departe merge.</p>
                <p className="mx-auto mt-6 max-w-xl font-sans text-[15px] leading-relaxed text-smoke">
                  Două pachete. Două niveluri de tensiune. Un singur adevăr: următoarea carte poate schimba
                  întreaga seară.
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <Link to="/slow-burn" className="btn-primary">
                    Descoperă Slow Burn
                  </Link>
                  <Link to="/no-limits" className="btn-secondary">
                    Descoperă No Limits
                  </Link>
                </div>
                <Link to="/#comparator" className="btn-ghost mt-5">
                  Vezi diferențele
                </Link>
                <p className="mt-7 font-sans text-xs uppercase tracking-[0.14em] text-smoke">
                  Exclusiv 18+ · Ambalaj discret · Plată securizată
                </p>
                <ScrollCue />
              </motion.div>
            )}

            {stage > 0 && stage < 3 && (
              <motion.div
                key={`stage-${stage}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-serif text-3xl text-bone sm:text-4xl">{STAGE_LABELS[stage]}</h2>
              </motion.div>
            )}

            {stage === 3 && (
              <motion.div
                key="stage-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto flex flex-col items-center"
              >
                <p className="eyebrow">Choose your tension</p>
                <div className="mt-6 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setSelected("slowBurn")}
                    className={`glass-panel rounded-full px-7 py-3 font-sans text-sm font-semibold uppercase tracking-[0.1em] transition-all ${
                      selected === "slowBurn" ? "text-ember" : "text-bone hover:text-ember"
                    }`}
                  >
                    Slow Burn
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelected("noLimits")}
                    className={`glass-panel rounded-full px-7 py-3 font-sans text-sm font-semibold uppercase tracking-[0.1em] transition-all ${
                      selected === "noLimits" ? "text-ember" : "text-bone hover:text-ember"
                    }`}
                  >
                    No Limits
                  </button>
                </div>
              </motion.div>
            )}

            {stage === 4 && (
              <motion.div
                key="stage-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto flex flex-col items-center"
              >
                <h2 className="font-serif text-3xl text-bone sm:text-4xl">
                  {selected === "noLimits"
                    ? "Nu mai există întrebări sigure."
                    : selected === "slowBurn"
                      ? "Lasă tensiunea să crească."
                      : "Alege un pachet pentru a continua."}
                </h2>
                {selected && (
                  <Link
                    to={selected === "slowBurn" ? "/slow-burn" : "/no-limits"}
                    className="btn-primary mt-6"
                  >
                    {selected === "slowBurn" ? "Alege Slow Burn" : "Alege No Limits"}
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="mt-14 flex flex-col items-center gap-2"
      aria-hidden="true"
    >
      <span className="h-9 w-px bg-gradient-to-b from-transparent via-bone/50 to-transparent" />
      <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-smoke">Scroll</span>
    </motion.div>
  );
}
