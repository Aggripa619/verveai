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

export interface VerticalData {
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
}
