'use client'

import {useEffect, useState} from 'react'
import {useTheme} from 'next-themes'

export function ThemeToggle() {
  const {theme, setTheme} = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoids a light/dark mismatch flash between server and client render.
  useEffect(() => setMounted(true), [])
  if (!mounted) {
    return <div style={{width: 36, height: 36}} />
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors"
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  )
}
