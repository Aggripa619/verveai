import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllPseoSlugs,
  getPseoPage,
  getVerticalPage,
  getSiblingPseoPages,
  getRelatedReadingForVertical,
  getFaqSelection,
  SITE_URL,
} from '@/lib/content'
import VerticalLandingPageTemplate from '@/components/pseo/VerticalLandingPageTemplate'
import FeaturePageTemplate from '@/components/pseo/FeaturePageTemplate'
import BlogPageTemplate from '@/components/pseo/BlogPageTemplate'

export async function generateStaticParams() {
  return getAllPseoSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = getPseoPage(slug)
  if (!page) return {}
  return {
    title: page.meta_title,
    description: page.meta_description,
    alternates: {
      canonical: `${SITE_URL}/${slug}`,
    },
    openGraph: {
      title: page.meta_title,
      description: page.meta_description,
      url: `${SITE_URL}/${slug}`,
      type: 'website',
    },
  }
}

export default async function PseoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getPseoPage(slug)
  if (!page) notFound()

  const vertical = getVerticalPage(page.vertical)
  if (!vertical) notFound()

  const siblings = getSiblingPseoPages(slug)
  const relatedReading = getRelatedReadingForVertical(vertical.related_blog_slugs)

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Verve AI',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL,
    offers: {
      '@type': 'Offer',
      price: '19.99',
      priceCurrency: 'USD',
    },
    sameAs: [
      'https://apps.shopify.com/verve-ai',
      'https://wordpress.org/plugins/verve-ai-inventory-forecasting',
    ],
    description: page.meta_description,
  }

  // Match whatever FAQ subset the page actually renders (see the page_type
  // branches below) so the FAQPage structured data doesn't diverge from the
  // visible content — was previously the full vertical FAQ pool regardless
  // of page_type, duplicating the same content-sharing bug in the schema.
  const faqCountByPageType = { vertical_landing: 5, feature: 4, blog: 3 } as const
  const faqForSchema = getFaqSelection(vertical, slug, faqCountByPageType[page.page_type])

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqForSchema.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  if (page.page_type === 'vertical_landing') {
    return (
      <VerticalLandingPageTemplate
        page={page}
        vertical={vertical}
        schemas={[softwareAppSchema, faqSchema]}
        siblings={siblings}
        relatedReading={relatedReading}
      />
    )
  }

  if (page.page_type === 'feature') {
    return (
      <FeaturePageTemplate
        page={page}
        vertical={vertical}
        schemas={[softwareAppSchema, faqSchema]}
        siblings={siblings}
        relatedReading={relatedReading}
      />
    )
  }

  return (
    <BlogPageTemplate
      page={page}
      vertical={vertical}
      schemas={[faqSchema]}
      siblings={siblings}
      relatedReading={relatedReading}
    />
  )
}
