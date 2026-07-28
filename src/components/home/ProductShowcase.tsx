import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import type { Product } from "@/types";

interface ProductShowcaseProps {
  product: Product;
  eyebrow: string;
  headline: string;
  body: string;
  reverse?: boolean;
}

export function ProductShowcase({ product, eyebrow, headline, body, reverse }: ProductShowcaseProps) {
  return (
    <section className="border-t border-bone/10 py-24 sm:py-32">
      <div className="container-edit grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <div className="grid grid-cols-2 gap-4">
            {product.gallery.slice(0, 2).map((img) => (
              <img
                key={img.label}
                src={img.src}
                alt={img.alt}
                className="aspect-[3/4] w-full rounded-2xl object-cover first:translate-y-6"
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className={reverse ? "lg:order-1" : ""}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-bone sm:text-5xl">{headline}</h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-smoke">{body}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {product.tone.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-bone/15 px-3 py-1 font-sans text-[11px] uppercase tracking-[0.1em] text-smoke"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-bone/10 pt-6">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-smoke">
              Pentru cine este
            </p>
            <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {product.suitedFor.map((item) => (
                <li key={item} className="font-sans text-sm text-smoke">
                  — {item}
                </li>
              ))}
            </ul>
          </div>

          <Link to={`/${product.slug}`} className="btn-primary mt-9 inline-flex">
            Descoperă {product.shortName}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
