import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type Lang = 'en' | 'ko' | 'ja' | 'zh'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export function getAllSlugs(lang: Lang): string[] {
  const dir = path.join(CONTENT_DIR, lang)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export interface Doc {
  slug: string
  lang: Lang
  title: string
  description?: string
  canonical?: string
  ogImage?: string
  html: string
}

export function getDocBySlug(slug: string, lang: Lang): Doc | null {
  const filePath = path.join(CONTENT_DIR, lang, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    lang,
    title: (data.title as string) || slug,
    description: data.description as string | undefined,
    canonical: data.canonical as string | undefined,
    ogImage: data.ogImage as string | undefined,
    html: content,
  }
}
