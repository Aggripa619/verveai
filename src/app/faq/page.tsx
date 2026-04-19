import type { Metadata } from 'next'
import CTAButton from '@/components/CTAButton'
import { SHOPIFY_URL, WOOCOMMERCE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'FAQ - Verve AI',
  description:
    'Frequently asked questions about Verve AI demand forecasting and inventory management software for Shopify and WooCommerce.',
  alternates: { canonical: 'https://www.getverveai.com/faq' },
  openGraph: {
    title: 'FAQ - Verve AI',
    description: 'Frequently asked questions about Verve AI.',
    url: 'https://www.getverveai.com/faq',
    type: 'website',
  },
}

const faqs = [
  {
    q: 'What is Verve AI?',
    a: 'Verve AI is an AI-powered demand forecasting and inventory management platform designed for Shopify and WooCommerce merchants. It helps you predict demand, avoid stockouts, reduce overstock, and automate purchase orders.',
  },
  {
    q: 'How does Verve AI work?',
    a: 'Verve AI connects to your Shopify or WooCommerce store via API, analyzes your historical sales data, and generates AI-powered demand forecasts for each of your products and variants. You get instant reorder suggestions, lead time tracking, and full purchase order management.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes! Verve AI offers a 14-day free trial. No credit card required to get started — just install the app and start forecasting.',
  },
  {
    q: 'How much does Verve AI cost?',
    a: 'Verve AI is $24.99/month USD after the free trial. Simple pricing with no hidden fees, no per-SKU charges, and no order volume restrictions.',
  },
  {
    q: 'Does Verve AI work with WooCommerce?',
    a: 'Yes! Verve AI is available for both Shopify and WooCommerce stores. Install from the WordPress plugin directory to get started.',
  },
  {
    q: 'Can I cancel anytime?',
    a: "Absolutely. You're in full control. Cancel directly from your Shopify admin or WordPress dashboard — no notice period required.",
  },
  {
    q: 'Is my store data secure?',
    a: "Yes. Verve AI uses Shopify's secure OAuth system and encrypts all data in transit and at rest. We never share your data with third parties.",
  },
]

export default function FaqPage() {
  return (
    <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">FAQ</h1>
          <div className="flex flex-col gap-8">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border-b border-gray-100 pb-8">
                <h6 className="font-bold text-lg mb-2">{q}</h6>
                <p className="text-gray-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 text-center">
        <div className="max-w-xl mx-auto px-4">
          <p className="text-lg font-semibold mb-6">Start your free 14 day trial</p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>For Shopify</CTAButton>
            <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external>For WooCommerce</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
