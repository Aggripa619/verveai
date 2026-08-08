export interface PainPoint {
  title: string
  description: string
  icon?: string
}

export interface FeatureMapping {
  pain: string
  feature: string
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface HowItWorksStep {
  step: string
  title: string
  desc: string
}

export interface HowItWorksVariant {
  steps: HowItWorksStep[]
}

export interface VerticalData {
  vertical_name: string
  vertical_slug: string
  hero_pain: string
  hero_intro: string
  // Pools: templates select a deterministic per-page subset (see
  // getPainFeatureSelection / getFaqSelection / getHowItWorksVariant in
  // lib/content.ts) rather than rendering the full pool on every page.
  // Originally fixed at 3/3/5 items (one subset = the whole pool, so every
  // page in a vertical showed identical content) -- grown to 6/6/10 so a
  // pool.length <= count guard still passes through safely for any vertical
  // not yet expanded.
  pain_points: PainPoint[]
  feature_mapping: FeatureMapping[]
  social_proof_quote: string
  social_proof_attribution: string
  seasonality_note: string
  typical_sku_count: string
  avg_lead_time: string
  faq: FaqItem[]
  how_it_works_pool?: HowItWorksVariant[]
  related_blog_slugs: string[]
  meta_title: string
  meta_description: string
  og_image?: string
}

export interface PseoPageEntry {
  slug: string
  keyword: string
  vertical: string          // matches content/verticals/{vertical}.json
  page_type: 'vertical_landing' | 'feature' | 'blog'
  h1: string
  meta_title: string        // ≤60 chars
  meta_description: string  // ≤155 chars
  hero_intro: string        // 2-3 sentences, keyword-matched
  deep_dive?: string        // ~100-180 words, genuinely page-specific (not vertical-generic)
}
