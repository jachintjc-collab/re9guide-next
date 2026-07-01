"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Search as SearchIcon, X } from "lucide-react"
import Fuse from "fuse.js"

type Doc = {
  s: string // slug
  l: string // lang: 'en' | 'ko'
  t: string // title
  d: string // description
}

type IndexData = {
  docs: Doc[]
}

// Cache index across modal opens
let cachedIndex: Doc[] | null = null
let cachedFuse: Fuse<Doc> | null = null

async function loadIndex(): Promise<{ docs: Doc[]; fuse: Fuse<Doc> }> {
  if (cachedIndex && cachedFuse) {
    return { docs: cachedIndex, fuse: cachedFuse }
  }
  const res = await fetch("/search-index.json")
  if (!res.ok) throw new Error(`search-index.json ${res.status}`)
  const data: IndexData = await res.json()
  const fuse = new Fuse(data.docs, {
    keys: [
      { name: "t", weight: 2 }, // title heaviest
      { name: "d", weight: 1 }, // description
      { name: "s", weight: 1.2 }, // slug
    ],
    threshold: 0.35,
    ignoreLocation: true,
    includeScore: true,
    minMatchCharLength: 2,
  })
  cachedIndex = data.docs
  cachedFuse = fuse
  return { docs: data.docs, fuse }
}

function docToUrl(d: Doc): string {
  if (d.s === "") return "/"
  if (d.l === "ko") {
    return d.s.startsWith("ko/") ? `/${d.s}/` : `/ko/${d.s}/`
  }
  return `/${d.s}/`
}

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Doc[]>([])
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fuseRef = useRef<Fuse<Doc> | null>(null)

  // Load index on first open
  useEffect(() => {
    if (!open || ready) return
    if (cachedFuse) {
      fuseRef.current = cachedFuse
      setReady(true)
      return
    }
    loadIndex()
      .then(({ fuse }) => {
        fuseRef.current = fuse
        setReady(true)
      })
      .catch((e) => {
        console.error("Search index load failed:", e)
        setError("Search index not available. Try reloading the page.")
      })
  }, [open, ready])

  // Focus input on open + reset on close
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery("")
      setResults([])
      setError(null)
    }
  }, [open])

  // Debounced search
  useEffect(() => {
    if (!query.trim() || !fuseRef.current) {
      setResults([])
      return
    }
    setLoading(true)
    const timer = setTimeout(() => {
      try {
        const matches = fuseRef.current!.search(query, { limit: 10 })
        setResults(matches.map((m) => m.item))
      } catch (e) {
        console.error("Fuse search error:", e)
      } finally {
        setLoading(false)
      }
    }, 150)
    return () => clearTimeout(timer)
  }, [query])

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
            placeholder="Search 962+ RE9 guides…"
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
          <div className="p-6 text-center font-mono text-xs text-red-400">{error}</div>
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
                  href={docToUrl(r)}
                  onClick={onClose}
                  className="block px-4 py-3 hover:bg-secondary"
                >
                  <div className="flex items-baseline gap-2">
                    <div className="font-heading text-sm font-semibold text-foreground line-clamp-1 flex-1">
                      {r.t}
                    </div>
                    {r.l === "ko" && (
                      <span className="shrink-0 rounded-sm border border-border bg-secondary px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                        KO
                      </span>
                    )}
                  </div>
                  {r.d && (
                    <div className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {r.d}
                    </div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}

        {!error && !loading && query && results.length === 0 && ready && (
          <div className="p-8 text-center font-mono text-xs text-muted-foreground">
            No results for &ldquo;{query}&rdquo;
          </div>
        )}

        {!error && !loading && !query && ready && (
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

        {!error && !ready && (
          <div className="p-8 text-center font-mono text-xs text-muted-foreground">
            Loading index…
          </div>
        )}
      </div>
    </div>
  )
}
