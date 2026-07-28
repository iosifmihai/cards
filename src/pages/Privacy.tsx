import { LegalLayout } from "@/components/ui/LegalLayout";
import { PRIVACY_SECTIONS } from "@/data/legal";
import { useSEO } from "@/lib/useSEO";

export default function Privacy() {
  useSEO({
    title: "Politica de confidențialitate",
    description: "Cum colectează și folosește Naughty Cards datele tale personale.",
    path: "/confidentialitate",
  });

  return (
    <LegalLayout
      eyebrow="Legal"
      title="Politica de confidențialitate"
      updated="28 iulie 2026 (document pregătitor de lansare)"
      sections={PRIVACY_SECTIONS}
    />
  );
}
