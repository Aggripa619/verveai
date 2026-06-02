import type { Metadata } from 'next'
import CTAButton from '@/components/CTAButton'
import { SHOPIFY_URL, WOOCOMMERCE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Interactive Demo — Verve AI',
  description:
    'See Verve AI in action. Click through an interactive walkthrough of inventory forecasting and purchase order management for Shopify — no sign-up required.',
  alternates: { canonical: 'https://www.getverveai.com/demo' },
  openGraph: {
    title: 'Interactive Demo — Verve AI',
    description: 'Click through a live product walkthrough. No sign-up required.',
    url: 'https://www.getverveai.com/demo',
    type: 'website',
  },
}

export default function DemoPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            See Verve AI in Action
          </h1>
          <p className="text-lg text-gray-600">
            Interactive walkthrough — no sign-up required.
          </p>
        </div>
      </section>

      {/* Supademo embed */}
      <section className="pb-16 lg:pb-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-50 p-2">
            {/* aspect-ratio 2.03:1 + 80px for Supademo's internal top/bottom padding */}
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

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Ready to try it with your own store?
          </h2>
          <p className="text-gray-600 mb-8">
            14-day free trial. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>
              Add to Shopify — Free Trial
            </CTAButton>
            <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external>
              Add to WooCommerce — Free Trial
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
