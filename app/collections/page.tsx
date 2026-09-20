import Link from 'next/link'
import {client} from '@/lib/sanity/client'
import {collectionsQuery, tagsQuery} from '@/lib/queries'
import {urlFor} from '@/lib/sanity/image'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {CollectionFilters} from '@/components/CollectionFilters'

export const revalidate = 60

type Collection = {
  _id: string
  name: string
  slug: string
  coverImage?: any
  outfitCount: number
}

type Tag = {_id: string; name: string; slug: string; kind: 'style' | 'tag'}

export default async function CollectionsPage() {
  const [collections, allTags] = await Promise.all([
    client.fetch<Collection[]>(collectionsQuery),
    client.fetch<Tag[]>(tagsQuery),
  ])

  const styles = allTags.filter((tag) => tag.kind === 'style')
  const tags = allTags.filter((tag) => tag.kind === 'tag')

  // NOTE: search/filter dropdowns update the URL already, but the actual
  // filtering of `collections` against those query params happens in Stage 6 —
  // this page currently always shows every collection regardless of filters.

  return (
    <main className="min-h-screen">
      <Header />

      <section className="px-6 pt-10 pb-6">
        <h1 className="text-4xl font-bold mb-1">Collections</h1>
        <p className="text-[var(--text-muted)] text-sm">{collections.length} drops</p>
      </section>

      <section className="px-6 pb-16">
        <CollectionFilters styles={styles} tags={tags} />

        {collections.length === 0 ? (
          <div className="border border-dashed border-[var(--border)] rounded-xl py-16 text-center">
            <p className="text-[var(--text-muted)] text-sm">No collections match those filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {collections.map((collection) => (
              <Link
                key={collection._id}
                href={`/collections/${collection.slug}`}
                className="rounded-lg overflow-hidden border border-[var(--border)] block"
              >
                <div className="aspect-[3/4] bg-[var(--surface-2)] overflow-hidden">
                  {collection.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={urlFor(collection.coverImage).width(400).height(530).url()}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="bg-[var(--surface-1)] p-3">
                  <p className="text-[var(--text)] text-sm font-medium">{collection.name}</p>
                  <p className="text-[var(--text-muted)] text-xs">{collection.outfitCount} outfits</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}