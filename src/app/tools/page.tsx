import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllToolPages } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Free Tools for E-Commerce & Shopify Merchants - Verve AI',
  description:
    'Free e-commerce tools including profit margin calculator, inventory days calculator, reorder point calculator, and more.',
  alternates: { canonical: 'https://www.getverveai.com/tools' },
  openGraph: {
    title: 'Free Tools for E-Commerce & Shopify Merchants - Verve AI',
    description: 'Free e-commerce tools including profit margin calculator, inventory days calculator, and more.',
    url: 'https://www.getverveai.com/tools',
    type: 'website',
  },
}

const TOOL_DESCRIPTIONS: Record<string, string> = {
  'ecommerce-profit-margin-calculator': 'Calculate your true profit margin including COGS, shipping, and fees.',
  'inventory-days-calculator': 'Find out how many days of inventory you have on hand.',
  'reorder-point-calculator': 'Calculate the exact reorder point for each SKU. Enter demand, lead time, and safety stock — get your ROP and days until reorder instantly.',
  'sales-forecast-template': 'Free Google Sheet template for sales forecasting.',
  'cashflow-forecast-template': 'Free Google Sheet template for cashflow forecasting.',
  'inventory-control-excel': 'Free Google Sheet template for inventory control.',
}

export default function ToolsIndexPage() {
  const tools = getAllToolPages()

  return (
    <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Free Tools for E-Commerce &amp; Shopify Merchants
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Free calculators and templates to help you manage inventory, forecast demand, and grow your store.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Interactive calculators (blog-hosted) */}
            <Link
              href="/blog/safety-stock-calculator"
              className="block bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: 'rgb(0, 201, 167)' }}
              >
                Interactive
              </span>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Safety Stock Calculator</h2>
              <p className="text-gray-500 text-sm">
                Calculate your safety stock and reorder point instantly. Enter demand, standard deviation, and lead time.
              </p>
            </Link>

            {/* Spreadsheet templates and other tools */}
            {tools.length > 0
              ? tools.map(({ slug, data }) => (
                  <Link
                    key={slug}
                    href={`/tools/${slug}`}
                    className="block bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <h2 className="text-lg font-bold text-gray-900 mb-2">{data.h1 || data.title}</h2>
                    <p className="text-gray-500 text-sm">{TOOL_DESCRIPTIONS[slug] || data.metaDescription}</p>
                  </Link>
                ))
              : Object.entries(TOOL_DESCRIPTIONS).map(([slug, desc]) => (
                  <Link
                    key={slug}
                    href={`/tools/${slug}`}
                    className="block bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                      {slug
                        .split('-')
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ')}
                    </h2>
                    <p className="text-gray-500 text-sm">{desc}</p>
                  </Link>
                ))}
          </div>
        </div>
      </section>
    </div>
  )
}
