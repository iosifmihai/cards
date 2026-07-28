import { LegalLayout } from "@/components/ui/LegalLayout";
import { RETURN_SECTIONS } from "@/data/legal";
import { useSEO } from "@/lib/useSEO";

export default function ReturnPolicy() {
  useSEO({
    title: "Politica de retur",
    description: "Condițiile de retur pentru produsele Naughty Cards.",
    path: "/retur",
  });

  return (
    <LegalLayout
      eyebrow="Legal"
      title="Politica de retur"
      updated="28 iulie 2026 (document pregătitor de lansare)"
      sections={RETURN_SECTIONS}
    />
  );
}
