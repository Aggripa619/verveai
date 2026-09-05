// Server-side GA4 conversion tracking via the Measurement Protocol.
//
// Why this exists: the client-side dataLayer.push({event: 'email_gate_submit', ...})
// in EmailGateModal.tsx has fired correctly since it was added — the gap GA4's
// own Conversions report shows isn't missing client-side code, it's that GTM
// container GTM-KP49WHM6 needs its own configuration (a GA4 Event tag mapped to
// this dataLayer event, and that event marked as a Key Event in GA4) before GA4
// will count it — configuration this codebase can't reach, since it lives in
// the Google Tag Manager / Google Analytics admin UIs, not in a file here.
//
// This sends the same conversion directly to GA4's collection endpoint from
// the server, independent of GTM entirely, so the conversion is recorded even
// if the GTM-side tag is never configured. Requires GA4_MEASUREMENT_ID (the
// "G-XXXXXXXXXX" ID for the GA4 property) and GA4_API_SECRET (GA4 Admin ->
// Data Streams -> [your web stream] -> Measurement Protocol API secrets ->
// Create) as environment variables. Silently no-ops if either is unset --
// lead capture must never depend on this succeeding.

const MEASUREMENT_PROTOCOL_URL = 'https://www.google-analytics.com/mp/collect'

interface Ga4LeadEventParams {
  /** GA4 client_id -- read from the browser's `_ga` cookie when available, so
   *  the server-side hit ties back to the same session as the visitor's
   *  browsing activity, rather than looking like a brand new anonymous user. */
  clientId: string
  toolSlug: string
  toolName: string
}

/** Extracts the GA4 client_id from a raw `_ga` cookie value like
 *  "GA1.1.1234567890.1234567890" -> "1234567890.1234567890". Returns null if
 *  the cookie is missing or doesn't match the expected shape. */
export function parseGa4ClientIdFromCookie(gaCookieValue: string | undefined): string | null {
  if (!gaCookieValue) return null
  const parts = gaCookieValue.split('.')
  if (parts.length < 4) return null
  return `${parts[2]}.${parts[3]}`
}

export async function sendGa4LeadEvent({ clientId, toolSlug, toolName }: Ga4LeadEventParams): Promise<void> {
  const measurementId = process.env.GA4_MEASUREMENT_ID
  const apiSecret = process.env.GA4_API_SECRET
  if (!measurementId || !apiSecret) return // Not configured -- skip silently.

  const url = `${MEASUREMENT_PROTOCOL_URL}?measurement_id=${measurementId}&api_secret=${apiSecret}`

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      events: [
        {
          name: 'generate_lead',
          params: {
            tool_slug: toolSlug,
            tool_name: toolName,
          },
        },
      ],
    }),
  })
}
