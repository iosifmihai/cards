import { Reveal } from "@/components/ui/Reveal";
import { SOCIAL_PROOF_PLACEHOLDERS } from "@/data/content";

export function SocialProof() {
  return (
    <section className="border-t border-bone/10 py-24 sm:py-32">
      <div className="container-edit">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Social</p>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-bone sm:text-5xl">
            Nopțile obișnuite nu ajung aici.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SOCIAL_PROOF_PLACEHOLDERS.map((item) => (
            <Reveal key={item.label} className="group">
              <div className="relative flex aspect-[3/4] flex-col items-center justify-center overflow-hidden rounded-2xl border border-bone/10 bg-ink-burgundy">
                <div
                  className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(70% 60% at 50% 30%, rgba(112,0,13,0.4), transparent 70%)",
                  }}
                />
                <span className="relative font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-smoke">
                  {item.kind === "video" ? "Video" : "Foto"}
                </span>
                <span className="relative mt-2 font-serif text-lg text-bone">{item.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 font-sans text-xs text-smoke">
          Conținut demonstrativ — va fi înlocuit cu fotografii și clipuri reale ale clienților.
        </p>
      </div>
    </section>
  );
}
