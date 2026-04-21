const SHOPIFY_URL = 'https://apps.shopify.com/verve-ai'
const WOOCOMMERCE_URL = 'https://wordpress.org/plugins/verve-ai-inventory-forecasting'

export default function BlogCTA() {
  return (
    <div
      className="not-prose my-12 rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgb(19, 33, 68) 0%, rgb(40, 20, 80) 50%, rgb(19, 33, 68) 100%)',
      }}
    >
      {/* Accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: 'linear-gradient(90deg, rgb(0, 201, 167), rgb(128, 72, 245))',
        }}
      />

      <div className="px-8 py-10 text-center relative">
        {/* Decorative glow blobs */}
        <div
          className="absolute top-0 left-1/4 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ backgroundColor: 'rgb(0, 201, 167)', transform: 'translateY(-50%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ backgroundColor: 'rgb(128, 72, 245)', transform: 'translateY(50%)' }}
        />

        <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgb(0, 201, 167)' }}>
          Verve AI
        </p>
        <h3 className="text-3xl font-bold text-white leading-tight mb-2">
          More time, More Sales
        </h3>
        <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
          AI Forecasting For E-Commerce Merchants
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={SHOPIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full font-semibold text-white text-base px-7 py-3 transition-all hover:scale-105 hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgb(0, 201, 167), rgb(0, 160, 133))',
              boxShadow: '0 4px 20px rgba(0, 201, 167, 0.35)',
            }}
          >
            For Shopify →
          </a>
          <a
            href={WOOCOMMERCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full font-semibold text-white text-base px-7 py-3 transition-all hover:scale-105 hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgb(128, 72, 245), rgb(100, 50, 210))',
              boxShadow: '0 4px 20px rgba(128, 72, 245, 0.35)',
            }}
          >
            For WooCommerce →
          </a>
        </div>

        <p className="mt-6 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Free 14-day trial · No credit card required
        </p>
      </div>
    </div>
  )
}
