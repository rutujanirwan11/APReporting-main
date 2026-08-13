import { useMemo, useState } from 'react'
import {
  Bell, Check, ChevronRight, CircleHelp, Download, Eye, EyeOff,
  Filter, HelpCircle, Info, Menu, Printer, Search, SlidersHorizontal, X,
} from 'lucide-react'
import './styles.css'

type Account = {
  name: string
  bankId: string
  bank: string
  type: string
  routing: string
  account: string
  property: string
  status: string
  gl: string
  merchant: string
  subtype: string
  ach: string
  associated: string
  reconciliation: string
  ledger: string
  reconciled: string
}

const accounts: Account[] = [
  { name: '69 Seward LLC', bankId: 'BA-00482', bank: 'Chase Bank', type: 'Single Property', routing: '072000326', account: '9876547365', property: '69 Seward', status: 'Active', gl: '111200 Cash - Operating-Checking', merchant: '—', subtype: 'Checking/Cash', ach: 'No', associated: '69 Seward', reconciliation: 'Post Month', ledger: 'Accrual', reconciled: 'June 30, 2026' },
  { name: 'Arlington Heights II', bankId: 'BA-00918', bank: 'Huntington Bank', type: 'Single Property', routing: '041215032', account: '4567811831', property: 'Arlington Heights II', status: 'Active', gl: '111200 Cash - Operating-Checking', merchant: '—', subtype: 'Checking/Cash', ach: 'No', associated: 'Arlington Heights II', reconciliation: 'Post Month', ledger: 'Accrual', reconciled: 'July 31, 2026' },
  { name: 'Church Court East LP', bankId: 'BA-01142', bank: 'Regions Bank', type: 'Single Property', routing: '062000019', account: '1100452913', property: 'Church Court East Apartments', status: 'Active', gl: '111200 Cash - Operating-Checking', merchant: 'MA - Church Court East', subtype: 'Checking/Cash', ach: 'No', associated: 'Church Court East', reconciliation: 'Post Month', ledger: 'Accrual', reconciled: 'July 31, 2026' },
  { name: 'Peak Campus Corporate', bankId: 'BA-01507', bank: 'Bank of America', type: 'Corporate', routing: '026009593', account: '8000124402', property: 'Peak Campus CORPORATE', status: 'Active', gl: '111100 Cash - Corporate', merchant: '—', subtype: 'Checking/Cash', ach: 'Yes', associated: 'Peak Campus CORPORATE', reconciliation: 'Transaction Date', ledger: 'Cash', reconciled: 'August 12, 2026' },
]

const columns: Array<{ key: keyof Account; label: string; width: string }> = [
  { key: 'name', label: 'ACCOUNT NAME/ID', width: '165px' }, { key: 'bankId', label: 'BANK ID', width: '110px' }, { key: 'bank', label: 'BANK NAME', width: '130px' }, { key: 'type', label: 'ACCOUNT TYPE', width: '140px' }, { key: 'routing', label: 'ROUTING NUMBER', width: '135px' }, { key: 'account', label: 'ACCOUNT NUMBER', width: '145px' }, { key: 'property', label: 'PROPERTY/OWNING ENTITY', width: '175px' }, { key: 'status', label: 'STATUS', width: '88px' }, { key: 'gl', label: 'GL ACCOUNT', width: '175px' }, { key: 'merchant', label: 'MERCHANT ACCOUNT', width: '155px' }, { key: 'subtype', label: 'ACCOUNT SUBTYPE', width: '140px' }, { key: 'ach', label: 'ACH ENABLED', width: '105px' }, { key: 'associated', label: 'ASSOCIATED PROPERTIES', width: '165px' }, { key: 'reconciliation', label: 'BASE BANK RECONCILIATION ON', width: '150px' }, { key: 'ledger', label: 'GL RECONCILIATION LEDGER', width: '145px' }, { key: 'reconciled', label: 'RECONCILED THROUGH', width: '145px' },
]

export default function BankAccountsFullNumber() {
  const [fullNumbers, setFullNumbers] = useState(true)
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [status, setStatus] = useState('All')
  const filtered = useMemo(() => accounts.filter((account) => `${account.name} ${account.bank} ${account.property}`.toLowerCase().includes(search.toLowerCase()) && (status === 'All' || account.status === status)), [search, status])
  const notify = () => { setShowToast(true); window.setTimeout(() => setShowToast(false), 2400) }

  return <div className="bank-app">
    <header className="bank-topbar"><div className="bank-brand">entrata <ChevronRight size={18} /></div><div className="bank-crumb">Accounting <ChevronRight size={14} /> <strong>Bank Accounts</strong></div><div className="bank-top-actions"><button><HelpCircle size={19} /></button><button><Bell size={18} /></button><button className="close-button"><X size={21} /> Close</button></div></header>
    <div className="bank-body">
      <aside className="bank-rail"><button className="selected"><Menu size={21} /></button><button onClick={() => setShowFilters(!showFilters)}><Filter size={20} /></button><button onClick={() => window.print()}><Printer size={20} /></button><button onClick={notify}><Download size={20} /></button><button><CircleHelp size={20} /></button><div className="bank-rail-spacer" /><span className="top-arrow">↑<small>TOP</small></span></aside>
      <main className="bank-main">
        <div className="bank-heading"><div><div className="heading-path">Accounting / Reports</div><h1>Bank Accounts</h1><p>View account configuration, reconciliation settings, and banking details.</p></div><div className="heading-actions"><button className={`number-mode ${fullNumbers ? 'active' : ''}`} onClick={() => setFullNumbers(!fullNumbers)}>{fullNumbers ? <Eye size={15} /> : <EyeOff size={15} />} {fullNumbers ? 'Full account numbers' : 'Masked account numbers'}</button><button className="export-button" onClick={notify}><Download size={15} /> Export</button></div></div>
        <div className="change-banner"><Info size={16} /><div><strong>Account Number display updated</strong><span>Full account numbers are shown in the report when enabled. Exported values follow the selected display mode.</span></div><button onClick={() => setFullNumbers(!fullNumbers)}>{fullNumbers ? 'Mask numbers' : 'Show full numbers'}</button></div>
        <div className="report-toolbar"><div className="toolbar-left"><button className="filter-button" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal size={15} /> Filters {showFilters ? '▲' : '▼'}</button><span className="result-count">{filtered.length} accounts</span></div><div className="toolbar-right"><div className="bank-search"><Search size={15} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search accounts" /></div><button className="toolbar-icon" onClick={notify}><Download size={17} /></button></div></div>
        {showFilters && <div className="filters-panel"><div className="filter-field"><label>Property Groups</label><button>All selected properties <ChevronRight size={14} /></button></div><div className="filter-field"><label>Account Type</label><button>All <ChevronRight size={14} /></button></div><div className="filter-field"><label>Bank Account Status</label><select value={status} onChange={(e) => setStatus(e.target.value)}><option>All</option><option>Active</option><option>Inactive</option></select></div><button className="clear-filters" onClick={() => { setSearch(''); setStatus('All') }}>Clear filters</button></div>}
        <section className="bank-table-card"><div className="table-topline"><div><strong>Bank Accounts 1.4</strong><span>Generated August 12, 2026 · Data as of August 12, 2026</span></div><div className="table-legend"><span className="green-dot" /> Active account</div></div><div className="table-scroll"><table><colgroup>{columns.map((column) => <col key={column.key} style={{ width: column.width }} />)}</colgroup><thead><tr>{columns.map((column, index) => <th key={column.key} className={index === 0 ? 'first-header' : ''}>{column.label}{index === 0 && <span className="sort-arrow">▲</span>}{column.key === 'account' && fullNumbers && <span className="new-badge">NEW</span>}</th>)}</tr></thead><tbody>{filtered.map((account) => <tr key={account.bankId}>{columns.map((column) => { const raw = account[column.key]; const value = column.key === 'account' && !fullNumbers ? `••••${raw.slice(-4)}` : raw; return <td key={column.key} className={`${column.key === 'account' ? 'account-number-cell' : ''} ${column.key === 'status' ? 'status-cell' : ''}`}>{column.key === 'status' && <span className="status-dot" />}{value}</td> })}</tr>)}</tbody></table></div><div className="scroll-hint"><span>←</span> Scroll horizontally to view all report columns <span>→</span></div><div className="table-footer"><span>Bank Accounts 1.4 generated 08/12/2026 09:37 PM MDT and data as of 08/12/2026 09:37 PM MDT</span><span>Showing {filtered.length} of {accounts.length}</span></div></section>
        <div className="requirement-note"><Check size={16} /><span>Requested change: Account Number now displays the complete value instead of only the last four digits.</span></div>
      </main>
    </div>
    {showToast && <div className="bank-toast"><Check size={17} /><div><strong>Download started</strong><span>Your Bank Accounts report will appear in Downloads.</span></div></div>}
  </div>
}
