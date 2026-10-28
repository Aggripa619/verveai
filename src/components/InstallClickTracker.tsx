'use client'

import { useEffect } from 'react'

// One document-level listener instead of an onClick on every install CTA:
// install links are rendered from ~20 components (Navbar, Footer, BlogCTA,
// pSEO templates, tool pages...), and new ones keep getting added.
// URLs come in as props (from SHOPIFY_URL / WOOCOMMERCE_URL in the server
// layout) because lib/content.ts reads the filesystem and can't be bundled
// into a client component. Prefix match, so ?utm_source=... variants count.
export default function InstallClickTracker({
  shopifyUrl,
  woocommerceUrl,
}: {
  shopifyUrl: string
  woocommerceUrl: string
}) {
  useEffect(() => {
    const platformByUrlPrefix: [string, string][] = [
      [shopifyUrl, 'shopify'],
      [woocommerceUrl, 'woocommerce'],
    ]
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!link) return
      const match = platformByUrlPrefix.find(([prefix]) => link.href.startsWith(prefix))
      if (!match) return

      const payload = JSON.stringify({
        platform: match[1],
        pagePath: window.location.pathname,
        ctaText: link.textContent?.trim() ?? '',
      })
      // sendBeacon survives the page navigating away (or the new tab opening).
      if (!navigator.sendBeacon?.('/api/track', new Blob([payload], { type: 'application/json' }))) {
        fetch('/api/track', { method: 'POST', body: payload, keepalive: true }).catch(() => {})
      }
    }

    // Capture phase + auxclick so middle-clicks and Ctrl-clicks count too.
    document.addEventListener('click', onClick, true)
    document.addEventListener('auxclick', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('auxclick', onClick, true)
    }
  }, [shopifyUrl, woocommerceUrl])

  return null
}
