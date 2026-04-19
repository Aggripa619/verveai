import type { Metadata } from 'next'
import { getPageData } from '@/lib/content'
import CTAButton from '@/components/CTAButton'
import { SHOPIFY_URL, WOOCOMMERCE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About - Verve AI',
  description:
    'Verve AI Forecasting helps e-commerce brands precisely predict demand—no spreadsheets, no guesswork. Smarter inventory planning starts here.',
  alternates: { canonical: 'https://www.getverveai.com/about' },
  openGraph: {
    title: 'About - Verve AI',
    description:
      'Verve AI Forecasting helps e-commerce brands precisely predict demand—no spreadsheets, no guesswork. Smarter inventory planning starts here.',
    url: 'https://www.getverveai.com/about',
    type: 'website',
  },
}

export default function AboutPage() {
  const data = getPageData('about')
  return (
    <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            {data?.h1 || 'We Built Verve Because We Needed It Ourselves'}
          </h1>
          {data?.bodyText ? (
            <div className="prose max-w-none">
              {data.bodyText
                .split('\n')
                .filter((line) => line.trim())
                .slice(4) // skip nav lines
                .map((line, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-4">
                    {line}
                  </p>
                ))}
            </div>
          ) : (
            <div className="prose max-w-none text-gray-700">
              <p>
                Verve AI was built by e-commerce operators who experienced firsthand the pain of managing inventory
                with spreadsheets and guesswork. We know what it feels like to lose sales to stockouts and tie up cash
                in overstock.
              </p>
              <p>
                So we built Verve — an AI-powered demand forecasting and inventory management platform that connects
                directly to your Shopify or WooCommerce store and gives you the clarity to stock exactly what you need,
                exactly when you need it.
              </p>
            </div>
          )}
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
