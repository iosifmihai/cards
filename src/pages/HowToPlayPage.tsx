import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { HOW_TO_PLAY_STEPS } from "@/data/content";
import { ConsentNotice } from "@/components/product/ConsentNotice";
import { Link } from "react-router-dom";
import { useSEO } from "@/lib/useSEO";

export default function HowToPlayPage() {
  useSEO({
    title: "Cum se joacă Naughty Cards",
    description: "Trei pași simpli pentru a juca Naughty Cards Slow Burn sau No Limits.",
    path: "/cum-se-joaca",
  });

  return (
    <>
      <PageHero
        eyebrow="Regulile jocului"
        title="Trei pași. Nicio conversație obișnuită."
        description="Naughty Cards se joacă simplu — dificultatea nu stă în reguli, ci în răspunsuri."
      />

      <section className="container-edit pb-24">
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
          {HOW_TO_PLAY_STEPS.map((step, index) => (
            <Reveal key={step.mark} delay={index * 0.1}>
              <span className="font-serif text-6xl text-bone/20">{step.mark}</span>
              <h2 className="mt-4 font-serif text-2xl text-bone">{step.title}</h2>
              <p className="mt-3 font-sans text-[15px] leading-relaxed text-smoke">{step.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-16 flex flex-col gap-4">
          <ConsentNotice variant="general" />
          <ConsentNotice variant="no-limits" />
        </Reveal>

        <Reveal delay={0.4} className="mt-16 flex flex-wrap gap-4">
          <Link to="/slow-burn" className="btn-secondary">
            Descoperă Slow Burn
          </Link>
          <Link to="/no-limits" className="btn-secondary">
            Descoperă No Limits
          </Link>
        </Reveal>
      </section>
    </>
  );
}
