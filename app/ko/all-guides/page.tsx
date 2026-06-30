import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { getAllDocsMeta, categorize } from '@/lib/content'

export const metadata: Metadata = {
  title: '전체 가이드 — RE9 모든 가이드 색인',
  description:
    're9guide.it.com의 모든 285편 한국어 가이드 색인. 워크스루, 캐릭터 분석, 트로피, 무기, 티어 리스트, 사운드 디자인, 로어 등 카테고리별 분류.',
  alternates: {
    canonical: '/ko/all-guides/',
    languages: {
      en: '/all-guides/',
      ko: '/ko/all-guides/',
    },
  },
  openGraph: {
    locale: 'ko_KR',
  },
}

const CATEGORY_KO: Record<string, string> = {
  'Walkthroughs': '워크스루',
  'Interactive Maps': '인터랙티브 맵',
  'Tier Lists': '티어 리스트',
  'Hub & Index Pages': '허브 & 색인',
  'Beginner Guides': '초보자 가이드',
  'Stuck? Help': '막혔을 때',
  'Q&A': 'Q&A',
  'Character Deep Profiles': '캐릭터 심층 분석',
  'NPCs': 'NPC',
  'Trophies & Achievements': '트로피 & 업적',
  'Weapons & Combat': '무기 & 전투',
  'Insanity Difficulty': '인새너티 난이도',
  'Speedrun': '스피드런',
  'RE9 vs Comparisons': 'RE9 비교',
  'Virology & Lore': '바이러스 & 로어',
  'Spoilers': '스포일러',
  'Developer Analysis': '개발자 분석',
  'Audio Design': '사운드 디자인',
  'Audio Logs': '오디오 로그',
  'Art & Visual Analysis': '아트 & 비주얼',
  'Modding': '모딩',
  'Charms': '참',
  'Locations': '위치',
  'RE9 General': 'RE9 일반',
  'Other': '기타',
}

export default function AllGuidesPageKo() {
  const docs = getAllDocsMeta('ko')

  const grouped: Record<string, typeof docs> = {}
  for (const doc of docs) {
    const cat = categorize(doc.slug)
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(doc)
  }

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
    <div className="min-h-screen bg-background text-foreground" lang="ko">
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
              전체 색인
            </p>
            <h1 className="font-heading text-4xl font-black tracking-tight md:text-5xl text-balance">
              전체 <span className="text-primary">{totalCount}</span>편 RE9 가이드
            </h1>
            <p className="mt-4 max-w-2xl text-stone-400 leading-relaxed">
              사이트의 모든 가이드를 카테고리별로 분류한 색인. 워크스루,
              캐릭터 분석, 트로피, 무기, 티어 리스트, 사운드 디자인, 로어 등.{' '}
              <Link href="/all-guides/" className="text-amber-400 hover:underline">
                English index →
              </Link>
            </p>
          </header>

          <nav aria-label="카테고리 이동" className="mb-12 rounded-md border border-border bg-card/30 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-3">
              카테고리로 이동
            </p>
            <div className="flex flex-wrap gap-2">
              {sortedCategories.map((cat) => (
                <a
                  key={cat}
                  href={`#${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                  className="rounded-sm border border-border bg-background px-2.5 py-1 font-mono text-[11px] text-stone-300 hover:border-primary/50 hover:text-primary"
                >
                  {CATEGORY_KO[cat] || cat} ({grouped[cat].length})
                </a>
              ))}
            </div>
          </nav>

          <div className="space-y-12">
            {sortedCategories.map((cat) => {
              const list = [...grouped[cat]].sort((a, b) =>
                a.title.localeCompare(b.title, 'ko')
              )
              const id = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              return (
                <section key={cat} id={id}>
                  <div className="mb-4 flex items-baseline justify-between border-b border-border pb-3">
                    <h2 className="font-heading text-2xl font-bold tracking-wide text-amber-100">
                      {CATEGORY_KO[cat] || cat}
                    </h2>
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {list.length}편
                    </span>
                  </div>
                  <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((doc) => (
                      <li key={doc.slug}>
                        <Link
                          href={`/ko/${doc.slug}/`}
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
