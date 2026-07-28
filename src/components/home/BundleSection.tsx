import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { bundle } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { PRICING_NOTE } from "@/data/products";

export function BundleSection() {
  return (
    <section className="relative overflow-hidden border-t border-bone/10 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 30% 30%, rgba(112,0,13,0.35), transparent 70%), radial-gradient(50% 45% at 75% 60%, rgba(183,0,24,0.3), transparent 70%)",
        }}
      />
      <div className="container-edit relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <img
            src={bundle.fallbackImage}
            alt={bundle.name}
            className="w-full rounded-3xl object-cover"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">Bundle</p>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-bone sm:text-5xl">{bundle.name}</h2>
          <p className="mt-3 font-sans text-sm font-semibold uppercase tracking-[0.1em] text-ember">
            {bundle.tagline}
          </p>
          <p className="mt-6 font-sans text-base leading-relaxed text-smoke">{bundle.description}</p>

          <ul className="mt-6 flex flex-col gap-1.5">
            <li className="font-sans text-sm text-smoke">— 1 × Naughty Cards — Slow Burn</li>
            <li className="font-sans text-sm text-smoke">— 1 × Naughty Cards — No Limits</li>
          </ul>

          <div className="mt-8 flex items-end gap-4">
            <span className="font-serif text-4xl text-bone">{formatPrice(bundle.price)}</span>
            <span className="pb-1 font-sans text-base text-smoke line-through">
              {formatPrice(bundle.compareAtPrice)}
            </span>
            <span className="pb-1 font-sans text-sm font-semibold text-ember">
              Economisești {formatPrice(bundle.savings)}
            </span>
          </div>
          <p className="mt-2 font-sans text-xs text-smoke">{PRICING_NOTE}</p>

          <Link to="/bundle" className="btn-primary mt-8 inline-flex">
            Alege experiența completă
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
