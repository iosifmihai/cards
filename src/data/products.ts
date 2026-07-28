import type { Product, ProductId } from "@/types";

/**
 * Prices are placeholder launch pricing (demo commerce), clearly marked
 * as provisional in the UI via PRICING_NOTE — swap in real pricing later.
 */
export const PRICING_NOTE =
  "Preț provizoriu de lansare. Va fi confirmat înaintea deschiderii oficiale a magazinului.";

export const PRODUCT_MODELS: Record<"slowBurn" | "noLimits", string> = {
  slowBurn: "/models/naughty-cards-slow-burn.glb",
  noLimits: "/models/naughty-cards-no-limits.glb",
};

export const PRODUCT_FALLBACKS: Record<"slowBurn" | "noLimits", string> = {
  slowBurn: "/images/slow-burn-fallback.svg",
  noLimits: "/images/no-limits-fallback.svg",
};

export const products: Record<Exclude<ProductId, "bundle">, Product> = {
  "slow-burn": {
    id: "slow-burn",
    slug: "slow-burn",
    name: "Naughty Cards — Slow Burn",
    shortName: "Slow Burn",
    tagline: "Build the tension.",
    positioning: "Tensiunea nu apare dintr-odată. Se construiește.",
    description:
      "Întrebări și provocări care încep subtil și cresc treptat în intensitate. Creat pentru flirt, apropiere și seri în care anticiparea contează la fel de mult ca răspunsul.",
    longDescription:
      "Slow Burn începe cu întrebări personale și provocări flirtante. Cu fiecare carte, conversația devine mai sinceră, distanța mai mică, iar tensiunea mai greu de ignorat.",
    intensity: "Progresivă",
    intensityLevel: 2,
    intensityLabel: "Intensitate progresivă",
    price: 219,
    suitedFor: [
      "Cupluri",
      "Persoane aflate la primele întâlniri",
      "Seri romantice",
      "Parteneri care vor să se cunoască mai bine",
      "Petreceri private",
      "Jucători care preferă anticiparea",
    ],
    tone: ["Senzual", "Intim", "Elegant", "Jucăuș", "Misterios", "Seducător"],
    cardCount: "[NUMĂR CĂRȚI]",
    playerCount: "[NUMĂR JUCĂTORI]",
    language: "Limba română",
    dimensions: "[DIMENSIUNE]",
    materials: "Carton rigid soft-touch, emboss fin, interior burgundy, cărți laminate",
    model: PRODUCT_MODELS.slowBurn,
    fallbackImage: PRODUCT_FALLBACKS.slowBurn,
    gallery: [
      { src: "/images/slow-burn-fallback.svg", alt: "Naughty Cards Slow Burn — cutie închisă, vedere frontală", label: "Vedere frontală" },
      { src: "/images/slow-burn-open.svg", alt: "Naughty Cards Slow Burn — pachet deschis cu cărți", label: "Pachet deschis" },
      { src: "/images/slow-burn-detail.svg", alt: "Naughty Cards Slow Burn — detaliu emboss și material soft-touch", label: "Detaliu emboss" },
      { src: "/images/slow-burn-fallback.svg", alt: "Naughty Cards Slow Burn — muchii și finisaj lateral", label: "Finisaj lateral" },
      { src: "/images/slow-burn-open.svg", alt: "Naughty Cards Slow Burn — interior burgundy și tavă", label: "Interior burgundy" },
    ],
    examples: [
      { type: "Adevăr", text: "Care este primul lucru pe care l-ai observat la persoana din fața ta?" },
      { type: "Provocare", text: "Privește persoana aleasă în ochi timp de 30 de secunde fără să vorbești." },
      { type: "Adevăr", text: "Care este o întrebare pe care ai vrut mereu să o pui, dar nu ai avut curaj?" },
    ],
    accentClass: "burgundy",
  },
  "no-limits": {
    id: "no-limits",
    slug: "no-limits",
    name: "Naughty Cards — No Limits",
    shortName: "No Limits",
    tagline: "Break the limits.",
    positioning: "Fără scuze. Fără inhibiții. Fără răspunsuri ușoare.",
    description:
      "Întrebări intime și provocări intense, create pentru adulții care vor să ducă jocul mult mai departe. Fără conversații sigure și fără răspunsuri ușoare.",
    longDescription:
      "No Limits elimină întrebările sigure. Este creat pentru adulții care se cunosc, au încredere unul în celălalt și vor un joc mult mai intens.",
    intensity: "Ridicată",
    intensityLevel: 4,
    intensityLabel: "Intensitate ridicată",
    price: 249,
    suitedFor: [
      "Cupluri foarte deschise",
      "Parteneri care se cunosc bine",
      "Adulți confortabili cu întrebări foarte intime",
      "Petreceri private între adulți",
      "Persoane care vor un nivel mult mai ridicat de intensitate",
    ],
    tone: ["Intens", "Direct", "Întunecat", "Erotic", "Dominant", "Exclusivist"],
    cardCount: "[NUMĂR CĂRȚI]",
    playerCount: "[NUMĂR JUCĂTORI]",
    language: "Limba română",
    dimensions: "[DIMENSIUNE]",
    materials: "Carton rigid, hot foil roșu, interior crimson, detalii glossy selective, cărți laminate",
    model: PRODUCT_MODELS.noLimits,
    fallbackImage: PRODUCT_FALLBACKS.noLimits,
    gallery: [
      { src: "/images/no-limits-fallback.svg", alt: "Naughty Cards No Limits — cutie închisă, vedere frontală", label: "Vedere frontală" },
      { src: "/images/no-limits-open.svg", alt: "Naughty Cards No Limits — pachet deschis cu cărți", label: "Pachet deschis" },
      { src: "/images/no-limits-detail.svg", alt: "Naughty Cards No Limits — detaliu hot foil și glossy", label: "Detaliu hot foil" },
      { src: "/images/no-limits-fallback.svg", alt: "Naughty Cards No Limits — muchii și finisaj lateral", label: "Finisaj lateral" },
      { src: "/images/no-limits-open.svg", alt: "Naughty Cards No Limits — interior crimson și tavă", label: "Interior crimson" },
    ],
    examples: [
      { type: "Adevăr", text: "Care este un lucru pe care nu ai avut niciodată curajul să îl recunoști?" },
      { type: "Provocare", text: "Lasă persoana aleasă să decidă următoarea întrebare la care trebuie să răspunzi sincer." },
    ],
    accentClass: "crimson",
    badge: "Not for everyone",
  },
};

export const bundle = {
  id: "bundle" as ProductId,
  slug: "bundle",
  name: "The Complete Naughty Experience",
  tagline: "Începe încet. Termină fără limite.",
  description:
    "Două experiențe create pentru seri diferite sau pentru o singură seară care merge mult mai departe decât era planificat.",
  contains: [products["slow-burn"], products["no-limits"]],
  price: 399,
  compareAtPrice: 468,
  savings: 69,
  fallbackImage: "/images/bundle-fallback.svg",
};

export const allProducts = { ...products, bundle };

export function getProductById(id: ProductId): Product | typeof bundle {
  if (id === "bundle") return bundle;
  return products[id];
}
