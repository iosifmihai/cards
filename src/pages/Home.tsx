import { Suspense, lazy } from "react";
import { BrandIntro } from "@/components/home/BrandIntro";
import { PackageChoice } from "@/components/home/PackageChoice";
import { SlowBurnShowcase } from "@/components/home/SlowBurnShowcase";
import { NoLimitsShowcase } from "@/components/home/NoLimitsShowcase";
import { Comparator } from "@/components/home/Comparator";
import { HowToPlay } from "@/components/home/HowToPlay";
import { CardExamples } from "@/components/home/CardExamples";
import { BundleSection } from "@/components/home/BundleSection";
import { CommerceBenefits } from "@/components/home/CommerceBenefits";
import { Testimonials } from "@/components/home/Testimonials";
import { SocialProof } from "@/components/home/SocialProof";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Newsletter } from "@/components/home/Newsletter";
import { useSEO } from "@/lib/useSEO";
import { faqItems } from "@/data/faq";
import { HeroFallback } from "@/components/hero/HeroFallback";

const Hero3D = lazy(() => import("@/components/hero/Hero3D").then((m) => ({ default: m.Hero3D })));

export default function Home() {
  useSEO({
    title: "Naughty Cards – Jocuri Adevăr sau Provocare pentru adulți",
    description:
      "Descoperă Naughty Cards Slow Burn și No Limits, două jocuri de Adevăr sau Provocare 18+ pentru cupluri, întâlniri și petreceri private. Ambalaj premium și livrare discretă.",
    path: "/",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.slice(0, 6).map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  });

  return (
    <>
      <Suspense fallback={<HeroFallback />}>
        <Hero3D />
      </Suspense>
      <BrandIntro />
      <PackageChoice />
      <SlowBurnShowcase />
      <NoLimitsShowcase />
      <Comparator />
      <HowToPlay />
      <CardExamples />
      <BundleSection />
      <CommerceBenefits />
      <Testimonials />
      <SocialProof />
      <FAQSection />
      <FinalCTA />
      <Newsletter />
    </>
  );
}
