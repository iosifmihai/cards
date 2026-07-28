import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCartStore, computeCartTotals } from "@/store/cart";
import { allProducts } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { CloseMark, MinusMark, PlusMark, CardMark } from "@/components/ui/Monogram";
import { SHIPPING } from "@/data/shipping";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const promoCode = useCartStore((s) => s.promoCode);

  const totals = computeCartTotals(lines, promoCode);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel-strong fixed inset-y-0 right-0 z-[96] flex w-full max-w-md flex-col rounded-l-3xl"
            role="dialog"
            aria-modal="true"
            aria-label="Coșul de cumpărături"
          >
            <div className="flex items-center justify-between border-b border-bone/10 px-6 py-5">
              <h2 className="font-serif text-2xl text-bone">Coșul tău</h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Închide coșul"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 text-bone"
              >
                <CloseMark className="h-4 w-4" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <CardMark className="h-10 w-10 text-smoke" />
                <p className="font-serif text-xl text-bone">Coșul tău așteaptă prima carte.</p>
                <Link to="/#pachete" onClick={closeCart} className="btn-secondary">
                  Descoperă jocurile
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5" aria-live="polite">
                  <ul className="flex flex-col gap-5">
                    {lines.map((line) => {
                      const product = allProducts[line.productId];
                      const imageSrc = "fallbackImage" in product ? product.fallbackImage : "";
                      return (
                        <li key={line.productId} className="flex gap-4 border-b border-bone/10 pb-5">
                          <img
                            src={imageSrc}
                            alt={product.name}
                            className="h-24 w-20 shrink-0 rounded-lg object-cover"
                          />
                          <div className="flex flex-1 flex-col justify-between">
                            <div>
                              <p className="font-serif text-base text-bone">{product.name}</p>
                              <p className="mt-1 font-sans text-sm text-smoke">{formatPrice(product.price)}</p>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center gap-3 rounded-full border border-bone/20 px-2 py-1">
                                <button
                                  type="button"
                                  onClick={() => setQuantity(line.productId, line.quantity - 1)}
                                  aria-label={`Scade cantitatea pentru ${product.name}`}
                                  className="flex h-6 w-6 items-center justify-center text-bone"
                                >
                                  <MinusMark className="h-3 w-3" />
                                </button>
                                <span className="w-4 text-center font-sans text-sm text-bone">{line.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => setQuantity(line.productId, line.quantity + 1)}
                                  aria-label={`Crește cantitatea pentru ${product.name}`}
                                  className="flex h-6 w-6 items-center justify-center text-bone"
                                >
                                  <PlusMark className="h-3 w-3" />
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(line.productId)}
                                className="font-sans text-xs uppercase tracking-[0.1em] text-smoke transition-colors hover:text-ember"
                              >
                                Elimină
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="border-t border-bone/10 px-6 py-5">
                  {totals.amountToFreeShipping > 0 ? (
                    <p className="mb-4 font-sans text-xs text-smoke">
                      Mai adaugă {formatPrice(totals.amountToFreeShipping)} pentru livrare gratuită.
                    </p>
                  ) : (
                    <p className="mb-4 font-sans text-xs text-ember">Ai livrare gratuită la această comandă.</p>
                  )}
                  <div className="flex flex-col gap-2 font-sans text-sm text-smoke">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-bone">{formatPrice(totals.subtotal)}</span>
                    </div>
                    {totals.discountPct > 0 && (
                      <div className="flex justify-between text-ember">
                        <span>Reducere ({totals.discountPct}%)</span>
                        <span>-{formatPrice(totals.discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Livrare estimată</span>
                      <span className="text-bone">
                        {totals.shipping === 0 ? "Gratuită" : formatPrice(SHIPPING.standardCost)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-bone/10 pt-4">
                    <span className="font-serif text-lg text-bone">Total</span>
                    <span className="font-serif text-lg text-bone">{formatPrice(totals.total)}</span>
                  </div>
                  <Link to="/checkout" onClick={closeCart} className="btn-primary mt-5 w-full">
                    Finalizează comanda
                  </Link>
                  <Link to="/cos" onClick={closeCart} className="btn-ghost mt-3 block text-center">
                    Vezi coșul complet
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
