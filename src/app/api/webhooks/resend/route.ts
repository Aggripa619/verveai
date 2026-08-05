import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const payload = await req.text()

  const id = req.headers.get('svix-id')
  const timestamp = req.headers.get('svix-timestamp')
  const signature = req.headers.get('svix-signature')
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET

  if (!id || !timestamp || !signature || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature headers or secret' }, { status: 400 })
  }

  let event
  try {
    event = getResend().webhooks.verify({
      payload,
      headers: { id, timestamp, signature },
      webhookSecret,
    })
  } catch (err) {
    console.error('Invalid Resend webhook signature:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const tags = 'tags' in event.data ? event.data.tags : undefined
  const leadId = tags?.lead_id
  const sequenceStep = tags?.sequence_step ? Number(tags.sequence_step) : null

  const supabase = getSupabaseAdmin()

  switch (event.type) {
    case 'email.opened': {
      if (leadId && sequenceStep !== null) {
        await supabase
          .from('email_sends')
          .update({ opened_at: new Date().toISOString() })
          .eq('lead_id', leadId)
          .eq('sequence_step', sequenceStep)
          .is('opened_at', null)
      }
      break
    }
    case 'email.clicked': {
      if (leadId && sequenceStep !== null) {
        await supabase
          .from('email_sends')
          .update({ clicked_at: new Date().toISOString() })
          .eq('lead_id', leadId)
          .eq('sequence_step', sequenceStep)
          .is('clicked_at', null)
      }
      break
    }
    case 'email.bounced':
    case 'email.complained': {
      // Stop future sends to an address that bounced or complained —
      // protects sender reputation while the domain is still warming up.
      if (leadId) {
        await supabase.from('tool_leads').update({ unsubscribed: true }).eq('id', leadId)
      }
      break
    }
    default:
      break
  }

  return NextResponse.json({ received: true })
}
