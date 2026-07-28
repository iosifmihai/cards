import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type { CardExample } from "@/types";

export function ProductExamples({
  examples,
  accent,
}: {
  examples: CardExample[];
  accent: "burgundy" | "crimson";
}) {
  return (
    <section className="border-t border-bone/10 py-24 sm:py-32">
      <div className="container-edit">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Exemple de cărți</p>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-bone sm:text-5xl">
            O privire înainte să tragi prima carte.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((example, index) => (
            <Reveal key={example.text} delay={index * 0.08}>
              <FlipCard example={example} accent={accent} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 font-serif text-lg italic text-smoke">Restul rămâne între voi și pachet.</p>
        </Reveal>
      </div>
    </section>
  );
}

function FlipCard({ example, accent }: { example: CardExample; accent: "burgundy" | "crimson" }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      className="relative h-64 w-full cursor-pointer text-left [perspective:1200px]"
      aria-label="Întoarce cartea"
    >
      <div
        className="relative h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div
          className={`glass-panel-strong absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-t-2 px-6 text-center [backface-visibility:hidden] ${
            accent === "burgundy" ? "border-t-burgundy" : "border-t-crimson-strong"
          }`}
        >
          <span className="font-serif text-3xl text-bone">{example.type}</span>
          <span className="mt-4 font-sans text-[10px] uppercase tracking-[0.14em] text-smoke">
            Atinge pentru a întoarce
          </span>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl border border-bone/15 bg-ink px-6 text-center [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="font-serif text-lg leading-snug text-bone">{example.text}</p>
        </div>
      </div>
    </button>
  );
}
