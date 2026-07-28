import { useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { CardMark, CloseMark } from "@/components/ui/Monogram";
import { useCartStore, computeCartTotals } from "@/store/cart";
import { allProducts } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { SHIPPING } from "@/data/shipping";
import { useSEO } from "@/lib/useSEO";

export default function Cart() {
  useSEO({ title: "Coșul tău", description: "Coșul de cumpărături Naughty Cards.", path: "/cos" });

  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const promoCode = useCartStore((s) => s.promoCode);
  const promoError = useCartStore((s) => s.promoError);
  const applyPromo = useCartStore((s) => s.applyPromo);
  const clearPromo = useCartStore((s) => s.clearPromo);

  const [promoInput, setPromoInput] = useState("");
  const totals = computeCartTotals(lines, promoCode);

  if (lines.length === 0) {
    return (
      <>
        <PageHero eyebrow="Coș" title="Coșul tău așteaptă prima carte." />
        <section className="container-edit flex flex-col items-center gap-6 pb-32 text-center">
          <CardMark className="h-10 w-10 text-smoke" />
          <Link to="/#pachete" className="btn-primary">
            Descoperă jocurile
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Coș" title="Coșul tău." />
      <section className="container-edit grid gap-14 pb-28 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <Reveal>
          <ul className="flex flex-col gap-6" aria-live="polite">
            {lines.map((line) => {
              const product = allProducts[line.productId];
              const imageSrc = "fallbackImage" in product ? product.fallbackImage : "";
              return (
                <li key={line.productId} className="flex gap-5 border-b border-bone/10 pb-6">
                  <img src={imageSrc} alt={product.name} className="h-32 w-24 shrink-0 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-serif text-lg text-bone">{product.name}</p>
                        <p className="mt-1 font-sans text-sm text-smoke">{formatPrice(product.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.productId)}
                        aria-label={`Elimină ${product.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-bone/15 text-smoke transition-colors hover:text-ember"
                      >
                        <CloseMark className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <QuantitySelector
                        value={line.quantity}
                        onChange={(q) => setQuantity(line.productId, q)}
                      />
                      <p className="font-serif text-lg text-bone">
                        {formatPrice(product.price * line.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-panel rounded-3xl px-7 py-8">
            <h2 className="font-serif text-2xl text-bone">Rezumat</h2>

            <div className="mt-6 flex flex-col gap-2">
              <label htmlFor="promo" className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-smoke">
                Cod promoțional
              </label>
              <div className="flex gap-2">
                <input
                  id="promo"
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="NAUGHTY10"
                  className="field-input flex-1"
                />
                <button
                  type="button"
                  onClick={() => applyPromo(promoInput)}
                  className="btn-secondary shrink-0 px-5 py-2.5 text-xs"
                >
                  Aplică
                </button>
              </div>
              {promoError && (
                <p className="font-sans text-xs text-ember" role="alert">
                  {promoError}
                </p>
              )}
              {promoCode && (
                <div className="flex items-center justify-between font-sans text-xs text-ember">
                  <span>Cod aplicat: {promoCode}</span>
                  <button type="button" onClick={clearPromo} className="underline">
                    Elimină
                  </button>
                </div>
              )}
            </div>

            {totals.amountToFreeShipping > 0 ? (
              <p className="mt-6 font-sans text-xs text-smoke">
                Mai adaugă {formatPrice(totals.amountToFreeShipping)} pentru livrare gratuită.
              </p>
            ) : (
              <p className="mt-6 font-sans text-xs text-ember">Ai livrare gratuită la această comandă.</p>
            )}

            <div className="mt-4 flex flex-col gap-2 border-t border-bone/10 pt-5 font-sans text-sm text-smoke">
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

            <div className="mt-5 flex items-center justify-between border-t border-bone/10 pt-5">
              <span className="font-serif text-xl text-bone">Total</span>
              <span className="font-serif text-xl text-bone">{formatPrice(totals.total)}</span>
            </div>

            <Link to="/checkout" className="btn-primary mt-6 w-full">
              Finalizează comanda
            </Link>
            <Link to="/#pachete" className="btn-ghost mt-4 block text-center">
              Continuă cumpărăturile
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
