import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { ConsentNotice } from "@/components/product/ConsentNotice";
import { CommerceBenefits } from "@/components/home/CommerceBenefits";
import { bundle, PRICING_NOTE } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/store/toast";
import { formatPrice } from "@/lib/format";
import { useSEO } from "@/lib/useSEO";

export default function Bundle() {
  useSEO({
    title: "The Complete Naughty Experience — Bundle Slow Burn + No Limits",
    description:
      "Ambele jocuri Naughty Cards, Slow Burn și No Limits, într-un singur pachet la preț avantajos.",
    path: "/bundle",
  });

  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const pushToast = useToastStore((s) => s.push);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addItem("bundle", quantity);
    pushToast("The Complete Naughty Experience a fost adăugat în coș.", "success");
  };

  const handleBuyNow = () => {
    addItem("bundle", quantity);
    navigate("/checkout");
  };

  return (
    <>
      <section className="pb-20 pt-32 sm:pt-40">
        <div className="container-edit grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <img src={bundle.fallbackImage} alt={bundle.name} className="w-full rounded-3xl object-cover" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Bundle</p>
            <h1 className="mt-4 font-serif text-4xl text-bone sm:text-5xl">{bundle.name}</h1>
            <p className="mt-2 font-sans text-sm font-semibold uppercase tracking-[0.1em] text-ember">
              {bundle.tagline}
            </p>
            <p className="mt-6 font-sans text-base leading-relaxed text-smoke">{bundle.description}</p>

            <div className="mt-8 flex flex-col gap-3 border-y border-bone/10 py-6">
              {bundle.contains.map((product) => (
                <Link
                  key={product.id}
                  to={`/${product.slug}`}
                  className="flex items-center justify-between font-sans text-sm text-bone transition-colors hover:text-ember"
                >
                  <span>1 × {product.name}</span>
                  <span className="text-smoke">{formatPrice(product.price)}</span>
                </Link>
              ))}
            </div>

            <div className="mt-7 flex items-end gap-4">
              <span className="font-serif text-4xl text-bone">{formatPrice(bundle.price)}</span>
              <span className="pb-1 font-sans text-base text-smoke line-through">
                {formatPrice(bundle.compareAtPrice)}
              </span>
              <span className="pb-1 font-sans text-sm font-semibold text-ember">
                Economisești {formatPrice(bundle.savings)}
              </span>
            </div>
            <p className="mt-1 font-sans text-xs text-smoke">{PRICING_NOTE}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <button type="button" onClick={handleAddToCart} className="btn-primary">
                Adaugă în coș
              </button>
            </div>
            <button type="button" onClick={handleBuyNow} className="btn-ghost mt-4">
              Cumpărare rapidă →
            </button>
          </Reveal>
        </div>
      </section>

      <CommerceBenefits />

      <section className="border-t border-bone/10 py-20">
        <div className="container-edit flex max-w-2xl flex-col gap-4">
          <Reveal>
            <ConsentNotice variant="general" />
          </Reveal>
          <Reveal delay={0.05}>
            <ConsentNotice variant="no-limits" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
