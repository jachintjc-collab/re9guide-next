/**
 * Article JSON-LD structured data.
 * Renders schema.org Article + Person author + Organization publisher.
 * Google displays this as rich snippets: author, publish date, image.
 */

type Props = {
  title: string
  description?: string
  slug: string
  lang: "en" | "ko"
  ogImage?: string
}

export function ArticleSchema({ title, description, slug, lang, ogImage }: Props) {
  const url =
    lang === "ko"
      ? `https://www.re9guide.it.com/ko/${slug}/`
      : `https://www.re9guide.it.com/${slug}/`

  // Build date is when the article was migrated to new site
  // Real per-article dates aren't in MDX frontmatter yet
  const publishDate = "2026-06-01T00:00:00Z"
  const modifiedDate = "2026-07-01T00:00:00Z"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    ...(description ? { description } : {}),
    url,
    inLanguage: lang === "ko" ? "ko-KR" : "en-US",
    datePublished: publishDate,
    dateModified: modifiedDate,
    author: {
      "@type": "Person",
      name: "the writer",
      url: "https://www.re9guide.it.com/about/",
    },
    publisher: {
      "@type": "Organization",
      name: "re9guide.it.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.re9guide.it.com/favicon-512x512.png",
        width: 512,
        height: 512,
      },
    },
    image: [
      ogImage || "https://www.re9guide.it.com/og-image.png",
    ],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
