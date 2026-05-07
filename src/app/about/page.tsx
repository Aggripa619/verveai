import type { Metadata } from 'next'
import CTAButton from '@/components/CTAButton'
import { SHOPIFY_URL, WOOCOMMERCE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About Verve AI — Built for Independent Shopify & WooCommerce Merchants',
  description:
    'Verve AI was built by e-commerce operators who were tired of enterprise inventory tools that cost a fortune and take weeks to set up. $19.99/month. No contracts. No complexity.',
  alternates: { canonical: 'https://www.getverveai.com/about' },
  openGraph: {
    title: 'About Verve AI — Built for Independent Shopify & WooCommerce Merchants',
    description:
      'Verve AI was built by e-commerce operators who were tired of enterprise inventory tools that cost a fortune and take weeks to set up. $19.99/month. No contracts. No complexity.',
    url: 'https://www.getverveai.com/about',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* ── Origin Story ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgb(0, 201, 167)' }}>
            Our story
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8">
            We Built Verve Because We Needed It Ourselves
          </h1>
          <div className="flex flex-col gap-5 text-lg text-gray-700 leading-relaxed">
            <p>
              We&apos;ve run e-commerce stores. We know what it feels like to wake up and find your bestseller is out of stock — again. We know the Sunday evening spreadsheet drill: export from Shopify, paste into Excel, wrestle with VLOOKUPs that were already wrong by the time you opened the file, and still end up ordering on gut feel.
            </p>
            <p>
              We looked at the tools designed to fix this. The enterprise options — Prediko, Inventory Planner, Cin7 — were built for operations teams at $10M+ brands. Getting started meant booking a demo, waiting for an onboarding call, and paying $100–$500/month before we&apos;d seen a single forecast. For a three-person team running a Shopify store, that&apos;s not a solution. That&apos;s a new problem.
            </p>
            <p>
              So we built Verve. AI-powered inventory forecasting that a small team can install in ten minutes, understand without a training session, and afford without a finance meeting.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="py-16" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Who We Built This For
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl">
            Verve isn&apos;t trying to serve everyone. It&apos;s built for a specific kind of merchant — and if this sounds like you, you&apos;re exactly who we had in mind.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🧑‍💼',
                title: 'You wear multiple hats',
                body: "You're the buyer, the ops manager, and probably the customer service team too. You don't have time to master complex software. Verve is designed to surface the decision — not make you hunt for it.",
              },
              {
                icon: '📦',
                title: "You've outgrown spreadsheets",
                body: "Your SKU count has grown past the point where a spreadsheet is manageable. You need real demand signals, not a formula you maintain by hand. But you don't need a six-figure ops platform either.",
              },
              {
                icon: '📈',
                title: "You're growing — but not enterprise",
                body: "You're doing real revenue — $250k to $5M a year — but enterprise software is priced for brands ten times your size. You need the forecasting accuracy without the enterprise tax.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100">
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Believe ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-10">
            What We Believe
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                accent: 'rgb(0, 201, 167)',
                title: 'Simplicity is a feature, not a compromise',
                body: "If you need an onboarding call to understand a forecasting tool, the tool has failed. Verve is designed to be self-evident. Install it, connect your store, and start making better decisions the same day.",
              },
              {
                accent: 'rgb(128, 72, 245)',
                title: "Your price shouldn't scale with your success",
                body: "Most enterprise tools charge more as your revenue grows. We think that's backwards. Verve is $19.99/month — flat. Whether you have 100 SKUs or 5,000, the price doesn't change.",
              },
              {
                accent: 'rgb(0, 201, 167)',
                title: 'Small teams deserve powerful tools',
                body: "A three-person brand competing against a 50-person operation shouldn't also be competing with inferior data. Verve gives independent merchants the same forecasting accuracy that enterprise teams pay ten times more for.",
              },
              {
                accent: 'rgb(128, 72, 245)',
                title: 'You should be able to leave anytime',
                body: "We don't believe in lock-in. No annual contracts, no cancellation fees, no notice periods. If Verve isn't working for you, you cancel in your Shopify admin and that's it. We'd rather earn your subscription every month.",
              },
            ].map(({ accent, title, body }) => (
              <div key={title} className="rounded-2xl p-6 border border-gray-100 bg-gray-50">
                <div className="w-1 h-8 rounded-full mb-4" style={{ backgroundColor: accent }} />
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Verve Is Today ── */}
      <section className="py-16" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Verve Is Today</h2>
          <div className="flex flex-col gap-4 text-lg text-gray-700 leading-relaxed">
            <p>
              Verve started as a demand forecasting tool. It&apos;s grown into a full inventory operations platform — and we&apos;re still building.
            </p>
            <p>
              Today, Verve gives you AI demand forecasts for every SKU and variant, an Inventory Health Dashboard that shows you days of cover and at-risk stock at a glance, supplier scorecards, multi-location stock management, 10 built-in reports, and a 24/7 AI Agent that monitors your inventory around the clock — flagging low stock, demand spikes, and dead stock, and generating purchase orders you can approve in one click.
            </p>
            <p>
              All of it for $19.99/month. Available on Shopify and WooCommerce. No enterprise contracts required.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, rgb(19, 33, 68) 0%, rgb(128, 72, 245) 100%)' }}
      >
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            Try It Free for 14 Days
          </h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            No credit card. No onboarding call. No annual contract.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>
              Start Free Trial — Shopify
            </CTAButton>
            <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external>
              Start Free Trial — WooCommerce
            </CTAButton>
          </div>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            $19.99/month after trial · 30-day money-back guarantee
          </p>
        </div>
      </section>

    </div>
  )
}
