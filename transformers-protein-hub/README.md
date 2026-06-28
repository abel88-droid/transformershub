# Transformers Protein Hub

A premium ecommerce storefront for a sports-nutrition brand, built with Next.js 15 (App Router), React, TypeScript, Tailwind CSS, and Framer Motion.

## Design Language

- **Palette:** matte black, gold (`#D4AF37`), warm white, and a whisper of deep red — no pure black/white, no neon.
- **Signature motif:** a foil-stamped "batch label" system (rotated gold seals, dashed tear-line dividers, monospace batch codes) echoing real supplement tub labels — used for discount badges, product batch codes, and section dividers.
- **Type system:** `Anton` (condensed display headlines), `Inter` (body), `JetBrains Mono` (prices, specs, batch codes — treated like a label printout).

## Tech Stack

- Next.js 15 App Router + TypeScript
- Tailwind CSS (custom design tokens in `tailwind.config.js`)
- Framer Motion (scroll reveals, parallax, hover, page transitions)
- lucide-react icons
- Client-side Cart / Wishlist / Theme context with `localStorage` persistence (no backend required)

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/                  # App Router routes
    page.tsx             # Home
    products/            # Products listing + [slug] detail
    category/[slug]/     # Category listing
    search/              # Search
    cart/                # Cart page
    wishlist/             # Wishlist page
    about/, contact/      # Static pages
    not-found.tsx, error.tsx
    sitemap.ts, robots.ts, manifest.ts
  components/
    layout/              # Navbar, Footer, BackToTop, WhatsApp button
    home/                 # Hero, Categories, Reviews, CTA, etc.
    product/              # ProductCard, filters, sort, gallery, tabs
    cart/                 # CartDrawer
    ui/                   # Button, RatingStars, EmptyState, Skeletons, etc.
  context/                # Cart / Wishlist / Theme providers
  data/                   # Product, category, brand, review mock data
  hooks/                  # useScrollReveal, useMouseParallax, useProductFilter, etc.
  lib/                    # utils, constants
  types/                  # Shared TypeScript types
```

## Notes

- All product/category/review data lives in `src/data/*.ts` — swap with a real API or CMS by replacing these modules; component props are already typed against `src/types/index.ts`.
- WhatsApp ordering uses `wa.me` deep links built in `src/lib/utils.ts` (`buildWhatsAppLink`) — update `WHATSAPP_NUMBER` in `src/lib/constants.ts`.
- Cart and Wishlist persist client-side via `localStorage`; there is no payment gateway wired up (by design — orders route through WhatsApp).
- Dark mode is the default brand experience; a light mode toggle is included via `ThemeContext` and the `light` class on `<html>`.
