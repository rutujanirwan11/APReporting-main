import { useMemo, useState } from 'react'
import {
  Bell, CalendarDays, Check, ChevronDown, ChevronRight, CircleHelp, Download,
  FileSpreadsheet, Filter, HelpCircle, Lock, PlusCircle, Printer, RotateCcw,
  Search, SlidersHorizontal, X,
} from 'lucide-react'
import './styles.css'

type Period = 'Jan 2026' | 'Feb 2026' | 'Mar 2026' | 'Jul 2026'
type ReportRow = [string, number, Record<string, [number, number, number]> | null]
const periodCatalog: Array<{ label: Period; month: number }> = [{ label: 'Jan 2026', month: 1 }, { label: 'Feb 2026', month: 2 }, { label: 'Mar 2026', month: 3 }, { label: 'Jul 2026', month: 7 }]
const periods: Period[] = periodCatalog.map(({ label }) => label)
const propertyOptions = ['48 West', '69 Seward', 'Cleveland Apartments II', 'TENN, TENN - Commercial', 'TENN - Commercial, NEW TENN - 3rd PARTY', 'TENN, NEW TENN - 3rd PARTY']
const money = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)

const reportRows: ReportRow[] = [
  ['Total Cash Receipts', 669427.80, null], ['Prepayment Refunds', -888, null],
  ['Adjusted Cash Receipts', 639444.24, null], ['Management Fee Due', 19183.33, { 'Jan 2026': [19183.33, 19752.47, 569.14], 'Feb 2026': [19309.93, 19309.93, 0], 'Mar 2026': [19722.56, 19722.56, 0] }],
  ['Management Fee True-up', 0, { 'Jan 2026': [0, 569.14, 569.14], 'Feb 2026': [0, 0, 0], 'Mar 2026': [0, 0, 0] }],
  ['Prepaid Rent', -15343.56, null], ['Total Amount Due', 19752.47, { 'Jan 2026': [19183.33, 19752.47, 569.14], 'Feb 2026': [19309.93, 19309.93, 0], 'Mar 2026': [19722.56, 19722.56, 0] }],
] as ReportRow[]

const attachedReportRows: Record<string, ReportRow[]> = {
  'TENN, TENN - Commercial': [
    ['Adjusted Revenue', 1099513.35, null], ['Revenue', 1099513.35, null], ['Total Revenue', 1099513.35, null],
    ['Management Fee Due', 32985.40, { 'Jul 2026': [32985.40, 32985.40, 0] }], ['Total Amount Due', 32985.40, { 'Jul 2026': [32985.40, 32985.40, 0] }],
  ],
  'TENN - Commercial, NEW TENN - 3rd PARTY': [
    ['Adjusted Revenue', 40463.13, null], ['Revenue', 40463.13, null], ['Commercial Income', 36368.75, null],
    ['Management Fee Due', 1213.89, { 'Jul 2026': [1213.89, 1213.89, 0] }], ['Total Amount Due', 1213.89, { 'Jul 2026': [1213.89, 1213.89, 0] }],
  ],
  'TENN, NEW TENN - 3rd PARTY': [
    ['Adjusted Revenue', 1059050.22, null], ['Revenue', 1059050.22, null], ['Potential Income', 796964.45, null],
    ['Management Fee Due', 31771.51, { 'Jul 2026': [31771.51, 31771.51, 0] }], ['Total Amount Due', 31771.51, { 'Jul 2026': [31771.51, 31771.51, 0] }],
  ],
}

export default function ManagementFeesTrueUp() {
  const [version, setVersion] = useState('3.0')
  const [periodMode, setPeriodMode] = useState('Custom Post Month')
  const [summarizeBy, setSummarizeBy] = useState('Do Not Summarize')
  const [consolidateBy, setConsolidateBy] = useState('Do Not Consolidate')
  const [chartOfAccounts, setChartOfAccounts] = useState('Master GL Tree')
  const [startMonth, setStartMonth] = useState('01')
  const [startYear, setStartYear] = useState('2026')
  const [endMonth, setEndMonth] = useState('03')
  const [endYear, setEndYear] = useState('2026')
  const [basis, setBasis] = useState<'Cash Receipts' | 'Revenue'>('Cash Receipts')
  const [drillIns, setDrillIns] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [search, setSearch] = useState('')
  const [feeSearch, setFeeSearch] = useState('')
  const [selectedProps, setSelectedProps] = useState(['48 West'])
  const [selectedFeeGroups, setSelectedFeeGroups] = useState(['All Management Fees'])
  const [showPropertyMenu, setShowPropertyMenu] = useState(false)

  const activeImportedProperty = selectedProps.find((property) => attachedReportRows[property])
  const activeRows = activeImportedProperty ? attachedReportRows[activeImportedProperty] : reportRows
  const filteredRows = useMemo(() => activeRows.filter(([name]) => name.toLowerCase().includes(search.toLowerCase())), [activeRows, search])
  const visibleFeeGroups = useMemo(() => ['All Management Fees', 'Enabled', 'Disabled'].filter((group) => group.toLowerCase().includes(feeSearch.toLowerCase())), [feeSearch])
  const selectedPeriods = useMemo(() => {
    if (periodMode !== 'Custom Post Month Range') {
      const month = Number(startMonth)
      const match = periodCatalog.find(({ month: catalogMonth }) => catalogMonth === month)
      return [match?.label ?? 'Mar 2026'] as Period[]
    }
    const start = Number(startMonth)
    const end = Number(endMonth)
    return periodCatalog.filter(({ month }) => {
      return month >= start && month <= end
    }).map(({ label }) => label)
  }, [periodMode, startMonth, endMonth])
  const notify = () => { setShowToast(true); window.setTimeout(() => setShowToast(false), 2600) }
  const toggleProperty = (property: string) => setSelectedProps((current) => current.includes(property) ? current.filter((item) => item !== property) : [...current, property])
  const toggleFeeGroup = (group: string) => setSelectedFeeGroups((current) => current.includes(group) ? current.filter((item) => item !== group) : [...current, group])

  return <div className="filter-prototype">
    <header className="legacy-topbar">
      <div className="legacy-brand">entrata <ChevronRight size={18} /></div>
      <div className="legacy-crumb">Accounting <ChevronRight size={15} /> <strong>Management Fees</strong></div>
      <div className="legacy-actions"><button><HelpCircle size={20} /></button><button><Bell size={19} /></button><button className="close-report"><X size={22} /> Close</button></div>
    </header>

    <div className="legacy-shell">
      <aside className="icon-rail"><button className="rail-selected"><SlidersHorizontal size={21} /></button><button><PlusCircle size={21} /></button><button><Printer size={20} /></button><button><Download size={20} /></button><button><CircleHelp size={20} /></button><div className="rail-spacer" /><span className="back-top">↑<small>TOP</small></span></aside>
      <main className="legacy-main">
        <div className="download-banner"><span>ⓘ</span> Your report is being downloaded and will appear in your downloads when it is completed.</div>
        <div className="page-context"><span>Report Library</span><ChevronRight size={13} /><strong>Management Fees</strong><div className="context-actions"><button onClick={() => setShowResults(false)}><SlidersHorizontal size={15} /> Filters</button><button onClick={notify}><Download size={15} /> Export</button></div></div>
        <div className="work-area">
          <section className="filter-panel">
            <div className="panel-heading"><div><div className="panel-kicker">Management Fees report</div><h1>Report Filters</h1><p>Choose the version, properties, and reporting period.</p></div><span className="version-badge">{showResults ? 'Report generated' : 'Draft run'}</span></div>
            <div className="panel-section compact-section"><label>Version</label><select value={version} onChange={(e) => setVersion(e.target.value)}><option>3.0</option><option>2.9</option></select></div>
            <div className="filter-two-column">
              <div className="field-block"><label>Summarize By</label><select value={summarizeBy} onChange={(e) => setSummarizeBy(e.target.value)}><option>Do Not Summarize</option><option>Property</option><option>Management Fee</option></select></div>
              <div className="field-block"><label>Consolidate By</label><select value={consolidateBy} onChange={(e) => setConsolidateBy(e.target.value)}><option>Do Not Consolidate</option><option>Property Group</option><option>Portfolio</option></select></div>
            </div>
            <div className="filter-two-column filter-divider">
              <div><div className="field-label">Enable Drill-ins <CircleHelp size={13} /></div><button className={`toggle ${drillIns ? 'on' : ''}`} onClick={() => setDrillIns(!drillIns)}><span>{drillIns ? 'Yes' : 'No'}</span><i /></button><p className="helper">Amount drill-in remains available. Variance drill-in is coming in the next sprint.</p></div>
              <div><div className="field-label">True-up display <CircleHelp size={13} /></div><div className="info-choice"><Check size={14} /> BVA columns enabled</div><p className="helper">Original · Recalculated · Variance on fee-summary rows only.</p></div>
            </div>
            <div className="filter-divider properties-grid">
              <div><div className="field-label">Property Groups <Lock size={13} /></div><div className="property-box"><div className="box-toolbar"><span>Selected Properties</span><button onClick={() => setShowPropertyMenu((open) => !open)}><PlusCircle size={15} /> Add</button></div>{selectedProps.length ? selectedProps.map((prop) => <div className="property-row" key={prop}>{prop}<button onClick={() => toggleProperty(prop)} aria-label={`Remove ${prop}`}>×</button></div>) : <div className="empty-property">No properties selected</div>}<button className="clear-all" onClick={() => setSelectedProps([])}>Clear All</button>{showPropertyMenu && <div className="property-add-menu">{propertyOptions.map((property) => <button key={property} className={selectedProps.includes(property) ? 'chosen' : ''} onClick={() => toggleProperty(property)}>{property}<Check size={14} /></button>)}</div>}</div></div>
              <div><div className="field-label">Management Fees <Lock size={13} /></div><div className="tree-box"><div className="tree-search"><Search size={16} /><input value={feeSearch} onChange={(e) => setFeeSearch(e.target.value)} placeholder="Search management fees" aria-label="Search management fees" /></div>{visibleFeeGroups.map((group, index) => <button className={`tree-row ${selectedFeeGroups.includes(group) ? 'selected' : ''}`} key={group} onClick={() => toggleFeeGroup(group)} aria-pressed={selectedFeeGroups.includes(group)}>{index === 0 && !feeSearch ? <ChevronDown size={13} /> : <ChevronRight size={13} />} {group} <Check size={16} /></button>)}{!visibleFeeGroups.length && <div className="empty-property">No matching management fees</div>}</div></div>
            </div>
            <div className="filter-divider bottom-fields">
              <div><div className="field-label">Chart of Accounts or Mask <Lock size={13} /></div><select value={chartOfAccounts} onChange={(e) => setChartOfAccounts(e.target.value)}><option>Master GL Tree</option><option>AP Chart of Accounts</option></select></div>
              <div><div className="field-label">Period <Lock size={13} /></div><select value={periodMode} onChange={(e) => setPeriodMode(e.target.value)}><option>Current Post Month</option><option>Prior Post Month</option><option>Custom Post Month</option><option>Custom Post Month Range</option></select>{periodMode === 'Custom Post Month Range' ? <div className="date-row"><input value={startMonth} onChange={(e) => setStartMonth(e.target.value)} aria-label="start month" /><span>/</span><input value={startYear} onChange={(e) => setStartYear(e.target.value)} aria-label="start year" /><span className="date-arrow">→</span><input value={endMonth} onChange={(e) => setEndMonth(e.target.value)} aria-label="end month" /><span>/</span><input value={endYear} onChange={(e) => setEndYear(e.target.value)} aria-label="end year" /><CalendarDays size={16} /></div> : <div className="date-row single-date"><input value={startMonth} onChange={(e) => setStartMonth(e.target.value)} aria-label="post month" /><span>/</span><input value={startYear} onChange={(e) => setStartYear(e.target.value)} aria-label="post year" /><CalendarDays size={16} /></div>}<div className="period-note">{periodMode === 'Custom Post Month Range' ? 'Max 12 post months · latest completed true-up per period.' : 'One post month · latest completed true-up for the selected period.'}</div></div>
            </div>
            <div className="new-requirements"><div className="new-label">NEW</div><div><strong>Template-aware BVA labels</strong><span>{basis === 'Cash Receipts' ? 'Cash Receipts · Adjusted Cash Receipts · Percent of Cash Receipts' : 'Revenue · Adjusted Revenue · Percent of Revenue'}</span></div><div className="basis-switch"><button className={basis === 'Cash Receipts' ? 'selected' : ''} onClick={() => setBasis('Cash Receipts')}>Cash</button><button className={basis === 'Revenue' ? 'selected' : ''} onClick={() => setBasis('Revenue')}>Revenue</button></div></div>
            <div className="panel-actions"><button className="generate-button" onClick={() => { setShowResults(true); notify() }}>Generate Report <ChevronDown size={16} /></button><button className="reset-button" onClick={() => { setVersion('3.0'); setPeriodMode('Custom Post Month'); setSummarizeBy('Do Not Summarize'); setConsolidateBy('Do Not Consolidate'); setChartOfAccounts('Master GL Tree'); setSelectedProps(['48 West']); setSelectedFeeGroups(['All Management Fees']); setStartMonth('07'); setStartYear('2026'); setEndMonth('07'); setEndYear('2026'); setShowResults(false) }}><RotateCcw size={14} /> Reset</button></div>
          </section>
          <ReportPreview showResults={showResults} search={search} setSearch={setSearch} filteredRows={filteredRows} periods={selectedPeriods} basis={activeImportedProperty ? 'Revenue' : basis} properties={selectedProps} />
        </div>
      </main>
    </div>
    {showToast && <div className="legacy-toast"><Check size={17} /><div><strong>{showResults ? 'Report generated' : 'Download started'}</strong><span>{showResults ? 'BVA columns and multi-period results are ready.' : 'Your report will appear in Downloads.'}</span></div></div>}
  </div>
}

function ReportPreview({ showResults, search, setSearch, filteredRows, periods, basis, properties }: { showResults: boolean; search: string; setSearch: (v: string) => void; filteredRows: ReportRow[]; periods: Period[]; basis: string; properties: string[] }) {
  const periodLabel = periods.length ? periods.join(' – ') : 'Select a reporting period'
  return <section className={`preview-card ${showResults ? 'results-open' : ''}`}><div className="preview-toolbar"><div><span className="preview-kicker">{showResults ? 'Generated report' : 'Existing report preview'}</span><h2>Management Fees — {properties.length ? properties.join(', ') : 'No properties selected'}</h2><p>{basis === 'Cash Receipts' ? 'Cash Receipts' : 'Revenue'} basis · {periodLabel}</p></div><div className="preview-actions"><div className="mini-search"><Search size={14} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" /></div><button onClick={() => window.print()}><Printer size={15} /></button><button><FileSpreadsheet size={15} /></button></div></div><div className="preview-note"><span>ⓘ</span>{showResults ? 'Showing the selected property data and latest completed true-up per post month.' : 'Generate the report to view the selected filter combination and BVA columns.'}</div><div className="preview-table-wrap"><table><thead><tr><th rowSpan={2}>Description</th><th rowSpan={2}>Amount</th>{periods.map((p) => <th colSpan={3} key={p} className="period-group">{p}<small>POST MONTH</small></th>)}</tr><tr>{periods.flatMap((p) => [<th key={`${p}-o`}>Original<br />Fee</th>, <th key={`${p}-r`}>Recalculated<br />Fee</th>, <th key={`${p}-v`}>Variance</th>])}</tr></thead><tbody>{filteredRows.map(([name, amount, bva]) => <tr className={name.includes('Management Fee') ? 'summary-line' : ''} key={name}><td>{name}</td><td className={amount < 0 ? 'negative' : ''}>{amount === 0 ? '—' : money(amount)}</td>{periods.flatMap((p) => { const vals = bva?.[p]; return vals ? vals.map((v, i) => <td className={`bva-value ${i === 2 ? 'variance' : ''} ${!showResults ? 'blurred-value' : ''}`} key={`${name}-${p}-${i}`}>{money(v)}</td>) : [<td className="dash" key={`${name}-${p}-1`}>—</td>, <td className="dash" key={`${name}-${p}-2`}>—</td>, <td className="dash" key={`${name}-${p}-3`}>—</td>] })}</tr>)}</tbody></table></div><div className="preview-footer"><span>Existing behavior preserved for basis/detail rows</span><span><Check size={14} /> fee_type_id = 3 reconciliation</span></div></section>
}
