import type { PseoPageEntry, VerticalData } from '@/types/vertical'
import BlogCTA from '@/components/BlogCTA'
import InlineCTABanner from '@/components/InlineCTABanner'
import RelatedPseoLinks from '@/components/pseo/RelatedPseoLinks'
import { getPainFeatureSelection, getFaqSelection, getHowItWorksVariant } from '@/lib/content'

interface Props {
  page: PseoPageEntry
  vertical: VerticalData
  schemas: object[]
  siblings: { slug: string; h1: string }[]
  relatedReading: { slug: string; title: string }[]
}

// Fallback only — used if a vertical hasn't been given a how_it_works_pool yet.
const DEFAULT_STEPS = [
  {
    step: '1',
    title: 'Connect your store data',
    desc: 'Start by ensuring your Shopify order history and current stock levels are complete. Verve AI connects directly to your Shopify account — no exports needed.',
  },
  {
    step: '2',
    title: 'Set your lead times and safety stock rules',
    desc: 'Enter your supplier lead times for each product or category. Verve AI uses these alongside demand forecasts to calculate reorder points that match your actual supply chain.',
  },
  {
    step: '3',
    title: 'Act on AI-generated reorder suggestions',
    desc: 'Review your forecasted demand and reorder recommendations. Approve purchase orders with one click, or adjust quantities before sending to suppliers.',
  },
]

export default function BlogPageTemplate({
  page,
  vertical,
  schemas,
  siblings,
  relatedReading,
}: Props) {
  const { painPoints, featureMapping } = getPainFeatureSelection(vertical, page.slug, 1)
  const faqItems = getFaqSelection(vertical, page.slug, 3)
  const steps = getHowItWorksVariant(vertical, page.slug)?.steps ?? DEFAULT_STEPS

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

            {page.deep_dive && (
              <section className="my-10">
                <p className="text-gray-700 leading-relaxed">{page.deep_dive}</p>
              </section>
            )}

            {/* ── Section 1: The Problem ── */}
            <section className="my-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Why This Is a Real Problem for {vertical.vertical_name} Brands
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">{vertical.hero_pain}</p>
              {painPoints[0] && (
                <div
                  className="rounded-xl p-5 border border-red-50"
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.04)' }}
                >
                  <h3 className="font-bold text-gray-900 mb-2">{painPoints[0].title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {painPoints[0].description}
                  </p>
                </div>
              )}
            </section>

            {/* ── Section 2: The Solution ── */}
            {featureMapping[0] && (
              <section className="my-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  The Smarter Approach
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {featureMapping[0].description}
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
                {steps.map((step) => (
                  <div key={step.step} className="flex gap-5">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: 'rgb(0, 201, 167)' }}
                    >
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Section 4: FAQ (2-3 items) ── */}
            {faqItems.length > 0 && (
              <section className="my-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Common Questions
                </h2>
                <div className="flex flex-col">
                  {faqItems.map((item, i) => (
                    <div
                      key={item.question}
                      className={`py-5 ${i < faqItems.length - 1 ? 'border-b border-gray-200' : ''}`}
                    >
                      <h3 className="font-bold text-gray-900 mb-2">{item.question}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <RelatedPseoLinks
              verticalName={vertical.vertical_name}
              siblings={siblings}
              relatedReading={relatedReading}
            />

            {/* ── Final CTA ── */}
            <BlogCTA />
          </div>
        </article>
      </div>
    </>
  )
}
