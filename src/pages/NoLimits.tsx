import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { StickyBuyBar } from "@/components/product/StickyBuyBar";
import { ProductExamples } from "@/components/product/ProductExamples";
import { ConsentNotice } from "@/components/product/ConsentNotice";
import { CrossSell } from "@/components/product/CrossSell";
import { CommerceBenefits } from "@/components/home/CommerceBenefits";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { products } from "@/data/products";
import { testimonials } from "@/data/reviews";
import { faqItems } from "@/data/faq";
import { useSEO } from "@/lib/useSEO";

const product = products["no-limits"];
const relatedFaq = faqItems.filter((f) =>
  ["intense", "diferența", "refuza", "explicit", "returna"].some((k) =>
    f.question.toLowerCase().includes(k.toLowerCase()),
  ),
);
const relatedTestimonials = testimonials.filter((t) => t.product === "no-limits" || t.product === "general");

export default function NoLimits() {
  useSEO({
    title: "Naughty Cards No Limits – Joc Adevăr sau Provocare 18+",
    description:
      "Naughty Cards No Limits — jocul de Adevăr sau Provocare 18+ pentru adulți care vor maximum de intensitate. Ambalaj premium, livrare discretă.",
    path: "/no-limits",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      offers: {
        "@type": "Offer",
        priceCurrency: "RON",
        price: product.price,
        availability: "https://schema.org/PreOrder",
      },
    },
  });

  return (
    <>
      <section className="pb-20 pt-32 sm:pt-40">
        <div className="container-edit grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <ProductGallery images={product.gallery} accent="crimson" />
          </Reveal>
          <Reveal delay={0.1}>
            <ProductInfo product={product} />
          </Reveal>
        </div>
      </section>

      <CommerceBenefits />

      <ProductExamples examples={product.examples} accent="crimson" />

      <section className="border-t border-bone/10 py-20">
        <div className="container-edit max-w-2xl">
          <Reveal className="flex flex-col gap-4">
            <ConsentNotice variant="general" />
            <ConsentNotice variant="no-limits" />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-bone/10 py-24 sm:py-32">
        <div className="container-edit">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Recenzii</p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-bone sm:text-5xl">
              Ce spun cei care au ales No Limits.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTestimonials.map((t) => (
              <div key={t.quote} className="glass-panel rounded-2xl px-7 py-8">
                <p className="font-serif text-lg leading-snug text-bone">“{t.quote}”</p>
                <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-smoke">
                  {t.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-bone/10 bg-ink-burgundy py-24 sm:py-32">
        <div className="container-edit max-w-3xl">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-bone sm:text-5xl">
              Întrebări despre No Limits.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <Accordion items={relatedFaq.length ? relatedFaq : faqItems.slice(0, 5)} />
          </Reveal>
        </div>
      </section>

      <CrossSell
        product={products["slow-burn"]}
        prompt="Preferi să construiești tensiunea?"
        ctaLabel="Descoperă Slow Burn"
      />

      <StickyBuyBar product={product} />
    </>
  );
}
