# Naughty Cards

Premium e-commerce site for **Naughty Cards** — two physical 18+ Truth or Dare card games,
*Slow Burn* and *No Limits*. Built with React, TypeScript, Tailwind CSS v4, React Router,
Three.js / React Three Fiber / drei, GSAP ScrollTrigger, Framer Motion, and Zustand.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run lint     # oxlint
```

## What's real vs. placeholder

This is a pre-launch build. Everything is functionally wired end-to-end (navigation, cart,
promo codes, checkout, order confirmation, forms with validation), but the following are
intentionally placeholder and marked as such in the UI/copy:

- **Prices** — demo launch prices (`src/data/products.ts`), flagged everywhere via `PRICING_NOTE`.
- **Product photography** — no reference images/models were supplied, so `/public/images/*.svg`
  are hand-built placeholder packaging art, not real photography.
- **3D models** — `PRODUCT_MODELS` in `src/data/products.ts` points to `/public/models/*.glb`.
  No sculpted models exist yet, so `src/components/hero/PackModel.tsx` renders a procedural
  Three.js pack (named sub-groups: Base, Tray, Deck, Cards, Lid) as a stand-in. Drop a real
  `.glb` at those paths and it's picked up automatically — the component does a `HEAD` check,
  attempts `useGLTF`, and falls back to the procedural pack (or the flat SVG image, on
  reduced-motion / low-power / WebGL-unavailable) if anything goes wrong. No code changes needed.
- **Checkout** — demonstrative only; no real payment provider is wired in. See the payment
  method copy in `/checkout` and `src/pages/Terms.tsx` for the integration note (Stripe/Netopia).
- **Reviews / testimonials / social proof / FAQ answers with `[...]` placeholders** — clearly
  marked as demo content in `src/data/reviews.ts` and `src/data/content.ts`.

## Structure

- `src/data/` — single source of truth for products, FAQ, reviews, shipping/offers, legal copy, nav.
- `src/store/` — Zustand stores: cart (persisted to localStorage), age-gate, toasts.
- `src/components/hero/` — the scroll-driven 3D hero (GSAP ScrollTrigger scrub, no per-pixel
  React state; see `heroChoreography.ts` for the stage math).
- `src/components/{layout,home,product,ui}/` — reusable chrome, homepage sections, PDP pieces,
  and design-system primitives (custom line-art icons in `ui/Monogram.tsx` — no stock icon sets).
- `src/pages/` — one file per route, lazy-loaded in `src/App.tsx`.
