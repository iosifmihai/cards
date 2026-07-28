import { Link } from "react-router-dom";
import { PRODUCT_FALLBACKS } from "@/data/products";

export function HeroFallback() {
  return (
    <section className="relative overflow-hidden pb-20 pt-40 sm:pt-48">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 25% 30%, rgba(112,0,13,0.35), transparent 70%), radial-gradient(45% 40% at 78% 55%, rgba(255,22,61,0.22), transparent 70%)",
        }}
      />
      <div className="container-edit relative flex flex-col items-center text-center">
        <p className="eyebrow">Naughty Cards</p>
        <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.05] text-bone sm:text-6xl">
          Jocul începe nevinovat.
        </h1>
        <p className="mt-4 font-serif text-xl text-smoke sm:text-2xl">Tu alegi cât de departe merge.</p>
        <p className="mx-auto mt-6 max-w-xl font-sans text-[15px] leading-relaxed text-smoke">
          Două pachete. Două niveluri de tensiune. Un singur adevăr: următoarea carte poate schimba întreaga
          seară.
        </p>

        <div className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-4 sm:gap-8">
          <img
            src={PRODUCT_FALLBACKS.slowBurn}
            alt="Naughty Cards Slow Burn"
            className="aspect-[4/5] w-full rounded-2xl object-cover"
            loading="eager"
          />
          <img
            src={PRODUCT_FALLBACKS.noLimits}
            alt="Naughty Cards No Limits"
            className="aspect-[4/5] w-full rounded-2xl object-cover"
            loading="eager"
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/slow-burn" className="btn-primary">
            Descoperă Slow Burn
          </Link>
          <Link to="/no-limits" className="btn-secondary">
            Descoperă No Limits
          </Link>
        </div>
        <Link to="/#comparator" className="btn-ghost mt-5">
          Vezi diferențele
        </Link>
        <p className="mt-8 font-sans text-xs uppercase tracking-[0.14em] text-smoke">
          Exclusiv 18+ · Ambalaj discret · Plată securizată
        </p>
      </div>
    </section>
  );
}
