#!/usr/bin/env node
/**
 * Generate public/search-index.json for client-side Fuse.js search.
 *
 * Scans content/en + content/ko MDX files, extracts frontmatter (title, description, slug),
 * writes to public/search-index.json (~60KB for 962 pages).
 *
 * Client-side fuse.js does fuzzy search on title + description + slug.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const CONTENT_DIR = path.join(ROOT, 'content')
const PUBLIC_DIR = path.join(ROOT, 'public')

function getDocsMeta(lang) {
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
        lang,
        title: (data.title || slug).replace(/ · re9guide\.it\.com$/, ''),
        description: (data.description || '').slice(0, 220),
      }
    })
}

const enDocs = getDocsMeta('en')
const koDocs = getDocsMeta('ko')
const allDocs = [...enDocs, ...koDocs]

// Add homepage + all-guides + KO variants
const staticEntries = [
  { slug: '', lang: 'en', title: 'REQUIEM ARCHIVE — RE9 Complete Guide', description: 'Homepage — walkthroughs, tier lists, characters, trophies.' },
  { slug: 'all-guides', lang: 'en', title: 'All Guides — Complete Index', description: 'Browse all 677 EN guides organized by category.' },
  { slug: 'ko/all-guides', lang: 'ko', title: '전체 가이드 — 완전 색인', description: '285편 한국어 가이드 카테고리별 분류.' },
]

const finalDocs = [...staticEntries, ...allDocs].map((d) => ({
  s: d.slug,
  l: d.lang,
  t: d.title,
  d: d.description,
}))

const output = { docs: finalDocs }
const jsonStr = JSON.stringify(output)
fs.writeFileSync(path.join(PUBLIC_DIR, 'search-index.json'), jsonStr)

console.log(`✅ search-index.json — ${finalDocs.length} entries (${Math.round(jsonStr.length / 1024)} KB)`)
