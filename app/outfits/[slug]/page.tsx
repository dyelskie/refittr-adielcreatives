import Link from 'next/link'
import {notFound} from 'next/navigation'
import {client} from '@/lib/sanity/client'
import {outfitQuery} from '@/lib/queries'
import {urlFor} from '@/lib/sanity/image'
import {BuyButton} from '@/components/BuyButton'
import {AnimatedBanner} from '@/components/AnimatedBanner'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'

export const revalidate = 60

type AffiliateLink = {
  platform: string
  url: string
}

type Item = {
  _id: string
  name: string
  image?: any
  affiliateLinks?: AffiliateLink[]
}

type OutfitDetail = {
  _id: string
  title: string
  coverImage?: any
  collection: {name: string; slug: string}
  top?: Item
  bottom?: Item
  shoes?: Item
  accessories?: Item[]
}

export default async function OutfitPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const outfit = await client.fetch<OutfitDetail | null>(outfitQuery, {slug})

  if (!outfit) {
    notFound()
  }

  const pieces: {label: string; item: Item}[] = [
    outfit.top && {label: 'top', item: outfit.top},
    outfit.bottom && {label: 'bottom', item: outfit.bottom},
    outfit.shoes && {label: 'shoes', item: outfit.shoes},
    ...(outfit.accessories ?? []).map((item) => ({label: 'accessory', item})),
  ].filter(Boolean) as {label: string; item: Item}[]

  return (
    <main className="min-h-screen">
      <Header />

      <section className="px-6 pt-6">
        <Link href={`/collections/${outfit.collection.slug}`} className="text-[var(--text-muted)] text-xs">
          {outfit.collection.name}
        </Link>

        {outfit.coverImage ? (
          <AnimatedBanner
            src={urlFor(outfit.coverImage).width(800).height(600).url()}
            alt={outfit.title}
          />
        ) : (
          <div className="aspect-[4/3] bg-[var(--surface-2)] rounded-lg overflow-hidden mt-2" />
        )}
        <p className="text-[var(--text)] text-lg font-medium mt-4 mb-1">{outfit.title}</p>
        <p className="text-[var(--text-muted)] text-xs mb-6">{pieces.length} pieces</p>
      </section>

      <section className="px-6 pb-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {pieces.map(({label, item}, index) => (
          <div key={`${item._id}-${index}`} className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg p-3">
            <div className="aspect-[3/4] bg-[var(--surface-2)] rounded-md mb-2 overflow-hidden">
              {item.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlFor(item.image).width(300).height(400).url()}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <p className="text-[var(--text)] text-xs mb-0.5">{item.name}</p>
            <p className="text-[var(--text-muted)] text-[10px] mb-2 uppercase tracking-wide">{label}</p>
            <BuyButton itemName={item.name} affiliateLinks={item.affiliateLinks} />
          </div>
        ))}
      </section>

      <Footer />
    </main>
  )
}