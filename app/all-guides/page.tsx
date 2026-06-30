import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { getAllDocsMeta, categorize } from '@/lib/content'

export const metadata: Metadata = {
  title: 'All Guides — Complete RE9 Content Index',
  description:
    'Complete index of all 710+ RE9 guides on re9guide.it.com. Browse walkthroughs, character deep-dives, trophies, weapons, tier lists, audio design, lore, and more — organized by category.',
  alternates: {
    canonical: '/all-guides/',
    languages: {
      en: '/all-guides/',
      ko: '/ko/all-guides/',
    },
  },
}

export default function AllGuidesPage() {
  const docs = getAllDocsMeta('en')

  // 按 category 分组
  const grouped: Record<string, typeof docs> = {}
  for (const doc of docs) {
    const cat = categorize(doc.slug)
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(doc)
  }

  // 类别排序权重（重要的先显示）
  const CATEGORY_ORDER = [
    'Walkthroughs',
    'Interactive Maps',
    'Tier Lists',
    'Hub & Index Pages',
    'Beginner Guides',
    'Stuck? Help',
    'Q&A',
    'Character Deep Profiles',
    'NPCs',
    'Trophies & Achievements',
    'Weapons & Combat',
    'Insanity Difficulty',
    'Speedrun',
    'RE9 vs Comparisons',
    'Virology & Lore',
    'Spoilers',
    'Developer Analysis',
    'Audio Design',
    'Audio Logs',
    'Art & Visual Analysis',
    'Modding',
    'Charms',
    'Locations',
    'RE9 General',
    'Other',
  ]
  const sortedCategories = CATEGORY_ORDER.filter((c) => grouped[c]?.length)

  const totalCount = docs.length

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
              Complete Index
            </p>
            <h1 className="font-heading text-4xl font-black tracking-tight md:text-5xl text-balance">
              All <span className="text-primary">{totalCount}</span> RE9 Guides
            </h1>
            <p className="mt-4 max-w-2xl text-stone-400 leading-relaxed">
              Complete index of every guide on this site, organized by category.
              Walkthroughs, character profiles, trophies, weapons, tier lists,
              audio design, lore, and more. <Link href="/ko/all-guides/" className="text-amber-400 hover:underline">한국어 색인 →</Link>
            </p>
          </header>

          <nav aria-label="Category jumps" className="mb-12 rounded-md border border-border bg-card/30 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-3">
              Jump to category
            </p>
            <div className="flex flex-wrap gap-2">
              {sortedCategories.map((cat) => (
                <a
                  key={cat}
                  href={`#${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                  className="rounded-sm border border-border bg-background px-2.5 py-1 font-mono text-[11px] text-stone-300 hover:border-primary/50 hover:text-primary"
                >
                  {cat} ({grouped[cat].length})
                </a>
              ))}
            </div>
          </nav>

          <div className="space-y-12">
            {sortedCategories.map((cat) => {
              const list = [...grouped[cat]].sort((a, b) =>
                a.title.localeCompare(b.title)
              )
              const id = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              return (
                <section key={cat} id={id}>
                  <div className="mb-4 flex items-baseline justify-between border-b border-border pb-3">
                    <h2 className="font-heading text-2xl font-bold tracking-wide text-amber-100">
                      {cat}
                    </h2>
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {list.length} guides
                    </span>
                  </div>
                  <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((doc) => (
                      <li key={doc.slug}>
                        <Link
                          href={`/${doc.slug}/`}
                          className="block py-1.5 text-sm text-stone-300 hover:text-amber-400"
                        >
                          {doc.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
