/**
 * One-time script to generate pSEO vertical JSON data files using Claude API.
 * Run from verveai/ directory:  npx ts-node --project tsconfig.scripts.json scripts/generate-verticals.ts
 *
 * Requires ANTHROPIC_API_KEY in environment.
 */

import Anthropic from '@anthropic-ai/sdk'
import * as fs from 'fs'
import * as path from 'path'

const client = new Anthropic()

interface PainPoint {
  title: string
  description: string
  icon: string
}

interface FeatureMapping {
  pain: string
  feature: string
  description: string
}

interface FaqItem {
  question: string
  answer: string
}

interface VerticalData {
  vertical_name: string
  vertical_slug: string
  hero_pain: string
  hero_intro: string
  pain_points: PainPoint[]
  feature_mapping: FeatureMapping[]
  social_proof_quote: string
  social_proof_attribution: string
  seasonality_note: string
  typical_sku_count: string
  avg_lead_time: string
  faq: FaqItem[]
  related_blog_slugs: string[]
  meta_title: string
  meta_description: string
}

const VERTICALS: Array<{
  slug: string
  name: string
  pain_hint: string
  seasonality: string
  sku_count: string
  lead_time: string
  related_slugs: string[]
}> = [
  {
    slug: 'apparel',
    name: 'Apparel & Fashion',
    pain_hint: 'size and colour variant explosions, seasonal dead stock, and multi-location stock transfers',
    seasonality: 'Strong peaks at Spring/Summer and Autumn/Winter seasons, plus sale events',
    sku_count: '500–5,000 active SKUs',
    lead_time: '45–90 days (overseas manufacturing)',
    related_slugs: ['apparel-demand-forecasting', 'seasonal-demand-forecasting', 'sku-forecasting'],
  },
  {
    slug: 'supplements',
    name: 'Health & Supplements',
    pain_hint: 'expiry date and FIFO management, subscription order demand spikes, and regulatory batch compliance',
    seasonality: 'New Year resolution spike in January, back-to-school in September',
    sku_count: '100–800 active SKUs',
    lead_time: '30–60 days (domestic and overseas)',
    related_slugs: ['demand-forecasting-new-products', 'automatic-stock-replenishment', 'safety-stock-calculator'],
  },
  {
    slug: 'beauty',
    name: 'Beauty & Cosmetics',
    pain_hint: 'influencer-driven demand spikes, short shelf life and expiry risk, and high SKU counts across shades and formulas',
    seasonality: 'Valentine\'s Day, Mother\'s Day, and Q4 gifting season are peak periods',
    sku_count: '200–2,000 active SKUs',
    lead_time: '30–75 days',
    related_slugs: ['demand-forecasting-ecommerce', 'seasonal-demand-forecasting', 'inventory-flow'],
  },
  {
    slug: 'pet-supplies',
    name: 'Pet Supplies',
    pain_hint: 'recurring consumable demand for food and treats, subscription box fulfilment planning, and seasonal trend-driven spikes',
    seasonality: 'Consistent year-round demand with spikes around Christmas gifting and summer travel accessories',
    sku_count: '200–1,500 active SKUs',
    lead_time: '20–45 days',
    related_slugs: ['automatic-stock-replenishment', 'inventory-replenishment-process', 'reorder-level-formula'],
  },
  {
    slug: 'jewellery',
    name: 'Jewellery & Accessories',
    pain_hint: 'high-value low-volume SKU tracking, gift season demand surges, and supplier lead time variability',
    seasonality: 'Valentine\'s Day, Mother\'s Day, and Christmas are critical gifting peaks',
    sku_count: '100–1,000 active SKUs',
    lead_time: '30–90 days (artisan and overseas suppliers)',
    related_slugs: ['sku-forecasting', 'seasonal-demand-forecasting', 'stockout-costs'],
  },
  {
    slug: 'home-goods',
    name: 'Home Goods & Décor',
    pain_hint: 'long overseas supplier lead times, seasonal décor demand cycles, and dead stock from slow-moving lines',
    seasonality: 'Spring refresh season and Q4 gifting drive the largest demand peaks',
    sku_count: '300–3,000 active SKUs',
    lead_time: '60–120 days (overseas manufacturers)',
    related_slugs: ['seasonal-demand-forecasting', 'inventory-flow', 'demand-forecasting-ecommerce'],
  },
  {
    slug: 'food-and-beverage',
    name: 'Food & Beverage',
    pain_hint: 'perishable stock and expiry management, subscription plus one-time order mix, and lot and batch tracking compliance',
    seasonality: 'Summer BBQ season, Christmas gifting, and Dry January wellness spikes',
    sku_count: '50–500 active SKUs',
    lead_time: '7–30 days (domestic and short-shelf-life)',
    related_slugs: ['demand-forecasting-new-products', 'automatic-stock-replenishment', 'inventory-flow'],
  },
  {
    slug: 'sports-and-outdoor',
    name: 'Sports & Outdoor',
    pain_hint: 'strong seasonal splits between summer and winter product lines, wide size and spec variant ranges, and drop-shipping hybrid fulfilment',
    seasonality: 'Hard summer/winter split — outdoor gear peaks May–August, winter sports October–January',
    sku_count: '400–4,000 active SKUs',
    lead_time: '45–90 days (overseas and specialist suppliers)',
    related_slugs: ['seasonal-demand-forecasting', 'demand-forecasting-ecommerce', 'sku-forecasting'],
  },
]

const SYSTEM_PROMPT = `You are an expert e-commerce content writer specialising in Shopify inventory management software. You write authoritative, specific, and conversion-focused content for B2B SaaS landing pages.

You will generate a JSON object for a programmatic SEO landing page for Verve AI — a Shopify-native AI inventory operations platform offering demand forecasting, automated purchase orders, multi-location stock management, and supplier scorecards.

STRICT REQUIREMENTS:
1. Return ONLY valid JSON — no markdown fences, no extra text
2. hero_intro: exactly 2-3 sentences, must contain "Shopify" and the vertical name, must be unique and not generic
3. pain_points: exactly 3 items; each description must be 30-50 words; icon must be a single emoji
4. feature_mapping: exactly 3 items; each description must be 40-60 words; pain field must exactly match a pain_points[].title
5. faq: exactly 5 items; each answer must be 50-100 words of plain text (no HTML); questions must reflect real Shopify merchant concerns
6. meta_title: maximum 60 characters including spaces
7. meta_description: maximum 155 characters including spaces
8. social_proof_quote: 1-2 sentences sounding like a real merchant review, specific and credible
9. All content must be substantive and differentiated — no generic filler phrases like "streamline your operations" or "take control of your inventory"
10. Do not copy phrases from other verticals`

async function generateVertical(
  vertical: (typeof VERTICALS)[0]
): Promise<VerticalData> {
  const userPrompt = `Generate content for the "${vertical.name}" vertical (slug: "${vertical.slug}").

Context for this vertical:
- Primary pain points: ${vertical.pain_hint}
- Seasonality pattern: ${vertical.seasonality}
- Typical SKU count: ${vertical.sku_count}
- Average lead time: ${vertical.lead_time}
- Related blog post slugs to reference: ${vertical.related_slugs.join(', ')}

Return a JSON object with EXACTLY these fields:
{
  "vertical_name": "${vertical.name}",
  "vertical_slug": "${vertical.slug}",
  "hero_pain": "<1-sentence industry-specific pain>",
  "hero_intro": "<2-3 sentences mentioning Shopify and ${vertical.name}>",
  "pain_points": [
    { "title": "<short label>", "description": "<30-50 words>", "icon": "<emoji>" },
    { "title": "<short label>", "description": "<30-50 words>", "icon": "<emoji>" },
    { "title": "<short label>", "description": "<30-50 words>", "icon": "<emoji>" }
  ],
  "feature_mapping": [
    { "pain": "<must match a pain_points title exactly>", "feature": "<Verve AI feature>", "description": "<40-60 words>" },
    { "pain": "<must match a pain_points title exactly>", "feature": "<Verve AI feature>", "description": "<40-60 words>" },
    { "pain": "<must match a pain_points title exactly>", "feature": "<Verve AI feature>", "description": "<40-60 words>" }
  ],
  "social_proof_quote": "<specific merchant-sounding quote>",
  "social_proof_attribution": "Verified Shopify Merchant — ${vertical.name}",
  "seasonality_note": "${vertical.seasonality}",
  "typical_sku_count": "${vertical.sku_count}",
  "avg_lead_time": "${vertical.lead_time}",
  "faq": [
    { "question": "<real Shopify merchant question>", "answer": "<50-100 words plain text>" },
    { "question": "<real Shopify merchant question>", "answer": "<50-100 words plain text>" },
    { "question": "<real Shopify merchant question>", "answer": "<50-100 words plain text>" },
    { "question": "<real Shopify merchant question>", "answer": "<50-100 words plain text>" },
    { "question": "<real Shopify merchant question>", "answer": "<50-100 words plain text>" }
  ],
  "related_blog_slugs": ${JSON.stringify(vertical.related_slugs)},
  "meta_title": "<max 60 chars>",
  "meta_description": "<max 155 chars>"
}`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  const data = JSON.parse(text) as VerticalData

  // Validate key constraints
  if (data.meta_title.length > 60) {
    console.warn(`  ⚠ meta_title too long (${data.meta_title.length} chars): truncating`)
    data.meta_title = data.meta_title.slice(0, 57) + '...'
  }
  if (data.meta_description.length > 155) {
    console.warn(`  ⚠ meta_description too long (${data.meta_description.length} chars): truncating`)
    data.meta_description = data.meta_description.slice(0, 152) + '...'
  }
  if (data.pain_points.length !== 3) {
    throw new Error(`Expected 3 pain_points, got ${data.pain_points.length}`)
  }
  if (data.faq.length < 4) {
    throw new Error(`Expected at least 4 FAQ items, got ${data.faq.length}`)
  }

  return data
}

async function main() {
  const outputDir = path.join(process.cwd(), 'content', 'verticals')
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

  const slugArg = process.argv[2]
  const toGenerate = slugArg
    ? VERTICALS.filter((v) => v.slug === slugArg)
    : VERTICALS

  if (toGenerate.length === 0) {
    console.error(`No vertical found with slug: ${slugArg}`)
    process.exit(1)
  }

  for (const vertical of toGenerate) {
    const outPath = path.join(outputDir, `${vertical.slug}.json`)
    if (fs.existsSync(outPath) && !process.argv.includes('--force')) {
      console.log(`⏭  Skipping ${vertical.slug} (already exists — use --force to regenerate)`)
      continue
    }

    console.log(`🔄 Generating ${vertical.name}...`)
    try {
      const data = await generateVertical(vertical)
      fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8')
      console.log(`✅ ${vertical.slug}.json written`)
    } catch (err) {
      console.error(`❌ Failed for ${vertical.slug}:`, err)
    }

    // Small delay between API calls
    if (toGenerate.indexOf(vertical) < toGenerate.length - 1) {
      await new Promise((r) => setTimeout(r, 500))
    }
  }

  console.log('\nDone. Run `npm run build` to verify pages.')
}

main()
