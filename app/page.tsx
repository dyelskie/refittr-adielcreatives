import Link from 'next/link'
import {client} from '@/lib/sanity/client'
import {collectionsQuery} from '@/lib/queries'
import {urlFor} from '@/lib/sanity/image'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'

export const revalidate = 60

type Collection = {
  _id: string
  name: string
  slug: string
  coverImage?: any
  outfitCount: number
}

export default async function HomePage() {
  const allCollections = await client.fetch<Collection[]>(collectionsQuery)
  const latest = allCollections.slice(0, 4)

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="px-6 pt-16 pb-10 max-w-2xl">
        <p className="text-[var(--text-muted)] text-xs tracking-widest mb-4">@ADIEL.CREATIVES</p>
        <h1 className="text-5xl font-bold tracking-tight mb-1">
          <span className="text-[var(--text)]">Outfits, coded.</span>
          <br />
          <span className="text-[var(--text-muted)]">Drops, curated.</span>
        </h1>
        <p className="text-[var(--text-muted)] text-sm mt-6 mb-8 max-w-lg">
          A faceless studio building premium outfit drops. Browse a collection, tap a piece, and
          shop it on your favourite platform.
        </p>

        <form action="/collections" className="flex items-center gap-3 max-w-lg">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-full border border-[var(--border)] bg-[var(--surface-1)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" className="shrink-0">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              name="q"
              type="text"
              placeholder="Try ADL-001 or 'streetwear'"
              className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-[var(--text)] text-[var(--bg)] text-sm font-medium whitespace-nowrap"
          >
            Search
          </button>
        </form>
      </section>

      {/* Latest */}
      <section className="px-6 pb-16">
        <h2 className="text-lg font-semibold mb-4">Latest</h2>

        {latest.length === 0 ? (
          <div className="border border-dashed border-[var(--border)] rounded-xl py-16 text-center">
            <p className="text-[var(--text-muted)] text-sm">No public collections yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {latest.map((collection) => (
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

      {/* CTA */}
      <section className="px-6 pb-16">
        <div className="bg-[var(--surface-1)] rounded-2xl py-16 text-center">
          <h2 className="text-2xl font-bold mb-2">Every fit has a code.</h2>
          <p className="text-[var(--text-muted)] text-sm mb-6">Browse the full archive of outfit drops.</p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--text)] text-[var(--bg)] text-sm font-medium"
          >
            Browse all collections
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}