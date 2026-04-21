import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import Papa from 'papaparse'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CSV_PATH = 'C:\\Users\\jad86\\Downloads\\Blog.csv'
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog')

interface CsvRow {
  Slug: string
  Title: string
  Date: string
  'Top Content': string
  'Bottom Content': string
  Image: string
  'Image:alt': string
  'Meta Description': string
}

const csv = fs.readFileSync(CSV_PATH, 'utf-8')

const { data, errors } = Papa.parse<CsvRow>(csv, {
  header: true,
  skipEmptyLines: true,
})

if (errors.length > 0) {
  console.error('CSV parse errors:', errors.slice(0, 5))
}

let updated = 0
let skipped = 0
let created = 0

for (const row of data) {
  const slug = row.Slug?.trim()
  if (!slug) continue

  const htmlContent = [row['Top Content'] || '', row['Bottom Content'] || '']
    .filter(Boolean)
    .join('\n')

  const jsonPath = path.join(BLOG_DIR, `${slug}.json`)

  let existing: Record<string, unknown> = {}
  if (fs.existsSync(jsonPath)) {
    existing = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
    updated++
  } else {
    created++
    console.log(`  NEW: ${slug}`)
  }

  const merged = {
    ...existing,
    title: row.Title || existing.title || slug,
    metaDescription: row['Meta Description'] || existing.metaDescription || '',
    htmlContent,
    imageUrl: row.Image || existing.imageUrl || '',
    imageAlt: row['Image:alt'] || existing.imageAlt || '',
    csvDate: row.Date || '',
  }

  fs.writeFileSync(jsonPath, JSON.stringify(merged, null, 2))
}

console.log(`Done. Updated: ${updated}, Created: ${created}, Skipped: ${skipped}`)
