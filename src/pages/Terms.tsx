import { LegalLayout } from "@/components/ui/LegalLayout";
import { TERMS_SECTIONS } from "@/data/legal";
import { useSEO } from "@/lib/useSEO";

export default function Terms() {
  useSEO({
    title: "Termeni și condiții",
    description: "Termenii și condițiile de utilizare a website-ului și magazinului Naughty Cards.",
    path: "/termeni-si-conditii",
  });

  return (
    <LegalLayout
      eyebrow="Legal"
      title="Termeni și condiții"
      updated="28 iulie 2026 (document pregătitor de lansare)"
      sections={TERMS_SECTIONS}
    />
  );
}
