import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/store/toast";
import { formatPrice } from "@/lib/format";
import { PRICING_NOTE } from "@/data/products";

export function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const pushToast = useToastStore((s) => s.push);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    pushToast(`${product.name} a fost adăugat în coș.`, "success");
  };

  const handleBuyNow = () => {
    addItem(product.id, quantity);
    navigate("/checkout");
  };

  return (
    <div>
      <p className="eyebrow">{product.positioning}</p>
      <h1 className="mt-4 font-serif text-4xl text-bone sm:text-5xl">{product.name}</h1>
      <p className="mt-2 font-sans text-sm font-semibold uppercase tracking-[0.1em] text-ember">
        {product.tagline}
      </p>
      <p className="mt-6 font-sans text-base leading-relaxed text-smoke">{product.longDescription}</p>

      <div className="mt-7 flex items-center gap-3">
        <IntensityMeter level={product.intensityLevel} accent={product.accentClass as "burgundy" | "crimson"} />
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-smoke">
          {product.intensityLabel}
        </span>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-bone/10 py-6">
        <Spec label="Cărți" value={`${product.cardCount} cărți`} />
        <Spec label="Jucători" value={`${product.playerCount} jucători`} />
        <Spec label="Limbă" value={product.language} />
        <Spec label="Dimensiune" value={product.dimensions} />
        <Spec label="Materiale" value={product.materials} full />
      </dl>

      <div className="mt-8 flex items-baseline gap-3">
        <span className="font-serif text-4xl text-bone">{formatPrice(product.price)}</span>
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

      <div className="mt-8 border-t border-bone/10 pt-6">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-smoke">Potrivit pentru</p>
        <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {product.suitedFor.map((item) => (
            <li key={item} className="font-sans text-sm text-smoke">
              — {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Spec({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "col-span-2" : undefined}>
      <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-smoke">{label}</dt>
      <dd className="mt-1 font-sans text-sm text-bone">{value}</dd>
    </div>
  );
}

function IntensityMeter({ level, accent }: { level: number; accent: "burgundy" | "crimson" }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Nivel de intensitate ${level} din 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-6 rounded-full ${
            i < level ? (accent === "burgundy" ? "bg-burgundy" : "bg-crimson-strong") : "bg-bone/15"
          }`}
        />
      ))}
    </div>
  );
}
