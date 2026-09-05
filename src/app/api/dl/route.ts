import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { sendFollowUpStep } from '@/lib/sendFollowUp'
import { sendGa4LeadEvent, parseGa4ClientIdFromCookie } from '@/lib/ga4'
import { randomUUID } from 'crypto'

const INTERACTIVE_TOOLS = new Set(['safety-stock-calculator', 'reorder-point-calculator'])

const SHEET_URLS: Record<string, string> = {
  'reorder-point-calculator':  'https://docs.google.com/spreadsheets/d/1XyDZw_cHpyS6E2evvfctIPyZdn0ze4qreLcHC8KsV7M/edit?usp=drivesdk',
  'inventory-control-excel':   'https://docs.google.com/spreadsheets/d/1WvfS3RR-oZx-ozB5n3ZbZ5neu7zKNRvQx02GZ4BvZvk/edit?usp=drivesdk',
  'sales-forecast-template':   'https://docs.google.com/spreadsheets/d/1gdjpQOaCkQuYAnMN_hWkWBZdCplU4AyfxWP5Y4Vq5CM/edit?usp=drivesdk',
  'cashflow-forecast-template':'https://docs.google.com/spreadsheets/d/1pwJcHzAPcxTcuXhi897NdonHj9pXmCNmClMvCM8YEoc/edit?usp=drivesdk',
  'ecommerce-profit-margin-calculator': 'https://tool1.getverveai.com/',
  'inventory-days-calculator': 'https://tool2.getverveai.com/',
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

  const cleanEmail = email.toLowerCase().trim()
  const cleanName = name?.trim() || null

  // Uses the service-role client (not the public anon client): we need the
  // inserted row's id back for the follow-up email log, and the anon role's
  // RLS policy only grants INSERT on tool_leads, not SELECT — chaining
  // .select() on an anon insert fails RLS even though the insert itself
  // would succeed. Request validation above (email format, toolSlug
  // allowlist) still applies regardless of which client performs the write.
  const { data, error } = await getSupabaseAdmin()
    .from('tool_leads')
    .insert({
      email: cleanEmail,
      name: cleanName,
      tool_slug: toolSlug,
      tool_name: toolName,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message, code: error.code }, { status: 500 })
  }

  // Best-effort: a follow-up email failing should never break lead capture.
  try {
    await sendFollowUpStep({ leadId: data.id, email: cleanEmail, name: cleanName, toolSlug, day: 0 })
  } catch (sendError) {
    console.error('Follow-up email (day 0) failed:', sendError)
  }

  // Best-effort: records this conversion directly with GA4 server-side, so it
  // doesn't depend on the GTM container's own tag configuration (see
  // src/lib/ga4.ts for why). No-ops if GA4_MEASUREMENT_ID/GA4_API_SECRET
  // aren't set, and must never break lead capture if it fails.
  try {
    const gaClientId =
      parseGa4ClientIdFromCookie(req.cookies.get('_ga')?.value) ?? randomUUID()
    await sendGa4LeadEvent({ clientId: gaClientId, toolSlug, toolName })
  } catch (gaError) {
    console.error('GA4 server-side conversion event failed:', gaError)
  }

  return NextResponse.json({ success: true, ...(redirectUrl ? { redirectUrl } : {}) })
}
