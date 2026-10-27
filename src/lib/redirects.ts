// Single source of truth for permanent URL redirects. Applied by
// src/proxy.ts together with host and trailing-slash normalisation so every
// legacy URL reaches its final page in exactly one 301 (GSC flagged the old
// multi-hop chains as "Redirect error", 2026-10-27).

export const CANONICAL_HOST = 'www.getverveai.com'

// Hosts that should 301 to CANONICAL_HOST. Only takes effect if the apex
// domain is attached to the project in Vercel rather than redirected there.
export const NON_CANONICAL_HOSTS = new Set(['getverveai.com'])

export const LEGACY_PATHS: Record<string, string> = {
  // Old per-vertical hub route, removed when pSEO moved to flat [slug]
  // URLs. Google still crawls these (404s in GSC as of 2026-10-01) — send
  // each to its vertical's flagship page (VERTICAL_FLAGSHIP_SLUGS).
  '/inventory-management-for/apparel': '/inventory-management-for-clothing-stores',
  '/inventory-management-for/supplements': '/inventory-management-supplement-brands',
  '/inventory-management-for/beauty': '/inventory-management-beauty-brands',
  '/inventory-management-for/pet-supplies': '/inventory-management-pet-supply-brands',
  '/inventory-management-for/jewellery': '/inventory-management-jewellery-shops',
  '/inventory-management-for/home-goods': '/inventory-management-home-goods-brands',
  '/inventory-management-for/food-and-beverage': '/inventory-management-food-brands',
  '/inventory-management-for/sports-and-outdoor': '/inventory-management-sports-brands',

  // pSEO consolidation (2026-08-05): merged near-duplicate keyword-variant
  // pages into a stronger single page per cluster, per
  // seo-content-strategy/reports/2026-08/pseo-consolidation-shortlist-2026-08-05.md.
  '/apparel-inventory-management-shopify': '/inventory-management-for-apparel-brands',
  '/apparel-inventory-management-software': '/inventory-management-for-apparel-brands',
  '/fashion-inventory-management-software': '/inventory-management-for-fashion-brands',
  '/supplement-inventory-management-software': '/inventory-management-supplement-brands',
  '/skincare-inventory-management-shopify': '/skincare-inventory-management-software',
  '/pet-supply-inventory-management-software': '/inventory-management-pet-supply-brands',
  '/shopify-inventory-pet-store': '/inventory-management-pet-supply-brands',
  '/inventory-software-jewellery-brand': '/jewellery-inventory-management-software',
  '/home-goods-inventory-management-software': '/inventory-management-home-goods-brands',

  // Index-recovery pruning (2026-10-27): thin pSEO pages (<10 GSC impressions
  // in 6 months, "Crawled - currently not indexed" since May) that were
  // phrasing variants of a stronger same-intent sibling, merged into it.
  // Distinct-but-thin pages were set noindex instead (pseo-pages.json).
  // apparel
  '/clothing-store-inventory-app-shopify': '/clothing-inventory-management-software',
  '/shopify-clothing-inventory-tracker': '/clothing-inventory-management-software',
  '/shopify-inventory-app-fashion-brands': '/inventory-management-for-fashion-brands',
  '/inventory-app-fast-fashion-shopify': '/inventory-management-for-fashion-brands',
  '/shopify-variant-inventory-clothing': '/managing-size-colour-variants-shopify',
  '/inventory-software-dtc-apparel': '/inventory-management-for-apparel-brands',
  '/purchase-order-software-apparel': '/automated-purchase-orders-clothing',
  // beauty
  '/shopify-inventory-cosmetics-brand': '/cosmetics-inventory-management-software',
  '/beauty-brand-inventory-app-shopify': '/inventory-management-beauty-brands',
  '/inventory-software-dtc-skincare': '/skincare-inventory-management-software',
  '/skincare-sales-forecasting-tool': '/demand-forecasting-beauty-brand',
  // food & beverage
  '/food-drink-inventory-software-shopify': '/inventory-management-food-brands',
  '/stock-management-drinks-brand-shopify': '/beverage-brand-inventory-management',
  '/ecommerce-food-stock-management-shopify': '/shopify-inventory-food-store',
  '/demand-forecasting-dtc-food-brand': '/food-product-sales-forecasting',
  '/food-expiry-dates-shopify-inventory': '/inventory-management-perishable-food',
  // home goods
  '/homeware-stock-management-shopify': '/inventory-management-home-goods-brands',
  '/homeware-inventory-management-software': '/inventory-management-home-goods-brands',
  '/home-decor-inventory-software': '/inventory-management-home-goods-brands',
  '/stock-management-furniture-ecommerce': '/furniture-inventory-management-software',
  '/seasonal-inventory-planning-homeware': '/seasonal-demand-forecasting-homeware',
  // jewellery
  '/jewelry-stock-management-shopify': '/jewelry-inventory-management-software',
  '/gift-season-inventory-planning-jewellery': '/demand-forecasting-jewellery-brand',
  '/jewellery-inventory-planning-christmas': '/demand-forecasting-jewellery-brand',
  '/inventory-tracking-high-value-jewellery': '/inventory-software-fine-jewellery-brand',
  // pet supplies
  '/pet-store-inventory-software': '/inventory-management-pet-supply-brands',
  '/pet-product-stock-management': '/inventory-management-pet-supply-brands',
  '/inventory-management-dtc-pet-brand': '/inventory-management-pet-supply-brands',
  '/inventory-app-pet-accessories-store': '/pet-supply-inventory-app-shopify',
  '/inventory-software-pet-food-brand': '/inventory-management-natural-pet-food',
  '/recurring-demand-forecasting-pet-supplies': '/demand-forecasting-pet-food-brand',
  '/pet-brand-stock-forecasting-shopify': '/demand-forecasting-pet-food-brand',
  '/preventing-stockouts-pet-food-shopify': '/replenishment-consumable-pet-products',
  // sports & outdoor
  '/sports-brand-inventory-app-shopify': '/inventory-management-sports-brands',
  '/sporting-goods-stock-management-shopify': '/sporting-goods-inventory-software',
  '/sports-equipment-inventory-management': '/sporting-goods-inventory-software',
  '/outdoor-gear-inventory-management': '/shopify-inventory-outdoor-store',
  '/stock-management-camping-gear-brand': '/shopify-inventory-outdoor-store',
  '/outdoor-gear-sales-forecasting': '/seasonal-demand-forecasting-sports-brand',
  '/summer-winter-inventory-outdoor-brand': '/seasonal-inventory-sports-brand',
  // supplements
  '/health-supplement-stock-management': '/inventory-management-supplement-brands',
  '/health-product-forecasting-shopify': '/demand-forecasting-supplement-brands',
  '/forecast-demand-supplement-subscriptions': '/demand-forecasting-supplement-brands',
  '/subscription-inventory-planning-supplements': '/demand-forecasting-supplement-brands',
  '/inventory-management-wellness-brand': '/health-product-inventory-shopify',
  '/inventory-software-sports-nutrition': '/inventory-management-protein-powder-brand',
}

// Blog content once had protocol-less links (href="www.getverveai.com/blog/x"),
// which resolved relative to the post. Fixed in content 2026-10-01; this
// catches the malformed URLs Google already discovered.
const GARBLED_HOST_SEGMENT = /^.*\/(?:www\.)?getverveai\.com(\/.*)$/

function resolveOnce(pathname: string): string | null {
  const garbled = pathname.match(GARBLED_HOST_SEGMENT)
  if (garbled) return garbled[1]
  return LEGACY_PATHS[pathname] ?? null
}

/** Final destination for a legacy path, following the map to its end. */
export function resolveLegacyPath(pathname: string): string | null {
  let current = pathname
  for (let i = 0; i < 5; i++) {
    const next = resolveOnce(current)
    if (!next || next === current) break
    current = next
  }
  return current === pathname ? null : current
}
