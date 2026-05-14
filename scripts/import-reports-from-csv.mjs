#!/usr/bin/env node
/**
 * Reads knowledge/reference/ap-reports/source/reports-export.csv
 * and writes catalog.json + one markdown file per row under by-report/.
 *
 * Detects "Report Name" and "Product Name" columns by header text (flexible).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = path.join(ROOT, 'knowledge', 'reference', 'ap-reports')
const CSV_PATH = path.join(BASE, 'source', 'reports-export.csv')
const OUT_CATALOG = path.join(BASE, 'catalog.json')
const OUT_DIR = path.join(BASE, 'by-report')

function parseCSVLine(line) {
  const out = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') {
      inQuotes = !inQuotes
      continue
    }
    if (!inQuotes && c === ',') {
      out.push(cur.trim())
      cur = ''
      continue
    }
    cur += c
  }
  out.push(cur.trim())
  return out
}

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.length > 0)
  if (lines.length === 0) return { headers: [], rows: [] }
  const headers = parseCSVLine(lines[0])
  const rows = []
  for (let i = 1; i < lines.length; i++) {
    const cells = parseCSVLine(lines[i])
    const row = {}
    headers.forEach((h, j) => {
      row[h] = cells[j] ?? ''
    })
    rows.push(row)
  }
  return { headers, rows }
}

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function findReportColumn(headers) {
  const h = headers.map((x) => String(x))
  const exact = h.find((x) => norm(x) === 'report name')
  if (exact) return exact
  return h.find((x) => {
    const n = norm(x)
    return n.includes('report') && n.includes('name')
  })
}

function findProductColumn(headers) {
  const h = headers.map((x) => String(x))
  const exact = h.find((x) => norm(x) === 'product name')
  if (exact) return exact
  return h.find((x) => {
    const n = norm(x)
    return n.includes('product') && n.includes('name')
  })
}

function slugify(report, product) {
  const raw = `${report}__${product}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return raw.slice(0, 120) || 'untitled'
}

if (!fs.existsSync(CSV_PATH)) {
  console.error(`Missing CSV: ${CSV_PATH}`)
  console.error('Export the Google Sheet tab to CSV and save it there, then re-run.')
  process.exit(1)
}

const raw = fs.readFileSync(CSV_PATH, 'utf-8')
const { headers, rows } = parseCSV(raw)

if (headers.length === 0) {
  console.error('CSV has no header row.')
  process.exit(1)
}

const reportCol = findReportColumn(headers)
const productCol = findProductColumn(headers)

if (!reportCol || !productCol) {
  console.error('Could not find Report Name and Product Name columns.')
  console.error('Headers seen:', headers.join(' | '))
  process.exit(1)
}

const catalog = rows.map((row) => {
  const entry = { reportName: row[reportCol] ?? '', productName: row[productCol] ?? '' }
  for (const h of headers) {
    if (h === reportCol || h === productCol) continue
    entry[h] = row[h] ?? ''
  }
  return entry
})

fs.mkdirSync(OUT_DIR, { recursive: true })

const usedSlugs = new Map()

function uniqueSlug(reportName, productName) {
  let base = slugify(reportName, productName)
  const n = (usedSlugs.get(base) ?? 0) + 1
  usedSlugs.set(base, n)
  if (n === 1) return base
  return `${base}-${n}`
}

for (const row of rows) {
  const reportName = row[reportCol] ?? ''
  const productName = row[productCol] ?? ''
  const slug = uniqueSlug(reportName, productName)
  const extras = headers.filter((h) => h !== reportCol && h !== productCol)
  const lines = [
    '---',
    `report_name: ${JSON.stringify(reportName)}`,
    `product_name: ${JSON.stringify(productName)}`,
    'source_sheet:',
    '  id: 1kp2WkLG-yUyOgjlAqB5UghDNDDO6opGqr1UXImR9lFY',
    '  gid: "64373888"',
    '---',
    '',
    '## Other fields',
    '',
  ]
  for (const h of extras) {
    const v = row[h]
    if (v === undefined || v === '') continue
    lines.push(`- **${h}**: ${String(v).replace(/\n/g, ' ')}`)
  }
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.md`), lines.join('\n'), 'utf-8')
}

fs.writeFileSync(OUT_CATALOG, JSON.stringify(catalog, null, 2), 'utf-8')
console.log(`Wrote ${OUT_CATALOG} (${catalog.length} rows)`)
console.log(`Wrote ${catalog.length} files under ${OUT_DIR}`)
