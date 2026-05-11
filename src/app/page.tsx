import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CTAButton from '@/components/CTAButton'
import { SHOPIFY_URL, WOOCOMMERCE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Verve AI — Inventory Forecasting That Fits Your Business',
  description:
    'AI demand forecasting built for independent Shopify and WooCommerce merchants. $19.99/month flat. 10-minute setup. No contracts, no CSM calls, no enterprise pricing.',
  alternates: {
    canonical: 'https://www.getverveai.com/',
  },
  openGraph: {
    title: 'Verve AI — Inventory Forecasting That Fits Your Business',
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
              Inventory Forecasting That Actually Fits Your Business.
            </h1>
            <p className="text-xl lg:text-2xl font-medium text-gray-700 leading-relaxed">
              AI-powered demand forecasting for Shopify and WooCommerce merchants who want clarity over chaos — without enterprise pricing or complexity.
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
          <p className="text-center text-sm font-medium mt-6" style={{ color: 'rgb(0, 201, 167)' }}>
            <Link href="/why-verve-ai" className="hover:underline">
              Includes AI Agent — 24/7 monitoring, automated alerts, and one-click PO approvals. →
            </Link>
          </p>
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
                title: 'Independent merchants with a small, lean team',
                body: "You're doing purchasing, ops, and customer service. Verve gives you the forecasting a dedicated inventory team would have — without the headcount.",
              },
              {
                icon: '📦',
                title: 'Growing brands with a catalogue that\'s hard to manage manually',
                body: "Big enough to need real demand forecasting. Smart enough not to pay enterprise prices for it.",
              },
              {
                icon: '📈',
                title: 'Stores that have outgrown spreadsheets but not ready for complex enterprise software',
                body: "You need accurate forecasting and clear inventory data — without the lengthy onboarding, steep learning curve, or enterprise price tag.",
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

      {/* ── 4. SOLUTIONS ── */}
      <section className="py-16" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Take Control of Your Inventory — Without the Complexity
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Verve gives growing Shopify and WooCommerce merchants the tools to stock smarter. No spreadsheets, no enterprise overhead, no guesswork.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left mb-10">
            {[
              {
                accent: 'rgb(0, 201, 167)',
                title: 'Never run out of your best sellers',
                body: 'Know exactly when to reorder — before you hit zero.',
              },
              {
                accent: 'rgb(128, 72, 245)',
                title: "Stop cash sitting in stock that won't sell",
                body: 'Spot slow movers early and act before they become a write-off.',
              },
              {
                accent: 'rgb(19, 33, 68)',
                title: 'Ditch the spreadsheets',
                body: 'Forecasts, reorder suggestions, and supplier data — always current, zero manual work.',
              },
            ].map(({ accent, title, body }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-8 text-left shadow-sm overflow-hidden"
                style={{ borderTop: `4px solid ${accent}` }}
              >
                <div
                  className="text-4xl font-bold mb-5"
                  style={{ color: accent }}
                >
                  ✓
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
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

      {/* ── 5. HOW IT WORKS ── */}
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

      {/* ── 6. PRICING ── */}
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
                'AI Agent — 24/7 monitoring & one-click PO approvals',
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

      {/* ── 7. FAQ ── */}
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

      {/* ── 8. FINAL CTA ── */}
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
