import { useEffect, useState } from "react";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/store/toast";
import { formatPrice } from "@/lib/format";

export function StickyBuyBar({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const pushToast = useToastStore((s) => s.push);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="glass-panel-strong fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 px-5 py-4 sm:hidden">
      <div>
        <p className="font-serif text-base text-bone">{product.shortName}</p>
        <p className="font-sans text-sm text-smoke">{formatPrice(product.price)}</p>
      </div>
      <button
        type="button"
        onClick={() => {
          addItem(product.id, 1);
          pushToast(`${product.name} a fost adăugat în coș.`, "success");
        }}
        className="btn-primary shrink-0"
      >
        Adaugă în coș
      </button>
    </div>
  );
}
