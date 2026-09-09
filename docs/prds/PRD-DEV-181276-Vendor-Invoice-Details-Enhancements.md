# PRD: Vendor Invoice Details Enhancements

| Field | Value |
| --- | --- |
| **Jira Epic** | [DEV-181276 — Vendor Invoice Details Enhancements](https://entrata.atlassian.net/browse/DEV-181276) |
| **Feature Overview** | Vendor Invoice Details (VID) report enhancements: optional invoice context columns, Reimbursement and VA Synced filtering, and a coordinated filter-layout update. |
| **Epic UX** | **UX Not Needed** — use existing VID patterns and the approved filter-placement reference; story-level design consultation remains optional. |

**Epic Owner:** Rutuja Nirwan (PRD owner; confirm Jira assignee if different)

**Key stakeholders:** AP Product, AP Reporting Engineering, QA, Support, Implementation, Customer Success, and AP/accounting users.

**Funnel entry date:** TBD — not available in the supplied epic material.

**Last updated:** 2026-09-09

### UX Not Needed — how this PRD is used

This epic does not require a dedicated epic-level UX track or a “Ready for UX” gate. Product and Engineering can proceed from the child-task requirements, existing VID patterns, approved filter placement, and the acceptance criteria below. Design may be consulted if a story requires interaction or visual review.

---

## Epic Description — Product Manager

*Note: This is a living document that evolves through feedback and iteration from cross-functional teams. Its purpose is to align project goals, user needs, and delivery decisions during the SDLC.*

### Elevator pitch

Make the Vendor Invoice Details report easier for AP teams to identify, filter, and export special invoice populations—especially Reimbursement and VendorAccess-submitted invoices—while preserving existing defaults, permissions, totals, and report behavior.

The epic includes four client-requested enhancements and a coordinated rearrangement of the existing filter panel:

- optional Resident and Lease ID columns when Resident Refunds is enabled;
- optional VA Synced column and filter/toggle;
- optional Vendor Email column from the vendor’s primary email;
- Reimbursement filter and optional Reimbursement indicator column; and
- approved placement and grouping of existing and new filter controls.

## Business Case Hypothesis — Product Manager

### Business outcome hypothesis

If AP users can target invoice populations with purpose-built filters, see the context needed for follow-up, and use the same criteria in on-screen results and exports, then reconciliation and exception review will require fewer manual workarounds while current VID behavior remains stable by default.

### Leading indicators

| Indicator | Example measure | Time horizon |
| --- | --- | --- |
| Filter adoption | Usage of Reimbursement and VA Synced filters in VID runs | 30–90 days after release |
| Context adoption | Usage of optional Resident, Lease ID, Vendor Email, VA Synced, and Reimbursement columns | 30–90 days after release |
| Export parity | Successful exports with active new filters and selected columns | At release and ongoing |
| Support friction | Fewer questions about identifying reimbursement or VendorAccess invoices | 60–180 days after release |

### In Scope (Minimum Viable Product Features)

| Feature / capability | Requirement |
| --- | --- |
| Resident and Lease ID | Optional columns when Include Resident Refunds is enabled ([DEV-229949](https://entrata.atlassian.net/browse/DEV-229949)). |
| VA Synced | Optional column plus filter/toggle for VendorAccess-submitted invoices ([DEV-135645](https://entrata.atlassian.net/browse/DEV-135645)). |
| Vendor Email | Optional column sourced from the vendor profile’s primary email ([DEV-181267](https://entrata.atlassian.net/browse/DEV-181267)). |
| Reimbursement | Include/Exclude Reimbursement filter and optional indicator column ([DEV-216048](https://entrata.atlassian.net/browse/DEV-216048)). |
| Filter layout | Apply the approved placement and ordering while retaining existing searchable Vendors behavior. |
| Results and exports | New filters and enabled columns apply consistently to on-screen results and exports. |
| Compatibility | New controls are optional; existing defaults, permissions, property scoping, totals, and calculations remain unchanged. |

### Out of Scope

- Invoice creation or reimbursement-flag assignment logic.
- Changes to the VendorAccess submission workflow.
- Automatic invoice tagging or data cleanup.
- Changes to invoice calculations, totals, or unrelated reports.
- A full redesign of the Vendor Invoice Details report.

### Nonfunctional Requirements

| Area | Requirement |
| --- | --- |
| Correctness | Reimbursement and VA Synced values use the authoritative invoice/submission data sources, including documented null handling. |
| Regression safety | Existing VID filters, report generation, Reset, Vendors search, totals, and exports continue to work. |
| Security | Preserve existing user permissions and property-access scoping. |
| Compatibility | New options are off or unchanged by default; Default (All) preserves current behavior. |
| Usability | Labels and option names are consistent across the filter panel, results, and exports. |
| Performance | Large property/vendor selections and combined filters remain within current VID performance expectations. |

### Additional Potential Features

Saved filter presets or additional invoice-classification dimensions may be considered later. They are not part of this epic unless separately approved.

### Reporting Requirements

- Reimbursement options: **Default (All)**, **Include Reimbursement**, and **Exclude Reimbursement**.
- Include Reimbursement returns only invoices whose reimbursement flag is true.
- Exclude Reimbursement returns invoices whose reimbursement flag is false, null, or absent.
- The Reimbursement indicator displays **Yes** for flagged invoices and **No** otherwise.
- VA Synced displays the authoritative VendorAccess synchronization state and supports the specified Yes/No filtering behavior.
- Optional Resident, Lease ID, Vendor Email, VA Synced, and Reimbursement columns appear only when enabled or applicable per child-task requirements.
- Exports contain only filtered rows and enabled optional columns.

### Analysis Summary

The existing VID report mixes invoice populations and requires manual scanning or tagging to identify reimbursement and VendorAccess-related invoices. The child tasks add visibility and filtering using existing invoice and vendor data, while the approved layout makes the controls easier to find. Engineering must confirm the exact reimbursement field, authoritative VA synchronization field, null/pending handling, and export/query implementation before build.

---

## Go to Market Strategy — Product Manager

### External Personas impacted

| Persona | Impact |
| --- | --- |
| AP manager / AP specialist | Identify reimbursement and VendorAccess invoices without manual tagging. |
| Property accountant | Include resident, lease, vendor, and classification context in reconciliation exports. |
| Controller / accounting manager | Review a more targeted and trustworthy invoice population. |

### Internal Personas Impacted

| Persona | Contact | Impact |
| --- | --- | --- |
| AP Product | Epic owner and delivery team | Own prioritization, requirements, and release decisions. |
| AP Reporting Engineering | AP Reporting squad | Confirm data sources, implement filters/columns, and preserve report behavior. |
| QA | Reporting QA partners | Validate filter combinations, regression, permissions, and export parity. |
| Support / Implementation / Customer Success | Enablement and customer-facing teams | Update help content, training, and support guidance. |

### Programs and/or Services Impacted

- Entrata Core → Reports (AP GL & Facilities)
- AP Reporting component
- Vendor Invoice Details report and its screen/export services
- VendorAccess-related invoice reporting

### What is the go to market strategy? (potential impact on sales, implementation, and support)

Release through the existing AP Reporting channel with updated help content, release notes, internal enablement, and peer-test coverage. Position the work as clearer invoice targeting and better export context, not a change to invoice creation or accounting calculations. Support and Implementation should receive guidance on Reimbursement and VA Synced definitions and on the unchanged default behavior.

---

## Success Measures — Product Manager

| Objective | Success | How to Measure | Deadline |
| --- | --- | --- | --- |
| Reimbursement targeting | Users can include or exclude reimbursement invoices reliably. | QA scenarios plus production usage of the Reimbursement filter, if analytics are available. | Before release and 30 days after |
| VendorAccess visibility | Users can identify VA Synced invoices. | QA scenarios and filter/column usage. | Before release and 30 days after |
| Context-rich reporting | Optional columns appear correctly in screen results and exports. | Export comparison and representative data validation. | Before release |
| Report reliability | No regression to defaults, filters, totals, permissions, or exports. | Regression suite and post-release defect monitoring. | Before release and 30 days after |

---

## Customer Feedback — Designer *(UX Not Needed: PM-owned)*

| Customer | Contact Name | Date Contacted |
| --- | --- | --- |
| Client-requested enhancements are represented in the epic and child-task scope. | TBD | TBD |

### MoSCoW

| Must Have | Should Have | Could Have | Won’t Have |
| --- | --- | --- | --- |
| Reimbursement filtering; VA Synced behavior; screen/export parity; preserved defaults and permissions. | Resident, Lease ID, Vendor Email, VA Synced, and Reimbursement optional columns; approved layout. | Saved presets or additional invoice classification dimensions. | Invoice creation changes, reimbursement assignment changes, calculation changes, or unrelated-report changes. |

---

## User Stories — Product Manager

| Story | As a… | I want… | So that… | Jira |
| --- | --- | --- | --- | --- |
| 1 | AP manager | Filter for reimbursement invoices only | I can review reimbursement activity without manual tagging. | [DEV-216048](https://entrata.atlassian.net/browse/DEV-216048) |
| 2 | AP manager | Exclude reimbursement invoices | Standard invoice reporting is not mixed with reimbursement activity. | [DEV-216048](https://entrata.atlassian.net/browse/DEV-216048) |
| 3 | AP manager | Identify VA Synced invoices | I can recognize invoices submitted through VendorAccess. | [DEV-135645](https://entrata.atlassian.net/browse/DEV-135645) |
| 4 | Property accountant | Include Resident and Lease ID context | I can follow up on resident-refund invoices from the report output. | [DEV-229949](https://entrata.atlassian.net/browse/DEV-229949) |
| 5 | AP analyst | Include Vendor Email in the report | I can contact the vendor without opening a second source. | [DEV-181267](https://entrata.atlassian.net/browse/DEV-181267) |
| 6 | VID user | Find filters in a predictable sequence | I can apply criteria efficiently without relearning the panel. | Epic / approved layout reference |

### Review checkpoint

Once the “Business Case”, “Solution Analysis”, “Success Measures”, “Customer Feedback”, and “User Stories” are complete, review with your squad. Because this epic is marked **UX Not Needed**, use the normal refinement/Ready for Dev workflow rather than a separate “Ready for UX” gate.

---

## Forecasted Costs — Product Manager

| Item | Value |
| --- | --- |
| **MVP cost** | TBD — requires Engineering and QA capacity estimation. |
| **Initial estimated implementation cost** | TBD — estimate after confirming data sources, query/API changes, export work, and regression scope. |
| **Refined estimate(s)** | Update after technical discovery and child-task refinement. |

## Forecasted Returns — Product Manager

| Type of return | Notes |
| --- | --- |
| Productivity | Less manual tagging, scanning, and cross-report lookup for invoice review. |
| Accuracy | More reliable reimbursement, VendorAccess, resident-refund, and vendor follow-up reporting. |
| Support efficiency | Fewer questions about how to identify special invoice populations. |
| Customer experience | A more predictable VID filter panel and more useful exports. |

---

## Development Strategy — Product Manager

| Topic | Recommendation |
| --- | --- |
| In-house or outsourced development | In-house AP Reporting squad. |
| Incremental implementation strategy | Confirm data sources and permissions; apply the layout; implement Reimbursement; implement VA Synced; implement Resident/Lease ID and Vendor Email; validate combinations, screen/export parity, regression, and documentation. |
| Sequencing and dependencies | Existing VID query/API and export services; confirmed reimbursement and VendorAccess fields; permission/property-access model; child-task acceptance criteria; approved filter-placement reference. |

### Supporting Team

| Supporting Team | Proposed Deliverable | Estimated Effort | Timeline/Deadline |
| --- | --- | --- | --- |
| AP Reporting Engineering | VID filters, optional columns, layout, and export support | TBD | Child-task schedule |
| QA | Combination, regression, permission, and export-parity coverage | TBD | Before release |
| Product / AP SMEs | Requirements, data definitions, and acceptance sign-off | TBD | During refinement and release |
| Support / Implementation / Customer Success | Help, release notes, and enablement updates | TBD | At GA |

---

## Change Log — Product Manager

| Date | Description | Reason | Cost of Change | Time Required | Trade-offs |
| --- | --- | --- | --- | --- | --- |
| 2026-09-09 | Created PRD for DEV-181276 using the supplied PRD template structure and available epic/child-task material. | Consolidate scope, behavior, dependencies, and delivery expectations in one artifact. | TBD | TBD | Jira remains the source of truth for status and final estimates. |

### Usage Tips

- **Keep it Up-to-Date:** Regularly update the change log as scope, estimates, and decisions change.
- **Be Clear and Concise:** Keep requirements testable and preserve the distinction between current behavior and new optional controls.
- **Review Regularly:** Review the PRD with Product, Engineering, QA, and relevant AP stakeholders as the epic advances.

---

## Roles & Responsibilities (RACI)

| Deliverable | Product Manager | Designer | Engineer |
| --- | --- | --- | --- |
| Epic description | **A/R** | I | C |
| Business case hypothesis | **A/R** | I | C |
| Go-to-market strategy | **A/R** | I | I |
| Success measures | **A/R** | I | C |
| Customer feedback | **A/R** | C* | I |
| User stories | **A/R** | C* | C |
| Forecasted costs / returns | **A/R** | I | C |
| Development strategy | **A/R** | I | **C** |
| Change log | **A/R** | I | I |

*R = Responsible, A = Accountable, C = Consulted, I = Informed. **\***Designer is consulted only when a child story requires design input; otherwise Designer is informed.*

---

## Appendix

### Child Tasks

- [DEV-229949 — Include Resident and Lease ID](https://entrata.atlassian.net/browse/DEV-229949)
- [DEV-135645 — VA Synced Column & Filter](https://entrata.atlassian.net/browse/DEV-135645)
- [DEV-181267 — Vendor Email Column](https://entrata.atlassian.net/browse/DEV-181267)
- [DEV-216048 — Reimbursement Invoices Toggle](https://entrata.atlassian.net/browse/DEV-216048)

### Source Links

- [Jira epic DEV-181276](https://entrata.atlassian.net/browse/DEV-181276)
- [PRD template](https://docs.google.com/document/d/1U5fxrVpIXhJre-Q79jeGFLqOnsuip-hG2SEBVzK_AaU/edit)
- [VID mockup and requirements](https://docs.google.com/spreadsheets/d/1f6UisMqhGeUqcdn7ltDRtgBeVDIjxLHRyoKyzJZj6Mg/edit)
- [Filter placement reference](https://drive.google.com/file/d/12YL9Ay1v4ZASWsS9XkTC9yZh3Z5exWC3/view)

### Technical and Data Validation Checklist

- Confirm reimbursement flag location, type, and null handling.
- Confirm whether VA Synced is invoice-level or submission-level and define pending/null behavior.
- Confirm optional columns are off by default and follow child-task rules.
- Confirm screen results and exports use the same active filters and enabled columns.
- Test combinations with property, period, vendor, status, payment status, On Hold, PO, batch, tags, jobs, Group By, and toggles.
- Test permissions, property scoping, large selections, and current performance baselines.
