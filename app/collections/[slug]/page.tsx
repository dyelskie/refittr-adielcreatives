import Link from 'next/link'
import {notFound} from 'next/navigation'
import {client} from '@/lib/sanity/client'
import {collectionQuery} from '@/lib/queries'
import {urlFor} from '@/lib/sanity/image'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'

export const revalidate = 60

type Outfit = {
  _id: string
  title: string
  slug: string
  coverImage?: any
}

type CollectionDetail = {
  _id: string
  name: string
  description?: string
  outfits: Outfit[]
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const collection = await client.fetch<CollectionDetail | null>(collectionQuery, {slug})

  if (!collection) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="px-6 pt-10 pb-4">
        <h1 className="text-4xl font-bold mb-1">{collection.name}</h1>
        {collection.description && (
          <p className="text-[var(--text-muted)] text-sm">{collection.description}</p>
        )}
      </section>

      <section className="px-6 pb-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {collection.outfits.map((outfit) => (
          <Link
            key={outfit._id}
            href={`/outfits/${outfit.slug}`}
            className="rounded-lg overflow-hidden border border-[var(--border)] block"
          >
            <div className="aspect-[3/4] bg-[var(--surface-2)] overflow-hidden">
              {outfit.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlFor(outfit.coverImage).width(400).height(530).url()}
                  alt={outfit.title}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div className="bg-[var(--surface-1)] p-3">
              <p className="text-[var(--text)] text-sm font-medium">{outfit.title}</p>
            </div>
          </Link>
        ))}
      </section>

      {collection.outfits.length === 0 && (
        <p className="px-6 pb-16 text-[var(--text-muted)] text-sm">No outfits in this collection yet.</p>
      )}

      <Footer />
    </main>
  )
}