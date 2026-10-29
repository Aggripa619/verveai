const fs = require('fs')
const path = require('path')

// Real per-page last-modified dates, generated from git history by
// scripts/generate-sitemap-lastmod.mjs (runs as prebuild).
const lastmodFile = path.join(__dirname, 'content', 'sitemap-lastmod.json')
const lastmods = fs.existsSync(lastmodFile) ? JSON.parse(fs.readFileSync(lastmodFile, 'utf8')) : {}

// Thin pSEO pages flagged noindex in pseo-pages.json stay out of the sitemap.
const pseoPages = JSON.parse(fs.readFileSync(path.join(__dirname, 'content', 'pseo-pages.json'), 'utf8'))
const noindexPaths = new Set(
  Object.values(pseoPages).filter((p) => p.noindex).map((p) => `/${p.slug}`)
)

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.getverveai.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  // Default lastmod is the build time, which changes every deploy — omit it
  // unless we know the page's real last-modified date.
  autoLastmod: false,
  // Not pages: app icons, and /product-hunt is noindex.
  exclude: ['/icon.png', '/apple-icon.png', '/product-hunt'],
  transform: async (config, urlPath) =>
    noindexPaths.has(urlPath)
      ? null
      : {
          loc: urlPath,
          changefreq: config.changefreq,
          priority: config.priority,
          lastmod: lastmods[urlPath],
        },
  robotsTxtOptions: {
    policies: [
      // /downloads/ holds email-gated files; keep them out of search results.
      { userAgent: '*', allow: '/', disallow: '/downloads/' },
    ],
    additionalSitemaps: [],
  },
}
