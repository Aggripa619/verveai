// Server-side GA4 conversion tracking via the Measurement Protocol.
//
// Why server-side: conversions recorded here don't depend on the GTM
// container's tag configuration (GTM-KP49WHM6) or survive-the-ad-blocker luck
// on the client — the browser only has to reach our own API. Requires
// GA4_MEASUREMENT_ID ("G-XXXXXXXXXX") and GA4_API_SECRET (GA4 Admin -> Data
// Streams -> [web stream] -> Measurement Protocol API secrets) as environment
// variables. Every sender silently no-ops if either is unset — lead capture
// must never depend on this succeeding.
//
// Sent from here: generate_lead (tool / calculator email gate, api/dl).
// Clicks out to the Shopify App Store / WordPress.org are tracked in GA4
// itself (Shopify_Listing_Click / WooCommerce_Listing_Click, created from
// enhanced-measurement outbound `click` events), not by this code.

import type { NextRequest } from 'next/server'
import { randomUUID } from 'crypto'

const MEASUREMENT_PROTOCOL_URL = 'https://www.google-analytics.com/mp/collect'

/** Extracts the GA4 client_id from a raw `_ga` cookie value like
 *  "GA1.1.1234567890.1234567890" -> "1234567890.1234567890". Returns null if
 *  the cookie is missing or doesn't match the expected shape. */
export function parseGa4ClientIdFromCookie(gaCookieValue: string | undefined): string | null {
  if (!gaCookieValue) return null
  const parts = gaCookieValue.split('.')
  if (parts.length < 4) return null
  return `${parts[2]}.${parts[3]}`
}

/** Extracts the current session_id from the property's `_ga_<ID>` cookie.
 *  Handles both formats: "GS1.1.1730000000.3.1...." and
 *  "GS2.1.s1730000000$o3$g1$t...". Without a session_id, GA4 can't join a
 *  server-side event to the visitor's session, so it shows as "Unassigned"
 *  traffic instead of the channel that actually drove the conversion. */
export function parseGa4SessionIdFromCookie(sessionCookieValue: string | undefined): string | null {
  if (!sessionCookieValue) return null
  const parts = sessionCookieValue.split('.')
  if (parts.length < 3) return null
  if (parts[0] === 'GS2') {
    const match = parts.slice(2).join('.').match(/^s(\d+)/)
    return match ? match[1] : null
  }
  return /^\d+$/.test(parts[2]) ? parts[2] : null
}

interface Ga4Identity {
  clientId: string
  sessionId: string | null
}

/** Reads the visitor's GA4 client_id + session_id from the request cookies,
 *  falling back to a random client_id when the visitor has no `_ga` cookie
 *  (consent declined, blocked, or first hit). */
export function ga4IdentityFromRequest(req: NextRequest): Ga4Identity {
  const measurementId = process.env.GA4_MEASUREMENT_ID ?? ''
  const sessionCookieName = `_ga_${measurementId.replace(/^G-/, '')}`
  return {
    clientId: parseGa4ClientIdFromCookie(req.cookies.get('_ga')?.value) ?? randomUUID(),
    sessionId: parseGa4SessionIdFromCookie(req.cookies.get(sessionCookieName)?.value),
  }
}

export async function sendGa4Event(
  identity: Ga4Identity,
  name: string,
  params: Record<string, string>
): Promise<void> {
  const measurementId = process.env.GA4_MEASUREMENT_ID
  const apiSecret = process.env.GA4_API_SECRET
  if (!measurementId || !apiSecret) return // Not configured -- skip silently.

  const url = `${MEASUREMENT_PROTOCOL_URL}?measurement_id=${measurementId}&api_secret=${apiSecret}`

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: identity.clientId,
      events: [
        {
          name,
          params: {
            ...params,
            // Both are needed for GA4 to attribute the event to the
            // visitor's existing session (and its traffic source).
            ...(identity.sessionId ? { session_id: identity.sessionId } : {}),
            engagement_time_msec: '1',
          },
        },
      ],
    }),
  })
}
