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

export default function VerticalLandingPageTemplate({ page, vertical, schemas }: Props) {
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
              Inventory Management Software
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

            {/* ── Pain Points ── */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                The Biggest Inventory Challenges for {vertical.vertical_name} Merchants
              </h2>
              <p className="text-gray-500 mb-8">
                Why off-the-shelf Shopify inventory tools fall short in your category.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {vertical.pain_points.map((pain) => (
                  <div
                    key={pain.title}
                    className="bg-white rounded-2xl p-6 border border-red-50"
                    style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-base mb-4"
                      style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'rgb(239, 68, 68)' }}
                    >
                      {pain.icon ?? '✕'}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{pain.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{pain.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Feature-to-Pain Mapping ── */}
            <section
              className="my-12 rounded-2xl p-8"
              style={{ backgroundColor: 'rgb(19, 33, 68)' }}
            >
              <h2 className="text-2xl font-bold text-white mb-8">
                How Verve AI Solves These Problems
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

            {/* ── Operational Context ── */}
            <section className="my-10 bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5">
                Inventory Planning for {vertical.vertical_name}: Key Numbers
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

            {/* ── Inline CTA ── */}
            <InlineCTABanner
              message={`automates demand forecasting and purchase orders for ${vertical.vertical_name} brands on Shopify — connect your store in minutes.`}
            />

            {/* ── Social Proof ── */}
            <blockquote
              className="my-12 pl-5 italic text-gray-600 text-lg leading-relaxed border-l-4"
              style={{ borderColor: 'rgb(0, 201, 167)' }}
            >
              &ldquo;{vertical.social_proof_quote}&rdquo;
              <footer className="mt-3 not-italic text-sm font-semibold text-gray-500">
                — {vertical.social_proof_attribution}
              </footer>
            </blockquote>

            {/* ── FAQ ── */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions: Inventory Management for {vertical.vertical_name}
              </h2>
              <div className="flex flex-col">
                {vertical.faq.map((item, i) => (
                  <div
                    key={item.question}
                    className={`py-6 ${i < vertical.faq.length - 1 ? 'border-b border-gray-200' : ''}`}
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
