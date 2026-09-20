'use client'

import {useState} from 'react'
import {PLATFORMS} from '@/lib/platforms'

type AffiliateLink = {
  platform: string
  url: string
}

export function BuyButton({
  itemName,
  affiliateLinks,
}: {
  itemName: string
  affiliateLinks?: AffiliateLink[]
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(
    affiliateLinks && affiliateLinks.length > 0 ? affiliateLinks[0].platform : null,
  )

  const linkFor = (platformValue: string) =>
    affiliateLinks?.find((link) => link.platform === platformValue)?.url

  const selectedUrl = selected ? linkFor(selected) : undefined
  const selectedTitle = PLATFORMS.find((p) => p.value === selected)?.title

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full border border-[var(--border)] text-[var(--text)] text-xs py-2 rounded-md hover:bg-[var(--surface-2)]"
      >
        Want to buy
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg p-5 w-72"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[var(--text)] text-sm font-medium mb-1">{itemName}</p>
            <p className="text-[var(--text-muted)] text-xs mb-3">Choose where to buy</p>

            <div className="flex flex-col gap-1.5">
              {PLATFORMS.map((platform) => {
                const url = linkFor(platform.value)
                const isActive = Boolean(url)
                const isSelected = selected === platform.value

                return (
                  <button
                    key={platform.value}
                    disabled={!isActive}
                    onClick={() => isActive && setSelected(platform.value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs border transition-opacity ${
                      isSelected
                        ? 'border-[var(--text)] bg-[var(--surface-2)] text-[var(--text)]'
                        : 'border-[var(--border)] text-[var(--text)]'
                    } ${isActive ? 'opacity-100' : 'opacity-35 cursor-not-allowed'}`}
                  >
                    <span
                      className="flex items-center justify-center w-6 h-6 rounded-full text-white text-[10px] font-semibold shrink-0"
                      style={{backgroundColor: platform.color}}
                    >
                      {platform.title.charAt(0)}
                    </span>
                    <span className="flex-1 text-left">{platform.title}</span>
                    {isActive && isSelected && <span>✓</span>}
                  </button>
                )
              })}
            </div>

            {selectedUrl ? (
              <a
                href={selectedUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-4 block text-center bg-[var(--text)] text-[var(--bg)] text-xs font-medium py-2.5 rounded-md"
              >
                Go to {selectedTitle}
              </a>
            ) : (
              <p className="mt-4 text-center text-[var(--text-muted)] text-xs">No purchase links available yet</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}