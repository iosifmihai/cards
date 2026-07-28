import { Reveal } from "@/components/ui/Reveal";
import { COMMERCIAL_BENEFITS } from "@/data/shipping";

export function CommerceBenefits() {
  return (
    <section className="border-t border-bone/10 bg-ink-burgundy py-20">
      <div className="container-edit grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {COMMERCIAL_BENEFITS.map((benefit, index) => (
          <Reveal key={benefit.mark} delay={index * 0.08}>
            <span className="font-serif text-4xl text-bone/30">{benefit.mark}</span>
            <h3 className="mt-3 font-serif text-xl text-bone">{benefit.title}</h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-smoke">{benefit.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
