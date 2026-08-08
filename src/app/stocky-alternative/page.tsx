import type { Metadata } from 'next'
import CTAButton from '@/components/CTAButton'
import { SHOPIFY_URL, WOOCOMMERCE_URL, SITE_URL } from '@/lib/content'

const TITLE = 'Stocky Alternative for Shopify — Migrate Before Aug 31, 2026'
const DESCRIPTION =
  "Shopify is shutting down Stocky on August 31, 2026. See the official shutdown timeline, a side-by-side feature comparison, and a step-by-step migration guide to Verve AI's demand forecasting and purchase order automation."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/stocky-alternative` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/stocky-alternative`,
    type: 'article',
  },
}

const comparisonRows: { label: string; stocky: string; verve: string }[] = [
  {
    label: 'Status',
    stocky: 'Shutting down Aug 31, 2026 — delisted from the App Store since Feb 2, 2026',
    verve: 'Actively developed, available now',
  },
  {
    label: 'Platform',
    stocky: 'Shopify only (bundled with POS Pro)',
    verve: 'Shopify and WooCommerce',
  },
  {
    label: 'Pricing',
    stocky: 'Requires a Shopify POS Pro subscription — $89/month per location (as low as $67/month per location on a 12-month term)',
    verve: '$19.99/month flat — no per-location or GMV-based tiers',
  },
  {
    label: 'Demand forecasting',
    stocky: 'Product-level forecasting and reorder suggestions',
    verve: 'AI forecasting at the individual SKU and variant level (size, colour, etc.)',
  },
  {
    label: 'Purchase orders',
    stocky: 'Manual creation in Shopify Admin, or AI-drafted via Sidekick',
    verve: 'AI-generated purchase order recommendations — approve in one click',
  },
  {
    label: 'Supplier management',
    stocky: 'Being retired with Stocky — supplier records cannot even be exported',
    verve: 'Supplier management with performance scorecards built in',
  },
  {
    label: 'Multi-location',
    stocky: 'Native Shopify inventory transfers',
    verve: 'Multi-location stock management with AI-flagged transfer recommendations',
  },
  {
    label: 'Reporting',
    stocky: 'Custom reports via Shopify Analytics',
    verve: '10 built-in inventory reports + CSV export',
  },
  {
    label: 'Free trial',
    stocky: 'N/A — no new installs since Feb 2, 2026',
    verve: '14-day free trial, no credit card required',
  },
  {
    label: 'Setup time',
    stocky: '—',
    verve: 'Most merchants fully set up within one business day',
  },
]

const faqs: { q: string; a: string }[] = [
  {
    q: 'Do I need to export my Stocky data before I can use Verve AI?',
    a: "No. Verve AI's demand forecasts are built from your Shopify order history directly — not from Stocky's exported files — so you can connect your store and start forecasting immediately, with no import step required.",
  },
  {
    q: 'What happens to my Stocky data after August 31, 2026?',
    a: "According to Shopify's own migration guide, Stocky and all of its APIs stop working entirely on August 31, 2026. Shopify provides read-only access to export your data for at least 90 days afterward, but nothing is migrated automatically — you need to export what you want to keep before the deadline.",
  },
  {
    q: 'Can I export my supplier list from Stocky?',
    a: "No. Shopify's own documentation confirms supplier records cannot be exported from Stocky, and historical purchase orders can't be imported into Shopify's native inventory tools either. You'll need to re-enter supplier details in whatever tool you move to — this is a one-time step regardless of which replacement you choose.",
  },
  {
    q: 'Does Verve AI work with WooCommerce as well as Shopify?',
    a: "Yes. Verve AI is available as a native Shopify app and as a WooCommerce plugin, unlike Stocky which was Shopify-exclusive.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
}

export default function StockyAlternativePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        {/* Hero */}
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'rgb(239, 68, 68)' }}
            >
              Stocky Shutdown — August 31, 2026
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Stocky is Shutting Down August 31, 2026 — Here&apos;s Your Replacement
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Shopify is discontinuing Stocky, its built-in demand forecasting and purchase order
              tool for POS Pro merchants. If you rely on Stocky to decide what to reorder, you need
              a replacement in place before it stops working.
            </p>
            <p className="text-sm text-gray-500 italic mb-8">Last verified: August 2026</p>
            <div className="flex flex-wrap gap-4">
              <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>
                Start Free Trial — Shopify
              </CTAButton>
              <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external>
                Start Free Trial — WooCommerce
              </CTAButton>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              14-day free trial · No credit card required · Cancel anytime
            </p>
          </div>
        </section>

        <article className="bg-white py-2">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section 1: Shutdown facts */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What&apos;s Actually Happening to Stocky
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Shopify has confirmed a firm shutdown timeline for Stocky, its inventory
                forecasting and purchase order tool bundled with Shopify POS Pro. According to{' '}
                <a
                  href="https://help.shopify.com/en/manual/products/inventory/transitioning-from-stocky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                  style={{ color: 'rgb(0, 160, 133)' }}
                >
                  Shopify&apos;s own migration guide
                </a>
                , here is the exact timeline:
              </p>
              <div className="flex flex-col gap-4 mb-6">
                <div className="rounded-xl p-5 border border-gray-100 bg-gray-50">
                  <p className="font-bold text-gray-900 mb-1">July 7, 2025</p>
                  <p className="text-sm text-gray-600">
                    Stocky stopped supporting inventory transfers between locations and min/max
                    forecasting.
                  </p>
                </div>
                <div className="rounded-xl p-5 border border-gray-100 bg-gray-50">
                  <p className="font-bold text-gray-900 mb-1">February 2, 2026</p>
                  <p className="text-sm text-gray-600">
                    Stocky was removed from the Shopify App Store. Merchants who don&apos;t already
                    have it installed can no longer add it.
                  </p>
                </div>
                <div
                  className="rounded-xl p-5 border"
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.04)', borderColor: 'rgba(239, 68, 68, 0.15)' }}
                >
                  <p className="font-bold text-gray-900 mb-1">August 31, 2026</p>
                  <p className="text-sm text-gray-600">
                    Complete shutdown. Stocky and all of its APIs stop working entirely. Shopify
                    provides read-only access to export your data for at least 90 days afterward.
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Two details are easy to miss but matter for planning your migration: supplier
                records{' '}
                <span className="font-semibold">cannot</span> be exported from Stocky at all, and
                historical purchase orders can&apos;t be imported into Shopify&apos;s native
                inventory tools either — so re-entering supplier details is a one-time step no
                matter which replacement you choose.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Shopify&apos;s own replacement moves basic operations — transfers, adjustments,
                purchase orders — into Shopify Admin, and its Sidekick AI assistant can suggest
                reorder quantities and draft purchase orders. It&apos;s a real option for basic
                needs, but it isn&apos;t a dedicated demand-forecasting tool the way Stocky was —
                which is the gap this page is about closing.
              </p>
            </section>

            {/* Section 2: Comparison table */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Stocky vs. Verve AI: Side by Side
              </h2>
              <p className="text-gray-500 mb-6">
                What changes when you move from Stocky to a dedicated forecasting tool.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{ backgroundColor: 'rgb(19, 33, 68)' }}>
                      <th className="text-left text-white font-semibold px-4 py-3">Feature</th>
                      <th className="text-left text-white font-semibold px-4 py-3">Stocky</th>
                      <th className="text-left text-white font-semibold px-4 py-3">Verve AI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr
                        key={row.label}
                        className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-4 py-3 font-semibold text-gray-900 align-top">{row.label}</td>
                        <td className="px-4 py-3 text-gray-600 align-top">{row.stocky}</td>
                        <td className="px-4 py-3 text-gray-900 align-top">{row.verve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3 italic">
                Stocky POS Pro pricing per{' '}
                <a
                  href="https://www.shopify.com/pos/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Shopify&apos;s official POS pricing page
                </a>
                , correct as of this page&apos;s last verification date. Confirm current pricing
                directly with Shopify before making a decision based on it.
              </p>
            </section>

            {/* Section 3: Migration mini-guide */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                How to Migrate From Stocky to Verve AI
              </h2>
              <p className="text-gray-500 mb-6">
                Verve AI forecasts from your live Shopify order history, not from Stocky&apos;s
                data — so there&apos;s nothing to import to get started.
              </p>
              <div className="flex flex-col gap-6">
                {[
                  {
                    n: '1',
                    title: 'Export what you want to keep from Stocky before Aug 31',
                    body: "Follow Shopify's own instructions to export completed purchase order reports, stocktake history, and historical cost data as CSVs. Note: supplier records can't be exported — write those down separately if you want a backup.",
                  },
                  {
                    n: '2',
                    title: 'Connect Verve AI to your Shopify (or WooCommerce) store',
                    body: 'Verve AI reads your order history, current stock levels, and product variants directly — no CSV upload or manual data entry. Your forecasts start building from real sales data immediately, independent of anything in Stocky.',
                  },
                  {
                    n: '3',
                    title: 'Re-enter your supplier details and lead times',
                    body: "Since supplier records don't carry over from Stocky to any tool, add your suppliers and their typical lead times in Verve AI — a few minutes per supplier. This feeds directly into your reorder point calculations.",
                  },
                  {
                    n: '4',
                    title: 'Review your first AI-generated purchase order',
                    body: "Most merchants see their first forecast-driven reorder recommendations within a day of connecting their store. Adjust quantities if needed, then approve — the same one-click workflow Stocky offered, now with SKU and variant-level precision.",
                  },
                ].map((step) => (
                  <div key={step.n} className="flex gap-5">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: 'rgb(0, 201, 167)' }}
                    >
                      {step.n}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="flex flex-col">
                {faqs.map((item, i) => (
                  <div
                    key={item.q}
                    className={`py-6 ${i < faqs.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.q}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Related reading */}
            <section className="my-12">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Related Reading</h2>
              <ul className="grid sm:grid-cols-3 gap-3">
                <li>
                  <a
                    href="/blog/demand-forecasting-tools"
                    className="block rounded-lg border border-gray-200 p-4 text-sm text-gray-800 hover:border-teal-300 hover:bg-teal-50/30 transition-colors"
                  >
                    15 Best Demand Forecasting Tools for 2026
                  </a>
                </li>
                <li>
                  <a
                    href="/blog/shopify-inventory-forecasting-app-comparison"
                    className="block rounded-lg border border-gray-200 p-4 text-sm text-gray-800 hover:border-teal-300 hover:bg-teal-50/30 transition-colors"
                  >
                    Shopify Inventory Forecasting App Comparison
                  </a>
                </li>
                <li>
                  <a
                    href="/pricing"
                    className="block rounded-lg border border-gray-200 p-4 text-sm text-gray-800 hover:border-teal-300 hover:bg-teal-50/30 transition-colors"
                  >
                    Verve AI Pricing
                  </a>
                </li>
              </ul>
            </section>

            {/* Final CTA */}
            <section className="my-12 text-center rounded-2xl p-10" style={{ backgroundColor: 'rgb(19, 33, 68)' }}>
              <p className="text-2xl font-bold text-white mb-2">Don&apos;t Wait Until August 31</p>
              <p className="text-white/70 mb-8">
                Set up your replacement now — most merchants are fully forecasting within a day.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>
                  Start Free Trial — Shopify
                </CTAButton>
                <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external>
                  Start Free Trial — WooCommerce
                </CTAButton>
              </div>
              <p className="mt-4 text-sm text-white/60">
                14-day free trial · No credit card required · Cancel anytime
              </p>
            </section>
          </div>
        </article>
      </div>
    </>
  )
}
