import { ProductShowcase } from "./ProductShowcase";
import { products } from "@/data/products";

export function SlowBurnShowcase() {
  return (
    <ProductShowcase
      product={products["slow-burn"]}
      eyebrow="Slow Burn — Build the tension"
      headline="Unele seri nu trebuie grăbite."
      body="Slow Burn începe cu întrebări personale și provocări flirtante. Cu fiecare carte, conversația devine mai sinceră, distanța mai mică, iar tensiunea mai greu de ignorat."
    />
  );
}
