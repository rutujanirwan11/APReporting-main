import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = new URL('../dist/', import.meta.url)
const htmlPath = new URL('./index.html', dist)
let html = readFileSync(htmlPath, 'utf8')

html = html.replace(
  /<script type="module" crossorigin src="([^"]+)"><\/script>/,
  (_, src) => `<script type="module">${readFileSync(new URL(`.${src}`, dist), 'utf8')}</script>`,
)
html = html.replace(
  /<link rel="stylesheet" crossorigin href="([^"]+)">/,
  (_, href) => `<style>${readFileSync(new URL(`.${href}`, dist), 'utf8')}</style>`,
)
html = html.replace(/\s*<link rel="icon"[^>]*>/, '')

const worker = `const html = ${JSON.stringify(html)}

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url)
    if (request.method === 'GET' && (pathname === '/' || pathname === '/index.html')) {
      return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } })
    }
    return new Response('Not found', { status: 404 })
  },
}
`

const outputDir = new URL('../dist/server/', import.meta.url)
mkdirSync(outputDir, { recursive: true })
writeFileSync(new URL('./index.js', outputDir), worker)
