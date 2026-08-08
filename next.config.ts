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
