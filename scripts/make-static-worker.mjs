import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = new URL('../dist/', import.meta.url)
const htmlPath = new URL('./index.html', dist)
let html = readFileSync(htmlPath, 'utf8')

const mimeTypes = {
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
}
const assets = Object.fromEntries(
  readdirSync(new URL('./assets/', dist)).map((filename) => {
    const extension = filename.slice(filename.lastIndexOf('.'))
    return [`assets/${filename}`, {
      body: readFileSync(new URL(`./assets/${filename}`, dist)).toString('base64'),
      type: mimeTypes[extension] ?? 'application/octet-stream',
    }]
  }),
)

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
const assets = ${JSON.stringify(assets)}

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url)
    const assetPath = pathname.replace(/^\\/+/, '')
    const assetName = assetPath.split('/').pop()
    const asset = assets[assetPath] ?? assets['assets/' + assetName]
    if (request.method === 'GET' && asset) {
      const bytes = Uint8Array.from(atob(asset.body), (character) => character.charCodeAt(0))
      return new Response(bytes, { headers: { 'content-type': asset.type, 'cache-control': 'public, max-age=31536000, immutable' } })
    }
    if (request.method === 'GET' && !pathname.startsWith('/api/')) {
      return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } })
    }
    return new Response('Not found', { status: 404 })
  },
}
`

const outputDir = new URL('../dist/server/', import.meta.url)
mkdirSync(outputDir, { recursive: true })
writeFileSync(new URL('./index.js', outputDir), worker)
