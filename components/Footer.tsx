import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p className="text-[var(--text)] font-semibold text-sm mb-2">adiel.creatives</p>
          <p className="text-[var(--text-muted)] text-sm">
            A faceless outfit recommendation studio. Curated drops, premium taste.
          </p>
        </div>

        <div>
          <p className="text-[var(--text)] font-semibold text-sm mb-2">Explore</p>
          <div className="flex flex-col gap-1">
            <Link href="/collections" className="text-[var(--text-muted)] text-sm hover:text-[var(--text)]">
              Collections
            </Link>
            <Link href="/collections" className="text-[var(--text-muted)] text-sm hover:text-[var(--text)]">
              Search
            </Link>
            <Link href="/about" className="text-[var(--text-muted)] text-sm hover:text-[var(--text)]">
              About
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[var(--text)] font-semibold text-sm mb-2">Affiliate disclosure</p>
          <p className="text-[var(--text-muted)] text-sm">
            Some links earn us a small commission at no extra cost to you. All purchases happen on
            external partner platforms.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-10 pt-6 border-t border-[var(--border)]">
        <p className="text-[var(--text-muted)] text-xs">© {new Date().getFullYear()} Adiel Creatives</p>
        <p className="text-[var(--text-muted)] text-xs">@adiel.creatives</p>
      </div>
    </footer>
  )
}
