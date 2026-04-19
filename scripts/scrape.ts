import puppeteer, { Browser } from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'https://www.getverveai.com';

const URLS: { path: string; outputDir: string; filename: string }[] = [
  // Core pages
  { path: '/', outputDir: 'content/pages', filename: 'home.json' },
  { path: '/about', outputDir: 'content/pages', filename: 'about.json' },
  { path: '/pricing', outputDir: 'content/pages', filename: 'pricing.json' },
  { path: '/contact', outputDir: 'content/pages', filename: 'contact.json' },
  { path: '/faq', outputDir: 'content/pages', filename: 'faq.json' },
  { path: '/blog', outputDir: 'content/pages', filename: 'blog-index.json' },
  { path: '/tools', outputDir: 'content/pages', filename: 'tools-index.json' },
  { path: '/app-privacy-policy', outputDir: 'content/pages', filename: 'app-privacy-policy.json' },
  { path: '/terms', outputDir: 'content/pages', filename: 'terms.json' },
  // Tools
  { path: '/tools/ecommerce-profit-margin-calculator', outputDir: 'content/tools', filename: 'ecommerce-profit-margin-calculator.json' },
  { path: '/tools/inventory-days-calculator', outputDir: 'content/tools', filename: 'inventory-days-calculator.json' },
  { path: '/tools/reorder-point-calculator', outputDir: 'content/tools', filename: 'reorder-point-calculator.json' },
  { path: '/tools/sales-forecast-template', outputDir: 'content/tools', filename: 'sales-forecast-template.json' },
  { path: '/tools/cashflow-forecast-template', outputDir: 'content/tools', filename: 'cashflow-forecast-template.json' },
  { path: '/tools/inventory-control-excel', outputDir: 'content/tools', filename: 'inventory-control-excel.json' },
  // Blog posts
  ...([
    'shopify-abc-product-analysis',
    'inventory-audit-template',
    'inventory-discrepancy',
    'continue-selling-when-out-of-stock-shopify',
    'overstock-inventory',
    'managing-shopify-purchase-orders',
    'digital-purchase-orders',
    'replenishment-planning',
    'inventory-replenishment-process',
    'forecasting-demand-planning',
    'sku-forecasting',
    'shopify-multiple-warehouses',
    'shopify-multiple-storefronts',
    'inventory-velocity',
    'shopify-plus-inventory-management',
    'bulk-edit-inventory-on-shopify',
    'shopify-available-vs-on-hand',
    'days-inventory-outstanding',
    'what-is-a-kpi-retail',
    'what-is-bonded-inventory',
    'outsource-ecommerce',
    'obsolete-stock',
    'retail-e-commerce-operations',
    'inventory-turnover-ratio-days',
    'asset-turnover-ratio-formula',
    'stock-turnover-ratio',
    'inventory-management-metrics',
    'how-to-add-variant-product-on-shopify',
    'shopify-merchandising',
    'what-is-sku-shopify',
    'shopify-essential-knowledge',
    'multichannel-inventory-control-software',
    'demand-forecasting-tools',
    'demand-forecasting-software',
    'supply-chain-edi',
    'inventory-forecasting-tools-technology',
    'demand-forecasting-excel',
    'inventory-forecasting',
    'ecommerce-forecasting',
    'reorder-level-formula',
    'how-to-calculate-reorder-point',
    'demand-forecasting-ecommerce',
    'inventory-forecasting-and-planning',
    'wip-inventory',
    'consignment-stock',
    'inventory-report-example',
    'forecasting-vs-demand-planning',
    'replenishment-of-stock',
    'inventory-management-fundamentals',
    'demand-forecasting-with-ai',
    'e-commerce-demand-forecasting',
    'e-commerce-sales-forecasting-using-machine-learning',
    'predict-stock-levels-using-ai',
    'ai-inventory-forecasting',
    'product-hunt-launch',
    'microsoft-clarity-how-to-use',
    'inventory-flow',
    'demand-variability-explained',
    'demand-forecasting-new-products',
    'analytics-in-demand-planning-a-practical-guide',
    'types-of-forecasting',
    'seasonal-demand-forecasting',
    'automate-purchase-orders',
    'free-purchase-order-templates',
    'restocking-inventory-on-shopify',
    'automatic-stock-replenishment',
    'stockout-costs',
    'out-of-stock-inventory-shopify',
    'apparel-demand-forecasting',
    'shopify-variant-limit',
    'shopify-pre-orders',
    'woocommerce-inventory-management',
    'demand-sensing-process-guide',
    'supply-chain-forecasting-software-comparison',
    'shopify-inventory-forecasting-app-comparison',
  ].map((slug) => ({
    path: `/blog/${slug}`,
    outputDir: 'content/blog',
    filename: `${slug}.json`,
  }))),
];

interface PageData {
  url: string;
  title: string;
  metaDescription: string;
  canonical: string;
  h1: string;
  headings: { level: string; text: string }[];
  bodyHtml: string;
  bodyText: string;
  images: { src: string; alt: string }[];
  internalLinks: string[];
  externalLinks: string[];
  jsonLd: string[];
  scrapedAt: string;
}

async function scrapePage(browser: Browser, url: string): Promise<PageData> {
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );
  await page.setViewport({ width: 1440, height: 900 });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    // Extra wait for JS-rendered content
    await new Promise((r) => setTimeout(r, 2000));

    const data = await page.evaluate((baseUrl: string) => {
      const title = document.title || '';
      const metaDesc = (document.querySelector('meta[name="description"]') as HTMLMetaElement)?.content || '';
      const canonical = (document.querySelector('link[rel="canonical"]') as HTMLLinkElement)?.href || '';
      const h1 = document.querySelector('h1')?.textContent?.trim() || '';

      const headings: { level: string; text: string }[] = [];
      document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((el) => {
        headings.push({ level: el.tagName, text: el.textContent?.trim() || '' });
      });

      // Get main content area - try article, main, then body
      const contentEl =
        document.querySelector('article') ||
        document.querySelector('main') ||
        document.body;

      const bodyHtml = contentEl?.innerHTML || '';
      const bodyText = contentEl?.innerText || document.body.innerText || '';

      const images: { src: string; alt: string }[] = [];
      document.querySelectorAll('img').forEach((img) => {
        if (img.src) images.push({ src: img.src, alt: img.alt || '' });
      });

      const internalLinks: string[] = [];
      const externalLinks: string[] = [];
      document.querySelectorAll('a[href]').forEach((a) => {
        const href = (a as HTMLAnchorElement).href;
        if (href.startsWith(baseUrl) || href.startsWith('/')) {
          internalLinks.push(href);
        } else if (href.startsWith('http')) {
          externalLinks.push(href);
        }
      });

      const jsonLd: string[] = [];
      document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
        if (s.textContent) jsonLd.push(s.textContent);
      });

      return { title, metaDescription: metaDesc, canonical, h1, headings, bodyHtml, bodyText, images, internalLinks, externalLinks, jsonLd };
    }, BASE_URL);

    return {
      ...data,
      url,
      scrapedAt: new Date().toISOString(),
    };
  } finally {
    await page.close();
  }
}

async function main() {
  console.log(`Starting scrape of ${URLS.length} URLs...`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results: { success: string[]; failed: string[] } = { success: [], failed: [] };

  for (const entry of URLS) {
    const url = `${BASE_URL}${entry.path}`;
    const outputPath = path.join(process.cwd(), entry.outputDir, entry.filename);

    // Skip if already scraped
    if (fs.existsSync(outputPath)) {
      console.log(`  [SKIP] Already exists: ${entry.filename}`);
      results.success.push(url);
      continue;
    }

    process.stdout.write(`  Scraping ${url} ... `);
    try {
      const data = await scrapePage(browser, url);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`OK (h1: "${data.h1?.slice(0, 50)}")`);
      results.success.push(url);
    } catch (err) {
      console.log(`FAILED: ${(err as Error).message}`);
      results.failed.push(url);
    }

    // Small delay between requests to be polite
    await new Promise((r) => setTimeout(r, 500));
  }

  await browser.close();

  console.log(`\nDone. Success: ${results.success.length}, Failed: ${results.failed.length}`);
  if (results.failed.length > 0) {
    console.log('Failed URLs:');
    results.failed.forEach((u) => console.log(`  - ${u}`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
