import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { COMPARISON_ROWS } from "@/data/content";

export function Comparator() {
  const [mobileTab, setMobileTab] = useState<"slowBurn" | "noLimits">("slowBurn");

  return (
    <section id="comparator" className="scroll-mt-24 border-t border-bone/10 bg-ink-burgundy py-24 sm:py-32">
      <div className="container-edit">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Comparație</p>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-bone sm:text-5xl">
            Aceeași seară. Un nivel complet diferit.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-6 flex gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => setMobileTab("slowBurn")}
            className={`flex-1 rounded-full border px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
              mobileTab === "slowBurn" ? "border-ember text-ember" : "border-bone/20 text-smoke"
            }`}
          >
            Slow Burn
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("noLimits")}
            className={`flex-1 rounded-full border px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
              mobileTab === "noLimits" ? "border-ember text-ember" : "border-bone/20 text-smoke"
            }`}
          >
            No Limits
          </button>
        </Reveal>

        <Reveal delay={0.15} className="glass-panel mt-8 overflow-hidden rounded-3xl">
          <div className="hidden grid-cols-[1fr_1.2fr_1.2fr] sm:grid">
            <div className="px-6 py-5" />
            <div className="border-l border-bone/10 px-6 py-5">
              <p className="font-serif text-lg text-bone">Slow Burn</p>
              <p className="font-sans text-xs uppercase tracking-[0.1em] text-smoke">Build the tension</p>
            </div>
            <div className="border-l border-bone/10 px-6 py-5">
              <p className="font-serif text-lg text-bone">No Limits</p>
              <p className="font-sans text-xs uppercase tracking-[0.1em] text-ember">Break the limits</p>
            </div>
          </div>

          {COMPARISON_ROWS.map((row) => (
            <div key={row.feature} className="border-t border-bone/10">
              <div className="hidden grid-cols-[1fr_1.2fr_1.2fr] sm:grid">
                <div className="px-6 py-5 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-smoke">
                  {row.feature}
                </div>
                <div className="border-l border-bone/10 px-6 py-5 font-sans text-sm text-bone">
                  {row.slowBurn}
                </div>
                <div className="border-l border-bone/10 px-6 py-5 font-sans text-sm text-bone">
                  {row.noLimits}
                </div>
              </div>
              <div className="px-6 py-5 sm:hidden">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-smoke">
                  {row.feature}
                </p>
                <p className="mt-1.5 font-sans text-sm text-bone">
                  {mobileTab === "slowBurn" ? row.slowBurn : row.noLimits}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
