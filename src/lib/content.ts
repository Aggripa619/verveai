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

export const SHOPIFY_URL = 'https://apps.shopify.com/verve-ai'
export const WOOCOMMERCE_URL = 'https://wordpress.org/plugins/verve-ai-inventory-forecasting'
export const TWITTER_URL = 'https://x.com/getverveai'
export const SITE_URL = 'https://www.getverveai.com'
