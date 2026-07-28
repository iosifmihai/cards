export const SHIPPING = {
  standardCost: 19.9,
  freeShippingThreshold: 250,
  estimatedDays: "[INTERVAL LIVRARE]",
  discreetPackagingNote:
    "Comanda este expediată într-un ambalaj exterior neutru, fără informații vizibile despre conținut.",
};

export const QUANTITY_OFFERS = [
  { quantity: 1, discountPct: 0, label: "1 pachet" },
  { quantity: 2, discountPct: 10, label: "2 pachete" },
  { quantity: 3, discountPct: 15, label: "3 pachete", freeShipping: true },
];

export const PROMO_CODES: Record<string, { discountPct: number; label: string }> = {
  NAUGHTY10: { discountPct: 10, label: "Cod promoțional demonstrativ -10%" },
};

export const COMMERCIAL_BENEFITS = [
  { mark: "01", title: "Livrare rapidă", text: `Livrare estimată în ${"[INTERVAL LIVRARE]"} zile lucrătoare.` },
  {
    mark: "02",
    title: "Ambalaj discret",
    text: "Comanda este expediată într-un ambalaj exterior neutru, fără informații vizibile despre conținut.",
  },
  { mark: "03", title: "Plată securizată", text: "Tranzacții procesate printr-un furnizor de plăți securizat." },
  { mark: "04", title: "Retur", text: "Retur conform politicii magazinului, în termenul legal." },
];
