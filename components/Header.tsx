import Link from 'next/link'
import {ThemeToggle} from './ThemeToggle'

export function Header() {
  return (
    <header className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-[var(--border)]">
      <Link href="/" className="text-[var(--text)] font-semibold text-sm tracking-tight whitespace-nowrap">
        adiel.creatives
      </Link>

      {/* Full search bar: hidden on small screens, where it would overlap the nav */}
      <form action="/collections" className="hidden sm:flex flex-1 max-w-xl mx-auto">
        <div className="w-full flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface-1)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" className="shrink-0">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            name="q"
            type="text"
            placeholder="Search outfit code or keyword"
            className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none"
          />
        </div>
      </form>

      {/* Compact search icon on mobile — leads to the Collections page, which has its own full search bar */}
      <Link
        href="/collections"
        aria-label="Search"
        className="sm:hidden flex-1 flex justify-end"
      >
        <span className="flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] text-[var(--text)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </span>
      </Link>

      <nav className="flex items-center gap-3 sm:gap-5 whitespace-nowrap">
        <Link href="/collections" className="text-sm text-[var(--text)] hover:text-[var(--text-muted)]">
          Collections
        </Link>
        <Link href="/about" className="text-sm text-[var(--text)] hover:text-[var(--text-muted)]">
          About
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  )
}