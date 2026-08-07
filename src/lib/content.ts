import * as fs from 'fs'
import * as path from 'path'

export interface PageData {
  url: string
  title: string
  metaDescription: string
  canonical: string
  h1: string
  headings: { level: string; text: string }[]
  bodyHtml: string
  bodyText: string
  images: { src: string; alt: string }[]
  internalLinks: string[]
  externalLinks: string[]
  jsonLd: string[]
  scrapedAt: string
  // CSV import fields
  htmlContent?: string
  imageUrl?: string
  imageAlt?: string
  csvDate?: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content')

function readJson(filePath: string): PageData | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as PageData
  } catch {
    return null
  }
}

export function getBlogPost(slug: string): PageData | null {
  return readJson(path.join(CONTENT_DIR, 'blog', `${slug}.json`))
}

export function getAllBlogSlugs(): string[] {
  const dir = path.join(CONTENT_DIR, 'blog')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''))
    .sort()
}

export function getAllBlogPosts(): { slug: string; data: PageData }[] {
  return getAllBlogSlugs()
    .map((slug) => {
      const data = getBlogPost(slug)
      return data ? { slug, data } : null
    })
    .filter(Boolean) as { slug: string; data: PageData }[]
}

export function getToolPage(slug: string): PageData | null {
  return readJson(path.join(CONTENT_DIR, 'tools', `${slug}.json`))
}

export function getAllToolSlugs(): string[] {
  const dir = path.join(CONTENT_DIR, 'tools')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''))
    .sort()
}

export function getAllToolPages(): { slug: string; data: PageData }[] {
  return getAllToolSlugs()
    .map((slug) => {
      const data = getToolPage(slug)
      return data ? { slug, data } : null
    })
    .filter(Boolean) as { slug: string; data: PageData }[]
}

export function getPageData(filename: string): PageData | null {
  return readJson(path.join(CONTENT_DIR, 'pages', `${filename}.json`))
}

// ─── Related blog posts (internal linking) ────────────────────────────────
// Title-similarity based "related articles" — weights shared words by rarity
// (TF-IDF-style) so generic domain terms don't dominate the match, then
// guarantees every post is linked TO by at least one other post so none end
// up as internal-link orphans.

const RELATED_STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'how', 'in',
  'is', 'it', 'of', 'on', 'or', 'the', 'to', 'vs', 'with', 'your', 'you',
  'what', 'why', 'when', 'guide', 'complete', 'full', 'free', 'best',
  'definitive', 'ultimate', '2026', 'explained', 'formula', 'formulas',
  'template', 'templates', 'examples', 'example', 'playbook', 'tips', 'tool',
  'tools', 'step', 'steps', 'practical',
])

function titleTokens(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !RELATED_STOPWORDS.has(w))
}

let relatedPostsCache: Record<string, { slug: string; title: string }[]> | null = null

function computeRelatedBlogPosts(count: number): Record<string, { slug: string; title: string }[]> {
  const posts = getAllBlogPosts()
  const slugs = posts.map((p) => p.slug)
  const titleBySlug = new Map(posts.map((p) => [p.slug, p.data.title || p.slug]))

  const tokensBySlug = new Map<string, Set<string>>()
  const docFreq = new Map<string, number>()
  for (const { slug, data } of posts) {
    const tokens = new Set(titleTokens(data.title || slug))
    tokensBySlug.set(slug, tokens)
    for (const t of tokens) docFreq.set(t, (docFreq.get(t) ?? 0) + 1)
  }

  const scoreFor = (a: string, b: string): number => {
    const ta = tokensBySlug.get(a)!
    const tb = tokensBySlug.get(b)!
    let score = 0
    for (const t of ta) {
      if (tb.has(t)) score += 1 / Math.log2((docFreq.get(t) ?? 1) + 1)
    }
    return score
  }

  const related: Record<string, { slug: string; score: number }[]> = {}
  for (const a of slugs) {
    related[a] = slugs
      .filter((b) => b !== a)
      .map((b) => ({ slug: b, score: scoreFor(a, b) }))
      .sort((x, y) => y.score - x.score)
      .slice(0, count)
  }

  // Guarantee no orphans: every post must be linked to by at least one other post
  const inboundCount = new Map<string, number>(slugs.map((s) => [s, 0]))
  for (const a of slugs) {
    for (const r of related[a]) inboundCount.set(r.slug, (inboundCount.get(r.slug) ?? 0) + 1)
  }
  for (const target of slugs) {
    if ((inboundCount.get(target) ?? 0) > 0) continue
    const best = slugs
      .filter((b) => b !== target)
      .map((b) => ({ slug: b, score: scoreFor(target, b) }))
      .sort((x, y) => y.score - x.score)[0]
    if (best) {
      related[best.slug].push({ slug: target, score: best.score })
      inboundCount.set(target, 1)
    }
  }

  const result: Record<string, { slug: string; title: string }[]> = {}
  for (const a of slugs) {
    result[a] = related[a].map((r) => ({ slug: r.slug, title: titleBySlug.get(r.slug) ?? r.slug }))
  }
  return result
}

export function getRelatedBlogPosts(slug: string, count = 4): { slug: string; title: string }[] {
  if (!relatedPostsCache) relatedPostsCache = computeRelatedBlogPosts(count)
  return relatedPostsCache[slug] ?? []
}

// ─── Vertical (pSEO) pages ────────────────────────────────────────────────────

import type { VerticalData } from '@/types/vertical'

function readVerticalJson(filePath: string): VerticalData | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as VerticalData
  } catch {
    return null
  }
}

export function getVerticalPage(slug: string): VerticalData | null {
  return readVerticalJson(path.join(CONTENT_DIR, 'verticals', `${slug}.json`))
}

export function getAllVerticalSlugs(): string[] {
  const dir = path.join(CONTENT_DIR, 'verticals')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''))
    .sort()
}

export function getAllVerticalPages(): { slug: string; data: VerticalData }[] {
  return getAllVerticalSlugs()
    .map((slug) => {
      const data = getVerticalPage(slug)
      return data ? { slug, data } : null
    })
    .filter(Boolean) as { slug: string; data: VerticalData }[]
}

// ─── pSEO pages (1-keyword-per-page) ─────────────────────────────────────────

import type { PseoPageEntry } from '@/types/vertical'

let pseoCache: Record<string, PseoPageEntry> | null = null

function loadPseoPages(): Record<string, PseoPageEntry> {
  if (pseoCache) return pseoCache
  try {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, 'pseo-pages.json'), 'utf-8')
    pseoCache = JSON.parse(raw) as Record<string, PseoPageEntry>
    return pseoCache
  } catch {
    return {}
  }
}

export function getPseoPage(slug: string): PseoPageEntry | null {
  return loadPseoPages()[slug] ?? null
}

export function getAllPseoSlugs(): string[] {
  return Object.keys(loadPseoPages()).sort()
}

// Lead pSEO page for each vertical — the only pages linked from Navbar/Footer/hub page.
// Single source of truth: also used by the /inventory-management-for hub page.
export const VERTICAL_FLAGSHIP_SLUGS: Record<string, string> = {
  apparel: 'inventory-management-for-clothing-stores',
  supplements: 'inventory-management-supplement-brands',
  beauty: 'inventory-management-beauty-brands',
  'pet-supplies': 'inventory-management-pet-supply-brands',
  jewellery: 'inventory-management-jewellery-shops',
  'home-goods': 'inventory-management-home-goods-brands',
  'food-and-beverage': 'inventory-management-food-brands',
  'sports-and-outdoor': 'inventory-management-sports-brands',
}

// Most pSEO pages (147 of 155) have zero internal links pointing to them —
// reachable only via the sitemap. This links each page to the next N pages
// (ring/circular order) within its own vertical, plus always back to the
// vertical's flagship page (which IS linked from Navbar/Footer), so every
// page both receives and sends internal links, and the whole vertical
// cluster is transitively reachable by crawling from the flagship page.
export function getSiblingPseoPages(slug: string, count = 5): { slug: string; h1: string }[] {
  const pages = loadPseoPages()
  const current = pages[slug]
  if (!current) return []

  const verticalSlugs = Object.keys(pages)
    .filter((s) => pages[s].vertical === current.vertical)
    .sort()

  const n = verticalSlugs.length
  if (n <= 1) return []

  const idx = verticalSlugs.indexOf(slug)
  const picked: string[] = []
  for (let i = 1; i <= count && i < n; i++) {
    picked.push(verticalSlugs[(idx + i) % n])
  }

  const flagship = VERTICAL_FLAGSHIP_SLUGS[current.vertical]
  if (flagship && flagship !== slug && !picked.includes(flagship)) {
    picked.push(flagship)
  }

  return picked.map((s) => ({ slug: s, h1: pages[s]?.h1 ?? s }))
}

// Resolves the (already-authored but previously unused) vertical.related_blog_slugs
// field into real blog links, dropping any slug that doesn't resolve to a post.
export function getRelatedReadingForVertical(
  relatedSlugs: string[]
): { slug: string; title: string }[] {
  return relatedSlugs
    .map((slug) => {
      const post = getBlogPost(slug)
      return post ? { slug, title: post.title } : null
    })
    .filter(Boolean) as { slug: string; title: string }[]
}

// ─── Constants ───────────────────────────────────────────────────────────────

export const SHOPIFY_URL = 'https://apps.shopify.com/verve-ai'
export const WOOCOMMERCE_URL = 'https://wordpress.org/plugins/verve-ai-inventory-forecasting'
export const TWITTER_URL = 'https://x.com/getverveai'
export const SITE_URL = 'https://www.getverveai.com'
