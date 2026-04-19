import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Verve AI',
  description:
    'Get in touch with the Verve AI team. We are here to help with any questions about our AI forecasting software.',
  alternates: { canonical: 'https://www.getverveai.com/contact' },
  openGraph: {
    title: 'Contact - Verve AI',
    description: 'Get in touch with the Verve AI team.',
    url: 'https://www.getverveai.com/contact',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
      <section className="bg-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Need Help? We&apos;re Here for You!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Have a question or need support? Reach out to our team and we&apos;ll get back to you as soon as possible.
          </p>
          <a
            href="mailto:hello@getverveai.com"
            className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'rgb(0, 201, 167)' }}
          >
            Hello@GetVerveAI.com
          </a>
        </div>
      </section>
    </div>
  )
}
