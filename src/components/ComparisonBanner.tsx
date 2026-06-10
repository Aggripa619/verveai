import Link from 'next/link'

export default function ComparisonBanner() {
  return (
    <div
      className="not-prose my-10 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4"
      style={{
        backgroundColor: 'rgba(128, 72, 245, 0.05)',
        border: '1px solid rgba(128, 72, 245, 0.18)',
      }}
    >
      <p className="text-sm text-gray-700 flex-1 leading-relaxed">
        <span className="font-semibold text-gray-900">Choosing an inventory forecasting app?</span>
        {' '}See how Verve AI stacks up against Prediko, Assisty, and Forecastly — side by side.
      </p>
      <Link
        href="/blog/shopify-inventory-forecasting-app-comparison"
        className="inline-flex items-center rounded-full text-xs font-semibold text-white px-4 py-2 transition-all hover:opacity-90 whitespace-nowrap flex-shrink-0"
        style={{ backgroundColor: 'rgb(128, 72, 245)' }}
      >
        Compare apps →
      </Link>
    </div>
  )
}
