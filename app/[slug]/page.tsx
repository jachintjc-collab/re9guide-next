import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { getAllSlugs, getDocBySlug } from '@/lib/content'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs('en').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = getDocBySlug(slug, 'en')
  if (!doc) return {}
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      // 不再使用 MDX frontmatter 的旧 .html canonical，强制 Next.js 自动生成正确格式
      canonical: `/${slug}/`,
      languages: {
        en: `/${slug}/`,
        ko: `/ko/${slug}/`,
      },
    },
    openGraph: doc.ogImage
      ? {
          title: doc.title,
          description: doc.description,
          url: `/${slug}/`,
          images: [{ url: doc.ogImage, width: 1200, height: 630 }],
        }
      : {
          title: doc.title,
          description: doc.description,
          url: `/${slug}/`,
        },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const doc = getDocBySlug(slug, 'en')
  if (!doc) notFound()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <article
          className="mx-auto max-w-3xl px-4 py-12 prose prose-invert prose-stone max-w-none prose-headings:font-cinzel prose-headings:text-amber-100 prose-h1:text-4xl prose-h1:md:text-5xl prose-h2:text-3xl prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-amber-200 prose-blockquote:border-l-amber-700 prose-blockquote:text-stone-300 prose-code:text-amber-300 prose-code:bg-stone-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-stone-950 prose-pre:border prose-pre:border-stone-800 prose-th:bg-stone-900 prose-th:text-amber-100 prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />
      </main>
      <SiteFooter />
    </div>
  )
}
