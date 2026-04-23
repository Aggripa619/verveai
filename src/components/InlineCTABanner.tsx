import { SHOPIFY_URL, WOOCOMMERCE_URL } from '@/lib/content'

interface InlineCTABannerProps {
  message?: string
}

export default function InlineCTABanner({
  message = 'Want this automated across your full catalogue? Verve AI calculates and updates these numbers in real time from your Shopify data.',
}: InlineCTABannerProps) {
  return (
    <div
      className="not-prose mb-10 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4"
      style={{
        backgroundColor: 'rgba(0, 201, 167, 0.07)',
        border: '1px solid rgba(0, 201, 167, 0.2)',
      }}
    >
      <p className="text-sm text-gray-700 flex-1 leading-relaxed">
        <span
          className="inline-block font-semibold mr-1"
          style={{ color: 'rgb(0, 160, 133)' }}
        >
          Verve AI
        </span>
        {message}
      </p>
      <div className="flex items-center gap-3 flex-shrink-0">
        <a
          href={SHOPIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full text-xs font-semibold text-white px-4 py-2 transition-all hover:opacity-90 whitespace-nowrap"
          style={{ backgroundColor: 'rgb(0, 201, 167)' }}
        >
          Shopify →
        </a>
        <a
          href={WOOCOMMERCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full text-xs font-semibold text-white px-4 py-2 transition-all hover:opacity-90 whitespace-nowrap"
          style={{ backgroundColor: 'rgb(128, 72, 245)' }}
        >
          WooCommerce →
        </a>
      </div>
    </div>
  )
}
