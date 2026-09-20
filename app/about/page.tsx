import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'

export const metadata = {
  title: 'About — Adiel Creatives',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="px-6 pt-16 pb-16 max-w-2xl">
        <p className="text-[var(--text-muted)] text-xs tracking-widest mb-4">ABOUT</p>
        <h1 className="text-4xl font-bold tracking-tight mb-8">A faceless studio for outfit drops.</h1>

        <p className="text-[var(--text)] text-sm mb-4">
          Adiel Creatives is a Gen-Z fashion studio that publishes outfit drops as coded
          collections. Every fit gets a code, every piece gets a link, and you shop them on the
          platforms you already use.
        </p>
        <p className="text-[var(--text)] text-sm mb-12">
          We don&apos;t sell anything directly. We curate — and we point you toward the best place
          to buy each item.
        </p>

        <h2 className="text-xl font-bold mb-4">Affiliate disclosure</h2>
        <p className="text-[var(--text-muted)] text-sm mb-4">
          Many of the product links on this site are affiliate links from partners such as TikTok
          Shop, Shopee, and various brand programs. When you make a qualifying purchase through
          one of these links, we may earn a small commission at no extra cost to you.
        </p>
        <p className="text-[var(--text-muted)] text-sm mb-4">
          All transactions, payments, shipping, and customer service for purchased items happen on
          the external partner platform — not on this website. Pricing and availability are
          controlled by those partners and may change at any time.
        </p>
        <p className="text-[var(--text-muted)] text-sm mb-12">
          Recommendations are based on personal taste and curation, not paid placements.
        </p>

        <p className="text-[var(--text-muted)] text-xs">@adiel.creatives</p>
      </section>

      <Footer />
    </main>
  )
}