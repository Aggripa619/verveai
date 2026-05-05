import Image from 'next/image'
import Link from 'next/link'

const SHOPIFY_URL = 'https://apps.shopify.com/verve-ai'
const WOOCOMMERCE_URL = 'https://wordpress.org/plugins/verve-ai-inventory-forecasting'
const TWITTER_URL = 'https://x.com/getverveai'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'rgb(19, 33, 68)' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image
                src="https://framerusercontent.com/images/zplhvSQDvA45ptNBhwmtoWBGiU0.png"
                alt="Verve AI Forecasting Software Logo"
                width={150}
                height={75}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-white/80">
              AI Forecasting Software for E-Commerce Businesses
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <a
                href="https://www.producthunt.com/products/verve-ai-ai-forecasting-for-shopify"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1001054&theme=light"
                  alt="Verve AI - AI Forecasting for Shopify | Product Hunt"
                  width={200}
                  height={44}
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-bold mb-4">Quick Links</p>
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/tools" className="hover:text-white transition-colors">Tools</Link></li>
            </ul>
          </div>

          {/* Important */}
          <div>
            <p className="font-bold mb-4">Important</p>
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              <li>
                <a href={SHOPIFY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Verve AI Shopify
                </a>
              </li>
              <li>
                <a href={WOOCOMMERCE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Verve AI WooCommerce
                </a>
              </li>
              <li>
                <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <Link href="/app-privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* By Industry */}
          <div>
            <p className="font-bold mb-4">By Industry</p>
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              <li><Link href="/inventory-management-for/apparel" className="hover:text-white transition-colors">Apparel</Link></li>
              <li><Link href="/inventory-management-for/supplements" className="hover:text-white transition-colors">Supplements</Link></li>
              <li><Link href="/inventory-management-for/beauty" className="hover:text-white transition-colors">Beauty</Link></li>
              <li><Link href="/inventory-management-for/pet-supplies" className="hover:text-white transition-colors">Pet Supplies</Link></li>
              <li><Link href="/inventory-management-for/jewellery" className="hover:text-white transition-colors">Jewellery</Link></li>
              <li><Link href="/inventory-management-for/home-goods" className="hover:text-white transition-colors">Home Goods</Link></li>
              <li><Link href="/inventory-management-for/food-and-beverage" className="hover:text-white transition-colors">Food & Beverage</Link></li>
              <li><Link href="/inventory-management-for/sports-and-outdoor" className="hover:text-white transition-colors">Sports & Outdoor</Link></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <p className="font-bold mb-4">Get in Touch</p>
            <a
              href="mailto:hello@getverveai.com"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Hello@GetVerveAI.com
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-right">
          <p className="text-sm text-white/60">Copyright © 2026 Verve AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
