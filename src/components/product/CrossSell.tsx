import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import type { Product } from "@/types";

export function CrossSell({
  product,
  prompt,
  ctaLabel,
}: {
  product: Product;
  prompt: string;
  ctaLabel: string;
}) {
  return (
    <section className="border-t border-bone/10 py-20 sm:py-24">
      <div className="container-edit">
        <Reveal className="glass-panel flex flex-col items-center gap-6 rounded-3xl px-8 py-14 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="eyebrow">{product.tagline}</p>
            <h2 className="mt-3 font-serif text-2xl text-bone sm:text-3xl">{prompt}</h2>
          </div>
          <Link to={`/${product.slug}`} className="btn-primary shrink-0">
            {ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
