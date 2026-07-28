import { LegalLayout } from "@/components/ui/LegalLayout";
import { SHIPPING_SECTIONS } from "@/data/legal";
import { useSEO } from "@/lib/useSEO";

export default function ShippingPolicy() {
  useSEO({
    title: "Politica de livrare",
    description: "Zone, termene și costuri de livrare pentru comenzile Naughty Cards.",
    path: "/livrare",
  });

  return (
    <LegalLayout
      eyebrow="Legal"
      title="Politica de livrare"
      updated="28 iulie 2026 (document pregătitor de lansare)"
      sections={SHIPPING_SECTIONS}
    />
  );
}
