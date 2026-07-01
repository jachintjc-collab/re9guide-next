"use client"

import { useState, useEffect, useRef } from "react"
import { Search as SearchIcon, X } from "lucide-react"

type SearchResult = {
  url: string
  meta?: { title?: string; image?: string }
  excerpt: string
  word_count?: number
}

type PagefindSearchItem = {
  id: string
  data: () => Promise<SearchResult>
}

interface Pagefind {
  search: (query: string) => Promise<{ results: PagefindSearchItem[] }>
  init?: () => Promise<void>
}

declare global {
  interface Window {
    pagefind?: Pagefind
    __pagefindLoading?: boolean
  }
}

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [pagefindReady, setPagefindReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load pagefind on first open
  useEffect(() => {
    if (!open || pagefindReady) return
    if (window.pagefind) {
      setPagefindReady(true)
      return
    }
    if (window.__pagefindLoading) return
    window.__pagefindLoading = true

    ;(async () => {
      try {
        // @ts-expect-error dynamic import
        const pf = (await import(/* webpackIgnore: true */ "/pagefind/pagefind.js")) as Pagefind
        if (pf.init) await pf.init()
        window.pagefind = pf
        setPagefindReady(true)
      } catch (e) {
        setError(
          "Search index not built yet. It becomes available after the first production deploy."
        )
        console.error("Pagefind load failed:", e)
      } finally {
        window.__pagefindLoading = false
      }
    })()
  }, [open, pagefindReady])

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      // Reset state on close
      setQuery("")
      setResults([])
      setError(null)
    }
  }, [open])

  // Debounced search
  useEffect(() => {
    if (!query.trim() || !pagefindReady || !window.pagefind) {
      setResults([])
      return
    }
    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const search = await window.pagefind!.search(query)
        const top10 = search.results.slice(0, 10)
        const data = await Promise.all(top10.map((r) => r.data()))
        setResults(data)
      } catch (e) {
        console.error("Search failed:", e)
      } finally {
        setLoading(false)
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [query, pagefindReady])

  // ESC to close
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 backdrop-blur px-4 pt-16 sm:pt-24"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-md border border-border bg-background shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border p-4">
          <SearchIcon className="size-5 shrink-0 text-primary" />
          <input
            ref={inputRef}
            type="search"
            autoComplete="off"
            placeholder="Search 900+ RE9 guides…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="rounded-sm text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {error && (
          <div className="p-6 text-center font-mono text-xs text-muted-foreground">
            {error}
          </div>
        )}

        {!error && loading && (
          <div className="p-8 text-center font-mono text-xs text-muted-foreground">
            Searching…
          </div>
        )}

        {!error && !loading && results.length > 0 && (
          <ul className="max-h-[60vh] divide-y divide-border overflow-y-auto">
            {results.map((r, i) => (
              <li key={i}>
                <a
                  href={r.url}
                  onClick={onClose}
                  className="block px-4 py-3 hover:bg-secondary"
                >
                  <div className="font-heading text-sm font-semibold text-foreground line-clamp-1">
                    {r.meta?.title || r.url}
                  </div>
                  <div
                    className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: r.excerpt }}
                  />
                </a>
              </li>
            ))}
          </ul>
        )}

        {!error && !loading && query && results.length === 0 && pagefindReady && (
          <div className="p-8 text-center font-mono text-xs text-muted-foreground">
            No results for &ldquo;{query}&rdquo;
          </div>
        )}

        {!error && !loading && !query && (
          <div className="p-6 text-xs text-muted-foreground">
            <p className="font-mono mb-3 text-[11px] uppercase tracking-widest text-primary">
              Try searching for
            </p>
            <div className="flex flex-wrap gap-2">
              {["Eveline", "Insanity", "charm", "Mortal Edge", "boss", "safe code"].map(
                (t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setQuery(t)}
                    className="rounded-sm border border-border bg-secondary px-2.5 py-1 font-mono text-[11px] text-stone-300 hover:border-primary/50 hover:text-primary"
                  >
                    {t}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
