import type { Metadata } from 'next'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'
import { SHOPIFY_URL, WOOCOMMERCE_URL, SITE_URL } from '@/lib/content'

// Targets "shopify inventory forecasting" (+ "inventory forecasting shopify",
// "ai inventory forecasting shopify"). Before this page existed, those queries
// ranked ~pos 16–20 via /blog/shopify-inventory-forecasting-app-comparison —
// a list-of-apps post that doesn't match the head term's intent. Keep that
// post focused on "best app / comparison" queries and link it here.
const PATH = '/shopify-inventory-forecasting'
const TITLE = 'Shopify Inventory Forecasting: AI Forecasts for Every SKU'
const DESCRIPTION =
  'AI inventory forecasting for Shopify: predict demand for every SKU and variant from your real order history, get reorder points that account for seasonality and lead times, and approve purchase orders in one click. $19.99/month, 14-day free trial.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: 'website',
  },
}

const nativeVsDedicated: { label: string; native: string; verve: string }[] = [
  {
    label: 'What it tells you',
    native: 'What sold in the past (Shopify Analytics reports)',
    verve: 'What will sell next, and when each SKU needs reordering',
  },
  {
    label: 'Forecast level',
    native: 'No per-SKU demand forecast; Sidekick can suggest reorder quantities on request',
    verve: 'Every SKU and variant (size, colour, etc.), updated daily',
  },
  {
    label: 'Seasonality',
    native: 'You spot it yourself in the reports',
    verve: 'Detected automatically from your order history',
  },
  {
    label: 'Supplier lead times',
    native: 'Not factored into any reorder timing',
    verve: 'Built into every reorder point',
  },
  {
    label: 'Purchase orders',
    native: 'Created manually in Shopify Admin (or drafted via Sidekick)',
    verve: 'Pre-built from the forecast, supplier prefilled; approve in one click',
  },
  {
    label: 'Dead stock',
    native: 'Found by digging through sales reports',
    verve: 'Flagged automatically with the cash tied up in it',
  },
]

const checklist: { title: string; body: string }[] = [
  {
    title: 'Variant-level forecasts, not product-level',
    body: 'A hoodie that sells 200 units a month can still stock out in Medium/Black while Large/Grey sits for months. If the forecast stops at the product, your reorders will be wrong at the level you actually buy.',
  },
  {
    title: 'Seasonality handled for you',
    body: 'Q4 peaks, summer lulls and promo spikes distort a simple average. The app should recognise recurring patterns in your own history instead of asking you to adjust them by hand.',
  },
  {
    title: 'Lead times in the reorder point',
    body: 'A forecast is only useful if it tells you when to order. That means combining expected daily demand with each supplier\'s real lead time, plus a safety stock buffer.',
  },
  {
    title: 'Forecasts that turn into purchase orders',
    body: 'The goal is a PO, not a chart. Look for reorder suggestions you can approve, edit or snooze, with supplier details already filled in.',
  },
  {
    title: 'Pricing that doesn\'t scale with your success',
    body: 'Many forecasting tools charge by order volume, GMV or SKU count, so the bill grows as you do. Check what you\'ll pay at 2x your current size, not just today.',
  },
]

const faqs: { q: string; a: string }[] = [
  {
    q: 'Does Shopify have built-in inventory forecasting?',
    a: "Not as a dedicated feature. Shopify Analytics shows what sold in the past, and Shopify's Sidekick AI assistant can suggest reorder quantities and draft purchase orders when you ask. But Shopify doesn't produce an ongoing demand forecast per SKU and variant that accounts for seasonality and supplier lead times. That's what a forecasting app adds. Shopify's previous forecasting tool, Stocky, shut down on August 31, 2026.",
  },
  {
    q: 'How does AI inventory forecasting work on Shopify?',
    a: 'The app reads your Shopify order history and current stock levels through the Shopify API, then models each SKU\'s sales velocity, seasonal patterns and trend. It combines that expected demand with your supplier lead times and a safety stock buffer to calculate a reorder point for every SKU and variant, and tells you what to order and when.',
  },
  {
    q: 'How accurate is Shopify inventory forecasting?',
    a: "It depends mostly on your data: forecasts for steady sellers with a year or more of history are far more reliable than for brand-new or highly promotional products. A good forecasting app keeps recalculating as new orders come in, so errors shrink over time instead of compounding the way a static spreadsheet does.",
  },
  {
    q: 'Do I need to upload data or connect spreadsheets?',
    a: 'No. Verve AI syncs your full Shopify order history, products, variants and stock levels automatically when you install it. There are no CSV uploads, and it starts analysing your orders and inventory within minutes.',
  },
  {
    q: 'How much does Verve AI cost?',
    a: '$19.99/month USD, one plan with everything included: no per-SKU charges, no GMV tiers and no order volume limits. There\'s a 14-day free trial, no credit card required, and you can cancel any time from your Shopify admin.',
  },
  {
    q: 'Can I forecast inventory in Excel instead?',
    a: 'Yes, for a handful of products. Moving averages, FORECAST.LINEAR and FORECAST.ETS work well for one SKU at a time, and our free demand forecasting Excel template sets them up for you. It stops scaling once you have dozens of SKUs and variants to update every month, which is where an automated Shopify app takes over.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Verve AI',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${SITE_URL}${PATH}`,
  description: DESCRIPTION,
  offers: { '@type': 'Offer', price: '19.99', priceCurrency: 'USD' },
  sameAs: [SHOPIFY_URL, WOOCOMMERCE_URL],
}

const linkClass = 'underline hover:opacity-80'
const linkStyle = { color: 'rgb(0, 160, 133)' }

export default function ShopifyInventoryForecastingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        {/* Hero */}
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgb(0, 201, 167)' }}>
              AI inventory forecasting for Shopify
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Shopify Inventory Forecasting That Tells You What to Reorder, and When
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Verve AI reads your Shopify order history and forecasts demand for every SKU and
              variant, then turns that forecast into reorder points and ready-to-approve purchase
              orders. It accounts for seasonality and your suppliers&apos; lead times, so you stop
              running out of best sellers and stop tying cash up in stock that won&apos;t move.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              No spreadsheets, no CSV uploads: install it and your first forecasts start building
              from your real sales data within minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>
                Start Free Trial — Shopify
              </CTAButton>
              <CTAButton href="/demo" variant="dark" size="lg">
                See the Interactive Demo
              </CTAButton>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              $19.99/month · 14-day free trial · No credit card required · Also on{' '}
              <a href={WOOCOMMERCE_URL} target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
                WooCommerce
              </a>
            </p>
          </div>
        </section>

        <article className="bg-white py-2">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* What it is */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is Shopify Inventory Forecasting?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Shopify inventory forecasting means predicting how many units of each product
                you&apos;ll sell over the coming weeks, then using that prediction to decide how
                much to reorder and when. Done well, it answers three questions for every SKU:{' '}
                <strong>how fast is it selling</strong>, <strong>when will it run out</strong>, and{' '}
                <strong>how much should I order today</strong> so it arrives before it does.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The inputs are your sales history, current stock, seasonality and supplier lead
                times. The output is a{' '}
                <Link href="/blog/how-to-calculate-reorder-point" className={linkClass} style={linkStyle}>
                  reorder point
                </Link>{' '}
                and a suggested order quantity. Most Shopify merchants start doing this in a
                spreadsheet, which works until the catalogue grows past a few dozen variants.
              </p>
            </section>

            {/* Native vs dedicated */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Shopify&apos;s Built-In Tools vs. a Dedicated Forecasting App
              </h2>
              <p className="text-gray-500 mb-6">
                Shopify tells you what happened. Inventory forecasting tells you what to do next.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{ backgroundColor: 'rgb(19, 33, 68)' }}>
                      <th className="text-left text-white font-semibold px-4 py-3"></th>
                      <th className="text-left text-white font-semibold px-4 py-3">Shopify on its own</th>
                      <th className="text-left text-white font-semibold px-4 py-3">With Verve AI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nativeVsDedicated.map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 font-semibold text-gray-900 align-top">{row.label}</td>
                        <td className="px-4 py-3 text-gray-600 align-top">{row.native}</td>
                        <td className="px-4 py-3 text-gray-900 align-top">{row.verve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Shopify&apos;s former forecasting app, Stocky, shut down on August 31, 2026. See our{' '}
                <Link href="/stocky-alternative" className={linkClass} style={linkStyle}>
                  Stocky alternative guide
                </Link>{' '}
                if you&apos;re replacing it.
              </p>
            </section>

            {/* How AI forecasting works */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">How AI Inventory Forecasting Works on Shopify</h2>
              <p className="text-gray-500 mb-6">From install to your first reorder suggestion.</p>
              <div className="flex flex-col gap-6">
                {[
                  {
                    n: '1',
                    title: 'Connect your Shopify store',
                    body: 'Install Verve AI from the Shopify App Store. It syncs your full order history, products, variants and stock levels automatically, with no CSV uploads.',
                  },
                  {
                    n: '2',
                    title: 'The AI builds a forecast for every SKU and variant',
                    body: 'The forecasting engine analyses each variant\'s sales velocity, seasonality and trend, then combines expected demand with supplier lead times and a safety stock buffer to set a reorder point.',
                  },
                  {
                    n: '3',
                    title: 'You get alerts before problems cost you',
                    body: 'Verve AI monitors stock levels every day and flags what\'s about to run out, demand spikes before you sell through, and dead stock before it ties up more cash.',
                  },
                  {
                    n: '4',
                    title: 'Approve the purchase order',
                    body: 'Reorders arrive as pre-built purchase orders with the supplier prefilled. Approve in one click, adjust quantities, or snooze what can wait.',
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

              {/* Example alerts (same examples as /why-verve-ai) */}
              <div className="mt-8 grid sm:grid-cols-3 gap-3">
                {[
                  { tag: 'Reorder now', title: 'Running Shorts (M)', body: '3 days of stock remaining · Reorder point reached · Suggested: 48 units', color: 'rgb(239, 68, 68)' },
                  { tag: 'Demand spike', title: 'Protein Powder Vanilla', body: '+185% velocity vs 30-day avg · Stockout risk in 6 days', color: 'rgb(245, 158, 11)' },
                  { tag: 'Dead stock', title: 'Winter Coat (XL)', body: '$4,200 tied up · No sales in 45 days · Action needed', color: 'rgb(128, 72, 245)' },
                ].map((card) => (
                  <div key={card.title} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: card.color }}>
                      {card.tag}
                    </p>
                    <p className="font-bold text-gray-900 text-sm mb-1">{card.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{card.body}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2 italic">Example alerts, illustrative data.</p>
            </section>

            {/* What to look for */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                What to Look For in a Shopify Inventory Forecasting App
              </h2>
              <p className="text-gray-500 mb-6">Five things that separate a useful forecast from a pretty chart.</p>
              <ul className="flex flex-col gap-5">
                {checklist.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="flex-shrink-0 mt-1 font-bold" style={{ color: 'rgb(0, 201, 167)' }}>✓</span>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 leading-relaxed mt-6">
                Comparing options? Our{' '}
                <Link href="/blog/shopify-inventory-forecasting-app-comparison" className={linkClass} style={linkStyle}>
                  Shopify inventory forecasting app comparison
                </Link>{' '}
                puts the main apps side by side on features and pricing.
              </p>
            </section>

            {/* Pricing */}
            <section className="my-12 rounded-2xl border border-gray-100 bg-gray-50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">One Plan: $19.99/month</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Everything included: AI forecasting for every SKU and variant, purchase order
                automation, supplier management, multi-location stock, dead stock detection and 10
                built-in inventory reports. No per-SKU charges, no GMV tiers, no order volume
                limits.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Built for 1–3 person teams running Shopify or WooCommerce stores.{' '}
                <Link href="/pricing" className={linkClass} style={linkStyle}>
                  See full pricing
                </Link>
              </p>
              <CTAButton href={SHOPIFY_URL} variant="teal" size="md" external>
                Start 14-Day Free Trial
              </CTAButton>
            </section>

            {/* Spreadsheet path */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Ready for an App Yet?</h2>
              <p className="text-gray-700 leading-relaxed">
                If you only sell a few products, you can forecast in a spreadsheet first. Our guide
                to{' '}
                <Link href="/blog/demand-forecasting-excel" className={linkClass} style={linkStyle}>
                  demand forecasting in Excel
                </Link>{' '}
                walks through moving averages, FORECAST.LINEAR and FORECAST.ETS, and includes a free
                template. For the bigger picture, read{' '}
                <Link href="/blog/ai-inventory-forecasting" className={linkClass} style={linkStyle}>
                  AI inventory forecasting: the complete guide
                </Link>
                .
              </p>
            </section>

            {/* FAQ */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Shopify Inventory Forecasting FAQ</h2>
              <div className="flex flex-col">
                {faqs.map((item, i) => (
                  <div key={item.q} className={`py-6 ${i < faqs.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.q}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <section className="my-12 text-center rounded-2xl p-10" style={{ backgroundColor: 'rgb(19, 33, 68)' }}>
              <p className="text-2xl font-bold text-white mb-2">Forecast Every SKU on Your Shopify Store</p>
              <p className="text-white/70 mb-8">Install in minutes. Your first forecasts build from your real order history.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>
                  Start Free Trial — Shopify
                </CTAButton>
                <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external>
                  Start Free Trial — WooCommerce
                </CTAButton>
              </div>
              <p className="mt-4 text-sm text-white/60">14-day free trial · No credit card required · Cancel anytime</p>
            </section>
          </div>
        </article>
      </div>
    </>
  )
}
