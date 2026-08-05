import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { sendFollowUpStep } from '@/lib/sendFollowUp'
import { FOLLOW_UP_SEQUENCES, SEQUENCE_DAYS } from '@/lib/followUpSequences'

export const maxDuration = 60

const DAY_MS = 24 * 60 * 60 * 1000

// New sending domain — cap sends per run so a backlog of old leads doesn't
// look like a volume spike to mailbox providers while reputation warms up.
// Raise this (or remove the cap) once Resend/Google Postmaster show a
// healthy sender reputation.
const MAX_SENDS_PER_RUN = Number(process.env.FOLLOWUP_DAILY_SEND_CAP ?? 25)

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  return req.headers.get('authorization') === `Bearer ${secret}`
}

// Vercel Cron hits this daily. Sends the day-5 and day-15 steps (day-0 is
// sent synchronously from /api/dl on capture, not from here).
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const configuredSlugs = Object.keys(FOLLOW_UP_SEQUENCES)
  const laterDays = SEQUENCE_DAYS.filter((d) => d > 0).sort((a, b) => a - b)

  if (configuredSlugs.length === 0 || laterDays.length === 0) {
    return NextResponse.json({ sent: 0, skipped: 0, candidates: 0, note: 'no sequences configured' })
  }

  const supabase = getSupabaseAdmin()
  const now = Date.now()
  const minDays = Math.min(...laterDays)
  const cutoff = new Date(now - minDays * DAY_MS).toISOString()

  const { data: leads, error: leadsError } = await supabase
    .from('tool_leads')
    .select('id, email, name, tool_slug, created_at')
    .in('tool_slug', configuredSlugs)
    .eq('unsubscribed', false)
    .lte('created_at', cutoff)
    .order('created_at', { ascending: true })

  if (leadsError) {
    console.error('Failed to fetch leads for follow-up:', leadsError)
    return NextResponse.json({ error: leadsError.message }, { status: 500 })
  }

  const leadIds = (leads ?? []).map((l) => l.id)
  const { data: sent, error: sentError } = leadIds.length
    ? await supabase.from('email_sends').select('lead_id, sequence_step').in('lead_id', leadIds)
    : { data: [], error: null }

  if (sentError) {
    console.error('Failed to fetch email_sends log:', sentError)
    return NextResponse.json({ error: sentError.message }, { status: 500 })
  }

  const alreadySent = new Set((sent ?? []).map((r) => `${r.lead_id}:${r.sequence_step}`))

  let sentCount = 0
  let skippedCount = 0
  let cappedCount = 0

  // At most one step per lead per run — a lead that's overdue for both day-5
  // and day-15 (e.g. a backlog of leads from before this system existed)
  // only gets the earliest missing one now; the next day's run catches up
  // the rest. Otherwise someone could receive two marketing emails minutes
  // apart the first time the cron catches up an old lead.
  //
  // Leads are ordered oldest-first, so once the cap is hit we keep scanning
  // (cheap — no more API calls) just to report an accurate deferred count;
  // the leads that actually got sent are always the longest-overdue ones.
  for (const lead of leads ?? []) {
    const ageDays = (now - new Date(lead.created_at).getTime()) / DAY_MS

    const dueDay = laterDays.find(
      (day) => ageDays >= day && !alreadySent.has(`${lead.id}:${day}`)
    )
    if (dueDay === undefined) continue

    if (sentCount >= MAX_SENDS_PER_RUN) {
      cappedCount++
      continue
    }

    try {
      const result = await sendFollowUpStep({
        leadId: lead.id,
        email: lead.email,
        name: lead.name,
        toolSlug: lead.tool_slug,
        day: dueDay,
      })
      if (result === 'sent') sentCount++
      else skippedCount++
    } catch (err) {
      console.error(`Follow-up day-${dueDay} failed for lead ${lead.id}:`, err)
      skippedCount++
    }
  }

  return NextResponse.json({
    sent: sentCount,
    skipped: skippedCount,
    deferred: cappedCount,
    candidates: leads?.length ?? 0,
  })
}
