import type { Metadata } from 'next'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'
import { SHOPIFY_URL, WOOCOMMERCE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Why Verve AI — Features Built for Independent Merchants',
  description:
    'AI Agent, 10 built-in reports, supplier scorecards, multi-location stock management, and a competitor comparison. See everything inside Verve AI — $19.99/month.',
  alternates: { canonical: 'https://www.getverveai.com/why-verve-ai' },
  openGraph: {
    title: 'Why Verve AI — Features Built for Independent Merchants',
    description:
      'AI Agent, 10 built-in reports, supplier scorecards, multi-location stock management, and a competitor comparison. See everything inside Verve AI — $19.99/month.',
    url: 'https://www.getverveai.com/why-verve-ai',
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

export default function WhyVerveAIPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="py-16 lg:py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgb(0, 201, 167)' }}>
            Why Verve AI
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Everything You Need to Run a Smarter Inventory Operation
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-10">
            A 24/7 AI Agent, full platform capabilities, 10 built-in reports, and transparent pricing — all without the enterprise complexity or price tag.
          </p>
          <CTAPair />
        </div>
      </section>

      {/* ── AI AGENT ── */}
      <section className="py-20" style={{ backgroundColor: 'rgb(19, 33, 68)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: 'rgb(128, 72, 245)', transform: 'translate(20%, -20%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: 'rgb(0, 201, 167)', transform: 'translate(-20%, 20%)' }}
          />
          <div className="text-center mb-12 relative">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: 'rgba(0,201,167,0.15)', color: 'rgb(0, 201, 167)' }}
            >
              AI Agent
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Your 24/7 AI Inventory Manager
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Most merchants don&apos;t have time to check their inventory dashboard every day. Verve&apos;s AI Agent does it for you — watching every SKU around the clock and surfacing exactly what needs your attention, right when it matters.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-start relative">
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: '👁️',
                  title: 'Always watching',
                  body: 'Monitors velocity, stock levels, lead times, and supplier performance — automatically, every single day.',
                },
                {
                  icon: '⚡',
                  title: 'Flags issues before they cost you',
                  body: 'Catches low stock before a stockout, spots demand spikes before you sell out, and surfaces dead stock before it ties up more cash.',
                },
                {
                  icon: '✅',
                  title: 'You stay in control',
                  body: "One-click approve a pre-built purchase order. Snooze what can wait. Dismiss what doesn't apply. Configure thresholds to match your business.",
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <h3 className="font-bold text-white mb-1">{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  accent: 'rgb(0, 201, 167)',
                  icon: '🔴',
                  type: 'Low Stock Alert',
                  title: 'Running Shorts (M)',
                  body: '3 days of stock remaining · Reorder point reached · Suggested: 48 units',
                  action: null,
                },
                {
                  accent: 'rgb(128, 72, 245)',
                  icon: '📈',
                  type: 'Demand Spike',
                  title: 'Protein Powder Vanilla',
                  body: '+185% velocity vs 30-day avg · Stockout risk in 6 days',
                  action: null,
                },
                {
                  accent: 'rgb(0, 201, 167)',
                  icon: '🛒',
                  type: 'Reorder Ready',
                  title: 'Blue Denim Jacket',
                  body: '72 units · Est. cost $2,880 · Supplier prefilled',
                  action: 'Approve PO →',
                },
                {
                  accent: 'rgb(128, 72, 245)',
                  icon: '🧊',
                  type: 'Dead Stock',
                  title: 'Winter Coat (XL)',
                  body: '$4,200 tied up · No sales in 45 days · Action needed',
                  action: null,
                },
              ].map(({ accent, icon, type, title, body, action }) => (
                <div
                  key={type}
                  className="rounded-xl p-4 flex flex-col gap-2"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderLeft: `3px solid ${accent}`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{icon}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>{type}</span>
                  </div>
                  <p className="text-sm font-bold text-white">{title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{body}</p>
                  {action && (
                    <button
                      className="mt-1 self-start text-xs font-bold px-3 py-1.5 rounded-lg"
                      style={{ backgroundColor: accent, color: 'white' }}
                    >
                      {action}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12 relative">
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Configure thresholds to match your business. The agent learns your patterns.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>
                Start Free Trial — Shopify
              </CTAButton>
              <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external>
                Start Free Trial — WooCommerce
              </CTAButton>
            </div>
            <p className="text-sm mt-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
              14-day free trial · No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* ── PLATFORM CAPABILITIES GRID ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything Your Inventory Operations Need — In One App
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enterprise inventory tools charge you $500/month for this feature set and assign you an onboarding manager. We built it all into one $19.99 app — and you can figure it out yourself on day one.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
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
                className="rounded-2xl p-8 flex flex-col gap-5 border border-gray-100"
                style={{ backgroundColor: 'rgb(245, 245, 245)' }}
              >
                <div className="h-1 rounded-full w-16" style={{ backgroundColor: accent }} />
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <ul className="flex flex-col gap-2">
                  {bullets.map((b) => (
                    <li key={b} className="text-sm leading-relaxed flex gap-2 text-gray-600">
                      <span style={{ color: accent, flexShrink: 0 }}>→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPETITOR COMPARISON TABLE ── */}
      <section className="py-16" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
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
            <table className="w-full text-sm bg-white rounded-2xl overflow-hidden shadow-sm">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6 text-gray-500 font-semibold w-1/3 border-b border-gray-100"></th>
                  <th className="text-center py-4 px-4 text-gray-500 font-semibold w-1/3 border-b border-gray-100">Enterprise Tools</th>
                  <th className="text-center py-4 px-4 font-bold w-1/3" style={{ backgroundColor: 'rgb(0, 201, 167)', color: 'white' }}>
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
                  <tr key={feature} className={i < arr.length - 1 ? 'border-b border-gray-100' : ''}>
                    <td className="py-4 px-6 font-medium text-gray-700">{feature}</td>
                    <td className="py-4 px-4 text-center text-gray-500">{enterprise}</td>
                    <td
                      className="py-4 px-4 text-center font-semibold"
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

      {/* ── 10 REPORTS SPOTLIGHT ── */}
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

      {/* ── FINAL CTA ── */}
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
            Ready to See It in Action?
          </h2>
          <p className="text-lg mb-8 relative" style={{ color: 'rgba(255,255,255,0.7)' }}>
            14-day free trial. No credit card. No onboarding call. Up and running in 10 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-4 relative">
            <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>
              Start Free Trial — Shopify
            </CTAButton>
            <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external>
              Start Free Trial — WooCommerce
            </CTAButton>
          </div>
          <p className="text-sm relative" style={{ color: 'rgba(255,255,255,0.5)' }}>
            $19.99/month · 30-day money-back guarantee
          </p>
        </div>
      </section>

    </div>
  )
}
