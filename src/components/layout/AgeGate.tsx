import { AnimatePresence, motion } from "framer-motion";
import { useAgeGateStore } from "@/store/ageGate";

export function AgeGate() {
  const verified = useAgeGateStore((s) => s.verified);
  const confirm = useAgeGateStore((s) => s.confirm);

  const decline = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {!verified && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ink px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 30% 30%, rgba(112,0,13,0.35), transparent 70%), radial-gradient(50% 45% at 75% 70%, rgba(255,22,61,0.18), transparent 70%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="glass-panel-strong relative z-10 w-full max-w-md rounded-3xl px-8 py-12 text-center sm:px-12"
          >
            <p className="font-serif text-sm tracking-[0.3em] text-smoke">NAUGHTY CARDS</p>
            <div className="mx-auto my-6 h-px w-10 bg-burgundy" />
            <h1 id="age-gate-title" className="font-serif text-3xl text-bone sm:text-4xl">
              Ai peste 18 ani?
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-smoke">
              Naughty Cards conține întrebări și provocări destinate exclusiv adulților.
            </p>
            <div className="mt-9 flex flex-col gap-3">
              <button type="button" onClick={confirm} className="btn-primary w-full">
                Da, am peste 18 ani
              </button>
              <button type="button" onClick={decline} className="btn-ghost w-full py-2">
                Nu, părăsesc website-ul
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
