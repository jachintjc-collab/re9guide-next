#!/usr/bin/env node
/**
 * Generate sitemap.xml + robots.txt + rss.xml for re9guide.it.com
 *
 * Runs as `prebuild` — before `next build`.
 * Scans content/en + content/ko MDX files, writes to public/.
 *
 * Usage: node scripts/generate-sitemap.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const CONTENT_DIR = path.join(ROOT, 'content')
const PUBLIC_DIR = path.join(ROOT, 'public')
const SITE_URL = 'https://www.re9guide.it.com'
const NOW = new Date().toISOString()
const NOW_DATE = NOW.split('T')[0]
const NOW_RFC822 = new Date(NOW).toUTCString()

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

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
        title: data.title || slug,
        description: data.description || '',
      }
    })
    .sort((a, b) => a.slug.localeCompare(b.slug))
}

function priority(slug) {
  if (slug === 'about') return 0.6
  if (['privacy', 'terms'].includes(slug)) return 0.3
  if (slug.startsWith('character-') && slug.endsWith('-deep-profile'))
    return 0.85
  if (slug.includes('complete-walkthrough') || slug.includes('complete-area-guide'))
    return 0.95
  if (slug.includes('walkthrough') || slug.includes('complete-guide')) return 0.9
  if (slug.includes('tier-list')) return 0.85
  if (slug.startsWith('trophy-') || slug.startsWith('all-')) return 0.8
  if (slug.startsWith('beginner-')) return 0.8
  if (slug.startsWith('stuck-') || slug.startsWith('qa-')) return 0.75
  if (slug.startsWith('re9-vs-')) return 0.7
  if (slug.includes('interactive-map')) return 0.75
  return 0.6
}

const enDocs = getDocsMeta('en')
const koDocs = getDocsMeta('ko')
const koSlugs = new Set(koDocs.map((d) => d.slug))

console.log(`Found: ${enDocs.length} EN + ${koDocs.length} KO articles`)

// -------- sitemap.xml --------
const sitemapUrls = []

// homepage
sitemapUrls.push(`
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${NOW_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/" />
    <xhtml:link rel="alternate" hreflang="ko" href="${SITE_URL}/ko/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />
  </url>`)

// all-guides index
sitemapUrls.push(`
  <url>
    <loc>${SITE_URL}/all-guides/</loc>
    <lastmod>${NOW_DATE}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/all-guides/" />
    <xhtml:link rel="alternate" hreflang="ko" href="${SITE_URL}/ko/all-guides/" />
  </url>`)

sitemapUrls.push(`
  <url>
    <loc>${SITE_URL}/ko/all-guides/</loc>
    <lastmod>${NOW_DATE}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/all-guides/" />
    <xhtml:link rel="alternate" hreflang="ko" href="${SITE_URL}/ko/all-guides/" />
  </url>`)

// EN articles
for (const doc of enDocs) {
  const url = `${SITE_URL}/${doc.slug}/`
  const hasKo = koSlugs.has(doc.slug)
  const alts = hasKo
    ? `
    <xhtml:link rel="alternate" hreflang="en" href="${url}" />
    <xhtml:link rel="alternate" hreflang="ko" href="${SITE_URL}/ko/${doc.slug}/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />`
    : ''
  sitemapUrls.push(`
  <url>
    <loc>${url}</loc>
    <lastmod>${NOW_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority(doc.slug).toFixed(2)}</priority>${alts}
  </url>`)
}

// KO articles
for (const doc of koDocs) {
  const url = `${SITE_URL}/ko/${doc.slug}/`
  sitemapUrls.push(`
  <url>
    <loc>${url}</loc>
    <lastmod>${NOW_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${(priority(doc.slug) * 0.9).toFixed(2)}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/${doc.slug}/" />
    <xhtml:link rel="alternate" hreflang="ko" href="${url}" />
  </url>`)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${sitemapUrls.join('')}
</urlset>
`
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap)
console.log(`✅ sitemap.xml — ${sitemapUrls.length} URLs`)

// -------- robots.txt --------
const robots = `# re9guide.it.com robots.txt
# Generated ${NOW_DATE}

User-agent: *
Allow: /

# Block AI training crawlers
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: Bytespider
Disallow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots)
console.log('✅ robots.txt — AI crawler blocks + sitemap ref')

// -------- rss.xml (top 30 EN articles) --------
// 排序：优先高 priority + 完成度高的
const rssArticles = [...enDocs]
  .map((d) => ({ ...d, _p: priority(d.slug) }))
  .sort((a, b) => b._p - a._p)
  .slice(0, 30)

const rssItems = rssArticles
  .map(
    (doc) => `
  <item>
    <title>${escapeXml(doc.title)}</title>
    <link>${SITE_URL}/${doc.slug}/</link>
    <description>${escapeXml(doc.description || doc.title)}</description>
    <pubDate>${NOW_RFC822}</pubDate>
    <guid isPermaLink="true">${SITE_URL}/${doc.slug}/</guid>
  </item>`
  )
  .join('')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>re9guide.it.com — Resident Evil Requiem (RE9) Complete Guide</title>
  <link>${SITE_URL}/</link>
  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  <description>Comprehensive fan-made RE9 / Resident Evil Requiem guide. ${enDocs.length}+ walkthroughs, tier lists, character analysis, trophies, and lore.</description>
  <language>en-US</language>
  <lastBuildDate>${NOW_RFC822}</lastBuildDate>
  <generator>re9guide.it.com Next.js 16</generator>${rssItems}
</channel>
</rss>
`
fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rss)
console.log(`✅ rss.xml — top ${rssArticles.length} highest-priority EN articles`)

console.log('\n✨ All sitemap files generated.')
