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

export interface DocMeta {
  slug: string
  title: string
  description?: string
}

/** 读取某语言所有 MDX 的 metadata (slug + title)，不读 html body，build 性能好 */
export function getAllDocsMeta(lang: Lang): DocMeta[] {
  const dir = path.join(CONTENT_DIR, lang)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: (data.title as string) || slug,
        description: data.description as string | undefined,
      }
    })
}

/** 按 slug prefix 自动分类 */
export function categorize(slug: string): string {
  if (/^character-.*-deep-profile$/.test(slug)) return 'Character Deep Profiles'
  if (/^npc-/.test(slug)) return 'NPCs'
  if (/^audio-log-/.test(slug)) return 'Audio Logs'
  if (/^audio-design-/.test(slug)) return 'Audio Design'
  if (/^art-/.test(slug)) return 'Art & Visual Analysis'
  if (/^trophy-|^all-.*-(trophies|platinum)/.test(slug)) return 'Trophies & Achievements'
  if (/walkthrough$|^complete-/.test(slug) || /-complete-guide$/.test(slug)) return 'Walkthroughs'
  if (/-interactive-map$/.test(slug)) return 'Interactive Maps'
  if (/^re9-vs-/.test(slug)) return 'RE9 vs Comparisons'
  if (/tier-list$/.test(slug)) return 'Tier Lists'
  if (/^spoiler-/.test(slug)) return 'Spoilers'
  if (/^dev-/.test(slug)) return 'Developer Analysis'
  if (/^qa-/.test(slug)) return 'Q&A'
  if (/^stuck-/.test(slug)) return 'Stuck? Help'
  if (/^speedrun-/.test(slug)) return 'Speedrun'
  if (/^modding-/.test(slug)) return 'Modding'
  if (/^beginner-/.test(slug)) return 'Beginner Guides'
  if (/insanity/.test(slug)) return 'Insanity Difficulty'
  if (/^charm-/.test(slug)) return 'Charms'
  if (/^index-table-|^all-/.test(slug)) return 'Hub & Index Pages'
  if (/weapons|weapon|shotgun|pistol|sniper|rifle|combo/.test(slug)) return 'Weapons & Combat'
  if (/(virology|c-virus|e-virus|t-virus|virus|biology|plant)/.test(slug)) return 'Virology & Lore'
  if (/location/.test(slug)) return 'Locations'
  if (/^re9-/.test(slug)) return 'RE9 General'
  return 'Other'
}
