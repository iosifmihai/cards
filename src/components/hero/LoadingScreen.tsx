import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const { active, progress } = useProgress();

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-ink"
        >
          <p className="font-serif text-lg tracking-[0.2em] text-bone">
            NAUGHTY <span className="text-ember">CARDS</span>
          </p>
          <div className="mt-6 h-px w-40 overflow-hidden bg-bone/10">
            <motion.div
              className="h-full bg-ember"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
