import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Blog - Verve AI',
  description:
    'Inventory management insights, demand forecasting guides, and e-commerce tips from the Verve AI team.',
  alternates: { canonical: 'https://www.getverveai.com/blog' },
  openGraph: {
    title: 'Blog - Verve AI',
    description:
      'Inventory management insights, demand forecasting guides, and e-commerce tips from the Verve AI team.',
    url: 'https://www.getverveai.com/blog',
    type: 'website',
  },
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts()

  return (
    <div style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-lg text-gray-600 mb-12">
            Inventory management insights, demand forecasting guides, and e-commerce tips.
          </p>
          {posts.length === 0 ? (
            <p className="text-gray-500">Posts are being indexed...</p>
          ) : (
            <div className="grid gap-4">
              {posts.map(({ slug, data }) => (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className="block bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <h2 className="text-lg font-bold text-gray-900 mb-1">{data.h1 || data.title}</h2>
                  {data.metaDescription && (
                    <p className="text-gray-500 text-sm line-clamp-2">{data.metaDescription}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
