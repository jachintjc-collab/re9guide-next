import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Breadcrumb } from '@/components/breadcrumb'
import { ArticleSchema } from '@/components/article-schema'
import { RelatedArticles } from '@/components/related-articles'
import { ShareButtons } from '@/components/share-buttons'
import { GiscusComments } from '@/components/giscus-comments'
import { getAllSlugs, getDocBySlug, categorize } from '@/lib/content'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs('ko').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = getDocBySlug(slug, 'ko')
  if (!doc) return {}
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: `/ko/${slug}/`,
      languages: {
        en: `/${slug}/`,
        ko: `/ko/${slug}/`,
      },
    },
    openGraph: doc.ogImage
      ? {
          title: doc.title,
          description: doc.description,
          url: `/ko/${slug}/`,
          locale: 'ko_KR',
          images: [{ url: doc.ogImage, width: 1200, height: 630 }],
        }
      : {
          title: doc.title,
          description: doc.description,
          url: `/ko/${slug}/`,
          locale: 'ko_KR',
        },
  }
}

function categoryAnchor(cat: string): string {
  return cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const CATEGORY_KO: Record<string, string> = {
  Walkthroughs: '워크스루',
  'Interactive Maps': '인터랙티브 맵',
  'Tier Lists': '티어 리스트',
  'Hub & Index Pages': '허브 & 색인',
  'Beginner Guides': '초보자 가이드',
  'Stuck? Help': '막혔을 때',
  'Q&A': 'Q&A',
  'Character Deep Profiles': '캐릭터 심층 분석',
  NPCs: 'NPC',
  'Trophies & Achievements': '트로피 & 업적',
  'Weapons & Combat': '무기 & 전투',
  'Insanity Difficulty': '인새너티 난이도',
  Speedrun: '스피드런',
  'RE9 vs Comparisons': 'RE9 비교',
  'Virology & Lore': '바이러스 & 로어',
  Spoilers: '스포일러',
  'Developer Analysis': '개발자 분석',
  'Audio Design': '사운드 디자인',
  'Audio Logs': '오디오 로그',
  'Art & Visual Analysis': '아트 & 비주얼',
  Modding: '모딩',
  Charms: '참',
  Locations: '위치',
  'RE9 General': 'RE9 일반',
  Other: '기타',
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const doc = getDocBySlug(slug, 'ko')
  if (!doc) notFound()

  const category = categorize(slug)
  const catAnchor = categoryAnchor(category)
  const catKo = CATEGORY_KO[category] || category

  return (
    <div className="min-h-screen bg-background text-foreground" lang="ko">
      <ArticleSchema
        title={doc.title}
        description={doc.description}
        slug={slug}
        lang="ko"
        ogImage={doc.ogImage}
      />
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-3xl">
            <Breadcrumb
              items={[
                { label: '홈', href: '/' },
                { label: '전체 가이드', href: '/ko/all-guides/' },
                { label: catKo, href: `/ko/all-guides/#${catAnchor}` },
                { label: doc.title },
              ]}
            />

            <article
              className="prose prose-invert prose-stone max-w-none prose-headings:font-cinzel prose-headings:text-amber-100 prose-h1:text-4xl prose-h1:md:text-5xl prose-h2:text-3xl prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-amber-200 prose-blockquote:border-l-amber-700 prose-blockquote:text-stone-300 prose-code:text-amber-300 prose-code:bg-stone-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-stone-950 prose-pre:border prose-pre:border-stone-800 prose-th:bg-stone-900 prose-th:text-amber-100 prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: doc.html }}
            />

            <ShareButtons url={`/ko/${slug}/`} title={doc.title} />

            <RelatedArticles currentSlug={slug} lang="ko" />

            <GiscusComments slug={`ko-${slug}`} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
