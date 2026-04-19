/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.getverveai.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [],
  },
}
