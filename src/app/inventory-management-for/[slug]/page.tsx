import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllVerticalSlugs,
  getVerticalPage,
  getBlogPost,
  SITE_URL,
} from '@/lib/content'
import VerticalPageTemplate from '@/components/VerticalPageTemplate'

export async function generateStaticParams() {
  return getAllVerticalSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const vertical = getVerticalPage(slug)
  if (!vertical) return {}
  return {
    title: vertical.meta_title,
    description: vertical.meta_description,
    alternates: {
      canonical: `${SITE_URL}/inventory-management-for/${slug}`,
    },
    openGraph: {
      title: vertical.meta_title,
      description: vertical.meta_description,
      url: `${SITE_URL}/inventory-management-for/${slug}`,
      type: 'website',
      ...(vertical.og_image
        ? { images: [{ url: vertical.og_image, alt: vertical.meta_title }] }
        : {}),
    },
  }
}

export default async function VerticalPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const vertical = getVerticalPage(slug)
  if (!vertical) notFound()

  const relatedPosts = vertical.related_blog_slugs
    .map((s) => {
      const post = getBlogPost(s)
      return post ? { slug: s, title: post.title || post.h1 } : null
    })
    .filter(Boolean) as { slug: string; title: string }[]

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
    description: vertical.meta_description,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <article className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <VerticalPageTemplate vertical={vertical} relatedPosts={relatedPosts} />
          </div>
        </article>
      </div>
    </>
  )
}
