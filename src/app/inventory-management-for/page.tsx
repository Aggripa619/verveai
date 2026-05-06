import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllVerticalPages, SITE_URL } from '@/lib/content'
import BlogCTA from '@/components/BlogCTA'

export const metadata: Metadata = {
  title: 'Inventory Management by Industry | Verve AI for Shopify',
  description:
    'Verve AI provides tailored inventory forecasting and automated purchase orders for Shopify merchants across 20+ product verticals — from apparel to food & beverage.',
  alternates: {
    canonical: `${SITE_URL}/inventory-management-for`,
  },
  openGraph: {
    title: 'Inventory Management by Industry | Verve AI for Shopify',
    description:
      'Verve AI provides tailored inventory forecasting and automated purchase orders for Shopify merchants across 20+ product verticals.',
    url: `${SITE_URL}/inventory-management-for`,
    type: 'website',
  },
}

// Lead URL for each vertical — points to the primary pSEO page
const VERTICAL_LEAD_URL: Record<string, string> = {
  apparel: '/inventory-management-for-clothing-stores',
  supplements: '/inventory-management-supplement-brands',
  beauty: '/inventory-management-beauty-brands',
  'pet-supplies': '/inventory-management-pet-supply-brands',
  jewellery: '/inventory-management-jewellery-shops',
  'home-goods': '/inventory-management-home-goods-brands',
  'food-and-beverage': '/inventory-management-food-brands',
  'sports-and-outdoor': '/inventory-management-sports-brands',
}

export default function VerticalHubPage() {
  const verticals = getAllVerticalPages()

  return (
    <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'rgb(0, 201, 167)' }}
            >
              Inventory Management by Industry
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Verve AI for Every Shopify Vertical
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Every product category has its own inventory challenges. Verve AI
              delivers demand forecasting and automated purchase orders built around
              the specific patterns of your industry — not a one-size-fits-all average.
            </p>
          </div>

          {/* Vertical grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            {verticals.map(({ slug, data }) => (
              <Link
                key={slug}
                href={VERTICAL_LEAD_URL[slug] ?? `/inventory-management-for/${slug}`}
                className="group flex flex-col gap-2 rounded-2xl p-6 bg-gray-50 border border-gray-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all"
              >
                <h2 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors">
                  {data.vertical_name}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {data.hero_pain}
                </p>
                <span
                  className="mt-1 text-xs font-semibold"
                  style={{ color: 'rgb(0, 160, 133)' }}
                >
                  Learn more →
                </span>
              </Link>
            ))}
          </div>

          {/* Why vertical-specific section */}
          <section
            className="rounded-2xl p-8 mb-12"
            style={{ backgroundColor: 'rgb(19, 33, 68)' }}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Why does your industry matter for inventory management?
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
              A supplement brand needs FIFO batch tracking and expiry-aware reordering. An apparel
              brand needs variant-level size-run forecasting. A jewellery brand needs low-volume
              statistical forecasting for high-value SKUs. A food brand needs shelf-life-constrained
              buy quantities.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Generic inventory tools apply the same rules to all of these. Verve AI applies
              industry-specific demand models to each, producing forecasts and purchase order
              recommendations that reflect how your category actually works — not how inventory
              management works on average.
            </p>
          </section>

          <BlogCTA />
        </div>
      </div>
    </div>
  )
}
