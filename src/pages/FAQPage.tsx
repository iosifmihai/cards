import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems } from "@/data/faq";
import { useSEO } from "@/lib/useSEO";

export default function FAQPage() {
  useSEO({
    title: "Întrebări frecvente",
    description: "Răspunsuri la cele mai frecvente întrebări despre Naughty Cards Slow Burn și No Limits.",
    path: "/faq",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  });

  return (
    <>
      <PageHero
        eyebrow="Ajutor"
        title="Întrebări frecvente."
        description="Tot ce trebuie să știi despre Naughty Cards, înainte să tragi prima carte."
      />
      <section className="container-edit max-w-3xl pb-24">
        <Reveal>
          <Accordion items={faqItems} />
        </Reveal>
      </section>
    </>
  );
}
