import { LegalLayout } from "@/components/ui/LegalLayout";
import { COOKIES_SECTIONS } from "@/data/legal";
import { useSEO } from "@/lib/useSEO";

export default function Cookies() {
  useSEO({
    title: "Politica cookies",
    description: "Ce cookie-uri folosește website-ul Naughty Cards și cum le poți controla.",
    path: "/cookies",
  });

  return (
    <LegalLayout
      eyebrow="Legal"
      title="Politica cookies"
      updated="28 iulie 2026 (document pregătitor de lansare)"
      sections={COOKIES_SECTIONS}
    />
  );
}
