export type ProductId = "slow-burn" | "no-limits" | "bundle";

export interface ProductGalleryImage {
  src: string;
  alt: string;
  label: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface CardExample {
  type: "Adevăr" | "Provocare";
  text: string;
}

export interface Product {
  id: ProductId;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  positioning: string;
  description: string;
  longDescription: string;
  intensity: string;
  intensityLevel: number; // 1-5 visual scale
  intensityLabel: string;
  price: number;
  compareAtPrice?: number;
  suitedFor: string[];
  tone: string[];
  cardCount: string;
  playerCount: string;
  language: string;
  dimensions: string;
  materials: string;
  model: string;
  fallbackImage: string;
  gallery: ProductGalleryImage[];
  examples: CardExample[];
  accentClass: string;
  badge?: string;
}

export interface CartLine {
  productId: ProductId;
  quantity: number;
}

export interface Testimonial {
  quote: string;
  author: string;
  product: ProductId | "general";
}

export interface FAQItem {
  question: string;
  answer: string;
}
