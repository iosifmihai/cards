import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, ProductId } from "@/types";
import { allProducts } from "@/data/products";
import { PROMO_CODES, QUANTITY_OFFERS, SHIPPING } from "@/data/shipping";

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  promoCode: string | null;
  promoError: string | null;
  addItem: (productId: ProductId, quantity?: number) => void;
  removeItem: (productId: ProductId) => void;
  setQuantity: (productId: ProductId, quantity: number) => void;
  applyPromo: (code: string) => void;
  clearPromo: () => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      promoCode: null,
      promoError: null,
      addItem: (productId, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.productId === productId);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.productId === productId ? { ...l, quantity: l.quantity + quantity } : l,
              ),
              isOpen: true,
            };
          }
          return { lines: [...state.lines, { productId, quantity }], isOpen: true };
        }),
      removeItem: (productId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.productId !== productId) })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          lines: quantity <= 0
            ? state.lines.filter((l) => l.productId !== productId)
            : state.lines.map((l) => (l.productId === productId ? { ...l, quantity } : l)),
        })),
      applyPromo: (code) =>
        set(() => {
          const normalized = code.trim().toUpperCase();
          if (PROMO_CODES[normalized]) {
            return { promoCode: normalized, promoError: null };
          }
          return { promoCode: null, promoError: "Cod promoțional invalid sau expirat." };
        }),
      clearPromo: () => set({ promoCode: null, promoError: null }),
      clearCart: () => set({ lines: [], promoCode: null, promoError: null }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: "naughty-cards-cart", partialize: (state) => ({ lines: state.lines, promoCode: state.promoCode }) },
  ),
);

export function getLinePrice(productId: ProductId): number {
  return allProducts[productId].price;
}

export function getLineTotalQuantity(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}

export function getQuantityDiscountPct(totalQuantity: number): number {
  const tier = [...QUANTITY_OFFERS].reverse().find((o) => totalQuantity >= o.quantity);
  return tier?.discountPct ?? 0;
}

export function computeCartTotals(lines: CartLine[], promoCode: string | null) {
  const subtotal = lines.reduce((sum, l) => sum + getLinePrice(l.productId) * l.quantity, 0);
  const totalQuantity = getLineTotalQuantity(lines);
  const quantityDiscountPct = getQuantityDiscountPct(totalQuantity);
  const promoDiscountPct = promoCode && PROMO_CODES[promoCode] ? PROMO_CODES[promoCode].discountPct : 0;
  const discountPct = Math.max(quantityDiscountPct, promoDiscountPct);
  const discountAmount = subtotal * (discountPct / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const qualifiesFreeShipping =
    discountedSubtotal >= SHIPPING.freeShippingThreshold ||
    QUANTITY_OFFERS.find((o) => o.quantity === totalQuantity && o.freeShipping);
  const shipping = qualifiesFreeShipping || lines.length === 0 ? 0 : SHIPPING.standardCost;
  const total = discountedSubtotal + shipping;
  const amountToFreeShipping = Math.max(0, SHIPPING.freeShippingThreshold - discountedSubtotal);

  return {
    subtotal,
    discountPct,
    discountAmount,
    discountedSubtotal,
    shipping,
    total,
    totalQuantity,
    qualifiesFreeShipping: Boolean(qualifiesFreeShipping),
    amountToFreeShipping,
  };
}
