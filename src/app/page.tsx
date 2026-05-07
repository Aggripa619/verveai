import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'
import { SHOPIFY_URL, WOOCOMMERCE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Verve AI — Inventory Forecasting for Small & Medium Shopify Brands',
  description:
    'AI demand forecasting built for independent Shopify and WooCommerce merchants. $19.99/month flat. 10-minute setup. No contracts, no CSM calls, no enterprise pricing.',
  alternates: {
    canonical: 'https://www.getverveai.com/',
  },
  openGraph: {
    title: 'Verve AI — Inventory Forecasting for Small & Medium Shopify Brands',
    description:
      'AI demand forecasting built for independent Shopify and WooCommerce merchants. $19.99/month flat. 10-minute setup. No contracts, no CSM calls, no enterprise pricing.',
    url: 'https://www.getverveai.com/',
    type: 'website',
  },
}

function CTAPair({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {label && <p className="text-base font-semibold text-gray-700">{label}</p>}
      <div className="flex flex-wrap justify-center gap-4">
        <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>
          Start Free Trial — Shopify
        </CTAButton>
        <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external>
          Start Free Trial — WooCommerce
        </CTAButton>
      </div>
      <p className="text-sm text-gray-500">14-day free trial · No credit card required · Cancel anytime</p>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ── 1. HERO ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Image
              src="https://framerusercontent.com/images/StWC6Ozq4IMVMqDQN0ZuXzZYq0A.png"
              alt="Verve AI Inventory Operations Dashboard"
              width={1024}
              height={1024}
              priority
              className="w-full h-auto rounded-2xl"
            />
          </div>
          <div className="order-1 lg:order-2 flex flex-col gap-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Most of the Features. None of the Price Tag.
            </h1>
            <p className="text-xl lg:text-2xl font-medium text-gray-700 leading-relaxed">
              Verve AI gives independent Shopify and WooCommerce merchants AI-powered inventory forecasting — without the enterprise contracts, onboarding calls, or $500/month bills. $19.99/month. Set up yourself in 10 minutes.
            </p>
            <CTAPair />
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BAR ── */}
      <section className="py-10 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { stat: '10 min', label: 'Setup Time', sub: 'No onboarding call needed' },
              { stat: '$19.99', label: 'Per Month Flat', sub: 'No GMV tiers. No per-SKU fees' },
              { stat: '14-Day', label: 'Free Trial', sub: 'No credit card required' },
              { stat: 'Month-to-Month', label: 'No Contracts', sub: 'Cancel in 60 seconds' },
            ].map(({ stat, label, sub }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-2xl lg:text-3xl font-bold" style={{ color: 'rgb(0, 201, 167)' }}>
                  {stat}
                </span>
                <span className="text-sm font-semibold text-gray-800">{label}</span>
                <span className="text-xs text-gray-500">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHO IT'S FOR ── */}
      <section className="py-16" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Built for the 99% of Shopify Merchants That Aren&apos;t Enterprise
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Enterprise inventory tools are built for supply chain teams with six-figure budgets. Verve is built for the rest of us.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left mb-10">
            {[
              {
                icon: '🧑‍💼',
                title: 'Independent merchants running 1–3 person teams',
                body: "You're doing purchasing, ops, and customer service. Verve gives you the forecasting a 10-person team would have — without hiring them.",
              },
              {
                icon: '📦',
                title: 'Growing brands with 100–5,000 SKUs',
                body: "Big enough to need real demand forecasting. Smart enough not to pay $500/month for it.",
              },
              {
                icon: '📈',
                title: 'Stores doing $250k–$5M/year',
                body: "Too big for spreadsheets, too small for Prediko. That's exactly who Verve was built for.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-3">
                <span className="text-3xl">{icon}</span>
                <h3 className="font-bold text-gray-900 leading-snug">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="text-lg font-semibold text-gray-800 mb-4">Sound like you? Start your free trial.</p>
          <CTAPair />
        </div>
      </section>

      {/* ── 4. PAIN POINTS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Sound Familiar? You&apos;re Not Alone — and You Don&apos;t Need an Enterprise Budget to Fix It.
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            These are the top three inventory problems killing margins for growing Shopify and WooCommerce merchants. Verve solves all three. Setup takes 10 minutes.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left mb-10">
            {[
              {
                title: 'Top sellers go out of stock',
                body: 'You lose the sale, the customer goes elsewhere, and your ranking takes a hit.',
              },
              {
                title: "Cash tied up in inventory that won't move",
                body: 'Dead stock drains your working capital and eats warehouse space month after month.',
              },
              {
                title: 'Hours lost in spreadsheets every week',
                body: "CSV exports, VLOOKUP formulas, outdated numbers — and you're still getting it wrong.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-6 border border-red-50">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mb-4"
                  style={{ backgroundColor: 'rgb(239, 68, 68)' }}
                >
                  ✕
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <blockquote
            className="italic text-gray-600 text-lg max-w-2xl mx-auto border-l-4 pl-4 text-left mb-10"
            style={{ borderColor: 'rgb(0, 201, 167)' }}
          >
            I definitely feel the pain. Keeping track of stock with always growing number of SKU&apos;s and vendors
            can be an absolute nightmare. I&apos;ve tried spreadsheets but it tends to add to the headache rather
            than fix it!
            <br /><br />
            <strong>— @HarryL · r/Shopify</strong>
          </blockquote>
          <p className="text-lg font-semibold text-gray-800 mb-4">Fix all three in minutes.</p>
          <CTAPair />
        </div>
      </section>

      {/* ── 5. SOLUTION / HOW IT WORKS ── */}
      <section className="py-16" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Up and Running in Under 10 Minutes
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Connect your store, let the AI do its work, and start making smarter inventory decisions the same day.
            </p>
          </div>
          <div className="mb-12">
            <Image
              src="https://framerusercontent.com/images/bHYogO2oCX4AlIIHhHXdwoJA.png"
              alt="Verve AI Inventory Health Dashboard"
              width={1536}
              height={1024}
              className="w-full h-auto rounded-2xl"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                n: 1,
                title: 'Install & Connect',
                desc: 'Install from the Shopify App Store or WordPress plugin directory. Verve AI syncs your full order history automatically — no CSV uploads.',
              },
              {
                n: 2,
                title: 'AI Builds Your Forecast',
                desc: 'Our forecasting engine analyses velocity, seasonality, and lead times to generate reorder points for every SKU and variant.',
              },
              {
                n: 3,
                title: 'Manage Everything in One Place',
                desc: 'Run reports, manage suppliers, track stock health across all your locations, and push reorders — all from one dashboard.',
              },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-4"
                  style={{ backgroundColor: 'rgb(0, 201, 167)' }}
                >
                  {n}
                </div>
                <h4 className="text-lg font-bold mb-2">{title}</h4>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <CTAPair label="Get your first forecast in under 10 minutes" />
          </div>
        </div>
      </section>

      {/* ── 6. PLATFORM CAPABILITIES GRID ── */}
      <section className="py-20" style={{ backgroundColor: 'rgb(19, 33, 68)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Glow blobs */}
          <div className="relative">
            <div
              className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
              style={{ backgroundColor: 'rgb(0, 201, 167)', transform: 'translate(-30%, -30%)' }}
            />
            <div
              className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
              style={{ backgroundColor: 'rgb(128, 72, 245)', transform: 'translate(30%, 30%)' }}
            />
          </div>
          <div className="text-center mb-12 relative">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Everything Your Inventory Operations Need — In One App
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Enterprise inventory tools charge you $500/month for this feature set and assign you an onboarding manager. We built it all into one $19.99 app — and you can figure it out yourself on day one.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 relative">
            {[
              {
                accent: 'rgb(0, 201, 167)',
                title: 'Know Your Stock Health at a Glance',
                bullets: [
                  'Days of cover, healthy vs at-risk counts, and dead stock across your full catalogue',
                  'Velocity alerts flag declining products before they become a problem',
                  'Sell-through rate with confidence scoring and reconciliation flags',
                  'At-risk stock ranked by urgency so you know what needs a decision today',
                ],
              },
              {
                accent: 'rgb(128, 72, 245)',
                title: 'One Dashboard for Every Location',
                bullets: [
                  'Per-location forecasts, reorder points, and live stock levels',
                  'One-click inventory pushes to Shopify across all your locations',
                  'True network visibility across warehouses, stores, and 3PLs',
                  'Receive purchase orders into the right location, reflected immediately in Shopify',
                ],
              },
              {
                accent: 'rgb(128, 72, 245)',
                title: 'Know Which Suppliers Are Actually Performing',
                bullets: [
                  'Live scorecards: OTIF rate, fill rate, avg lead time, 90-day spend',
                  'Lead-time trend chart — actual vs quoted across recent receipts',
                  'Rank multiple suppliers per product (primary / secondary / backup)',
                  'CSV pricelist import with cost change preview before you commit',
                ],
              },
              {
                accent: 'rgb(0, 201, 167)',
                title: '10 Reports Built for Inventory Operators',
                bullets: [
                  'Stock Health: Inventory Valuation, Stock Movement, Dead Stock & Overstock, Stockout History',
                  'Purchasing: PO History, Reorder Cadence, Supplier Performance',
                  'Sales: Top/Bottom Performers, Velocity Trends, Sell-Through Rate',
                  'All reports: date-range picker, CSV export, and confidence flags',
                ],
              },
            ].map(({ accent, title, bullets }) => (
              <div
                key={title}
                className="rounded-2xl p-8 flex flex-col gap-5"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="h-1 rounded-full w-16" style={{ backgroundColor: accent }} />
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <ul className="flex flex-col gap-2">
                  {bullets.map((b) => (
                    <li key={b} className="text-sm leading-relaxed flex gap-2" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      <span style={{ color: accent, flexShrink: 0 }}>→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 relative">
            <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>
              Explore All Features — Shopify
            </CTAButton>
            <p className="text-sm mt-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
              WooCommerce?{' '}
              <a
                href={WOOCOMMERCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-100 transition-opacity"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                Install the plugin →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. COMPETITOR COMPARISON TABLE ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Growing Merchants Choose Verve Over the Alternatives
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enterprise tools are built for enterprise teams. Verve is built for you.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-4 pr-6 text-gray-500 font-semibold w-1/3"></th>
                  <th className="text-center py-4 px-4 text-gray-500 font-semibold w-1/3">Enterprise Tools</th>
                  <th className="text-center py-4 px-4 font-bold w-1/3 rounded-t-xl" style={{ backgroundColor: 'rgb(0, 201, 167)', color: 'white' }}>
                    Verve AI
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Monthly cost', enterprise: '$49–$500+ (GMV-tiered)', verve: '$19.99 flat' },
                  { feature: 'Setup time', enterprise: 'Weeks (requires CSM)', verve: 'Under 10 minutes' },
                  { feature: 'Contracts', enterprise: 'Annual lock-in common', verve: 'Month-to-month' },
                  { feature: 'Onboarding', enterprise: 'Dedicated manager required', verve: 'Self-serve, no calls' },
                  { feature: 'Pricing model', enterprise: 'Scales with your revenue', verve: 'Fixed — grow for free' },
                  { feature: 'Trial', enterprise: 'Demo call first', verve: '14-day free trial, instant' },
                  { feature: 'Cancellation', enterprise: 'Email + notice period', verve: 'Cancel in 60 seconds' },
                ].map(({ feature, enterprise, verve }, i, arr) => (
                  <tr
                    key={feature}
                    className={i < arr.length - 1 ? 'border-b border-gray-100' : ''}
                  >
                    <td className="py-4 pr-6 font-medium text-gray-700">{feature}</td>
                    <td className="py-4 px-4 text-center text-gray-500">{enterprise}</td>
                    <td
                      className={`py-4 px-4 text-center font-semibold ${i === arr.length - 1 ? 'rounded-b-xl' : ''}`}
                      style={{ backgroundColor: 'rgba(0, 201, 167, 0.08)', color: 'rgb(0, 150, 120)' }}
                    >
                      {verve}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-600 mt-8 mb-6 italic">
            We built Verve for merchants who want real forecasting power without the enterprise tax.
          </p>
          <div className="flex justify-center">
            <CTAPair />
          </div>
        </div>
      </section>

      {/* ── 8. COMPARISON (WITH / WITHOUT) ── */}
      <section className="py-16" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">With Verve vs. Going It Alone</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-green-100">
              <h3 className="font-bold text-lg mb-4" style={{ color: 'rgb(0, 201, 167)' }}>
                ✅ With Verve
              </h3>
              <ul className="flex flex-col gap-3 text-gray-800">
                <li>✅ AI demand forecasts for every SKU — updated daily</li>
                <li>✅ Inventory Health Dashboard with days of cover and risk scoring</li>
                <li>✅ Supplier scorecards: OTIF, fill rate, lead-time trends, cost drift</li>
                <li>✅ Multi-location stock visibility and one-click reorders</li>
                <li>✅ 10 built-in reports — export any dataset to CSV in seconds</li>
                <li>✅ Purchase orders auto-generated from reorder suggestions</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-red-50">
              <h3 className="font-bold text-lg mb-4 text-gray-500">❌ Going It Alone</h3>
              <ul className="flex flex-col gap-3 text-gray-800">
                <li>❌ Manual reorder decisions from memory or outdated spreadsheets</li>
                <li>❌ No visibility into which stock is healthy, at-risk, or dead</li>
                <li>❌ No way to compare supplier reliability across orders</li>
                <li>❌ Blind spots across multiple warehouses and locations</li>
                <li>❌ Separate tools (or nothing) for purchasing, reporting, and suppliers</li>
                <li>❌ Hours per week on CSVs that are stale by the time you open them</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-10">
            <p className="text-lg font-semibold text-gray-800 mb-4">Ready to switch sides?</p>
            <CTAPair />
          </div>
        </div>
      </section>

      {/* ── 9. REPORTS SPOTLIGHT ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              10 Reports Built for Inventory Operators
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stop pulling data from five different places. Every report you need to run a tight inventory operation — already built, date-ranged, and exportable.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                category: 'Stock Health',
                color: 'rgb(0, 201, 167)',
                reports: ['Inventory Valuation', 'Stock Movement', 'Dead Stock & Overstock', 'Stockout History'],
                note: 'Confidence flags on every reconciled metric',
              },
              {
                category: 'Purchasing',
                color: 'rgb(128, 72, 245)',
                reports: ['PO History', 'Reorder Cadence', 'Supplier Performance'],
                note: 'Tracks lead-time trends and supplier reliability over time',
              },
              {
                category: 'Sales',
                color: 'rgb(19, 33, 68)',
                reports: ['Top / Bottom Performers', 'Velocity Trends', 'Sell-Through Rate'],
                note: 'Identify your 80/20 products and slow movers at a glance',
              },
            ].map(({ category, color, reports, note }) => (
              <div key={category} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-white mb-4"
                  style={{ backgroundColor: color }}
                >
                  {category}
                </span>
                <ul className="flex flex-col gap-2 mb-4">
                  {reports.map((r) => (
                    <li key={r} className="text-sm text-gray-700 flex gap-2">
                      <span style={{ color }}>•</span>
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 italic">{note}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            All 10 reports available on day one — no setup required.
          </p>
        </div>
      </section>

      {/* ── 10. SOCIAL PROOF / TESTIMONIALS ── */}
      <section className="py-16" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2">Merchants Are Already Stocking Smarter</h2>
          <p className="text-xl text-gray-600 mb-10">And spending less time doing it</p>

          {/* Badge strip */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
            <a href="https://www.producthunt.com/posts/verve-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-verve&#0045;ai" target="_blank" rel="noopener noreferrer">
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1001054&theme=light"
                alt="Verve AI on Product Hunt"
                width={200}
                height={44}
              />
            </a>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
              <span className="text-sm font-semibold text-gray-700">Shopify App Store</span>
              <span style={{ color: 'rgb(0, 201, 167)' }}>★★★★★</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
              <span className="text-sm font-semibold text-gray-700">WordPress.org</span>
              <span style={{ color: 'rgb(128, 72, 245)' }}>★★★★★</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left mb-12">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
              <p className="text-gray-700 italic leading-relaxed">
                &ldquo;Keeping track of stock with always growing number of SKUs and vendors can be an absolute nightmare. I&apos;ve tried spreadsheets but it tends to add to the headache rather than fix it!&rdquo;
              </p>
              <p className="text-sm font-semibold text-gray-500">@HarryL · r/Shopify</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
              <p className="text-gray-700 italic leading-relaxed">
                &ldquo;We were built on Verve AI. It handles everything from demand forecasting to inventory management. The AI does all the heavy lifting.&rdquo;
              </p>
              <p className="text-sm font-semibold text-gray-500">Verified Shopify Merchant</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
              <p className="text-gray-700 italic leading-relaxed">
                &ldquo;Verve AI is the best forecasting app for Shopify. It&apos;s easy to use and the AI is spot on. I highly recommend it to any e-commerce merchant.&rdquo;
              </p>
              <p className="text-sm font-semibold text-gray-500">Verified WooCommerce Merchant</p>
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-800 mb-4">Join hundreds of merchants stocking smarter</p>
          <CTAPair />
        </div>
      </section>

      {/* ── 11. PRICING ── */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 mb-10">One flat price. No GMV tiers. No onboarding fees. No annual lock-in.</p>
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 text-left">
            <div className="text-center mb-2">
              <span className="text-5xl font-bold text-gray-900">$19.99</span>
              <span className="text-xl text-gray-500 ml-2">/ month USD</span>
            </div>
            <p className="text-center text-sm italic text-gray-400 mb-8">
              Compare: enterprise inventory tools start at $49–$500+/month and scale with your revenue. Verve doesn&apos;t.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                '14-day free trial — no credit card required',
                'AI demand forecasts for every SKU & variant',
                'Inventory Health Dashboard',
                'Multi-location stock management',
                'Supplier management & scorecards',
                '10 built-in inventory reports + CSV export',
                'Purchase order management',
                'Unlimited products & orders',
                '30-day money-back guarantee',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-gray-700">
                  <span style={{ color: 'rgb(0, 201, 167)', flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external className="w-full">
                Start Free Trial — Shopify
              </CTAButton>
              <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external className="w-full">
                Start Free Trial — WooCommerce
              </CTAButton>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">30-day money-back guarantee · Cancel anytime</p>
        </div>
      </section>

      {/* ── 12. FAQ ── */}
      <section className="py-16" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Common Questions</h2>
          <div className="flex flex-col">
            {[
              {
                q: 'Is there a free trial?',
                a: "Yes. 14-day free trial, no credit card required. Just install and start. You'll only be charged if you decide to keep using Verve AI after the trial ends.",
              },
              {
                q: 'How much does Verve AI cost?',
                a: '$19.99/month USD. One plan, everything included — no per-SKU charges, no GMV tiers, no order volume restrictions, no hidden fees. Enterprise tools charge $49–$500+/month for a similar feature set.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. Cancel directly from your Shopify admin or WordPress dashboard. No notice period, no cancellation fees, no calls required.',
              },
              {
                q: 'Does Verve AI work with WooCommerce?',
                a: 'Yes. Verve AI is available for both Shopify and WooCommerce. Install from the WordPress plugin directory to get started.',
              },
              {
                q: 'Is my store data secure?',
                a: "Verve AI uses Shopify's secure OAuth system and encrypts all data in transit and at rest. We never share your store data with third parties.",
              },
            ].map(({ q, a }, i, arr) => (
              <div
                key={q}
                className={`py-7 ${i < arr.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <h3 className="font-bold text-lg text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            More questions?{' '}
            <Link href="/faq" className="underline hover:opacity-80" style={{ color: 'rgb(0, 201, 167)' }}>
              See the full FAQ →
            </Link>
          </p>
        </div>
      </section>

      {/* ── 13. FINAL CTA ── */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, rgb(19, 33, 68) 0%, rgb(128, 72, 245) 100%)' }}
      >
        <div className="max-w-2xl mx-auto px-4 text-center relative overflow-hidden">
          <div
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: 'rgb(0, 201, 167)', transform: 'translateY(-50%)' }}
          />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 relative">
            The Inventory Forecasting Tool Built for Your Size of Business
          </h2>
          <p className="text-lg mb-8 relative" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Not enterprise. Not basic. Built for growing Shopify and WooCommerce merchants who want real forecasting — at a price that makes sense.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6 relative">
            <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>
              Start Free Trial — Shopify
            </CTAButton>
            <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="md" external>
              Start Free Trial — WooCommerce
            </CTAButton>
          </div>
          <p className="text-sm relative" style={{ color: 'rgba(255,255,255,0.5)' }}>
            $19.99/month · 14-day free trial · 30-day money-back guarantee
          </p>
        </div>
      </section>

    </div>
  )
}
