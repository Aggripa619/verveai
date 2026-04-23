import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllToolSlugs, getToolPage, SHOPIFY_URL, WOOCOMMERCE_URL, SITE_URL } from '@/lib/content'
import CTAButton from '@/components/CTAButton'
import ToolCTA from '@/components/ToolCTA'
import EmailGateCTA from '@/components/EmailGateCTA'
import ReorderPointCalculatorWrapper from '@/components/ReorderPointCalculatorWrapper'

const TOOL_URLS: Record<string, { href: string; name: string; emailGate?: boolean }> = {
  'inventory-days-calculator':          { href: 'https://tool2.getverveai.com/', name: 'Inventory Days Calculator' },
  'ecommerce-profit-margin-calculator': { href: 'https://tool1.getverveai.com/', name: 'Profit Margin Calculator' },
  'reorder-point-calculator':           { href: '#', name: 'Reorder Point Calculator', emailGate: true },
  'inventory-control-excel':            { href: '#', name: 'Inventory Control Template', emailGate: true },
  'sales-forecast-template':            { href: '#', name: 'Sales Forecast Template', emailGate: true },
  'cashflow-forecast-template':         { href: '#', name: 'Cashflow Forecast Template', emailGate: true },
}

const NAV_LINES = new Set([
  'Home', 'About', 'Pricing', 'Blog', 'Tools', 'Contact', 'FAQ',
  'Twitter', 'Quick Links', 'Important', 'Get in Touch',
])

// Slugs that have an inline interactive calculator (no Google Sheet redirect)
const INTERACTIVE_CALCULATOR_SLUGS = new Set(['reorder-point-calculator'])

function splitHtmlAtMidHeading(html: string): [string, string] {
  const matches = [...html.matchAll(/<h2[\s>]/gi)]
  if (matches.length < 2) return [html, '']
  const mid = Math.floor(html.length / 2)
  let splitIndex = matches[0].index!
  let closest = Math.abs(matches[0].index! - mid)
  for (const m of matches) {
    const dist = Math.abs(m.index! - mid)
    if (dist < closest) { closest = dist; splitIndex = m.index! }
  }
  return [html.slice(0, splitIndex), html.slice(splitIndex)]
}

export async function generateStaticParams() {
  const slugs = getAllToolSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolPage(slug)
  if (!tool) return {}
  return {
    title: tool.title,
    description: tool.metaDescription,
    alternates: { canonical: `${SITE_URL}/tools/${slug}` },
    openGraph: {
      title: tool.title,
      description: tool.metaDescription,
      url: `${SITE_URL}/tools/${slug}`,
      type: 'website',
    },
  }
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = getToolPage(slug)
  if (!tool) notFound()

  const toolConfig = TOOL_URLS[slug] ?? null

  const lines = tool.bodyText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  const h1Index = lines.findIndex((l) => l === tool.h1)
  const contentLines = h1Index >= 0 ? lines.slice(h1Index + 1) : lines.slice(6)

  const firstH2Index = contentLines.findIndex((line) => {
    const h = tool.headings.find((h) => h.text === line)
    return h?.level === 'H2'
  })
  const topCtaAfter = firstH2Index >= 0 ? firstH2Index + 3 : Math.floor(contentLines.length * 0.25)

  const renderLine = (line: string, i: number) => {
    if (NAV_LINES.has(line)) return null
    const heading = tool.headings.find((h) => h.text === line)
    if (heading) {
      if (heading.level === 'H2') return <h2 key={i}>{line}</h2>
      if (heading.level === 'H3') return <h3 key={i}>{line}</h3>
      if (heading.level === 'H4') return <h4 key={i}>{line}</h4>
    }
    return <p key={i} className="text-gray-700 leading-relaxed">{line}</p>
  }

  const TopCTA = () => {
    if (!toolConfig) return null
    if (toolConfig.emailGate) return <EmailGateCTA toolSlug={slug} toolName={toolConfig.name} />
    return <ToolCTA href={toolConfig.href} toolName={toolConfig.name} />
  }

  const BottomCTA = () => {
    if (!toolConfig) return (
      <div className="mt-16 p-8 rounded-2xl text-center" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <h3 className="text-xl font-bold mb-2">Looking to improve your Inventory Management?</h3>
        <p className="text-gray-600 mb-6">Try Verve AI free for 14 days — no credit card required.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <CTAButton href={SHOPIFY_URL} variant="teal" size="md" external>Shopify — Start Free Trial</CTAButton>
          <CTAButton href={WOOCOMMERCE_URL} variant="purple" size="md" external>WooCommerce — Start Free Trial</CTAButton>
        </div>
      </div>
    )
    if (toolConfig.emailGate) return <EmailGateCTA toolSlug={slug} toolName={toolConfig.name} />
    return <ToolCTA href={toolConfig.href} toolName={toolConfig.name} />
  }

  // htmlContent path — used for interactive calculator tools
  if (tool.htmlContent && INTERACTIVE_CALCULATOR_SLUGS.has(slug)) {
    const [firstHalf, secondHalf] = splitHtmlAtMidHeading(tool.htmlContent)
    const CalculatorComponent = slug === 'reorder-point-calculator' ? ReorderPointCalculatorWrapper : null

    return (
      <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
        <article className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: firstHalf }}
            />

            {CalculatorComponent && <CalculatorComponent />}

            {secondHalf && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: secondHalf }}
              />
            )}

            <BottomCTA />
          </div>
        </article>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
      <article className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight">
            {tool.h1 || tool.title}
          </h1>

          <div className="prose max-w-none">
            {contentLines.map((line, i) => {
              const el = renderLine(line, i)
              if (toolConfig && i === topCtaAfter) {
                return (
                  <>
                    {el}
                    <TopCTA key={`cta-top-${slug}`} />
                  </>
                )
              }
              return el
            })}
          </div>

          <BottomCTA />
        </div>
      </article>
    </div>
  )
}
