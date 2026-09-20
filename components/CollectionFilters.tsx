'use client'

import {useRouter, useSearchParams} from 'next/navigation'
import {useState} from 'react'
import {CATEGORY_OPTIONS, AUDIENCE_OPTIONS} from '@/lib/taxonomyOptions'

type StyleTag = {slug: string; name: string}

export function CollectionFilters({styles, tags}: {styles: StyleTag[]; tags: StyleTag[]}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/collections?${params.toString()}`)
  }

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault()
    updateParam('q', query)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      <form onSubmit={submitSearch} className="flex-1">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="text"
          placeholder="Search by name, code, or tag"
          className="w-full px-4 py-3 rounded-full border border-[var(--border)] bg-[var(--surface-1)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none"
        />
      </form>

      <div className="flex gap-3 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
        <select
          defaultValue={searchParams.get('category') ?? ''}
          onChange={(event) => updateParam('category', event.target.value)}
          className="shrink-0 px-4 py-3 rounded-full border border-[var(--border)] bg-[var(--surface-1)] text-sm text-[var(--text)] outline-none"
        >
          <option value="">All category</option>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>

        <select
          defaultValue={searchParams.get('style') ?? ''}
          onChange={(event) => updateParam('style', event.target.value)}
          className="shrink-0 px-4 py-3 rounded-full border border-[var(--border)] bg-[var(--surface-1)] text-sm text-[var(--text)] outline-none"
        >
          <option value="">All style</option>
          {styles.map((style) => (
            <option key={style.slug} value={style.slug}>
              {style.name}
            </option>
          ))}
        </select>

        <select
          defaultValue={searchParams.get('tag') ?? ''}
          onChange={(event) => updateParam('tag', event.target.value)}
          className="shrink-0 px-4 py-3 rounded-full border border-[var(--border)] bg-[var(--surface-1)] text-sm text-[var(--text)] outline-none"
        >
          <option value="">All tag</option>
          {tags.map((tag) => (
            <option key={tag.slug} value={tag.slug}>
              {tag.name}
            </option>
          ))}
        </select>

        <select
          defaultValue={searchParams.get('audience') ?? ''}
          onChange={(event) => updateParam('audience', event.target.value)}
          className="shrink-0 px-4 py-3 rounded-full border border-[var(--border)] bg-[var(--surface-1)] text-sm text-[var(--text)] outline-none"
        >
          <option value="">All audience</option>
          {AUDIENCE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}