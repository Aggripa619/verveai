import type { Metadata } from 'next'
import CTAButton from '@/components/CTAButton'
import { SHOPIFY_URL, WOOCOMMERCE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'FAQ - Verve AI',
  description:
    'Frequently asked questions about Verve AI — AI inventory forecasting, the 24/7 AI Agent, pricing ($19.99/month), and setup for Shopify and WooCommerce.',
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
    a: 'Verve AI is an AI-powered demand forecasting and inventory management platform designed for Shopify and WooCommerce merchants. It helps you predict demand, avoid stockouts, reduce overstock, and automate purchase orders — all for $19.99/month with no contracts.',
  },
  {
    q: 'How does Verve AI work?',
    a: 'Verve AI connects to your Shopify or WooCommerce store via API, analyzes your historical sales data, and generates AI-powered demand forecasts for each of your products and variants. You get instant reorder suggestions, lead time tracking, and full purchase order management. Verve also includes an AI Agent that runs continuously in the background — automatically generating alerts for low stock, demand spikes, and dead stock, and preparing purchase order suggestions you can approve in one click.',
  },
  {
    q: 'Does Verve AI proactively alert me to inventory issues?',
    a: "Yes — Verve includes an AI Agent that monitors your inventory 24/7 and surfaces actionable alerts directly in your dashboard. It flags low stock before you hit a stockout, identifies demand spikes that could wipe out your supply, and highlights dead stock that's tying up your cash. You can approve, snooze, dismiss, or resolve each alert on your own schedule — and configure the thresholds to match how your business operates.",
  },
  {
    q: 'Can Verve AI automatically create purchase orders?',
    a: 'Yes. When the AI Agent detects a reorder is needed, it generates a pre-built purchase order suggestion — with recommended quantity (calculated from your average daily sales, lead time, and target days of cover), estimated cost, and your primary supplier pre-filled. You review it and approve with one click. The draft PO is created instantly with all the details ready.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes! Verve AI offers a 14-day free trial. No credit card required to get started — just install the app and start forecasting. The AI Agent is fully active during your trial.',
  },
  {
    q: 'How much does Verve AI cost?',
    a: 'Verve AI is $19.99/month USD after the free trial. One flat plan — no per-SKU charges, no GMV tiers, no order volume restrictions, no hidden fees. Enterprise inventory tools charge $49–$500+/month for a similar feature set.',
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
          <p className="text-lg font-semibold mb-2">Start your 14-day free trial</p>
          <p className="text-sm text-gray-500 mb-6">No credit card required · Cancel anytime</p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>Start Free Trial — Shopify</CTAButton>
            <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external>Start Free Trial — WooCommerce</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
