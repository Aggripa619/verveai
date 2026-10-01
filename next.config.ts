import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: false,
  // pSEO consolidation (2026-08-05): merged near-duplicate keyword-variant
  // pages into a stronger single page per cluster, per
  // seo-content-strategy/reports/2026-08/pseo-consolidation-shortlist-2026-08-05.md.
  // These preserve the old URLs' keyword equity via redirect rather than
  // returning a 404.
  async redirects() {
    return [
      // Old per-vertical hub route, removed when pSEO moved to flat [slug]
      // URLs. Google still crawls these (404s in GSC as of 2026-10-01) — send
      // each to its vertical's flagship page (VERTICAL_FLAGSHIP_SLUGS).
      ...Object.entries({
        apparel: 'inventory-management-for-clothing-stores',
        supplements: 'inventory-management-supplement-brands',
        beauty: 'inventory-management-beauty-brands',
        'pet-supplies': 'inventory-management-pet-supply-brands',
        jewellery: 'inventory-management-jewellery-shops',
        'home-goods': 'inventory-management-home-goods-brands',
        'food-and-beverage': 'inventory-management-food-brands',
        'sports-and-outdoor': 'inventory-management-sports-brands',
      }).map(([vertical, flagship]) => ({
        source: `/inventory-management-for/${vertical}`,
        destination: `/${flagship}`,
        permanent: true,
      })),
      // Blog content once had protocol-less links (href="www.getverveai.com/blog/x"),
      // which resolved relative to the post. Fixed in content 2026-10-01; this
      // catches the malformed URLs Google already discovered.
      {
        source: '/blog/www.getverveai.com/blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/apparel-inventory-management-shopify',
        destination: '/inventory-management-for-apparel-brands',
        permanent: true,
      },
      {
        source: '/apparel-inventory-management-software',
        destination: '/inventory-management-for-apparel-brands',
        permanent: true,
      },
      {
        source: '/fashion-inventory-management-software',
        destination: '/inventory-management-for-fashion-brands',
        permanent: true,
      },
      {
        source: '/supplement-inventory-management-software',
        destination: '/inventory-management-supplement-brands',
        permanent: true,
      },
      {
        source: '/skincare-inventory-management-shopify',
        destination: '/skincare-inventory-management-software',
        permanent: true,
      },
      {
        source: '/pet-supply-inventory-management-software',
        destination: '/inventory-management-pet-supply-brands',
        permanent: true,
      },
      {
        source: '/shopify-inventory-pet-store',
        destination: '/pet-store-inventory-software',
        permanent: true,
      },
      {
        source: '/inventory-software-jewellery-brand',
        destination: '/jewellery-inventory-management-software',
        permanent: true,
      },
      {
        source: '/home-goods-inventory-management-software',
        destination: '/inventory-management-home-goods-brands',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.getverveai.com',
      },
    ],
  },
}

export default nextConfig
