import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

// Temporary, CRON_SECRET-gated debug route for verifying open/click
// tracking landed correctly. Remove after use.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await getSupabaseAdmin()
    .from('email_sends')
    .select('lead_id, tool_slug, sequence_step, sent_at, resend_email_id, opened_at, clicked_at')
    .order('sent_at', { ascending: false })
    .limit(15)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ rows: data })
}
