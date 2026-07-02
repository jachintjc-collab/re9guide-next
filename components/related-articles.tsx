import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getAllDocsMeta, categorize, type Lang } from "@/lib/content"

type Props = {
  currentSlug: string
  lang: Lang
}

/**
 * Related articles component — shows 4 articles from the same category as current.
 * Uses stable sorting (alphabetical) so SSG output is deterministic.
 */
export function RelatedArticles({ currentSlug, lang }: Props) {
  const currentCategory = categorize(currentSlug)
  const allDocs = getAllDocsMeta(lang)

  const related = allDocs
    .filter(
      (d) => d.slug !== currentSlug && categorize(d.slug) === currentCategory
    )
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .slice(0, 4)

  if (related.length === 0) return null

  const urlPrefix = lang === "ko" ? "/ko/" : "/"
  const headingText =
    lang === "ko" ? `${currentCategory} 관련 가이드` : `More in ${currentCategory}`

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="mb-6 font-heading text-xl font-bold tracking-wide text-amber-100">
        {headingText}
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {related.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`${urlPrefix}${doc.slug}/`}
              className="group flex items-start justify-between gap-3 rounded-md border border-border bg-card/40 p-4 transition-colors hover:border-primary/50"
            >
              <div className="flex-1 min-w-0">
                <div className="font-heading text-sm font-semibold text-foreground line-clamp-2">
                  {doc.title}
                </div>
                {doc.description && (
                  <div className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {doc.description}
                  </div>
                )}
              </div>
              <ArrowUpRight className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
