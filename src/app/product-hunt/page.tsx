import type { Metadata } from 'next'
import Image from 'next/image'
import CTAButton from '@/components/CTAButton'
import { SHOPIFY_URL, WOOCOMMERCE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Verve AI — AI Inventory Agent for Shopify & WooCommerce | Product Hunt',
  description:
    'Verve AI spots demand spikes, flags dead stock, and generates purchase orders — powered by AI. Try free for 14 days. No credit card required.',
  robots: { index: false },
  alternates: { canonical: 'https://www.getverveai.com/product-hunt' },
  openGraph: {
    title: 'Verve AI — AI Inventory Agent for Shopify & WooCommerce',
    description:
      'Verve AI spots demand spikes, flags dead stock, and generates purchase orders — powered by AI. Try free for 14 days.',
    url: 'https://www.getverveai.com/product-hunt',
    type: 'website',
    images: [
      {
        url: 'https://framerusercontent.com/images/StWC6Ozq4IMVMqDQN0ZuXzZYq0A.png',
        width: 1024,
        height: 1024,
        alt: 'Verve AI Agent Feed Dashboard',
      },
    ],
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

const REASONS = [
  {
    icon: '🚨',
    title: 'Never stock out on your best sellers',
    body: "Verve's AI watches sales velocity around the clock. The moment a demand spike appears, you get an alert in your Agent Feed — with a suggested reorder quantity — before you run out.",
  },
  {
    icon: '💸',
    title: 'Stop tying up cash in dead stock',
    body: 'The Dead Stock & Overstock report shows exactly which SKUs are draining your capital, how long they\'ll take to clear, and how much money is sitting idle on your shelves.',
  },
  {
    icon: '⚡',
    title: 'Replace your spreadsheet in 10 minutes',
    body: 'Connect Shopify or WooCommerce and Verve starts analysing your entire catalogue immediately. AI-powered forecasts, lead time coverage, and purchase order tracking — all in one place.',
  },
]

const STEPS = [
  {
    n: '1',
    title: 'Connect your store',
    body: 'Install on Shopify or WooCommerce in under 10 minutes. No onboarding call, no CSV uploads — Verve syncs your product, order, and inventory data automatically.',
  },
  {
    n: '2',
    title: 'AI builds your forecasts',
    body: 'Verve analyses historical velocity, detects demand spikes, and calculates lead time coverage for every SKU. Risks surface in your Agent Feed as actionable alerts.',
  },
  {
    n: '3',
    title: 'Act on recommendations',
    body: 'Acknowledge alerts, create purchase orders in one click, snooze low-priority items, or dismiss false positives. Everything tracked, nothing slipping through the cracks.',
  },
]

const FEATURES = [
  'AI Agent Feed with real-time alerts',
  'Demand spike detection & stockout risk warnings',
  'Dead stock & overstock exposure reports',
  'AI demand forecasting & lead time coverage',
  'Purchase order creation, tracking & receiving',
  'Supplier catalogue with cost tracking',
  'Price change detection across POs',
  'Sales velocity analysis (7-day vs 30-day)',
  'Multi-variant SKU support',
  'Shopify & WooCommerce native',
]

const SCREENSHOTS = [
  {
    src: '/screenshots/agent-feed.png',
    alt: 'Verve AI Agent Feed — AI-powered inventory alerts and recommendations',
    caption: 'Agent Feed',
  },
  {
    src: '/screenshots/dead-stock-report.png',
    alt: 'Dead Stock & Overstock Exposure Report — capital tied up by SKU',
    caption: 'Dead Stock & Overstock Report',
  },
  {
    src: '/screenshots/purchase-order.png',
    alt: 'Purchase Order tracking — create, send, and receive POs in one place',
    caption: 'Purchase Order Tracking',
  },
  {
    src: '/screenshots/price-changes.png',
    alt: 'Track supplier price changes across purchase orders',
    caption: 'Price Change Tracking',
  },
]

export default function ProductHuntPage() {
  return (
    <div className="bg-white">

      {/* ── 1. HERO ── */}
      <section
        className="py-16 lg:py-24"
        style={{ background: 'linear-gradient(135deg, rgb(19,33,68) 0%, rgb(40,55,100) 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-8 items-center">

          {/* PH badge */}
          <span
            className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full text-white"
            style={{ backgroundColor: 'rgba(128,72,245,0.85)' }}
          >
            👋 Hey Product Hunter — welcome
          </span>

          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            Easy install, get your first actions in minutes.
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
            Connect your store and Verve immediately flags stockout risks, demand spikes, and dead stock — no CSV uploads, no onboarding call.
          </p>

          {/* Risk reducers */}
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
            {[
              { icon: '⚡', text: '10-minute setup' },
              { icon: '🆓', text: '14-day free trial' },
              { icon: '💳', text: 'No credit card required' },
              { icon: '📦', text: 'Cancel anytime' },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-white"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>
              Install Free — Shopify
            </CTAButton>
            <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external>
              Install Free — WooCommerce
            </CTAButton>
          </div>

          <p className="text-sm text-gray-400">Trusted by independent merchants. No enterprise contracts. No GMV tiers.</p>

        </div>
      </section>

      {/* ── 2. TRUST BAR ── */}
      <section className="py-10 border-y border-gray-100">
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

      {/* ── 3. 3 REASONS ── */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              3 Reasons to Try Verve AI
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for independent Shopify and WooCommerce merchants who are serious about inventory — without enterprise pricing or complexity.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REASONS.map(({ icon, title, body }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4"
                style={{ borderLeft: '4px solid rgb(0, 201, 167)' }}
              >
                <span className="text-4xl">{icon}</span>
                <h3 className="text-lg font-bold text-gray-900 leading-snug">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. VIMEO VIDEO ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              See Verve AI in Action
            </h2>
            <p className="text-gray-600">
              2-minute walkthrough of the Agent Feed, demand forecasting, and purchase order workflow
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-900">
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              <iframe
                src="https://player.vimeo.com/video/1196477526?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                title="AI Inventory Assistant for Shopify Stores - Verve AI Demo"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. SUPADEMO TOUR ── */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Full product demo
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-50 p-2">
            <div style={{ position: 'relative', paddingTop: 'calc(49.26% + 80px)' }}>
              <iframe
                src="https://app.supademo.com/embed/cmpvpjdqb5bwxqmy7eq8b1ght?embed_v=2&utm_source=embed"
                loading="lazy"
                title="Manage Purchase Orders and Inventory Analytics in Shopify"
                allow="clipboard-write"
                frameBorder="0"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. SCREENSHOT GALLERY ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need. Nothing You Don&apos;t.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A complete inventory operations platform built for speed — not for enterprise sales cycles.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {SCREENSHOTS.map(({ src, alt, caption }) => (
              <div key={caption} className="flex flex-col gap-2">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                  <Image
                    src={src}
                    alt={alt}
                    width={800}
                    height={520}
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-sm font-medium text-gray-500 text-center">{caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. HOW IT WORKS ── */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: 'rgb(19, 33, 68)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Up and Running in 10 Minutes
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              No onboarding call. No CSV import. No dedicated CSM. Just connect and go.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map(({ n, title, body }) => (
              <div key={n} className="flex flex-col gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                  style={{ backgroundColor: 'rgb(0, 201, 167)' }}
                >
                  {n}
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Image
              src="https://framerusercontent.com/images/bHYogO2oCX4AlIIHhHXdwoJA.png"
              alt="Verve AI Lead Time Coverage Analysis dashboard"
              width={1200}
              height={700}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ── 8. FORECASTING CALLOUT ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Know Which SKUs Will Run Out Before Your Next Reorder Lands
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Verve&apos;s Lead Time Coverage Analysis calculates demand during your supplier&apos;s lead time for every product variant — so you can reorder at exactly the right moment, not too early and not too late.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Coverage status per variant', color: 'rgb(0, 201, 167)' },
                  { label: 'Lead time demand forecast', color: 'rgb(128, 72, 245)' },
                  { label: 'Out of stock alerts', color: 'rgb(19, 33, 68)' },
                ].map(({ label, color }) => (
                  <span
                    key={label}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                    style={{ backgroundColor: color }}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>
                  Start Free Trial — Shopify
                </CTAButton>
                <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external>
                  Start Free Trial — WooCommerce
                </CTAButton>
              </div>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <Image
                  src="/screenshots/lead-time-coverage.png"
                  alt="AI Demand Forecasting — Lead Time Coverage Analysis by SKU"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. PRICING ── */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            One plan. Every feature. No GMV tiers, no per-SKU fees, no hidden onboarding charges.
          </p>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-left">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-bold text-gray-900">$19.99</span>
              <span className="text-lg text-gray-500">/ month</span>
            </div>
            <p className="text-sm text-gray-500 mb-8">After 14-day free trial. Month-to-month, cancel anytime.</p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 flex-shrink-0 font-bold" style={{ color: 'rgb(0, 201, 167)' }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <CTAPair />
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ── */}
      <section
        className="py-20 lg:py-28"
        style={{ background: 'linear-gradient(135deg, rgb(19, 33, 68) 0%, rgb(128, 72, 245) 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-8 items-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
            Launch on Product Hunt.<br />Ship Inventory Confidence.
          </h2>
          <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Join Shopify and WooCommerce merchants using Verve AI to forecast smarter, order less, and never miss a sale.
          </p>
          <CTAPair />
        </div>
      </section>

    </div>
  )
}
