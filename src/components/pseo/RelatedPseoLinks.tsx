import Link from 'next/link'

interface Props {
  verticalName: string
  siblings: { slug: string; h1: string }[]
  relatedReading: { slug: string; title: string }[]
}

export default function RelatedPseoLinks({ verticalName, siblings, relatedReading }: Props) {
  if (siblings.length === 0 && relatedReading.length === 0) return null

  return (
    <>
      {siblings.length > 0 && (
        <section className="my-12">
          <h2 className="text-lg font-bold text-gray-900 mb-5">
            More for {verticalName} Merchants
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {siblings.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  className="block rounded-lg border border-gray-200 p-4 text-sm text-gray-800 hover:border-teal-300 hover:bg-teal-50/30 transition-colors"
                >
                  {s.h1}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {relatedReading.length > 0 && (
        <section className="my-12">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Related Reading</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {relatedReading.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/blog/${r.slug}`}
                  className="block rounded-lg border border-gray-200 p-4 text-sm text-gray-800 hover:border-teal-300 hover:bg-teal-50/30 transition-colors"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
