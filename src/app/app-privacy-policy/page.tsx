import type { Metadata } from 'next'
import { getPageData } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Privacy Policy - Verve AI',
  description: 'Privacy Policy for Verve AI forecasting software.',
  alternates: { canonical: 'https://www.getverveai.com/app-privacy-policy' },
  openGraph: {
    title: 'Privacy Policy - Verve AI',
    description: 'Privacy Policy for Verve AI forecasting software.',
    url: 'https://www.getverveai.com/app-privacy-policy',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  const data = getPageData('app-privacy-policy')
  return (
    <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">{data?.h1 || 'Privacy Policy'}</h1>
          {data?.bodyText ? (
            <div className="prose max-w-none">
              {data.bodyText
                .split('\n')
                .filter((line) => line.trim())
                .slice(5)
                .map((line, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-4">
                    {line}
                  </p>
                ))}
            </div>
          ) : (
            <p className="text-gray-600">Privacy policy content loading...</p>
          )}
        </div>
      </section>
    </div>
  )
}
