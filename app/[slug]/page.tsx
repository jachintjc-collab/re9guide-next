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

function categoryAnchor(cat: string): string {
  return cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const doc = getDocBySlug(slug, 'en')
  if (!doc) notFound()

  const category = categorize(slug)
  const catAnchor = categoryAnchor(category)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ArticleSchema
        title={doc.title}
        description={doc.description}
        slug={slug}
        lang="en"
        ogImage={doc.ogImage}
      />
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-3xl">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'All Guides', href: '/all-guides/' },
                { label: category, href: `/all-guides/#${catAnchor}` },
                { label: doc.title },
              ]}
            />

            <article
              className="prose prose-invert prose-stone max-w-none prose-headings:font-cinzel prose-headings:text-amber-100 prose-h1:text-4xl prose-h1:md:text-5xl prose-h2:text-3xl prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-amber-200 prose-blockquote:border-l-amber-700 prose-blockquote:text-stone-300 prose-code:text-amber-300 prose-code:bg-stone-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-stone-950 prose-pre:border prose-pre:border-stone-800 prose-th:bg-stone-900 prose-th:text-amber-100 prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: doc.html }}
            />

            <ShareButtons url={`/${slug}/`} title={doc.title} />

            <RelatedArticles currentSlug={slug} lang="en" />

            <GiscusComments slug={slug} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
