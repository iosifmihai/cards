import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ChevronMark } from "@/components/ui/Monogram";
import { products } from "@/data/products";
import type { CardExample } from "@/types";

interface ExampleEntry extends CardExample {
  product: "Slow Burn" | "No Limits";
  accent: "burgundy" | "crimson";
}

const entries: ExampleEntry[] = [
  ...products["slow-burn"].examples.map((e) => ({ ...e, product: "Slow Burn" as const, accent: "burgundy" as const })),
  ...products["no-limits"].examples.map((e) => ({ ...e, product: "No Limits" as const, accent: "crimson" as const })),
];

export function CardExamples() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const current = entries[index];

  const go = (delta: number) => {
    setIndex((i) => (i + delta + entries.length) % entries.length);
  };

  const toggleFlip = (i: number) => setFlipped((f) => ({ ...f, [i]: !f[i] }));

  return (
    <section className="border-t border-bone/10 py-24 sm:py-32">
      <div className="container-edit">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Exemple de cărți</p>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-bone sm:text-5xl">
            O privire înainte să tragi prima carte.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 flex flex-col items-center">
          <div className="[perspective:1400px]">
            <button
              type="button"
              onClick={() => toggleFlip(index)}
              className="relative h-80 w-64 cursor-pointer text-left sm:h-96 sm:w-80"
              aria-label="Întoarce cartea"
            >
              <div
                className="relative h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d]"
                style={{ transform: flipped[index] ? "rotateY(180deg)" : "rotateY(0deg)" }}
              >
                {/* front */}
                <div
                  className={`glass-panel-strong absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-t-2 px-8 text-center [backface-visibility:hidden] ${
                    current.accent === "burgundy" ? "border-t-burgundy" : "border-t-crimson-strong"
                  }`}
                >
                  <span className="font-serif text-5xl text-bone">{current.type}</span>
                  <span className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
                    {current.product}
                  </span>
                  <span className="mt-8 font-sans text-[11px] uppercase tracking-[0.14em] text-smoke">
                    Atinge pentru a întoarce
                  </span>
                </div>
                {/* back */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-bone/15 bg-ink px-8 text-center [backface-visibility:hidden]"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <p className="font-serif text-xl leading-snug text-bone sm:text-2xl">{current.text}</p>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Cartea anterioară"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone transition-colors hover:border-bone/50"
            >
              <ChevronMark direction="left" className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {entries.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === index ? "bg-ember" : "bg-bone/20"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Cartea următoare"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone transition-colors hover:border-bone/50"
            >
              <ChevronMark direction="right" className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-10 font-serif text-lg italic text-smoke">Restul rămâne între voi și pachet.</p>
        </Reveal>
      </div>
    </section>
  );
}
