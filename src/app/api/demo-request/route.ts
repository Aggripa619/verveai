import { NextRequest, NextResponse } from 'next/server'
import { getResend, getEmailFrom } from '@/lib/resend'
import { sendGa4Event, ga4IdentityFromRequest } from '@/lib/ga4'

// "Book a demo" form on /demo. Each request is emailed to the team (reply-to
// set to the requester so a plain Reply starts the conversation) and recorded
// in GA4 as `demo_request`.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PLATFORMS = new Set(['shopify', 'woocommerce', 'other'])
const NOTIFY_TO = process.env.DEMO_REQUEST_TO || 'hello@getverveai.com'

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}

export async function POST(req: NextRequest) {
  const { name, email, storeUrl, platform, message, website } = await req.json()

  // Honeypot: the hidden "website" field is invisible to people, so anything
  // in it came from a bot. Pretend success so it doesn't retry.
  if (website) return NextResponse.json({ success: true })

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  if (!name?.trim()) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
  }
  const cleanPlatform = PLATFORMS.has(platform) ? platform : 'other'

  const fields: [string, string][] = [
    ['Name', String(name).trim().slice(0, 100)],
    ['Email', String(email).trim().toLowerCase().slice(0, 200)],
    ['Store URL', String(storeUrl ?? '').trim().slice(0, 300) || '—'],
    ['Platform', cleanPlatform],
    ['Message', String(message ?? '').trim().slice(0, 2000) || '—'],
  ]

  try {
    const { error } = await getResend().emails.send({
      from: getEmailFrom(),
      to: NOTIFY_TO,
      replyTo: fields[1][1],
      subject: `Demo request: ${fields[0][1]} (${cleanPlatform})`,
      html:
        '<h2>New demo request — getverveai.com/demo</h2><table cellpadding="6">' +
        fields.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`).join('') +
        '</table><p>Reply to this email to respond directly.</p>',
    })
    if (error) throw error
  } catch (sendError) {
    console.error('Demo request email failed:', sendError)
    return NextResponse.json(
      { error: 'Something went wrong. Please email hello@getverveai.com instead.' },
      { status: 500 }
    )
  }

  // Best-effort: never fail the request because analytics did.
  try {
    await sendGa4Event(ga4IdentityFromRequest(req), 'demo_request', { platform: cleanPlatform })
  } catch (gaError) {
    console.error('GA4 demo_request event failed:', gaError)
  }

  return NextResponse.json({ success: true })
}
