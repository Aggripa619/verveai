import { getResend, getEmailFrom } from '@/lib/resend'
import { getSupabaseAdmin } from '@/lib/supabase'
import { renderEmailHtml } from '@/lib/emailTemplate'
import { FOLLOW_UP_SEQUENCES } from '@/lib/followUpSequences'

interface SendStepParams {
  leadId: string
  email: string
  name: string | null
  toolSlug: string
  day: number
}

type SendResult = 'sent' | 'skipped-duplicate' | 'skipped-no-sequence'

export async function sendFollowUpStep({ leadId, email, name, toolSlug, day }: SendStepParams): Promise<SendResult> {
  const sequence = FOLLOW_UP_SEQUENCES[toolSlug]
  const step = sequence?.steps.find((s) => s.day === day)
  if (!sequence || !step) return 'skipped-no-sequence'

  // Claim the (lead, step) slot before sending, not after — if the cron run
  // retries or overlaps, the unique constraint on email_sends blocks a
  // second send instead of racing to send twice.
  const { error: claimError } = await getSupabaseAdmin().from('email_sends').insert({
    lead_id: leadId,
    tool_slug: toolSlug,
    sequence_step: day,
  })
  if (claimError) {
    if (claimError.code === '23505') return 'skipped-duplicate'
    throw claimError
  }

  const firstName = name?.trim().split(' ')[0] || 'there'
  const bodyHtml = step.bodyHtml({ firstName, toolUrl: sequence.toolUrl })
  const html = renderEmailHtml({ preheader: step.subject, bodyHtml, leadId })

  await getResend().emails.send({
    from: getEmailFrom(),
    to: email,
    subject: step.subject,
    html,
  })

  return 'sent'
}
