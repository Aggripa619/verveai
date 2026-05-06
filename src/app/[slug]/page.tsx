import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllPseoSlugs,
  getPseoPage,
  getVerticalPage,
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

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Verve AI',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL,
    offers: {
      '@type': 'Offer',
      price: '24.99',
      priceCurrency: 'USD',
    },
    sameAs: [
      'https://apps.shopify.com/verve-ai',
      'https://wordpress.org/plugins/verve-ai-inventory-forecasting',
    ],
    description: page.meta_description,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: vertical.faq.map((item) => ({
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
      />
    )
  }

  if (page.page_type === 'feature') {
    return (
      <FeaturePageTemplate
        page={page}
        vertical={vertical}
        schemas={[softwareAppSchema, faqSchema]}
      />
    )
  }

  return (
    <BlogPageTemplate
      page={page}
      vertical={vertical}
      schemas={[faqSchema]}
    />
  )
}
