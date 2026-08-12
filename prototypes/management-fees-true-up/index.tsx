import { useMemo, useState } from 'react'
import {
  CalendarDays,
  ChevronDown,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Info,
  LayoutGrid,
  MoreHorizontal,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import './styles.css'

type Period = 'Jan 2026' | 'Feb 2026' | 'Mar 2026'

const periods: Period[] = ['Jan 2026', 'Feb 2026', 'Mar 2026']

const money = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

const rows = [
  { section: 'Basis / detail', property: '48 West', template: 'PROPCO — 3% Cash', description: 'Electricity Bill', amount: 142.1, bva: null },
  { section: 'Basis / detail', property: '48 West', template: 'PROPCO — 3% Cash', description: 'Adjusted Cash Receipts', amount: 639444.24, bva: null },
  { section: 'Basis / detail', property: '48 West', template: 'PROPCO — 3% Cash', description: 'Prepaid Rent', amount: -15343.56, bva: null },
  { section: 'Fee summary', property: '48 West', template: 'PROPCO — 3% Cash', description: 'Management Fee Due', amount: 19183.33, bva: { 'Jan 2026': [19183.33, 19752.47, 569.14], 'Feb 2026': [19309.93, 19309.93, 0], 'Mar 2026': [19722.56, 19722.56, 0] } },
  { section: 'True-up', property: '48 West', template: 'PROPCO — 3% Cash', description: 'Management Fee True-up', amount: 0, bva: { 'Jan 2026': [0, 569.14, 569.14], 'Feb 2026': [0, 0, 0], 'Mar 2026': [0, 0, 0] } },
  { section: 'Basis / detail', property: '48 West', template: 'PROPCO — 3% Cash', description: 'Security Deposits Allocated to Charges', amount: 840, bva: null },
  { section: 'Fee summary', property: '48 West', template: 'PROPCO — 3% Cash', description: 'Total Amount Due', amount: 19752.47, bva: { 'Jan 2026': [19183.33, 19752.47, 569.14], 'Feb 2026': [19309.93, 19309.93, 0], 'Mar 2026': [19722.56, 19722.56, 0] } },
]

const navItems = ['Report Library', 'Scheduled Reports', 'Saved Reports']

export default function ManagementFeesTrueUp() {
  const [range, setRange] = useState('Jan 2026 – Mar 2026')
  const [templateType, setTemplateType] = useState<'Cash Receipts' | 'Revenue'>('Cash Receipts')
  const [showFilters, setShowFilters] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [search, setSearch] = useState('')

  const filteredRows = useMemo(() => rows.filter((row) =>
    `${row.property} ${row.template} ${row.description}`.toLowerCase().includes(search.toLowerCase()),
  ), [search])

  const runExport = (kind: string) => {
    setShowToast(true)
    window.setTimeout(() => setShowToast(false), 2600)
    void kind
  }

  return (
    <div className="mf-app">
      <header className="topbar">
        <div className="brand-lockup"><div className="brand-mark">e</div><span>Entrata</span></div>
        <div className="product-label"><span className="product-dot" /> AP Reporting <ChevronDown size={15} /></div>
        <div className="topbar-actions"><button className="icon-button"><Info size={17} /></button><div className="avatar">RN</div></div>
      </header>

      <div className="shell">
        <aside className="sidebar">
          <div className="sidebar-label">Reporting</div>
          {navItems.map((item, index) => <div key={item} className={`nav-item ${index === 0 ? 'active' : ''}`}><LayoutGrid size={17} />{item}</div>)}
          <div className="sidebar-divider" />
          <div className="sidebar-label">Favorites</div>
          <div className="favorite"><span className="favorite-dot" /> Management Fees</div>
          <div className="favorite muted"><span className="favorite-dot" /> AP Aging</div>
          <div className="sidebar-bottom"><div className="help-card"><Sparkles size={17} /><div><strong>New: True-up view</strong><span>Compare posted and recalculated fees in one run.</span></div></div></div>
        </aside>

        <main className="main-content">
          <div className="breadcrumbs"><span>Report Library</span><span>/</span><span>Accounting</span><span>/</span><strong>Management Fees</strong></div>
          <div className="title-row">
            <div><div className="eyebrow">Accounting · AP Reporting</div><h1>Management Fees</h1><p>Compare posted fees to recalculated true-up amounts across post months.</p></div>
            <div className="title-actions"><button className="secondary-button"><RefreshCw size={16} /> Refresh</button><button className="primary-button" onClick={() => runExport('Excel')}><Download size={16} /> Export <ChevronDown size={15} /></button></div>
          </div>

          <section className="run-card">
            <div className="run-card-top"><div><div className="section-kicker"><Filter size={14} /> Run configuration</div><div className="run-heading">Multi-period true-up comparison</div></div><div className="run-status"><span className="status-dot" /> Ready to run</div></div>
            {showFilters && <div className="filter-grid">
              <label className="field"><span>Property</span><button className="select-button">48 West <ChevronDown size={15} /></button></label>
              <label className="field"><span>Fee template</span><button className="select-button">PROPCO — 3% Cash <ChevronDown size={15} /></button></label>
              <label className="field"><span>Post month range</span><button className="select-button"><CalendarDays size={15} /> {range} <ChevronDown size={15} /></button></label>
              <label className="field"><span>Basis labels</span><div className="segmented"><button className={templateType === 'Cash Receipts' ? 'selected' : ''} onClick={() => setTemplateType('Cash Receipts')}>Cash receipts</button><button className={templateType === 'Revenue' ? 'selected' : ''} onClick={() => setTemplateType('Revenue')}>Revenue</button></div></label>
            </div>}
            <div className="run-card-footer"><div className="filter-note"><Info size={14} /><span>Max 12 post months · latest completed true-up shown per property, template, and month.</span></div><button className="link-button" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal size={15} /> {showFilters ? 'Hide filters' : 'Show filters'}</button><button className="run-button">Run report <ChevronDown size={15} /></button></div>
          </section>

          <div className="insight-row"><div className="insight-icon"><Sparkles size={17} /></div><div><strong>BVA columns are now included</strong><span>Fee summary rows show Original Fee, Recalculated Fee, and Variance. Detail rows keep their existing Amount behavior.</span></div><button className="dismiss"><X size={16} /></button></div>

          <div className="summary-row"><div className="summary-card"><span>Posted management fee</span><strong>{money(58215.82)}</strong><small>Jan–Mar 2026 · original</small></div><div className="summary-card highlighted"><span>Recalculated fee</span><strong>{money(58784.96)}</strong><small><span className="up">+$569.14</span> vs. posted</small></div><div className="summary-card"><span>True-up variance</span><strong className="variance">+$569.14</strong><small>1 true-up found · 2 months unchanged</small></div><div className="summary-card period-card"><span>Report period</span><strong>Jan–Mar 2026</strong><small>Cash receipts basis · 3.0%</small></div></div>

          <section className="report-card">
            <div className="report-card-header"><div><div className="report-title-line"><h2>Management Fees — 48 West</h2><span className="chip">3.0% Cash</span></div><p>Post months Jan 2026 – Mar 2026 · generated Aug 12, 2026 at 10:42 AM</p></div><div className="report-actions"><div className="search-box"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search rows" /></div><button className="icon-button bordered"><MoreHorizontal size={18} /></button></div></div>
            <div className="legend"><span className="legend-item"><span className="legend-swatch blue" /> Fee summary row</span><span className="legend-item"><span className="legend-swatch purple" /> True-up row</span><span className="legend-note"><Info size={14} /> Variance = recalculated − original</span></div>
            <div className="table-wrap"><table><thead><tr><th rowSpan={2} className="sticky-col description-col">Description</th><th rowSpan={2} className="amount-head">Amount</th>{periods.map((period) => <th key={period} colSpan={3} className="period-head">{period}<span>POST MONTH</span></th>)}</tr><tr>{periods.flatMap((period) => [<th key={`${period}-o`}>Original<br />Fee</th>, <th key={`${period}-r`}>Recalculated<br />Fee</th>, <th key={`${period}-v`} className="variance-head">Variance</th>])}</tr></thead><tbody>{filteredRows.map((row, index) => <tr key={`${row.description}-${index}`} className={row.section === 'Fee summary' ? 'fee-row' : row.section === 'True-up' ? 'true-up-row' : ''}><td className="sticky-col"><div className="description-cell"><span className={`row-marker ${row.section === 'True-up' ? 'purple' : row.section === 'Fee summary' ? 'blue' : ''}`} /><div><strong>{row.description}</strong><span>{row.section} · {row.template}</span></div></div></td><td className={`amount-cell ${row.amount < 0 ? 'negative' : ''}`}>{row.amount === 0 ? '—' : money(row.amount)}</td>{periods.flatMap((period) => { const values = row.bva?.[period as keyof typeof row.bva]; return values ? values.map((value, i) => <td key={`${row.description}-${period}-${i}`} className={`bva-cell ${i === 2 ? 'variance-cell' : ''} ${value < 0 ? 'negative' : ''}`}>{money(value)}</td>) : [<td key={`${row.description}-${period}-na-1`} className="not-applicable">—</td>, <td key={`${row.description}-${period}-na-2`} className="not-applicable">—</td>, <td key={`${row.description}-${period}-na-3`} className="not-applicable">—</td>] })}</tr>)}</tbody><tfoot><tr><td className="sticky-col"><strong>Report total</strong></td><td className="amount-cell"><strong>{money(7826.14)}</strong></td>{periods.flatMap((period) => [<td key={`${period}-total-o`} className="bva-cell"><strong>{period === 'Jan 2026' ? money(19183.33) : period === 'Feb 2026' ? money(19309.93) : money(19722.56)}</strong></td>, <td key={`${period}-total-r`} className="bva-cell"><strong>{period === 'Jan 2026' ? money(19752.47) : period === 'Feb 2026' ? money(19309.93) : money(19722.56)}</strong></td>, <td key={`${period}-total-v`} className="bva-cell variance-cell"><strong>{period === 'Jan 2026' ? money(569.14) : money(0)}</strong></td>])}</tr></tfoot></table></div>
            <div className="report-footer"><span><span className="green-check">✓</span> Reconciled to posted fee records · fee_type_id = 3</span><div className="export-links"><button onClick={() => runExport('Excel')}><FileSpreadsheet size={15} /> Excel</button><button onClick={() => runExport('PDF')}><FileText size={15} /> PDF</button></div></div>
          </section>
          <div className="footnote"><Info size={14} /><span>Detail rows such as Electricity Bill and Adjusted Cash Receipts retain their Amount values. BVA columns apply only to fee summary and true-up rows.</span></div>
        </main>
      </div>
      {showToast && <div className="toast"><span className="toast-check">✓</span><div><strong>Export ready</strong><span>Your Management Fees report is being prepared.</span></div></div>}
    </div>
  )
}
