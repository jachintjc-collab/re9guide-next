import Link from "next/link"
import { ChevronRight } from "lucide-react"

export type BreadcrumbItem = { label: string; href?: string }

/**
 * Breadcrumb navigation + JSON-LD structured data (BreadcrumbList schema)
 * Renders both visible nav and hidden JSON-LD in one component.
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      ...(item.href
        ? { item: `https://www.re9guide.it.com${item.href}` }
        : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && (
                <ChevronRight
                  className="size-3 text-muted-foreground"
                  aria-hidden="true"
                />
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="uppercase tracking-widest text-muted-foreground hover:text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="uppercase tracking-widest text-foreground line-clamp-1 max-w-[200px] sm:max-w-none"
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
