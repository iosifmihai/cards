import { Reveal } from "@/components/ui/Reveal";
import { HOW_TO_PLAY_STEPS } from "@/data/content";
import { ConsentNotice } from "@/components/product/ConsentNotice";

export function HowToPlay() {
  return (
    <section className="container-edit py-24 sm:py-32">
      <Reveal className="max-w-xl">
        <p className="eyebrow">Regulile jocului</p>
        <h2 className="mt-5 font-serif text-3xl leading-tight text-bone sm:text-5xl">
          Trei pași. Nicio conversație obișnuită.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
        {HOW_TO_PLAY_STEPS.map((step, index) => (
          <Reveal key={step.mark} delay={index * 0.1}>
            <span className="font-serif text-6xl text-bone/20">{step.mark}</span>
            <h3 className="mt-4 font-serif text-2xl text-bone">{step.title}</h3>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-smoke">{step.text}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-14">
        <ConsentNotice variant="general" />
      </Reveal>
    </section>
  );
}
