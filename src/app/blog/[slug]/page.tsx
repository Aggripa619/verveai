import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllBlogSlugs, getBlogPost, SHOPIFY_URL, WOOCOMMERCE_URL, SITE_URL } from '@/lib/content'
import BlogCTA from '@/components/BlogCTA'
import InlineCTABanner from '@/components/InlineCTABanner'
import SafetyStockCalculatorWrapper from '@/components/SafetyStockCalculatorWrapper'

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
      ...(post.imageUrl ? { images: [{ url: post.imageUrl, alt: post.imageAlt || post.title }] } : {}),
    },
  }
}

function splitHtmlAtMidHeading(html: string): [string, string] {
  // Find all <h2 positions
  const matches = [...html.matchAll(/<h2[\s>]/gi)]
  if (matches.length < 2) return [html, '']

  // Pick the heading closest to the middle of the content
  const mid = Math.floor(html.length / 2)
  let splitIndex = matches[0].index!
  let closest = Math.abs(matches[0].index! - mid)

  for (const m of matches) {
    const dist = Math.abs(m.index! - mid)
    if (dist < closest) {
      closest = dist
      splitIndex = m.index!
    }
  }

  return [html.slice(0, splitIndex), html.slice(splitIndex)]
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  let firstHalf = ''
  let secondHalf = ''

  if (post.htmlContent) {
    ;[firstHalf, secondHalf] = splitHtmlAtMidHeading(post.htmlContent)
  }

  return (
    <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
      <article className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.htmlContent ? (
            <>
              {slug === 'safety-stock-calculator' && (
                <InlineCTABanner message="Want safety stock calculated automatically for every SKU? Verve AI pulls live Shopify data and keeps your buffers up to date." />
              )}

              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: firstHalf }}
              />

              {slug === 'safety-stock-calculator' ? <SafetyStockCalculatorWrapper /> : <BlogCTA />}

              {slug === 'safety-stock-calculator' && <BlogCTA />}

              {secondHalf && (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: secondHalf }}
                />
              )}
            </>
          ) : (
            <>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                {post.h1 || post.title}
              </h1>
              <div className="prose max-w-none">
                {post.bodyText
                  .split('\n')
                  .map((l) => l.trim())
                  .filter((l) => l.length > 0)
                  .map((line, i) => {
                    const heading = post.headings?.find((h) => h.text === line)
                    if (heading) {
                      if (heading.level === 'H2') return <h2 key={i}>{line}</h2>
                      if (heading.level === 'H3') return <h3 key={i}>{line}</h3>
                      if (heading.level === 'H4') return <h4 key={i}>{line}</h4>
                    }
                    if (['Home', 'About', 'Pricing', 'Blog', 'Tools', 'Contact', 'FAQ', 'Twitter', 'Quick Links', 'Important', 'Get in Touch'].includes(line)) {
                      return null
                    }
                    return <p key={i} className="text-gray-700 leading-relaxed">{line}</p>
                  })}
              </div>
            </>
          )}

          <BlogCTA />
        </div>
      </article>
    </div>
  )
}
