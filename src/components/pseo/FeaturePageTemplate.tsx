import type { PseoPageEntry, VerticalData } from '@/types/vertical'
import BlogCTA from '@/components/BlogCTA'
import InlineCTABanner from '@/components/InlineCTABanner'
import CTAButton from '@/components/CTAButton'
import { SHOPIFY_URL, WOOCOMMERCE_URL } from '@/lib/content'

interface Props {
  page: PseoPageEntry
  vertical: VerticalData
  schemas: object[]
}

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Connect your Shopify store',
    desc: 'Install Verve AI in minutes. It immediately starts reading your order history, current stock levels, and product variants — no CSV exports or manual setup.',
  },
  {
    step: '02',
    title: 'AI analyses your demand patterns',
    desc: 'Verve AI builds a demand model for every SKU, accounting for trends, seasonality, and lead times specific to your product category.',
  },
  {
    step: '03',
    title: 'Get forecasts and automated purchase orders',
    desc: 'Review AI-generated reorder suggestions and one-click purchase orders. Adjust lead times, set safety stock buffers, and approve orders — all in one place.',
  },
]

export default function FeaturePageTemplate({ page, vertical, schemas }: Props) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        {/* ── Hero ── */}
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'rgb(0, 201, 167)' }}
            >
              {vertical.vertical_name} · Verve AI Feature
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {page.h1}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">{page.hero_intro}</p>
            <div className="flex flex-wrap gap-4">
              <CTAButton href={SHOPIFY_URL} variant="teal" size="lg" external>
                Install on Shopify — Free Trial
              </CTAButton>
              <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="lg" external>
                WooCommerce
              </CTAButton>
            </div>
          </div>
        </section>

        <article className="bg-white py-2">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* ── Feature Spotlight ── */}
            <section
              className="my-12 rounded-2xl p-8"
              style={{ backgroundColor: 'rgb(19, 33, 68)' }}
            >
              <h2 className="text-2xl font-bold text-white mb-8">
                How Verve AI Handles This for {vertical.vertical_name} Brands
              </h2>
              <div className="flex flex-col gap-8">
                {vertical.feature_mapping.map((item) => (
                  <div key={item.feature}>
                    <div
                      className="h-0.5 w-10 rounded-full mb-3"
                      style={{ backgroundColor: 'rgb(0, 201, 167)' }}
                    />
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: 'rgb(0, 201, 167)' }}
                    >
                      {item.pain}
                    </p>
                    <h3 className="text-lg font-bold text-white mb-2">{item.feature}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── How It Works ── */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">How It Works</h2>
              <div className="flex flex-col gap-8">
                {HOW_IT_WORKS.map((s) => (
                  <div key={s.step} className="flex gap-5">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: 'rgb(0, 201, 167)' }}
                    >
                      {s.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Operational Context ── */}
            <section className="my-10 bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5">
                {vertical.vertical_name}: Key Planning Numbers
              </h2>
              <dl className="grid sm:grid-cols-3 gap-6">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Typical SKU Count
                  </dt>
                  <dd className="text-gray-900 font-semibold">{vertical.typical_sku_count}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Average Lead Time
                  </dt>
                  <dd className="text-gray-900 font-semibold">{vertical.avg_lead_time}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Seasonality
                  </dt>
                  <dd className="text-gray-900 font-semibold text-sm">{vertical.seasonality_note}</dd>
                </div>
              </dl>
            </section>

            {/* ── FAQ ── */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Common Questions
              </h2>
              <div className="flex flex-col">
                {vertical.faq.slice(0, 4).map((item, i) => (
                  <div
                    key={item.question}
                    className={`py-6 ${i < 3 ? 'border-b border-gray-200' : ''}`}
                  >
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Final CTA ── */}
            <BlogCTA />
          </div>
        </article>
      </div>
    </>
  )
}
