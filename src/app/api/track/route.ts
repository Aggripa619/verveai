import { NextRequest, NextResponse } from 'next/server'
import { sendGa4Event, ga4IdentityFromRequest } from '@/lib/ga4'

// Receives navigator.sendBeacon() hits from InstallClickTracker when a visitor
// clicks through to the Shopify App Store / WordPress.org plugin page, and
// records them in GA4 as `install_click`. The install/trial itself happens on
// Shopify's / WordPress's site, so this click is the last step we can see.

const PLATFORMS = new Set(['shopify', 'woocommerce'])
const ALLOWED_HOSTS = new Set(['www.getverveai.com', 'getverveai.com', 'localhost'])

export async function POST(req: NextRequest) {
  // Only accept beacons sent from our own pages.
  const origin = req.headers.get('origin') ?? req.headers.get('referer')
  let originHost = ''
  try {
    originHost = origin ? new URL(origin).hostname : ''
  } catch {}
  if (!ALLOWED_HOSTS.has(originHost)) {
    return new NextResponse(null, { status: 403 })
  }

  let body: { platform?: unknown; pagePath?: unknown; ctaText?: unknown }
  try {
    body = JSON.parse(await req.text())
  } catch {
    return new NextResponse(null, { status: 400 })
  }

  const platform = typeof body.platform === 'string' ? body.platform : ''
  if (!PLATFORMS.has(platform)) {
    return new NextResponse(null, { status: 400 })
  }

  try {
    await sendGa4Event(ga4IdentityFromRequest(req), 'install_click', {
      platform,
      page_path: typeof body.pagePath === 'string' ? body.pagePath.slice(0, 200) : '',
      cta_text: typeof body.ctaText === 'string' ? body.ctaText.slice(0, 100) : '',
    })
  } catch (gaError) {
    console.error('GA4 install_click event failed:', gaError)
  }

  return new NextResponse(null, { status: 204 })
}
