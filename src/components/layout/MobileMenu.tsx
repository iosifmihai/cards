import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "@/data/nav";
import { CloseMark } from "@/components/ui/Monogram";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[90] bg-ink/97 backdrop-blur-2xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Meniu de navigare"
        >
          <div className="flex items-center justify-between px-6 pt-6">
            <span className="font-serif text-lg tracking-[0.14em] text-bone">
              NAUGHTY <span className="text-ember">CARDS</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Închide meniul"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone"
            >
              <CloseMark className="h-4.5 w-4.5" />
            </button>
          </div>

          <nav className="flex h-full flex-col justify-center gap-2 px-8 pb-32" aria-label="Navigare mobilă">
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={link.href}
                  onClick={onClose}
                  className="block py-3 font-serif text-4xl text-bone transition-colors hover:text-ember"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 flex flex-col gap-3"
            >
              <Link to="/bundle" onClick={onClose} className="btn-primary w-full">
                Comandă acum
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
