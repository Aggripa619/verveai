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
  '/shopify-inventory-pet-store': '/pet-store-inventory-software',
  '/inventory-software-jewellery-brand': '/jewellery-inventory-management-software',
  '/home-goods-inventory-management-software': '/inventory-management-home-goods-brands',
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
