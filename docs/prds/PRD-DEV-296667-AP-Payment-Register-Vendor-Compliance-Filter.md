# PRD: AP Payment Register — Vendor Compliance Filter

| Field | Value |
| --- | --- |
| **Jira Epic** | [DEV-296667 — AP Payment Register: Vendor Compliance filter](https://entrata.atlassian.net/browse/DEV-296667) |
| **Requesting product area** | Vendors (Accounting) — on behalf of AP / Compliance use case |
| **Mockup / visual contract** | [angelawirick-gif-workspace PR #65](https://github.com/entrata-product/angelawirick-gif-workspace/pull/65) (merged) — runnable prototype at `prototypes/ap-payment-register-vendor-compliance-filter/` |
| **Engineering spec (handoff)** | `docs/report-spec.md` in the PR package — PHP engineering contract, SQL pseudocode, data-layer touchpoints |
| **Originating client** | Coastal Ridge (`coastalridge.entrata.com`) — Zendesk ticket on file |
| **Production target** | **PHP** — modification of the existing AP Payment Register report |
| **Epic UX (Jira)** | **UX Not Needed** — single additive filter on an existing report; mockup is a visual contract for filter placement and behavior, not a net-new experience. |

**Epic Owner:** Rutuja Nirwan  

**Vendors domain SME:** Angela Wirick (Vendors PM, Accounting) — route vendor-domain and compliance-model questions through Angela.

**Key stakeholders**

| Role / area | Name (from intake) |
| --- | --- |
| Epic assignee / product (Reports) | Rutuja Nirwan |
| Requesting PM (Vendors) | Angela Wirick |
| Vendors engineering | Vinod (Vendors EM — multi-ruleset parity, soft-delete confirmation) |
| AP Reporting engineering | *Confirm squad assignee in Jira* |
| Originating client | Coastal Ridge |

**Funnel entry date:** *Confirm from Jira epic `created`*  

**Last updated:** 2026-06-12 (PRD drafted from Jira epic, mockup PR #65, and requesting-team requirements doc)

### UX Not Needed — how this PRD is used

When the epic is classified **UX Not Needed** in Jira, delivery assumes **no dedicated UX epic owner**, **no “Ready for UX” transition**, and **no UX-led discovery track** for the epic as a whole. The [mockup PR](https://github.com/entrata-product/angelawirick-gif-workspace/pull/65) is a **visual contract** for filter placement and narrowing behavior on the existing AP Payment Register, not a full redesign.

| Expectation | UX Not Needed behavior |
| --- | --- |
| **Who owns experience decisions** | Product Manager + engineering, using **acceptance criteria**, **mockup**, and **existing report filter patterns** (Payment Status is the precedent for status-enum filters). |
| **Designer involvement** | **Optional** if filter-modal layout needs consultation; not a prerequisite to start build. |
| **Review gate (replaces “Ready for UX”)** | When **Business Case**, **Solution Analysis** (report spec + data contract), **Success Measures**, **User Stories**, and **Customer Feedback** (PM-owned) are sufficient, **review with the squad** and advance per Jira workflow (e.g., **Ready for Dev** / refinement complete). |
| **Customer feedback section** | PM-owned synthesis; Vendors PM consulted for compliance-model accuracy. |

---

## Epic Description — Product Manager

*Note: Living document for alignment during the collaboration phase of the SDLC. Jira remains source of truth for status.*

### Elevator pitch

AP and Compliance teams can today answer “which vendors are non-compliant?” (Vendors screen) and “who got paid this period?” (AP Payment Register) **separately**, but not together without spreadsheet work. The highest-priority gap is a **non-compliant vendor who is actively being paid** — money is moving while insurance, W-9, or credit requirements are unmet. This epic adds a **Vendor Compliance** filter (**All / Compliant / Non-compliant**, default **All**) to the existing **AP Payment Register**, placed in the **Vendors column** of the FILTERS tab. Default **All** keeps output **identical to today**; **Non-compliant** isolates payments to vendors who are currently non-compliant at any property the payment touched. **Additive and non-breaking** — no new columns, totals, grouping, or changes to any other filter.

*Sources: Jira [DEV-296667](https://entrata.atlassian.net/browse/DEV-296667), mockup [PR #65](https://github.com/entrata-product/angelawirick-gif-workspace/pull/65), requesting-team requirements.*

### Problem statement (current state)

| Area | Today |
| --- | --- |
| **Vendors screen** | Users can filter to non-compliant vendors. |
| **AP Payment Register** | Users can list payments by period, vendor, payment status, etc. |
| **Together** | No native way to answer “which non-compliant vendors did we pay this period?” without exporting and reconciling in a spreadsheet. |
| **Policy context** | PMCs may configure rulesets to **allow payments to non-compliant vendors** (`Allow Payment Creation even if compliance status is Non-compliant`). When enabled, paid + non-compliant is an **expected operational state** that still creates follow-up work the client wants visibility into. |

### Primary interface reference — AP Payment Register FILTERS tab

Per mockup and requesting-team PRD:

| Element | Expected change |
| --- | --- |
| **Vendor Compliance filter (NEW)** | Single-select: **All** (default) / **Compliant** / **Non-compliant**. |
| **Placement** | **Vendors column**, immediately below **Vendors** multi-select and **Include Resident Refunds** toggle. |
| **Report output** | **No new columns.** Filter narrows rows only; existing columns, totals, and Group By behavior unchanged. |
| **Default behavior** | **All** selected → output identical to pre-change report with same other filters. |
| **Exports** | CSV / Excel / PDF (as applicable) reflect the filtered row set; no new export columns. |

**Report catalog context**

| Report | Key | Notes |
| --- | --- | --- |
| AP Payment Register | `ap_payment_register` | Sole in-scope report; PHP production target |

### Domain primer — Vendor Compliance (Reports team)

**Compliance is per-property, not per-vendor.** A vendor has one **compliance job** per `(vendor, property, ruleset)` combination in `compliance_jobs`. A single vendor may be Compliant at Property A and Non-compliant at Property B.

**Binary collapse for this filter** (intermediate states map to Compliant or Non-compliant):

| Underlying state | Treat as |
| --- | --- |
| Compliant | **Compliant** |
| Exempt (active — `exempt_until_date` on or after run date) | **Compliant** |
| No applicable ruleset at `(vendor, property)` | **Compliant** |
| Non-compliant, Required/Incomplete, Pending review, Rejected | **Non-compliant** |
| Exempt expired (`exempt_until_date` in the past) | **Non-compliant** |

**Per-payment evaluation**

- One AP Payment Register row = **one payment** (single- or multi-property).
- Evaluate vendor compliance at **every property the payment touched**, **as of report run time** (not payment date).
- Row is **Non-compliant** if non-compliant at **any** touched property (or under **any** overlapping ruleset at a property, per multi-ruleset rules below).
- Row is **Compliant** only if Compliant at **every** touched property.

**Multi-ruleset collapse (confirmed — Vendors PM, 2026-06-11)**

- If a **third-party** ruleset governs the vendor at a property (`is_third_party = true`, e.g. NetVendor), the third-party ruleset is **authoritative**; Entrata-managed rulesets **do not apply** there.
- If only **Entrata-managed** rulesets apply, the vendor is Compliant at that property **only if compliant under every** applicable Entrata-managed ruleset.

**Status Allowance is irrelevant to the filter.** `allow_not_compliant_payments` governed whether the payment was *permitted*; it does not change whether the vendor is currently non-compliant for filtering.

**Data source:** `compliance_jobs` directly — **not** the NetVendor-gated UI rollup in `CApPayeeComplianceSummaryController::getVendorComplianceStatus`.

**Soft-deleted vendors (confirmed — Vendors PM):** Payments to soft-deleted vendors remain in the result set and classify **Compliant** (no active ruleset to evaluate — same path as “no applicable ruleset”).

---

## Business Case Hypothesis — Product Manager

### Business outcome hypothesis

If we add a **Vendor Compliance** filter to the AP Payment Register, then AP leads, Compliance Coordinators, and Internal Audit can **identify paid non-compliant vendors in one report run**, **prioritize compliance outreach** on vendors where money is actively moving, and **reduce manual spreadsheet reconciliation** — without changing the report AP staff already trust or introducing new columns or workflows.

### Leading indicators (refine with analytics / support)

| Indicator | Example measure | Time horizon |
| --- | --- | --- |
| Workflow efficiency | Reduction in “export Vendors + export Payment Register + VLOOKUP” support patterns | 60–90 days post-GA |
| Filter adoption | Non-default Vendor Compliance selections on AP Payment Register runs | 30–90 days post-GA |
| Customer validation | Coastal Ridge (originating client) confirms the filter answers their ask | Pre-GA / UAT |
| Delivery health | Filter ships with zero P1 regressions on existing AP Payment Register behavior | Per release |

### In scope (MVP)

| Capability | Notes |
| --- | --- |
| **Vendor Compliance filter** | Single-select **All / Compliant / Non-compliant**; default **All**; Vendors column placement. |
| **Query wiring (PHP)** | Additive predicate on existing AP Payment Register query; `all` = no predicate. |
| **Compliance evaluation** | Per-property, as-of run time; exemptions; multi-property collapse; NetVendor/Entrata parity via `compliance_jobs`. |
| **Non-breaking default** | Existing users and saved configs unchanged when filter not used. |
| **Visual contract** | Mockup in [PR #65](https://github.com/entrata-product/angelawirick-gif-workspace/pull/65) for filter placement and narrowing demo. |

### Out of scope

| Item | Rationale |
| --- | --- |
| **New report columns** | Filter alone delivers the outcome; user runs report with filter applied. |
| **Risk scoring, alerting, notifications** | Report is a list; human takes action. |
| **Changes to compliance model, status enum, ruleset config UI, Compliance Summary screen** | Vendors team ownership; not this epic. |
| **Changes to any other existing filter, column, total, or grouping** | Explicit scope guardrail. |
| **Separate combined “Vendor Compliance + Payments” report** | Filter on existing report is preferred (lower maintenance, existing workflow). |
| **Compliance-specific empty/error messaging** | Generic “no data” state inherited from framework; matches other filters. |
| **New permissions or feature flags** | Assume unchanged unless Reports eng confirms a gate is needed. |

### Nonfunctional requirements

| Area | Requirement |
| --- | --- |
| **Performance** | Compliance EXISTS/NOT EXISTS sub-selects must not materially degrade report run time at large Period + Property Group scopes; confirm indexing on `compliance_jobs (cid, ap_payee_id, property_id)`. |
| **Correctness** | Binary derivation, multi-property collapse, exemption handling, and Status Allowance independence per acceptance criteria and test cases. |
| **Security / entitlements** | Preserve existing report permissions and property scoping. |
| **Compatibility** | Default **All** = byte-for-byte equivalent output to pre-change runs; saved configs non-breaking. |
| **Usability** | Filter discoverable in Vendors column alongside vendor-scoped filters. |
| **Reliability** | No increase in reporting error rates post-release. |

### Additional potential features (post-MVP)

- Vendor Compliance filter on other payment- or vendor-scoped AP reports (if demand emerges).  
- Optional compliance status column on AP Payment Register (explicitly **not** in MVP — filter-only).  

### Reporting requirements

- Update help / release notes for AP Payment Register — new Vendor Compliance filter.  
- CS training note: how to use **Non-compliant** for paid-vendor compliance review.  
- Coordinate messaging with **Vendors** team (Angela Wirick) for compliance terminology consistency.  

### Analysis summary

Coastal Ridge requested the capability via Zendesk; Vendors PM (Angela Wirick) routed a lean handoff to Reports: **mockup + data requirements**. Entrata’s compliance model already permits paid + non-compliant when configured; clients need **operational visibility**, not a policy change. Adding a filter to the AP Payment Register lands the capability in the report AP staff already use, avoids duplicating joins/totals in a new report, and stays non-breaking via default **All**. Engineering adds an additive PHP filter predicate against `compliance_jobs` at report run time.

---

## Go to Market Strategy — Product Manager

### External personas — impact

| Persona | Impact |
| --- | --- |
| **Property Accountant / AP Lead** | One-report answer to “which non-compliant vendors did we pay this period?” for site-team handoff. |
| **Compliance Coordinator** | Prioritized outreach list from the same report. |
| **Internal Audit** | Visibility into payments to non-compliant vendors regardless of ruleset Status Allowance settings. |

**Level of customer impact:** Low–medium (additive filter; default unchanged)

### Internal personas — impact

| Persona | Impact |
| --- | --- |
| **Support (#ask-reporting-ap)** | New filter to document; deflect spreadsheet-workaround questions. |
| **Vendors team** | Domain SME for compliance logic; no UI changes on their side. |
| **AP Reporting engineering** | PHP filter config + query predicate on existing report class. |

### Programs / services impacted

- **Component:** AP Reporting  
- **Product catalog:** Entrata Core > Reports (AP GL & Facilities)  
- **Report:** AP Payment Register (`ap_payment_register`)  
- **Cross-team dependency:** Vendors (compliance data model, `compliance_jobs`)  

### GTM narrative

- **Positioning:** Operational efficiency — join compliance status with payments in the report AP teams already run.  
- **Sales / solutions:** No SKU change; optional mention for clients with strict vendor compliance programs.  
- **Implementation:** Standard release; highlight default **All** = no behavior change.  
- **Support:** Proactive note: filter uses **current** compliance status at run time, not historical status at payment date.  

---

## Success Measures — Product Manager

| Objective | Success | How to measure | Deadline |
| --- | --- | --- | --- |
| Filter shipped on AP Payment Register | Vendor Compliance filter live with correct options, default, and placement | QA per test-cases.md; mockup parity check | *Align to Jira target release* |
| Non-breaking default | **All** produces identical output to pre-change baseline | Regression comparison on fixed filter sets | GA |
| Compliance logic correct | Multi-property, exemption, NetVendor, Status Allowance scenarios pass | Executable test cases (12 scenarios in handoff package) | GA |
| Zero regressions | No P1/P2 defects on existing AP Payment Register filters/totals/grouping | QA + monitoring | 30 days post-GA |
| Originating client satisfaction | Coastal Ridge validates core ask | PM / Vendors PM sign-off | Pre-GA or early post-GA |

---

## Customer Feedback — Product Manager *(UX Not Needed: PM-owned)*

| Customer | Contact | Date contacted |
| --- | --- | --- |
| **Coastal Ridge** | Via Zendesk (originating ticket) | 2026 (pre-epic) |

**Synthesized feedback**

- Cannot efficiently identify **non-compliant vendors who are actively being paid** — requires manual reconciliation between Vendors screen and AP Payment Register.  
- Paid + non-compliant is a **highest-priority compliance gap** when PMC policy allows those payments.  
- Preferred path: **filter on existing AP Payment Register**, not a separate new report.  

### MoSCoW

| Must have | Should have | Could have | Won’t have |
| --- | --- | --- | --- |
| Vendor Compliance filter (All / Compliant / Non-compliant) | Performance validation at large scopes | Filter on other AP reports | New output columns |
| Default **All** = unchanged output | CS / help doc update | | Risk scoring / alerts |
| Per-property, run-time compliance evaluation | Coastal Ridge UAT | | Compliance model changes |
| `compliance_jobs` as source of truth | | | Separate combined report |
| Multi-property + exemption logic | | | Compliance-specific empty messages |

---

## User Stories — Product Manager

*Canonical acceptance criteria live in Jira and `docs/test-cases.md` in the mockup package.*

| # | As a… | I want… | So that… |
| --- | --- | --- | --- |
| 1 | Property Accountant / AP Lead | a **Vendor Compliance** filter on the AP Payment Register | I can produce the list of non-compliant vendors paid this period and hand it to site teams |
| 2 | Compliance Coordinator | compliance evaluated **per property, as of today** | the list reflects who actually needs outreach right now |
| 3 | Compliance Coordinator | **active exemptions** and **no applicable ruleset** to count as Compliant | the Non-compliant list contains only true, actionable gaps |
| 4 | Internal Auditor | payments to non-compliant vendors to surface **even when the ruleset permitted the payment** | I can verify the override policy is applied consistently |
| 5 | Existing AP Payment Register user | the report to behave **exactly as today** unless I use the new filter | my existing process and saved views are unaffected |

### Acceptance criteria (summary)

1. FILTERS tab includes **Vendor Compliance** with **All** / **Compliant** / **Non-compliant**; **All** default; Vendors column placement below Vendors + Include Resident Refunds.  
2. **All** → output identical to pre-change run (no rows added/removed/reordered; columns, totals, grouping unchanged).  
3. **Non-compliant** → rows where vendor is non-compliant at **any** touched property, per binary derivation and collapse rules, **as of run time**.  
4. **Compliant** → rows where vendor is Compliant at **every** touched property (no-ruleset and active exemption count as Compliant).  
5. **All** = union of Compliant + Non-compliant row sets.  
6. Active exemptions classify Compliant; expired exemptions do not.  
7. Third-party ruleset supersedes Entrata-managed at a property; multiple Entrata-managed rulesets must all pass.  
8. Soft-deleted vendor payments included and classified **Compliant**; never under **Non-compliant**.  
9. Status Allowance settings do not affect filter results.  
10. NetVendor-managed and Entrata-managed rulesets classified identically via `compliance_jobs`.  
11. Users who do not touch the filter see no change.  

**Review checkpoint (UX Not Needed):** When Business Case, report spec (solution analysis), Success Measures, and User Stories are squad-ready, proceed to sizing/build — **not** “Ready for UX.”

---

## FAQ

| Question | Answer |
| --- | --- |
| Does this add a compliance column to the report? | **No.** Filter only; output columns unchanged. |
| Is compliance evaluated as of payment date or today? | **Report run time** — operational “who needs follow-up today.” |
| If our ruleset allows payments to non-compliant vendors, do those payments show under Non-compliant? | **Yes.** Status Allowance governed creation; filter reports current compliance status. |
| Does default **All** change my existing saved reports? | **No.** Output is identical to today unless the user selects Compliant or Non-compliant. |
| Where does compliance data come from? | **`compliance_jobs`** (+ exemptions), not the NetVendor-gated UI rollup. |

---

## Forecasted Costs — Product Manager

| Item | Value |
| --- | --- |
| **MVP cost** | *TBD — small modification to existing PHP report (one filter + query predicate)* |
| **Initial estimate** | *Engineering T-shirt after squad review of report-spec §7* |
| **Refined estimate** | *Update if performance work on `compliance_jobs` joins is required* |

---

## Forecasted Returns — Product Manager

| Type of return | Notes |
| --- | --- |
| **Operational efficiency** | Eliminates spreadsheet reconciliation for paid + non-compliant vendor review. |
| **Compliance program support** | Surfaces expected paid + non-compliant states PMCs configured to allow. |
| **Support deflection** | Clear native answer to a cross-screen question. |

---

## Development Strategy — Product Manager

| Topic | Recommendation |
| --- | --- |
| **Team** | In-house **AP Reporting** squad (PHP) |
| **Production target** | **PHP** — existing AP Payment Register report class + filter config |
| **Sequencing** | (1) Confirm PHP filter constant + report class name → (2) Implement predicate against `compliance_jobs` → (3) QA per test cases → (4) Docs + GA |
| **Dependencies** | Vendors team (Angela Wirick) for compliance logic sign-off; `compliance_jobs` data availability |
| **Feature flag** | **None** assumed |
| **React filter-modal port** | Known future work; when it lands, this filter model carries over unchanged — out of scope for initial PHP delivery |

### Engineering contract (summary — full detail in mockup `docs/report-spec.md`)

**Filter wiring**

- New filter: `vendor_compliance` — single-select `all` (default) / `compliant` / `non_compliant`.  
- Pattern: matches existing status-enum filters (e.g. Payment Status).  
- `[NEEDS: exact CFormFilter::* constant + template — Reports eng]`

**Query**

- `all` → no predicate added.  
- `non_compliant` → EXISTS: vendor non-compliant at any property payment touched.  
- `compliant` → NOT EXISTS: non-compliant at any touched property.  
- Join `compliance_jobs` on `cid`, `ap_payee_id`, `property_id`; evaluate exemptions via `compliance_exemptions.exempt_until_date`.  

**Open questions for engineering**

1. Exact `CFormFilter::*` constant + template for the new select.  
2. Exact AP Payment Register PHP report class name and query entry point.  
3. How `payment → properties touched` is resolved for consolidated/cross-property payments.  
4. Performance / indexing on `compliance_jobs (cid, ap_payee_id, property_id)`.  

### Supporting team

| Supporting team | Deliverable | Effort | Timeline |
| --- | --- | --- | --- |
| AP Reporting engineering | Filter + query predicate | *TBD* | *Per Jira release* |
| QA | 12-scenario test suite + regression on existing report | *TBD* | Pre-GA |
| Tech writing | AP Payment Register help + release note | *TBD* | GA |
| Vendors PM | Compliance logic confirmation | Consult | Pre-build sign-off |

### Suggested test cases (from handoff package)

| ID | Scenario | Expected |
| --- | --- | --- |
| TC-01 | Open FILTERS → Vendors column | Vendor Compliance present; All / Compliant / Non-compliant; **All** default |
| TC-02 | Vendor Compliance = **All** | Output identical to pre-change baseline |
| TC-03 | Vendor Compliance = **Non-compliant** | Only payments to vendors non-compliant at any touched property |
| TC-04 | Vendor Compliance = **Compliant** | Only payments where vendor compliant at every touched property |
| TC-05 | Consolidated multi-property payment | Non-compliant at one property → appears under Non-compliant, not Compliant |
| TC-06 | Vendor cured vs lapsed since payment | Evaluated at **run time**, not payment date |
| TC-07 | Active vs expired exemption | Active → Compliant; expired → underlying status |
| TC-08 | No applicable ruleset at property | Classifies Compliant |
| TC-09 | `allow_not_compliant_payments = Yes` | Payment still under **Non-compliant** |
| TC-10 | NetVendor vs Entrata-managed | Same classification via `compliance_jobs` |
| TC-11 | **All** vs Compliant + Non-compliant union | Row sets match |
| TC-12 | Soft-deleted vendor payment | Still appears; classified Compliant |

---

## Change Log — Product Manager

| Date | Description | Reason |
| --- | --- | --- |
| 2026-06-12 | PRD created from Jira DEV-296667, mockup PR #65, and requesting-team requirements | Centralize product narrative for AP Reporting squad refinement |

---

## Roles & responsibilities (RACI)

| Deliverable | Product Manager (Reports) | Vendors PM | Designer | Engineer |
| --- | --- | --- | --- | --- |
| Epic description | **A/R** | C | I | C |
| Business case | **A/R** | C | I | C |
| GTM | **A/R** | I | I | I |
| Success measures | **A/R** | I | I | C |
| Customer feedback | **A/R** | C | I | I |
| User stories | **A/R** | C | C* | C |
| Compliance logic accuracy | C | **A/R** | I | C |
| Costs / returns | **A/R** | I | I | C |
| Development strategy | **A/R** | I | I | **C** |
| Change log | **A/R** | I | I | I |

*\*Designer consulted only if filter-modal layout ambiguity beyond mockup.*

---

## Appendix

- **Jira:** [DEV-296667](https://entrata.atlassian.net/browse/DEV-296667)  
- **Mockup (merged):** [entrata-product/angelawirick-gif-workspace PR #65](https://github.com/entrata-product/angelawirick-gif-workspace/pull/65)  
- **Handoff artifacts in PR package:** `REVIEW-ME.md`, `docs/report-spec.md`, `docs/test-cases.md`, `docs/user-stories.md`, `jira-context/DEV-296667-ticket.md`  
- **Alternative considered:** Separate combined Vendor Compliance + Payments report — **not recommended**; filter on AP Payment Register preferred (§9 of requesting-team doc).  
- **Resolved (Vendors PM, 2026-06-11):** Multi-ruleset collapse (third-party supersedes Entrata-managed; all Entrata-managed must pass). Soft-deleted vendors classify Compliant.  
- **PRD template reference:** [Google Doc](https://docs.google.com/document/d/1U5fxrVpIXhJre-Q79jeGFLqOnsuip-hG2SEBVzK_AaU/edit) — structure aligned with org template and sibling PRDs in `docs/prds/`.
