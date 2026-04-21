import type { Metadata } from 'next'
import Image from 'next/image'
import CTAButton from '@/components/CTAButton'
import { SHOPIFY_URL, WOOCOMMERCE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Verve AI - AI E-Commerce Forecasting Software',
  description:
    'Verve AI Forecasting helps e-commerce brands precisely predict demand—no spreadsheets, no guesswork. Smarter inventory planning starts here.',
  alternates: {
    canonical: 'https://www.getverveai.com/',
  },
  openGraph: {
    title: 'Verve AI - AI E-Commerce Forecasting Software',
    description:
      'Verve AI Forecasting helps e-commerce brands precisely predict demand—no spreadsheets, no guesswork. Smarter inventory planning starts here.',
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
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: product screenshot */}
          <div className="order-2 lg:order-1">
            <Image
              src="https://framerusercontent.com/images/StWC6Ozq4IMVMqDQN0ZuXzZYq0A.png"
              alt="Verve AI Helping You Run Your Shopify Store With Ease"
              width={1024}
              height={1024}
              priority
              className="w-full h-auto rounded-2xl"
            />
          </div>
          {/* Right: headline + CTAs */}
          <div className="order-1 lg:order-2 flex flex-col gap-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Stop Stockouts. Stop Overstocking. Start Profiting.
            </h1>
            <p className="text-xl lg:text-2xl font-medium text-gray-700 leading-relaxed">
              Verve AI gives Shopify and WooCommerce merchants AI-powered demand forecasts — so you always know what to order, and when.
            </p>
            <CTAPair />
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-10">
            Is Your Inventory Costing You Thousands?
          </h2>
          <div className="flex flex-col gap-4 text-left max-w-2xl mx-auto mb-10">
            <p className="text-xl font-medium text-gray-900">
              ❌ &nbsp;Stockouts? Losing customers because you&apos;re always out of top sellers?
            </p>
            <p className="text-xl font-medium text-gray-900">
              ❌ &nbsp;Overstocking? Dead stock is draining your cash flow.
            </p>
            <p className="text-xl font-medium text-gray-900">
              ❌ &nbsp;Guessing? Forecasting with exports and spreadsheets which are time-consuming and inaccurate.
            </p>
          </div>
          <blockquote
            className="italic text-gray-600 text-lg max-w-2xl mx-auto border-l-4 pl-4 text-left mb-10"
            style={{ borderColor: 'rgb(0, 201, 167)' }}
          >
            I definitely feel the pain. Keeping track of stock with always growing number of SKU&apos;s and vendors
            can be an absolute nightmare. I&apos;ve tried spreadsheets but it tends to add to the headache rather
            than fix it!
            <br /><br />
            <strong>— @HarryL@M R/Shopify</strong>
          </blockquote>
          <p className="text-lg font-semibold text-gray-800 mb-4">Sound familiar? Fix it in minutes.</p>
          <CTAPair />
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">The Solution?</h2>
            <h3 className="text-xl text-gray-700 max-w-2xl mx-auto">
              Sign up to Verve AI, sync your data in minutes and begin working with actionable insights and data.
            </h3>
          </div>
          <div className="mb-12">
            <Image
              src="https://framerusercontent.com/images/bHYogO2oCX4AlIIHhHXdwoJA.png"
              alt="Verve AI Take Away The Forecast Guessing Games"
              width={1536}
              height={1024}
              className="w-full h-auto rounded-2xl"
            />
          </div>
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Better Forecasts = More Sales</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { n: 1, title: 'Sign Up & Sync', desc: 'Instantly sync with your Shopify store' },
              {
                n: 2,
                title: 'AI Demand Forecasting',
                desc: "Let Verve AI analyze your store's sales data and provide tailored forecasts for each product.",
              },
              {
                n: 3,
                title: 'You Profit More',
                desc: 'Reduce stockouts, cut excess inventory, and maximize cash flow.',
              },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
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
            <CTAPair label="Get your first forecast in minutes" />
          </div>
        </div>
      </section>

      {/* With / Without comparison */}
      <section className="py-16" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-10">With Verve vs. Without</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-green-100">
              <h4 className="font-bold text-lg mb-4" style={{ color: 'rgb(0, 201, 167)' }}>
                ✅ With Verve
              </h4>
              <ul className="flex flex-col gap-3 text-gray-800">
                <li>✅ Effortless accuracy – Know exactly what to stock and when, with zero guesswork</li>
                <li>✅ Automated insights – Daily forecasts without spreadsheets or manual entry</li>
                <li>✅ Profit clarity – Instantly see which products make or lose you money</li>
                <li>✅ Peace of mind – No more stockouts, over-ordering, or inventory surprises</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-red-50">
              <h4 className="font-bold text-lg mb-4 text-gray-500">❌ Without Verve</h4>
              <ul className="flex flex-col gap-3 text-gray-800">
                <li>❌ Inventory guessing games – unsure of when, what and how many to order.</li>
                <li>❌ Missed sales – Stockouts hurt your reputation and revenue</li>
                <li>❌ Spreadsheet chaos – Hours wasted on manual updates, CSV exports and messy formulas</li>
                <li>❌ Tied-up cash – Overstocking eats into margins and cash flow</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-10">
            <p className="text-lg font-semibold text-gray-800 mb-4">Ready to switch sides?</p>
            <CTAPair />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h4 className="text-3xl lg:text-4xl font-bold mb-2">Spend Less Time on Inventory Management</h4>
          <p className="text-xl text-gray-600 mb-10">And More Time To Build Your Business</p>
          <div className="grid md:grid-cols-3 gap-6 text-left mb-12">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
              <p className="text-gray-700 italic leading-relaxed">
                &ldquo;Keeping track of stock with always growing number of SKUs and vendors can be an absolute nightmare. I&apos;ve tried spreadsheets but it tends to add to the headache rather than fix it!&rdquo;
              </p>
              <p className="text-sm font-semibold text-gray-500">@HarryL · r/Shopify</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
              <p className="text-gray-700 italic leading-relaxed">
                &ldquo;We were built on Verve AI. It handles everything from demand forecasting to inventory management. The AI does all the heavy lifting.&rdquo;
              </p>
              <p className="text-sm font-semibold text-gray-500">Verve AI · Shopify merchant</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
              <p className="text-gray-700 italic leading-relaxed">
                &ldquo;Verve AI is the best forecasting app for Shopify. It&apos;s easy to use and the AI is spot on. I highly recommend it to any e-commerce merchant.&rdquo;
              </p>
              <p className="text-sm font-semibold text-gray-500">Verve AI · WooCommerce merchant</p>
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-800 mb-4">Join hundreds of merchants forecasting smarter</p>
          <CTAPair />
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg, rgb(19, 33, 68) 0%, rgb(128, 72, 245) 100%)' }}
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Your inventory. Under control. Starting today.
          </h2>
          <p className="text-lg text-white/80 mb-8">14-day free trial · No credit card required · Cancel anytime</p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>
              Start Free Trial — Shopify
            </CTAButton>
            <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external>
              Start Free Trial — WooCommerce
            </CTAButton>
          </div>
          <p className="text-sm text-white/60">30-day money-back guarantee</p>
        </div>
      </section>
    </div>
  )
}
