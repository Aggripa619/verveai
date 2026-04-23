import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

const INTERACTIVE_TOOLS = new Set(['safety-stock-calculator'])

const SHEET_URLS: Record<string, string> = {
  'reorder-point-calculator':  'https://docs.google.com/spreadsheets/d/1XyDZw_cHpyS6E2evvfctIPyZdn0ze4qreLcHC8KsV7M/edit?usp=drivesdk',
  'inventory-control-excel':   'https://docs.google.com/spreadsheets/d/1WvfS3RR-oZx-ozB5n3ZbZ5neu7zKNRvQx02GZ4BvZvk/edit?usp=drivesdk',
  'sales-forecast-template':   'https://docs.google.com/spreadsheets/d/1gdjpQOaCkQuYAnMN_hWkWBZdCplU4AyfxWP5Y4Vq5CM/edit?usp=drivesdk',
  'cashflow-forecast-template':'https://docs.google.com/spreadsheets/d/1pwJcHzAPcxTcuXhi897NdonHj9pXmCNmClMvCM8YEoc/edit?usp=drivesdk',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const { email, name, toolSlug, toolName } = await req.json()

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const redirectUrl = SHEET_URLS[toolSlug] ?? null
  const isInteractive = INTERACTIVE_TOOLS.has(toolSlug)
  if (!redirectUrl && !isInteractive) {
    return NextResponse.json({ error: 'Unknown tool.' }, { status: 400 })
  }

  const { error } = await getSupabase().from('tool_leads').insert({
    email: email.toLowerCase().trim(),
    name: name?.trim() || null,
    tool_slug: toolSlug,
    tool_name: toolName,
  })

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message, code: error.code }, { status: 500 })
  }

  return NextResponse.json({ success: true, ...(redirectUrl ? { redirectUrl } : {}) })
}
