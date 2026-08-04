import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const leadId = req.nextUrl.searchParams.get('lead')

  if (!leadId) {
    return new NextResponse('Missing unsubscribe link.', { status: 400 })
  }

  const { error } = await getSupabaseAdmin()
    .from('tool_leads')
    .update({ unsubscribed: true })
    .eq('id', leadId)

  if (error) {
    console.error('Unsubscribe failed:', error)
    return new NextResponse('Something went wrong. Please try again.', { status: 500 })
  }

  return new NextResponse(
    `<!doctype html>
<html>
<head><meta charset="utf-8" /><title>Unsubscribed — Verve AI</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:rgb(245,245,245);padding:64px 16px;text-align:center;">
  <h1 style="color:rgb(19,33,68);">You're unsubscribed</h1>
  <p style="color:rgb(107,114,128);">You won't receive any more follow-up emails from Verve AI.</p>
</body>
</html>`,
    { status: 200, headers: { 'Content-Type': 'text/html' } }
  )
}
