import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllBlogSlugs, getBlogPost, SHOPIFY_URL, WOOCOMMERCE_URL, SITE_URL } from '@/lib/content'
import CTAButton from '@/components/CTAButton'

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `${SITE_URL}/blog/${slug}`,
      type: 'article',
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  // Extract meaningful content paragraphs from bodyText
  const lines = post.bodyText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  // Find the content after the nav items (after h1 line)
  const h1Index = lines.findIndex((l) => l === post.h1)
  const contentLines = h1Index >= 0 ? lines.slice(h1Index + 1) : lines.slice(6)

  return (
    <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
      <article className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* H1 */}
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight">
            {post.h1 || post.title}
          </h1>

          {/* Article body */}
          <div className="prose max-w-none">
            {contentLines.map((line, i) => {
              // Detect heading structure from scraped headings
              const heading = post.headings.find((h) => h.text === line)
              if (heading) {
                if (heading.level === 'H2') {
                  return <h2 key={i}>{line}</h2>
                }
                if (heading.level === 'H3') {
                  return <h3 key={i}>{line}</h3>
                }
                if (heading.level === 'H4') {
                  return <h4 key={i}>{line}</h4>
                }
              }
              // Skip footer / nav-like short lines at the end
              if (
                ['Home', 'About', 'Pricing', 'Blog', 'Tools', 'Contact', 'FAQ', 'Twitter', 'Quick Links', 'Important', 'Get in Touch'].includes(line)
              ) {
                return null
              }
              return (
                <p key={i} className="text-gray-700 leading-relaxed">
                  {line}
                </p>
              )
            })}
          </div>

          {/* In-article CTA */}
          <div
            className="mt-16 p-8 rounded-2xl text-center"
            style={{ backgroundColor: 'rgb(245, 245, 245)' }}
          >
            <h3 className="text-xl font-bold mb-2">Looking to improve your Inventory Management?</h3>
            <p className="text-gray-600 mb-6">
              Try Verve AI free for 14 days — no credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href={SHOPIFY_URL} variant="teal" size="md" external>
                Shopify — Start Free Trial
              </CTAButton>
              <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="md" external>
                WooCommerce — Start Free Trial
              </CTAButton>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
