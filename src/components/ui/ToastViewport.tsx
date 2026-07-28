import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useToastStore } from "@/store/toast";
import { FlameCheckMark, CloseMark } from "./Monogram";

export function ToastViewport() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-5 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-8 sm:items-end sm:pr-8"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastCard key={toast.id} id={toast.id} message={toast.message} onDismiss={dismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastCard({
  id,
  message,
  onDismiss,
}: {
  id: number;
  message: string;
  onDismiss: (id: number) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), 3600);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl px-5 py-4"
    >
      <FlameCheckMark className="h-4 w-4 shrink-0 text-ember" />
      <p className="font-sans text-sm text-bone">{message}</p>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        className="ml-2 text-smoke transition-colors hover:text-bone"
        aria-label="Închide notificarea"
      >
        <CloseMark className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}
