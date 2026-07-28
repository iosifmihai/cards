import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/data/products";
import { ArrowMark } from "@/components/ui/Monogram";

export function PackageChoice() {
  return (
    <section id="pachete" className="container-edit scroll-mt-24 py-24 sm:py-32">
      <Reveal className="max-w-xl">
        <p className="eyebrow">Alege experiența</p>
        <h2 className="mt-5 font-serif text-3xl leading-tight text-bone sm:text-5xl">
          Cum vrei să înceapă seara?
        </h2>
        <p className="mt-5 font-sans text-base leading-relaxed text-smoke">
          Două pachete. Două niveluri de tensiune. Alegerea îți aparține.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <PackageCard
          slug="slow-burn"
          title={products["slow-burn"].shortName}
          subtitle={products["slow-burn"].tagline}
          description={products["slow-burn"].description}
          indicator={products["slow-burn"].intensityLabel}
          suitedFor={products["slow-burn"].suitedFor}
          image={products["slow-burn"].fallbackImage}
          accent="burgundy"
        />
        <PackageCard
          slug="no-limits"
          title={products["no-limits"].shortName}
          subtitle={products["no-limits"].tagline}
          description={products["no-limits"].description}
          indicator={products["no-limits"].intensityLabel}
          suitedFor={products["no-limits"].suitedFor}
          image={products["no-limits"].fallbackImage}
          accent="crimson"
          badge={products["no-limits"].badge}
        />
      </div>
    </section>
  );
}

function PackageCard({
  slug,
  title,
  subtitle,
  description,
  indicator,
  suitedFor,
  image,
  accent,
  badge,
}: {
  slug: "slow-burn" | "no-limits";
  title: string;
  subtitle: string;
  description: string;
  indicator: string;
  suitedFor: string[];
  image: string;
  accent: "burgundy" | "crimson";
  badge?: string;
}) {
  const glow =
    accent === "burgundy"
      ? "radial-gradient(70% 60% at 30% 20%, rgba(112,0,13,0.5), transparent 70%)"
      : "radial-gradient(70% 60% at 70% 20%, rgba(183,0,24,0.55), transparent 70%)";

  return (
    <Reveal className="group relative overflow-hidden rounded-3xl border border-bone/10 bg-ink-burgundy">
      <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: glow }} />
      <div className="relative flex flex-col p-8 sm:p-10">
        {badge && (
          <span className="mb-4 inline-flex w-fit rounded-full border border-bone/25 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-smoke">
            {badge}
          </span>
        )}
        <div className="grid gap-8 sm:grid-cols-[1fr_1.1fr] sm:items-center">
          <img
            src={image}
            alt={`Naughty Cards ${title}`}
            className="aspect-[4/5] w-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div>
            <h3 className="font-serif text-3xl text-bone sm:text-4xl">{title}</h3>
            <p className="mt-2 font-sans text-sm font-semibold uppercase tracking-[0.1em] text-ember">
              {subtitle}
            </p>
            <p className="mt-5 font-sans text-[15px] leading-relaxed text-smoke">{description}</p>
            <p className="mt-5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-smoke">
              {indicator}
            </p>
            <ul className="mt-4 flex flex-col gap-1.5">
              {suitedFor.slice(0, 3).map((item) => (
                <li key={item} className="font-sans text-sm text-smoke">
                  — {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link to={`/${slug}`} className="btn-primary">
                Descoperă {title}
              </Link>
              <Link
                to={`/${slug}`}
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.1em] text-bone transition-colors hover:text-ember"
              >
                Alege {title}
                <ArrowMark className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
