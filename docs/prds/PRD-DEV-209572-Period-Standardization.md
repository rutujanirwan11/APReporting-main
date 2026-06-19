# PRD: Period Standardization

| Field | Value |
| --- | --- |
| **Jira Epic** | [DEV-209572 — Period Standardization](https://entrata.atlassian.net/browse/DEV-209572) |
| **Parent Epic** | [DEV-182803](https://entrata.atlassian.net/browse/DEV-182803) *(Done, P2)* |
| **Component** | AP Reporting |
| **Product** | Entrata Core > Reports (AP GL & Facilities) |
| **Priority** | P2 |
| **Epic UX (Jira)** | **UX Not Needed** — additive period-filter options on existing reports using established filter patterns; no net-new report experience. |
| **PRD (Jira field)** | *Add URL after this document is published* |
| **UX Mockup & Prototype** | *Not required — UX Not Needed* |

**Epic Owner:** Rutuja Nirwan  

**Key stakeholders**

| Role / area | Name (from Jira) |
| --- | --- |
| Epic assignee / product (Reports) | Rutuja Nirwan |
| AP Reporting engineering | *Confirm squad assignee / EM in Jira* |
| Report analysts (domain) | Kolby Henry, Jessica Miller |
| Child-story owners | Jessica Miller ([DEV-86731](https://entrata.atlassian.net/browse/DEV-86731)), Rutuja Nirwan ([DEV-280618](https://entrata.atlassian.net/browse/DEV-280618)) |

**Funnel entry date:** *Confirm from Jira epic `created`*  

**Last updated:** 2026-06-19 (PRD drafted from Jira epic [DEV-209572](https://entrata.atlassian.net/browse/DEV-209572))

### UX Not Needed — how this PRD is used

When the epic is classified **UX Not Needed** in Jira, delivery assumes **no dedicated UX epic owner**, **no “Ready for UX” transition**, and **no UX-led discovery track** for the epic as a whole.

| Expectation | UX Not Needed behavior |
| --- | --- |
| **Who owns experience decisions** | Product Manager + engineering, using **acceptance criteria**, **period-inventory research**, and **existing report period-filter patterns**. |
| **Designer involvement** | **Optional** if a filter-modal layout question arises; not a prerequisite to start build. |
| **Review gate (replaces “Ready for UX”)** | When **Business Case**, **Solution Analysis** (standard period matrix + per-report gaps), **Success Measures**, **User Stories**, and **Customer Feedback** (PM-owned) are sufficient, **review with the squad** and advance per Jira workflow (e.g., **Ready for Dev** / refinement complete). |
| **Customer feedback section** | PM-owned synthesis from client packet-setup feedback and support patterns. |

---

## Epic Description — Product Manager

*Note: Living document for alignment during the collaboration phase of the SDLC. Jira remains source of truth for status.*

### Elevator pitch

Clients building **report packets** hit a friction point when included reports expose **different period options**. Once a packet mixes incompatible period filters, **download configuration and period selection become restricted** — a poor setup experience that undermines a core reporting workflow. This epic **defines a standard set of period options** for report groups (starting with **Key Financial Reports**) and **closes gaps** so reports in the same group support the same period choices in most cases. Work is **additive**: new period options on existing reports, aligned to a shared standard — not a redesign of packet UI or report output.

*Source: Jira [DEV-209572](https://entrata.atlassian.net/browse/DEV-209572) description and child work.*

### Problem statement (current state)

| Area | Today |
| --- | --- |
| **Report packets** | Users combine multiple reports into a packet for scheduled or on-demand download. |
| **Period filters** | Each report defines its own supported period options; there is **no cross-report standard**. |
| **Packet configuration** | When reports in a packet disagree on period options, **period selection and download setup are constrained** — users cannot configure the packet as expected. |
| **Client feedback** | Multiple clients reported that packet setup feels **inconsistent** because period choices differ by report. |

### Proposed standard period options (working list)

The epic explores and aims to standardize on the following **post-month / fiscal / calendar** options for applicable report groups:

| Category | Options |
| --- | --- |
| **Post month** | Current Post Month, Prior Post Month, Next Post Month, Custom Post Month |
| **Fiscal quarter** | Current Fiscal Quarter, Prior Fiscal Quarter, Next Fiscal Quarter |
| **Fiscal year** | Current Fiscal Year, Prior Fiscal Year |
| **Calendar** | Calendar Month *(confirm inclusion in final standard)* |

**Scope principle:** Reports grouped together (e.g., **Key Financial Reports**) should expose the **same supported period options** unless a report has a documented exception (data model, regulatory, or performance constraint).

### Initial research — Key Financial Reports (5-report sample)

Epic description called out an initial inventory across high-usage financial reports:

| Report | Notes from epic research |
| --- | --- |
| Balance Sheet | **Gap:** only report in the sample **missing Current Fiscal Quarter** |
| Cash Flow Statement | In sample set |
| Income Statement | In sample set |
| Trial Balance | In sample set |
| GL Details | In sample set; related idea [DEV-276336](https://entrata.atlassian.net/browse/DEV-276336) *(Closed)* |

**Packet-impact example:** A Key Financial Reports packet that includes Balance Sheet cannot offer **Current Fiscal Quarter** at the packet level if Balance Sheet does not support it — driving the standardization goal.

### Child work (Jira snapshot — ~75% Done)

| Key | Type | Summary | Priority | Assignee | Status |
| --- | --- | --- | --- | --- | --- |
| [DEV-86731](https://entrata.atlassian.net/browse/DEV-86731) | Story | AP Payment Register — Add **Prior Week** | P2 | Jessica Miller | New |
| [DEV-270378](https://entrata.atlassian.net/browse/DEV-270378) | Idea | Work Order Details Report — period option | P2 | Kolby Henry | Closed |
| [DEV-276336](https://entrata.atlassian.net/browse/DEV-276336) | Idea | Period filter on GL Details | P2 | Kolby Henry | Closed |
| [DEV-280618](https://entrata.atlassian.net/browse/DEV-280618) | Story | Inter-Company Transaction — Additional Period Options | P3 | Rutuja Nirwan | Closed |

*Child work spans **Key Financial Reports** and broader AP Reporting reports (AP Payment Register, Inter-Company Transaction, Work Order Details, GL Details). Final standard matrix should document which **report group** each change belongs to.*

---

## Business Case Hypothesis — Product Manager

### Business outcome hypothesis

If we **define and implement a standard period-option set** for report groups (starting with Key Financial Reports), then clients can **configure report packets without period mismatches**, **reduce restricted download/period-selection states**, and **spend less time working around inconsistent filter menus** — improving trust in packet-based reporting without changing underlying report data logic.

### Leading indicators (refine with analytics / support)

| Indicator | Example measure | Time horizon |
| --- | --- | --- |
| Packet setup success | Reduction in support contacts citing “can’t select period” / packet configuration restrictions | 60–90 days post-GA |
| Standard adoption | Reports in target groups expose the agreed standard option set | Per release milestone |
| Gap closure | Balance Sheet (and other identified gaps) support **Current Fiscal Quarter** where in standard | First KFR milestone |
| Delivery health | Child stories closed with zero P1 regressions on existing period behavior | Per release |

### In scope (MVP and near-MVP)

| Capability | Notes |
| --- | --- |
| **Standard period matrix** | Documented list of period options per **report group** (KFR first); exceptions documented with rationale. |
| **Gap remediation** | Add missing standard options to reports in scope — e.g., **Current Fiscal Quarter on Balance Sheet** (confirmed research gap). |
| **Child-story delivery** | Implement approved period additions per linked Jira work ([DEV-86731](https://entrata.atlassian.net/browse/DEV-86731), [DEV-280618](https://entrata.atlassian.net/browse/DEV-280618), ideas closed as input). |
| **Additive behavior** | New period options; existing options and default behaviors preserved unless explicitly changed. |

### Out of scope

| Item | Rationale |
| --- | --- |
| **Packet UI redesign** | Epic addresses **report-level period support**, not packet builder UX overhaul. |
| **Forcing one period type globally** | Some reports legitimately need week-based or custom periods (e.g., **Prior Week** on AP Payment Register); standard is **per group**, not one-size-fits-all. |
| **Changing report output columns or calculations** | Period filter additions only; no change to how amounts are computed unless required for a new period type. |
| **Non-AP Reporting components** | Component is **AP Reporting**; other suites follow separately if needed. |
| **Removing legacy period options** | Deprecation of existing options is a separate decision; MVP is **additive alignment**. |

### Nonfunctional requirements

| Area | Requirement |
| --- | --- |
| **Correctness** | Each new period option returns data consistent with the report’s existing period semantics (post month vs. fiscal vs. calendar). |
| **Performance** | New period branches must not materially degrade report run time vs. existing period options. |
| **Compatibility** | Saved report configs and scheduled runs continue to work; new options are opt-in. |
| **Security / entitlements** | Preserve existing report permissions and property scoping. |
| **Maintainability** | Standard matrix published so future reports inherit the group standard at build time. |
| **Documentation** | Help / release notes updated for new period options on affected reports. |

### Additional potential features (post-MVP)

- Extend standard matrix beyond **Key Financial Reports** to other AP GL & Facilities report families.  
- Packet-level validation messaging when a user adds a report whose period set doesn’t match the packet *(product decision — may belong to packet UX, not this epic)*.  
- Engineering helper / shared period-filter component to reduce per-report duplication.  

### Reporting requirements

- Publish **Period Standard Matrix** (report group → supported options) for CS, implementation, and engineering.  
- Per-report release notes when new period options ship.  
- CS training note: which reports now share period options and how packet setup benefits.  

### Analysis summary

Client feedback highlighted **packet setup friction** when reports expose mismatched period menus. Initial research on five Key Financial Reports found **Balance Sheet** as the outlier missing **Current Fiscal Quarter** — a concrete gap that blocks consistent packet period selection. Child work under the epic adds period options on **AP Payment Register**, **Inter-Company Transaction**, **GL Details**, and **Work Order Details**, while the epic’s product goal is to **codify the standard** so future work aligns to groups rather than one-off additions. Parent epic [DEV-182803](https://entrata.atlassian.net/browse/DEV-182803) provides portfolio context.

---

## Go to Market Strategy — Product Manager

### External personas — impact

| Persona | Impact |
| --- | --- |
| **Property accountant / controller** | Fewer surprises when building multi-report packets for month-end and board packages. |
| **Reporting power user** | Can select a common period (e.g., Current Fiscal Quarter) across KFR reports in one packet. |
| **Implementation / client admin** | Clearer standard for which period options exist on which report groups. |

**Level of customer impact:** Low–medium (additive filters; existing workflows unchanged unless user selects new options)

### Internal personas — impact

| Persona | Impact |
| --- | --- |
| **Support (#ask-reporting-ap)** | Fewer “packet won’t let me pick a period” contacts; matrix to reference. |
| **AP Reporting engineering** | Per-report period additions; opportunity to consolidate shared period logic over time. |
| **Report analysts (Kolby Henry, Jessica Miller)** | Domain input on which options belong on which reports. |

### Programs / services impacted

- **Component:** AP Reporting  
- **Product catalog:** Entrata Core > Reports (AP GL & Facilities)  
- **Report groups (initial):** Key Financial Reports — Balance Sheet, Cash Flow Statement, Income Statement, Trial Balance, GL Details  
- **Additional reports via child work:** AP Payment Register, Inter-Company Transaction, Work Order Details  

### GTM narrative

- **Positioning:** Consistency and predictability for packet-based reporting — same period choices where it matters.  
- **Sales / solutions:** No SKU change; quality-of-life improvement for clients using report packets heavily.  
- **Implementation:** Standard period matrix in help materials; highlight Balance Sheet **Current Fiscal Quarter** when shipped.  
- **Support:** Deflection article — “Why packet period selection is limited” → link to standard matrix.  

---

## Success Measures — Product Manager

| Objective | Success | How to measure | Deadline |
| --- | --- | --- | --- |
| Standard defined | Published period-option matrix for KFR (and documented exceptions) | PM + engineering sign-off; Confluence or repo artifact | *Align to epic milestone* |
| KFR gap closed | Balance Sheet supports **Current Fiscal Quarter** | QA + client spot-check | *Per child release* |
| Child work complete | Linked stories/ideas delivered or explicitly deferred with rationale | Jira rollup (~75% → 100%) | *Squad-defined* |
| No regressions | Existing period options behave as before | Regression on each touched report | 30 days post-GA per release |
| Client validation | Originating packet-setup feedback resolved for KFR use case | PM / CS confirmation | Post first KFR milestone |

---

## Customer Feedback — Product Manager *(UX Not Needed: PM-owned)*

| Customer | Contact | Date contacted |
| --- | --- | --- |
| *Multiple clients (unnamed in epic)* | Via product feedback / support patterns | Pre-epic |

**Synthesized feedback**

- Setting up **report packets** is **not consistent** because included reports offer **different period options**.  
- Once mismatched reports are in a packet, **download configuration and period selection become restricted** — blocking expected workflow.  
- Desired outcome: **standard period options** across reports in a group (e.g., Key Financial Reports should “all have the same supported options in most cases”).  

### MoSCoW

| Must have | Should have | Could have | Won’t have |
| --- | --- | --- | --- |
| Documented standard period list for KFR | Period matrix published for CS / eng | Packet UI warning when periods don’t align | Global single period type for all reports |
| Close confirmed KFR gap (Balance Sheet → Current Fiscal Quarter) | Extend standard to additional report groups | Shared engineering period-filter component | Remove existing period options |
| Deliver in-scope child stories ([DEV-86731](https://entrata.atlassian.net/browse/DEV-86731), etc.) | AP Payment Register **Prior Week** where approved | Calendar Month in standard (pending confirmation) | Packet builder redesign |
| Additive, non-breaking changes | Release notes per report | | Changing calculation logic unrelated to new periods |

---

## User Stories — Product Manager

*Canonical detail lives in Jira child issues.*

| # | As a… | I want… | So that… | Jira |
| --- | --- | --- | --- | --- |
| 1 | Controller building a KFR packet | **the same fiscal quarter period options** on Balance Sheet as on Income Statement, Cash Flow, Trial Balance, and GL Details | I can set **Current Fiscal Quarter** once for the whole packet | Epic + KFR research |
| 2 | AP analyst | **Prior Week** on AP Payment Register | I can run weekly payment review in the same period vocabulary as other operational reports | [DEV-86731](https://entrata.atlassian.net/browse/DEV-86731) |
| 3 | Accountant | **additional period options** on Inter-Company Transaction | I can pull the report for the fiscal/post-month windows I use elsewhere | [DEV-280618](https://entrata.atlassian.net/browse/DEV-280618) |
| 4 | Reporting power user | a **published standard** of which period options each report group supports | I know what to expect before I build a packet | Epic deliverable |
| 5 | Existing report user | reports to behave **as today** unless I choose a **new** period option | my saved configs and schedules are unaffected | All child stories |

### Acceptance criteria (summary)

1. **Standard matrix** documents period options for **Key Financial Reports** (and notes exceptions).  
2. **Balance Sheet** includes **Current Fiscal Quarter** when that milestone ships *(primary confirmed gap)*.  
3. Each child story’s new period option(s) appear in the report FILTERS tab and return correct data for the selected window.  
4. **No removal** of existing period options without explicit deprecation decision.  
5. Saved reports / scheduled runs without the new options selected produce **identical output** to pre-change behavior.  
6. Help or release notes updated for each report that gains options.  

**Review checkpoint (UX Not Needed):** When Business Case, period matrix (solution analysis), Success Measures, and User Stories are squad-ready, proceed to sizing/build — **not** “Ready for UX.”

---

## FAQ

| Question | Answer |
| --- | --- |
| Does this change how packets look? | **No** for MVP — this epic adds **report-level period options** so packets *can* align; packet UI changes are out of scope. |
| Will every report get every period option? | **No** — standards apply **per report group**. Some reports need week-based options (e.g., Prior Week) that don’t belong on KFR. |
| Is Calendar Month in the standard? | **Under exploration** per epic description — confirm in final matrix. |
| What was wrong with Balance Sheet specifically? | It was the **only** of five sampled KFR reports **missing Current Fiscal Quarter**, blocking consistent packet period selection. |
| Does this epic remove any period options? | **Not in scope** — work is **additive** unless a separate deprecation epic is opened. |

---

## Forecasted Costs — Product Manager

| Item | Value |
| --- | --- |
| **MVP cost** | *TBD — multiple small report modifications + period matrix documentation* |
| **Initial estimate** | *Engineering T-shirt after squad reviews per-report gaps* |
| **Refined estimate** | *Update as Balance Sheet and remaining child stories are sized* |

---

## Forecasted Returns — Product Manager

| Type of return | Notes |
| --- | --- |
| **Client satisfaction** | Smoother packet setup; fewer “restricted period” frustrations. |
| **Support efficiency** | Clear matrix deflects packet-configuration questions. |
| **Engineering efficiency** | Shared standard reduces one-off period requests over time. |
| **Product quality** | Coherent period vocabulary across Key Financial Reports. |

---

## Development Strategy — Product Manager

| Topic | Recommendation |
| --- | --- |
| **Team** | In-house **AP Reporting** squad |
| **Production target** | **PHP** — existing report classes + period filter config (confirm per report) |
| **Sequencing** | (1) Finalize **KFR period matrix** → (2) Close Balance Sheet **Current Fiscal Quarter** gap → (3) Complete remaining child stories by priority → (4) Docs + GA |
| **Dependencies** | Report analysts for period semantics; fiscal calendar / post-month definitions per client |
| **Feature flag** | **None** assumed — additive options |

### Per-report engineering notes (from epic + child work)

| Report | Expected work | Jira |
| --- | --- | --- |
| Balance Sheet | Add **Current Fiscal Quarter** (and align to KFR standard) | Epic research |
| AP Payment Register | Add **Prior Week** | [DEV-86731](https://entrata.atlassian.net/browse/DEV-86731) |
| Inter-Company Transaction | Additional period options | [DEV-280618](https://entrata.atlassian.net/browse/DEV-280618) *(Closed)* |
| GL Details | Period filter enhancements | [DEV-276336](https://entrata.atlassian.net/browse/DEV-276336) *(Closed — idea)* |
| Work Order Details | Period option | [DEV-270378](https://entrata.atlassian.net/browse/DEV-270378) *(Closed — idea)* |

**Open questions for engineering**

1. Confirm **Balance Sheet** implementation path for Current Fiscal Quarter (filter constant, query branch, fiscal calendar source).  
2. Which reports belong in **Key Financial Reports** v1 vs. v2 of the matrix.  
3. Whether **Calendar Month** is technically equivalent across all KFR reports or needs per-report qualification.  
4. Shared abstraction for period filters vs. continued per-report implementation.  

### Supporting team

| Supporting team | Deliverable | Effort | Timeline |
| --- | --- | --- | --- |
| AP Reporting engineering | Period additions per child story + Balance Sheet gap | *TBD* | *Per Jira release* |
| QA | Per-report regression + new period option validation | *TBD* | Pre-GA |
| Tech writing | Period matrix + per-report release notes | *TBD* | GA |
| PM (Reports) | Standard matrix ownership + client feedback synthesis | *TBD* | Pre-build sign-off |

---

## Change Log — Product Manager

| Date | Description | Reason |
| --- | --- | --- |
| 2026-06-19 | PRD created from Jira [DEV-209572](https://entrata.atlassian.net/browse/DEV-209572) | Centralize product narrative for AP Reporting squad refinement |

---

## Roles & responsibilities (RACI)

| Deliverable | Product Manager (Reports) | Report analysts | Designer | Engineer |
| --- | --- | --- | --- | --- |
| Epic description | **A/R** | C | I | C |
| Business case | **A/R** | C | I | C |
| GTM | **A/R** | I | I | I |
| Success measures | **A/R** | I | I | C |
| Customer feedback | **A/R** | C | I | I |
| User stories | **A/R** | C | C* | C |
| Period standard matrix | **A/R** | **C** | I | C |
| Costs / returns | **A/R** | I | I | C |
| Development strategy | **A/R** | C | I | **C** |
| Change log | **A/R** | I | I | I |

*\*Designer consulted only if filter-modal layout ambiguity beyond existing patterns.*

---

## Appendix

- **Jira:** [DEV-209572 — Period Standardization](https://entrata.atlassian.net/browse/DEV-209572)  
- **Parent:** [DEV-182803](https://entrata.atlassian.net/browse/DEV-182803)  
- **Child work:** [DEV-86731](https://entrata.atlassian.net/browse/DEV-86731), [DEV-280618](https://entrata.atlassian.net/browse/DEV-280618), [DEV-276336](https://entrata.atlassian.net/browse/DEV-276336), [DEV-270378](https://entrata.atlassian.net/browse/DEV-270378)  
- **Initial KFR sample:** Balance Sheet, Cash Flow Statement, Income Statement, Trial Balance, GL Details  
- **PRD template reference:** [Google Doc](https://docs.google.com/document/d/1U5fxrVpIXhJre-Q79jeGFLqOnsuip-hG2SEBVzK_AaU/edit) — structure aligned with org template and sibling PRDs in `docs/prds/`.
