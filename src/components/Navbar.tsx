import Image from 'next/image'
import Link from 'next/link'

const SHOPIFY_URL = 'https://apps.shopify.com/verve-ai'
const WOOCOMMERCE_URL = 'https://wordpress.org/plugins/verve-ai-inventory-forecasting'

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://framerusercontent.com/images/zplhvSQDvA45ptNBhwmtoWBGiU0.png"
              alt="Verve AI Forecasting Software Logo"
              width={150}
              height={75}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              About
            </Link>
          </nav>

          {/* CTA buttons */}
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors"
            >
              Contact
            </Link>
            <a
              href={SHOPIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: 'rgb(0, 201, 167)' }}
            >
              Shopify App
            </a>
            <a
              href={WOOCOMMERCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-3 py-2 rounded-full text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: 'rgb(128, 72, 245)' }}
            >
              WooCommerce App
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
