import { ProductShowcase } from "./ProductShowcase";
import { products } from "@/data/products";

export function NoLimitsShowcase() {
  return (
    <ProductShowcase
      product={products["no-limits"]}
      eyebrow="No Limits — Break the limits"
      headline="Când flirtul nu mai este suficient."
      body="No Limits elimină întrebările sigure. Este creat pentru adulții care se cunosc, au încredere unul în celălalt și vor un joc mult mai intens."
      reverse
    />
  );
}
