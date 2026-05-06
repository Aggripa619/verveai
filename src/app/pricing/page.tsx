import type { Metadata } from 'next'
import CTAButton from '@/components/CTAButton'
import { SHOPIFY_URL, WOOCOMMERCE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Verve AI - AI E-Commerce Forecasting Software',
  description:
    'Verve AI Forecasting helps e-commerce brands precisely predict demand—no spreadsheets, no guesswork. Smarter inventory planning starts here.',
  alternates: { canonical: 'https://www.getverveai.com/pricing' },
  openGraph: {
    title: 'Verve AI - AI E-Commerce Forecasting Software',
    description:
      'Verve AI Forecasting helps e-commerce brands precisely predict demand—no spreadsheets, no guesswork. Smarter inventory planning starts here.',
    url: 'https://www.getverveai.com/pricing',
    type: 'website',
  },
}

const faqs = [
  {
    q: 'Can I try Verve AI before paying?',
    a: "Yes — you can install Verve AI and explore all features during the free trial period. You'll only be charged once you decide to keep using the app after the trial ends. There are no hidden fees or setup charges.",
  },
  {
    q: 'Do I need a credit card to start the trial?',
    a: "No. Shopify handles all billing directly through your Shopify account, so you won't need to enter payment details separately. You'll see the subscription appear in your Shopify billing dashboard once the trial ends.",
  },
  {
    q: 'Can I cancel anytime?',
    a: "Absolutely. You're in full control. If you decide Verve AI isn't right for your business, you can uninstall the app or cancel your subscription directly from your Shopify admin — no email requests or notice periods required.",
  },
  {
    q: "Will Verve AI affect my store's performance?",
    a: "Not at all. Verve AI runs entirely in the background and connects directly to your Shopify API — it doesn't add scripts or tracking code that might slow your storefront.",
  },
  {
    q: 'Do I need any technical setup?',
    a: 'No. Verve AI connects automatically to your Shopify data — just install the app and it will start analyzing your orders and inventory within minutes.',
  },
  {
    q: 'Who can I contact if I need help?',
    a: "You can reach our support team anytime via in-app chat or email. We're happy to help with setup, forecasting insights, or anything else you need to get the most value from Verve AI.",
  },
  {
    q: 'Is my store data secure?',
    a: "Yes — your data is completely safe. Verve AI connects to your store using Shopify's secure OAuth system, which ensures we only access the information needed to generate forecasts. All data is encrypted both in transit and at rest, and we never share or store your Shopify access tokens outside of secure servers. Your privacy and store security are always our top priority.",
  },
]

export default function PricingPage() {
  return (
    <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
      {/* Header */}
      <section className="bg-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Simple Pricing</h1>
          <p className="text-lg text-gray-600">Sign up in minutes and connect your store within minutes.</p>
        </div>
      </section>

      {/* Pricing card */}
      <section className="py-16">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 text-center">
            <h3 className="text-xl text-gray-500 font-medium mb-2">Take Control of Your Inventory</h3>
            <p className="text-4xl font-bold text-gray-900 mb-6">$24.99<span className="text-lg font-normal text-gray-500">/Month USD</span></p>
            <ul className="flex flex-col gap-3 text-left mb-8">
              {[
                'Free 14 day trial',
                'Connect your store in minutes',
                'Instant re-order suggestions',
                'Variant level SKU forecasts',
                'Customisable lead time data',
                'Full Purchase Order management',
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span style={{ color: 'rgb(0, 201, 167)' }} className="mt-0.5 text-lg">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external className="w-full">
                For Shopify
              </CTAButton>
              <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external className="w-full">
                WooCommerce
              </CTAButton>
            </div>
            <p className="mt-4 text-sm text-gray-500 italic">Enjoy a 14 day free trial and set up in minutes</p>
          </div>
        </div>
      </section>

      {/* Why Verve */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Why choose Verve AI?</h2>
          <p className="text-center text-gray-600 mb-3">
            We&apos;ve been in your shoes, running e-commerce stores, fighting with spreadsheets and CSV exports.
          </p>
          <p className="text-center text-sm text-gray-500 mb-10">
            Built for{' '}
            <a href="/inventory-management-for-clothing-stores" className="underline hover:opacity-80" style={{ color: 'rgb(0, 160, 133)' }}>apparel</a>,{' '}
            <a href="/inventory-management-supplement-brands" className="underline hover:opacity-80" style={{ color: 'rgb(0, 160, 133)' }}>supplements</a>,{' '}
            <a href="/inventory-management-beauty-brands" className="underline hover:opacity-80" style={{ color: 'rgb(0, 160, 133)' }}>beauty</a>,{' '}
            <a href="/inventory-management-pet-supply-brands" className="underline hover:opacity-80" style={{ color: 'rgb(0, 160, 133)' }}>pet supplies</a>, and{' '}
            <a href="/inventory-management-for" className="underline hover:opacity-80 font-medium" style={{ color: 'rgb(0, 160, 133)' }}>8+ more verticals →</a>
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Simple Pricing', desc: 'Easy monthly subscription, with no restriction on product count or order volume.' },
              { title: 'No Hidden Fees', desc: 'Transparent pricing with no surprises.' },
              { title: 'Risk-Free Trial', desc: 'Try all our AI forecasting features for free' },
              { title: 'Cancel Anytime', desc: 'Cancel your plan at any time.' },
            ].map(({ title, desc }) => (
              <div key={title} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <h6 className="font-bold mb-2">{title}</h6>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10">Pricing - FAQ</h2>
          <div className="flex flex-col gap-8">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <h6 className="font-bold text-lg mb-2">{q}</h6>
                <p className="text-gray-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <p className="text-2xl font-bold italic mb-2">Say goodbye to spreadsheets and CSVs</p>
          <p className="text-lg text-gray-600 italic mb-8">Enjoy a 14 day free trial and set up in minutes</p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>For Shopify</CTAButton>
            <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external>WooCommerce</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
