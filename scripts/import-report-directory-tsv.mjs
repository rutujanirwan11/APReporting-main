#!/usr/bin/env node
/**
 * Parses tab-separated report directory (optional quoted fields, multiline).
 * Reads: knowledge/reference/ap-reports/source/report-directory.tsv (or path from argv[2])
 * Writes:
 *   - knowledge/reference/ap-reports/catalog.json
 *   - knowledge/reference/ap-reports/by-report/{key-or-slug}.md
 *
 * Primary columns: Report (report name), Product (product / reporting group label).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = path.join(ROOT, 'knowledge', 'reference', 'ap-reports')
const DEFAULT_TSV = path.join(BASE, 'source', 'report-directory.tsv')
const OUT_CATALOG = path.join(BASE, 'catalog.json')
const OUT_DIR = path.join(BASE, 'by-report')

function parseTSV(content, delim = '\t') {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  let i = 0
  while (i < content.length) {
    const c = content[i]
    if (inQuotes) {
      if (c === '"') {
        if (content[i + 1] === '"') {
          field += '"'
          i += 2
          continue
        }
        inQuotes = false
        i++
        continue
      }
      field += c
      i++
      continue
    }
    if (c === '"') {
      inQuotes = true
      i++
      continue
    }
    if (c === delim) {
      row.push(field)
      field = ''
      i++
      continue
    }
    if (c === '\r') {
      i++
      continue
    }
    if (c === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
      i++
      continue
    }
    field += c
    i++
  }
  if (field.length || row.length) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

function sanitizeFileBase(s) {
  return String(s || 'report')
    .replace(/[/:*?"<>|]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 120) || 'report'
}

function slugify(report, product) {
  return sanitizeFileBase(`${report}__${product}`.toLowerCase().replace(/[^a-z0-9_]+/gi, '-'))
}

const tsvPath = process.argv[2] || DEFAULT_TSV
const raw = fs.readFileSync(tsvPath, 'utf-8')
const rows = parseTSV(raw.replace(/^\uFEFF/, ''))
if (rows.length < 2) {
  console.error('No data rows in TSV')
  process.exit(1)
}
const header = rows[0].map((h) => h.trim())
const dataRows = rows.slice(1).filter((r) => r.some((c) => String(c).trim() !== ''))

function rowObject(cells) {
  const o = {}
  header.forEach((h, j) => {
    o[h] = cells[j] ?? ''
  })
  return o
}

const catalog = dataRows.map((cells) => rowObject(cells))

fs.mkdirSync(OUT_DIR, { recursive: true })
const used = new Map()

for (const entry of catalog) {
  const reportName = entry.Report ?? ''
  const productName = entry.Product ?? ''
  const keyRaw = (entry.key ?? '').trim()
  let base = keyRaw ? sanitizeFileBase(keyRaw) : slugify(reportName, productName)
  const n = (used.get(base) ?? 0) + 1
  used.set(base, n)
  const fname = n === 1 ? `${base}.md` : `${base}-${n}.md`

  const lines = [
    '---',
    `report_name: ${JSON.stringify(reportName)}`,
    `product_name: ${JSON.stringify(productName)}`,
    `report_key: ${JSON.stringify(keyRaw)}`,
    '---',
    '',
    `## Description`,
    '',
    String(entry.Description ?? '').trim() || '_(none)_',
    '',
    `## Metadata`,
    '',
  ]
  for (const h of header) {
    if (h === 'Report' || h === 'Description' || h === 'Product' || h === 'key') continue
    const v = entry[h]
    if (v === undefined || String(v).trim() === '') continue
    lines.push(`- **${h}**: ${String(v).replace(/\n/g, ' ')}`)
  }
  fs.writeFileSync(path.join(OUT_DIR, fname), lines.join('\n'), 'utf-8')
}

fs.writeFileSync(OUT_CATALOG, JSON.stringify(catalog, null, 2), 'utf-8')
console.log(`Wrote ${OUT_CATALOG} (${catalog.length} reports)`)
console.log(`Wrote ${catalog.length} markdown files under ${OUT_DIR}`)
