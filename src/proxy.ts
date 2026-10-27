import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { CANONICAL_HOST, NON_CANONICAL_HOSTS, resolveLegacyPath } from '@/lib/redirects'

// Canonicalises host, trailing slash and legacy paths in one step so any
// combination of them costs a single 301 (next.config's built-in redirects
// would each add their own hop).
export function proxy(request: NextRequest) {
  // request.url, not nextUrl: nextUrl already has the trailing slash stripped.
  const incoming = new URL(request.url)
  const host = request.headers.get('host') ?? incoming.host
  let pathname = incoming.pathname
  let changed = false

  let origin = incoming.origin
  if (NON_CANONICAL_HOSTS.has(host)) {
    origin = `https://${CANONICAL_HOST}`
    changed = true
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.replace(/\/+$/, '') || '/'
    changed = true
  }

  const legacy = resolveLegacyPath(pathname)
  if (legacy) {
    pathname = legacy
    changed = true
  }

  if (!changed) return NextResponse.next()
  return NextResponse.redirect(`${origin}${pathname}${incoming.search}`, 301)
}

export const config = {
  // API routes are excluded so POSTs are never redirected.
  matcher: ['/((?!api/|_next/static|_next/image|favicon.ico).*)'],
}
