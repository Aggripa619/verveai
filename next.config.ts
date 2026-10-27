import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: false,
  // Trailing-slash removal and all permanent redirects live in src/proxy.ts
  // (map in src/lib/redirects.ts) so each legacy URL is a single 301 hop.
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.getverveai.com',
      },
    ],
  },
}

export default nextConfig
