"use client"

import { useEffect, useRef } from "react"

type Props = {
  slug: string
}

/**
 * Giscus comments via GitHub Discussions.
 *
 * SETUP REQUIRED:
 * 1. Enable Discussions on jachintjc-collab/re9guide-next repo
 *    (GitHub → repo → Settings → General → Features → Discussions)
 * 2. Install Giscus app: https://github.com/apps/giscus
 * 3. Visit https://giscus.app/ → configure → copy the data-repo-id and data-category-id
 * 4. Set env vars in Vercel (or hardcode below):
 *    NEXT_PUBLIC_GISCUS_REPO_ID
 *    NEXT_PUBLIC_GISCUS_CATEGORY_ID
 * 5. Deploy
 *
 * Until configured, this component renders a helpful notice instead of comments.
 */
export function GiscusComments({ slug }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

  useEffect(() => {
    if (!ref.current || !repoId || !categoryId) return
    // Prevent duplicate script
    if (ref.current.querySelector("script[src*='giscus.app']")) return

    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.setAttribute("data-repo", "jachintjc-collab/re9guide-next")
    script.setAttribute("data-repo-id", repoId)
    script.setAttribute("data-category", "General")
    script.setAttribute("data-category-id", categoryId)
    script.setAttribute("data-mapping", "specific")
    script.setAttribute("data-term", slug)
    script.setAttribute("data-strict", "0")
    script.setAttribute("data-reactions-enabled", "1")
    script.setAttribute("data-emit-metadata", "0")
    script.setAttribute("data-input-position", "bottom")
    script.setAttribute("data-theme", "dark_dimmed")
    script.setAttribute("data-lang", "en")
    script.setAttribute("data-loading", "lazy")
    script.setAttribute("crossorigin", "anonymous")
    script.async = true
    ref.current.appendChild(script)
  }, [slug, repoId, categoryId])

  // Fallback message when Giscus isn't configured yet
  if (!repoId || !categoryId) {
    return null
  }

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="mb-6 font-heading text-xl font-bold tracking-wide text-amber-100">
        Discussion
      </h2>
      <div ref={ref} className="giscus" />
    </section>
  )
}
