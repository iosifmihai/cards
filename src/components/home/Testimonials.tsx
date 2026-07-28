import { Reveal } from "@/components/ui/Reveal";
import { testimonials, TESTIMONIALS_DISCLAIMER } from "@/data/reviews";

export function Testimonials() {
  return (
    <section id="recenzii" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-edit">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Recenzii</p>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-bone sm:text-5xl">
            Ce spun cei care au tras deja o carte.
          </h2>
          <p className="mt-3 font-sans text-xs text-smoke">{TESTIMONIALS_DISCLAIMER}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.quote} delay={(index % 3) * 0.08}>
              <div className="glass-panel flex h-full flex-col justify-between rounded-2xl px-7 py-8">
                <p className="font-serif text-lg leading-snug text-bone">“{testimonial.quote}”</p>
                <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-smoke">
                  {testimonial.author}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
