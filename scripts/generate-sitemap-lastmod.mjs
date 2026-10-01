// Builds content/sitemap-lastmod.json: a map of URL path -> ISO date of the
// last git commit that touched that page's content or template.
//
// Why: next-sitemap's default lastmod is the build time, so every deploy told
// Google all ~240 pages had just changed. Google learns to ignore a lastmod
// that always moves, which meant it had no signal that real changes (e.g. the
// Aug 2026 pSEO rewrite) were worth re-crawling for.
//
// Runs as `prebuild`. Vercel CLI uploads don't include .git, so when git isn't
// available this exits without touching the committed JSON, and the build uses
// whatever was generated locally before deploying.

import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const outFile = path.join(root, 'content', 'sitemap-lastmod.json')

function git(args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
}

try {
  git(['rev-parse', '--is-inside-work-tree'])
} catch {
  console.log('[sitemap-lastmod] git unavailable, keeping committed sitemap-lastmod.json')
  process.exit(0)
}

/** Latest commit date across the given paths (only those that exist). */
function lastCommitDate(paths) {
  const existing = paths.filter((p) => existsSync(path.join(root, p)))
  if (existing.length === 0) return null
  const out = git(['log', '-1', '--format=%cI', '--', ...existing])
  return out ? new Date(out).toISOString() : null
}

const slugsIn = (dir) =>
  readdirSync(path.join(root, dir))
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))

const map = {}
const set = (urlPath, paths) => {
  const date = lastCommitDate(paths)
  if (date) map[urlPath] = date
}

// Blog posts
for (const slug of slugsIn('content/blog')) {
  set(`/blog/${slug}`, [`content/blog/${slug}.json`])
}

// Tools
for (const slug of slugsIn('content/tools')) {
  set(`/tools/${slug}`, [`content/tools/${slug}.json`, 'src/app/tools/[slug]'])
}

// pSEO pages: content is shared data + vertical pools + the [slug] template,
// so all pages share one date.
const pseoDate = lastCommitDate(['content/pseo-pages.json', 'content/verticals', 'src/app/[slug]'])
if (pseoDate) {
  const pseo = JSON.parse(readFileSync(path.join(root, 'content', 'pseo-pages.json'), 'utf8'))
  for (const slug of Object.keys(pseo)) map[`/${slug}`] = pseoDate
}

// Static routes
set('/', ['content/pages/home.json', 'src/app/page.tsx'])
set('/blog', ['content/pages/blog-index.json', 'src/app/blog/page.tsx', 'content/blog'])
set('/tools', ['content/pages/tools-index.json', 'src/app/tools/page.tsx', 'content/tools'])
for (const route of ['about', 'app-privacy-policy', 'contact', 'demo', 'faq', 'inventory-management-for',
  'pricing', 'stocky-alternative', 'terms', 'why-verve-ai']) {
  set(`/${route}`, [`content/pages/${route}.json`, `src/app/${route}`])
}

const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)))
writeFileSync(outFile, JSON.stringify(sorted, null, 2) + '\n')
console.log(`[sitemap-lastmod] wrote ${Object.keys(sorted).length} entries`)
