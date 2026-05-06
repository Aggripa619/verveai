import type { PseoPageEntry, VerticalData } from '@/types/vertical'
import BlogCTA from '@/components/BlogCTA'
import InlineCTABanner from '@/components/InlineCTABanner'

interface Props {
  page: PseoPageEntry
  vertical: VerticalData
  schemas: object[]
}

export default function BlogPageTemplate({ page, vertical, schemas }: Props) {
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
        <article className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* ── Article Header ── */}
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'rgb(0, 201, 167)' }}
            >
              {vertical.vertical_name} · Inventory Guide
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {page.h1}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-10">{page.hero_intro}</p>

            {/* ── Section 1: The Problem ── */}
            <section className="my-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Why This Is a Real Problem for {vertical.vertical_name} Brands
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">{vertical.hero_pain}</p>
              {vertical.pain_points[0] && (
                <div
                  className="rounded-xl p-5 border border-red-50"
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.04)' }}
                >
                  <h3 className="font-bold text-gray-900 mb-2">{vertical.pain_points[0].title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {vertical.pain_points[0].description}
                  </p>
                </div>
              )}
            </section>

            {/* ── Section 2: The Solution ── */}
            {vertical.feature_mapping[0] && (
              <section className="my-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  The Smarter Approach
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {vertical.feature_mapping[0].description}
                </p>
              </section>
            )}

            {/* ── Inline CTA ── */}
            <InlineCTABanner
              message={`automates demand forecasting and purchase orders for ${vertical.vertical_name} brands on Shopify — connect your store in minutes.`}
            />

            {/* ── Section 3: Step-by-Step Guide ── */}
            <section className="my-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                A Step-by-Step Approach
              </h2>
              <div className="flex flex-col gap-6">
                {[
                  {
                    n: '1',
                    title: 'Connect your store data',
                    body: `Start by ensuring your Shopify order history and current stock levels are complete. Verve AI connects directly to your Shopify account — no exports needed.`,
                  },
                  {
                    n: '2',
                    title: 'Set your lead times and safety stock rules',
                    body: `Enter your supplier lead times for each product or category. Verve AI uses these alongside demand forecasts to calculate reorder points that match your actual supply chain.`,
                  },
                  {
                    n: '3',
                    title: 'Act on AI-generated reorder suggestions',
                    body: `Review your forecasted demand and reorder recommendations. Approve purchase orders with one click, or adjust quantities before sending to suppliers.`,
                  },
                ].map((step) => (
                  <div key={step.n} className="flex gap-5">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: 'rgb(0, 201, 167)' }}
                    >
                      {step.n}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Section 4: FAQ (2-3 items) ── */}
            {vertical.faq.length > 0 && (
              <section className="my-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Common Questions
                </h2>
                <div className="flex flex-col">
                  {vertical.faq.slice(0, 3).map((item, i) => (
                    <div
                      key={item.question}
                      className={`py-5 ${i < 2 ? 'border-b border-gray-200' : ''}`}
                    >
                      <h3 className="font-bold text-gray-900 mb-2">{item.question}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Final CTA ── */}
            <BlogCTA />
          </div>
        </article>
      </div>
    </>
  )
}
