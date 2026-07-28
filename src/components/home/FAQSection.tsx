import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems } from "@/data/faq";

export function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-bone/10 bg-ink-burgundy py-24 sm:py-32">
      <div className="container-edit max-w-3xl">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-bone sm:text-5xl">
            Întrebări frecvente.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <Accordion items={faqItems.slice(0, 6)} />
        </Reveal>

        <Reveal delay={0.15}>
          <Link to="/faq" className="btn-secondary mt-10 inline-flex">
            Vezi toate întrebările
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
