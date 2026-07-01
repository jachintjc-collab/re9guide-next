#!/usr/bin/env node
/**
 * Batch-fix all .html links in MDX files:
 *   href="foo.html"           → href="/foo/"
 *   href="../foo.html"        → href="/foo/"
 *   href="ko/foo.html"        → href="/ko/foo/"
 *   href="/foo.html"          → href="/foo/"
 *   href="https://www.re9guide.it.com/foo.html" → href="https://www.re9guide.it.com/foo/"
 *   href="https://re9guide.it.com/foo.html"     → href="https://www.re9guide.it.com/foo/"
 *
 * Additionally, drop nested slug in relative URLs:
 *   In a page /all-25-mr-raccoon-locations/, href="foo.html" (relative) resolves to
 *   /all-25-mr-raccoon-locations/foo.html which 404s. Fix to /foo/ absolute.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const CONTENT_DIR = path.join(ROOT, 'content')

let totalFilesTouched = 0
let totalReplacements = 0

function fixContent(text, isKoFile) {
  let count = 0

  // 1. Absolute URLs: https://[www.]re9guide.it.com/foo.html → /foo/
  text = text.replace(
    /href="https?:\/\/(?:www\.)?re9guide\.it\.com\/([^"]*?)\.html"/g,
    (m, slug) => {
      count++
      return `href="/${slug}/"`
    }
  )

  // 2. Absolute path: /foo.html → /foo/
  text = text.replace(/href="\/([^"]*?)\.html"/g, (m, slug) => {
    count++
    return `href="/${slug}/"`
  })

  // 3. Relative path with ../: ../foo.html → /foo/
  text = text.replace(/href="\.\.\/([^"]*?)\.html"/g, (m, slug) => {
    count++
    return `href="/${slug}/"`
  })

  // 4. Relative path without ./: foo.html → /foo/  (or /ko/foo/ if ko file)
  //    Also handle: ko/foo.html or ja/foo.html type
  text = text.replace(/href="([a-zA-Z0-9][^"/]*?)\.html"/g, (m, slug) => {
    count++
    const prefix = isKoFile ? '/ko/' : '/'
    return `href="${prefix}${slug}/"`
  })

  // 5. Relative path with directory: ko/foo.html → /ko/foo/
  text = text.replace(
    /href="((?:en|ko|ja|zh)\/[^"]*?)\.html"/g,
    (m, path) => {
      count++
      return `href="/${path}/"`
    }
  )

  return { text, count }
}

function processDir(dir) {
  const isKo = dir.endsWith('/ko') || dir.endsWith('\\ko')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))

  for (const f of files) {
    const filePath = path.join(dir, f)
    const original = fs.readFileSync(filePath, 'utf-8')
    const { text: fixed, count } = fixContent(original, isKo)

    if (count > 0) {
      fs.writeFileSync(filePath, fixed)
      totalFilesTouched++
      totalReplacements += count
    }
  }
}

console.log('Fixing MDX .html links...')

const enDir = path.join(CONTENT_DIR, 'en')
const koDir = path.join(CONTENT_DIR, 'ko')

if (fs.existsSync(enDir)) processDir(enDir)
if (fs.existsSync(koDir)) processDir(koDir)

console.log(`\n✅ Fixed ${totalReplacements} links across ${totalFilesTouched} files`)
