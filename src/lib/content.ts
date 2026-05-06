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

// ─── Constants ───────────────────────────────────────────────────────────────

export const SHOPIFY_URL = 'https://apps.shopify.com/verve-ai'
export const WOOCOMMERCE_URL = 'https://wordpress.org/plugins/verve-ai-inventory-forecasting'
export const TWITTER_URL = 'https://x.com/getverveai'
export const SITE_URL = 'https://www.getverveai.com'
