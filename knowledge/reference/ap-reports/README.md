# Entrata report directory (local catalog)

This folder holds a **local copy** of the report directory table (report name, product / reporting group, description, owners, Slack channel, `key`, etc.).

## Source of truth

- **Google Sheet** (original):  
  https://docs.google.com/spreadsheets/d/1kp2WkLG-yUyOgjlAqB5UghDNDDO6opGqr1UXImR9lFY/edit?gid=64373888
- **Checked-in TSV** (used to regenerate this folder):  
  `source/report-directory.tsv`  
  Re-download from Sheets as **Tab-separated values (.tsv)** when the sheet changes, replace this file, then run the import script below.

## Regenerate `catalog.json` and `by-report/*.md`

From repo root:

```bash
export PATH="/opt/homebrew/bin:$PATH"
node scripts/import-report-directory-tsv.mjs
```

Optional: pass a different TSV path:

```bash
node scripts/import-report-directory-tsv.mjs /path/to/export.tsv
```

## Outputs

| Output | Contents |
|--------|----------|
| `catalog.json` | Array of objects — one entry per row; columns match the sheet (`Report`, `Description`, `Product`, …). |
| `by-report/{key}.md` | One markdown file per report, named from the **`key`** column when present (sanitized for the filesystem). YAML frontmatter includes **`report_name`** (column `Report`) and **`product_name`** (column `Product`). Body has **Description** plus remaining columns as a bullet list. |

## Legacy CSV flow (different column names)

If you use a CSV with **Report Name** / **Product Name** headers instead, see `scripts/import-reports-from-csv.mjs` and `source/reports-export.csv`.

## Google Drive MCP (optional)

Automated export via the Entrata **Google Drive** MCP requires **OAuth** on the gateway:  
https://mcp-gateway.entrata.com/token#connections  

After connecting, you can export the spreadsheet and save as TSV into `source/`, then run the import script.
