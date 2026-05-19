# PRD: AP Reporting — Remove Fast Funds Payment Type

| Field | Value |
| --- | --- |
| **Jira Epic** | [DEV-270959 — AP Reporting Removing Fast Funds Payment Type](https://entrata.atlassian.net/browse/DEV-270959) |
| **Jira Initiative** | [DEV-226031 — Reporting: 2026 General Enhancements and Client Requests](https://entrata.atlassian.net/browse/DEV-226031) |
| **Related Epic (split from)** | [DEV-267832 — Remove Fast Funds from Bank Accounts and AP Payments](https://entrata.atlassian.net/browse/DEV-267832) |
| **SpecCatalyst** | [Initiative 477](https://speccatalyst.entrata.green/initiatives/477) |
| **Interface reference (Figma)** | [AP Payment Register Interface](https://www.figma.com/make/E0UWNVPJ1E1TuvGYpmGhtk/AP-Payment-Register-Interface?p=f&t=sIVygA37skxfTrid-0) |
| **Loom (epic)** | [Share link](https://www.loom.com/share/9940ad65b08947979cb80c4d0782c983) |
| **Epic UX (Jira)** | **UX Not Needed** — filter/column removal only; Figma documents touchpoints on AP Payment Register. |

**Epic Owner:** Rutuja Nirwan  

**AP Payments POC:** Conner Dalton (per epic description)

**Key stakeholders**

| Role / area | Name (from Jira) |
| --- | --- |
| Epic assignee / product | Rutuja Nirwan |
| Reporter / product (epic creator) | Kolby Henry |
| Business / delivery contact | Preetam Yadav |
| Program / compliance (Jira custom fields) | Jenny Mack, Kolby Henry, Nilesh Solanki |
| AP Payments (cross-team) | Conner Dalton |
| Engineering leadership | *Confirm with AP Reporting squad* |

**Funnel entry date:** 2026-03-13 (epic `created` in Jira)  

**Target release (Jira):** Oct 6, 2026 (R3); milestone hint Sep 17, 2026  

**Last updated:** 2026-05-19 (PRD drafted from Jira + child issues; sync after backlog changes)

### UX Not Needed — how this PRD is used

When the epic is classified **UX Not Needed** in Jira, delivery assumes **no dedicated UX epic owner**, **no “Ready for UX” transition**, and **no UX-led discovery track** for the epic as a whole. The linked [Figma mock](https://www.figma.com/make/E0UWNVPJ1E1TuvGYpmGhtk/AP-Payment-Register-Interface?p=f&t=sIVygA37skxfTrid-0) is a **reference for filter/column placement** on AP Payment Register, not a net-new experience.

| Expectation | UX Not Needed behavior |
| --- | --- |
| **Who owns experience decisions** | Product Manager + engineering, using **acceptance criteria**, **Figma/Loom**, and **existing report patterns**. |
| **Designer involvement** | **Optional** if a report layout needs consultation; not a prerequisite to start build. |
| **Review gate (replaces “Ready for UX”)** | When **Business Case**, **Solution Analysis** (report inventory + tech approach), **Success Measures**, **User Stories**, and **Customer Feedback** (PM-owned) are sufficient, **review with the squad** and advance per Jira workflow (e.g., **Ready for Dev** / refinement complete). |
| **Customer feedback section** | PM-owned synthesis; design consulted only if a story explicitly needs it. |

---

## Epic Description — Product Manager

*Note: Living document for alignment during the collaboration phase of the SDLC. Jira remains source of truth for status.*

### Elevator pitch

The **Fast Funds** payment type is **obsolete** (used only in a beta that moved to better alternatives). It still appears in **AP report filters and columns**—including **AP Payment Register**—creating clutter and confusion when accountants select payment types. This epic **removes “Fast Funds” from Payment Type filters and column option lists** across affected **AP Reporting** standard reports **without** changing historical transaction data, **without** new permissions or feature flags, and **without** a new report version.

*Sources: Jira epic [DEV-270959](https://entrata.atlassian.net/browse/DEV-270959), parent split [DEV-267832](https://entrata.atlassian.net/browse/DEV-267832).*

### Problem statement (current state)

| Area | Today |
| --- | --- |
| **AP Payment Register** | “Fast Funds” appears in **Payment Types** filter (and related column options where enumerated). |
| **Other AP reports** | Unknown full set—**[DEV-278735](https://entrata.atlassian.net/browse/DEV-278735)** inventories all reports referencing Fast Funds in filters or columns. **Bank Register** is a likely candidate per QR description. |
| **User impact** | Accountants and property admins see a **non-actionable** payment type alongside legitimate options. |
| **Data** | Historical payments tagged Fast Funds **remain in the database**; this epic only affects **UI visibility and filter enumerations**. |

### Primary interface reference — AP Payment Register

Per epic description and [Figma — AP Payment Register Interface](https://www.figma.com/make/E0UWNVPJ1E1TuvGYpmGhtk/AP-Payment-Register-Interface?p=f&t=sIVygA37skxfTrid-0):

| Element | Expected change |
| --- | --- |
| **Payment Types filter** | Remove **“Fast Funds”** from selectable values. |
| **Payment Type column** (if user-configurable / enumerated) | Do not offer **“Fast Funds”** as a filterable or selectable column value where options are enumerated. |
| **Report chrome** | No layout redesign; **existing report version** only ([DEV-269253](https://entrata.atlassian.net/browse/DEV-269253)). |
| **Exports** | CSV / Excel / PDF (as applicable) must not expose Fast Funds as a **filter option** or spurious **header option**. |

**Report catalog context**

| Report | Key | Notes |
| --- | --- | --- |
| AP Payment Register | `ap_payment_register` | Primary example; rank 21–30; Financial Operations - Payments |
| AP Payment Register (Consolidate By) | `ap_payment_register_consolidate_by` | Assume same Payment Type behavior until QR proves otherwise |
| Bank Register | `bank_register` | Suspected in [DEV-278735](https://entrata.atlassian.net/browse/DEV-278735) |
| *Additional reports* | *TBD* | Output of QR task drives story breakdown |

---

## Business Case Hypothesis — Product Manager

### Business outcome hypothesis

If we **remove obsolete Fast Funds options** from AP report filters and columns, then users will **select payment types faster**, **make fewer mistaken filters**, and **see a UI consistent** with the parallel removal in **Bank Accounts** and **AP Payments** ([DEV-267832](https://entrata.atlassian.net/browse/DEV-267832))—with **no loss** of required reporting capability because the payment type was **not in production use**.

### Leading indicators (refine with analytics / support)

| Indicator | Example measure | Time horizon |
| --- | --- | --- |
| Filter clarity | Zero support tickets asking what “Fast Funds” means in AP reports | 60–90 days post-GA |
| Saved-config stability | No increase in report errors tied to saved filters | 30 days post-GA |
| Delivery health | QR complete → scoped stories → no P1 regressions in reporting | Per release |
| Cross-suite consistency | AP Reporting release aligned with AP Payments / Bank Account epic communication | Coordinated GA |

### In scope (MVP)

| Capability | Notes |
| --- | --- |
| **Report inventory (QR)** | [DEV-278735](https://entrata.atlassian.net/browse/DEV-278735) — identify every AP report with Fast Funds in **filter** or **column**. |
| **Remove Fast Funds from AP reports** | [DEV-269253](https://entrata.atlassian.net/browse/DEV-269253) — implement removal per inventory; **existing report version**; release notes coordinated with **AP Payments** for suite messaging. |
| **AP Payment Register** | Explicit epic callout; validate against Figma + Loom. |
| **Saved filter compatibility** | Saved configurations that included “Fast Funds” **must not break** report rendering (see compatibility below). |
| **Training / docs at GA** | Jira: **Training: Required at GA**; PM coordinates with tech writing / CS. |

### Out of scope

| Item | Rationale |
| --- | --- |
| **Bank Accounts / AP Payments UI** | Owned by [DEV-267832](https://entrata.atlassian.net/browse/DEV-267832) (split epic). |
| **Historical data purge or reclassification** | Explicitly out ([DEV-270959](https://entrata.atlassian.net/browse/DEV-270959) FAQ). |
| **New payment types** | None introduced. |
| **New permissions, settings, or feature flags** | Jira: **No Feature Flag**; permissions unchanged. |
| **New report version** | [DEV-269253](https://entrata.atlassian.net/browse/DEV-269253) Criteria 1. |
| **AR / ResidentPay “payment type” reports** | Unless QR proves AP GL report uses same Fast Funds enum (default: out until proven). |

### Nonfunctional requirements

| Area | Requirement |
| --- | --- |
| **Performance** | No degradation vs. current baselines (epic FAQ). |
| **Correctness** | No removal of legitimate payment types; regression suite on affected reports. |
| **Security / entitlements** | Unchanged report permissions and property scoping. |
| **Compatibility** | Saved filters containing Fast Funds: report **renders**; Fast Funds option **not offered** going forward; define behavior for rows that **are** historically Fast Funds (display legacy value if still in result set—align with AP Payments deprecation pattern on [DEV-267832](https://entrata.atlassian.net/browse/DEV-267832)). |
| **Usability** | Reduced filter clutter; no new cognitive load. |
| **Reliability** | No increase in reporting error rates post-release. |

### Additional potential features (post-MVP)

- Automated catalog check so obsolete enums cannot reappear in report metadata.  
- Consolidated release comms with AP Payments for all Accounting-suite touchpoints.  

### Reporting requirements

- Update help / release notes for **each affected report** listing removal of Fast Funds from filters.  
- CS training: **Required at GA** (Jira).  
- Analytics (if used): confirm no dashboards depend on Fast Funds filter events.  

### Analysis summary

Accounting requested cleanup after [DEV-267832](https://entrata.atlassian.net/browse/DEV-267832). AP Reporting split this epic to track **report-specific** work. Fast Funds had **no meaningful production usage** (beta only). AP Payment Register is the **named example**; QR expands scope. AP Payments (**Conner Dalton**) owns broader suite release notes; AP Reporting owns **report filter/column** implementation.

---

## Go to Market Strategy — Product Manager

### External personas — impact

| Persona | Impact |
| --- | --- |
| **Accounting manager / AP clerk** | Cleaner Payment Types filters on payment register and related reports. |
| **Property administrator** | Less confusion when reviewing standard AP financial reports. |

**Level of customer impact (Jira):** Low  

### Internal personas — impact

| Persona | Impact |
| --- | --- |
| **Support (#ask-reporting-ap)** | Fewer “what is Fast Funds?” questions; update macros when inventory is final. |
| **Professional Services / Implementation** | Minor training note at GA. |
| **AP Payments (Conner Dalton)** | Coordinated messaging with transactional UI removal. |
| **AP Reporting engineering** | Small, repeatable filter-metadata changes across N reports. |

### Programs / services impacted

- **Component:** AP Reporting  
- **Product catalog (Jira):** Entrata Core > Reports (AP GL & Facilities)  
- **Business unit (Jira):** Tech-Enabled Services  
- **Workstream (Jira):** Reporting  
- **Customer-facing:** Yes (report UI)  
- **Severity (Jira):** Sev-2  

### GTM narrative

- **Positioning:** Housekeeping—remove unused payment type from reports; **no workflow change** for active payment types.  
- **Sales / solutions:** No SKU change; optional mention in Accounting suite cleanup.  
- **Implementation:** Standard release; **Required at GA** training for affected report names.  
- **Support:** Proactive note: historical Fast Funds **transactions remain**; option removed from filters only.  

---

## Success Measures — Product Manager

| Objective | Success | How to measure | Deadline |
| --- | --- | --- | --- |
| Complete report inventory | [DEV-278735](https://entrata.atlassian.net/browse/DEV-278735) **Done** with signed-off list | Jira + attached inventory doc | Before build complete on [DEV-269253](https://entrata.atlassian.net/browse/DEV-269253) |
| Fast Funds removed from all in-scope reports | No Fast Funds in Payment Types filter or enumerated column options | QA script per report; spot-check AP Payment Register vs. Figma | **Oct 6, 2026 (R3)** |
| Zero regressions | No P1/P2 defects on payment type filtering | QA + NR monitoring | 30 days post-GA |
| Saved filters stable | Reports with legacy saved Fast Funds config load without error | Test cases in story | GA |
| Suite alignment | Release comms consistent with [DEV-267832](https://entrata.atlassian.net/browse/DEV-267832) | PM sign-off with AP Payments | GA |

*Numeric adoption targets optional (low-risk deprecation); add if analytics defines a baseline.*

---

## Customer Feedback — Product Manager *(UX Not Needed: PM-owned)*

| Customer | Contact | Date contacted |
| --- | --- | --- |
| *Internal — Accounting suite request* | Via [DEV-267832](https://entrata.atlassian.net/browse/DEV-267832) | 2026 |

**Synthesized feedback**

- Fast Funds was **not used** outside beta; clients should not see it in daily reporting filters.  
- Primary concern is **clarity**, not missing functionality.  

### MoSCoW

| Must have | Should have | Could have | Won’t have |
| --- | --- | --- | --- |
| QR inventory ([DEV-278735](https://entrata.atlassian.net/browse/DEV-278735)) | Per-report QA checklist | Post-GA usage audit of legacy saved filters | Data migration / reclassification |
| Remove Fast Funds from all inventoried reports ([DEV-269253](https://entrata.atlassian.net/browse/DEV-269253)) | Update CS articles per report | | New report version |
| AP Payment Register per Figma | Coordinated release note with AP Payments | | Feature flag |
| Saved-filter compatibility | | | Removing other payment types |

---

## User Stories — Product Manager

*Canonical acceptance criteria live in Jira child issues.*

| # | As a… | I want… | So that… | Jira |
| --- | --- | --- | --- | --- |
| 1 | AP Reporting PM | **a complete list of reports** that reference Fast Funds in filters or columns | we can scope engineering work accurately | [DEV-278735](https://entrata.atlassian.net/browse/DEV-278735) |
| 2 | User of AP reports | **“Fast Funds” removed from Payment Types filters and column options** on every in-scope report | I only see payment types I can actually use | [DEV-269253](https://entrata.atlassian.net/browse/DEV-269253) |
| 3 | User of **AP Payment Register** | **the Payment Types filter without Fast Funds** | I can review payments without obsolete options (see Figma) | Epic + [DEV-269253](https://entrata.atlassian.net/browse/DEV-269253) |
| 4 | User with **saved report configs** | **reports to load even if my saved filter included Fast Funds** | I am not blocked after upgrade | [DEV-269253](https://entrata.atlassian.net/browse/DEV-269253) |
| 5 | Support / CS | **documented list of affected reports** at GA | I can answer client questions consistently | Epic (training **Required at GA**) |

### Acceptance criteria — [DEV-269253](https://entrata.atlassian.net/browse/DEV-269253) (summary)

**Criteria 1 — Versioning**

- Changes in **existing report version** only.  
- Release notes: **AP Payments team** handles suite-level notes; AP Reporting supplies report-specific bullets.

**Criteria 2 — Functional**

1. For every report identified in [DEV-278735](https://entrata.atlassian.net/browse/DEV-278735) with **Payment Type** filtering:  
   - **Remove** “Fast Funds” from **Payment Types** filter options.  
   - If the report has a **Payment Type column** with enumerated options, **do not present** “Fast Funds” as selectable/filtered value.  
2. **Exports** (CSV / Excel / PDF as applicable): Fast Funds not available as filter or spurious header option.  
3. **Saved filters:** Configurations containing “Fast Funds” **do not break** rendering.  
4. **No** new permissions, settings, or feature flags.  
5. **No** unintended removal of other payment types; **no** reporting regressions.

**Review checkpoint (UX Not Needed):** When Business Case, inventory (QR), Success Measures, and User Stories are squad-ready, proceed to sizing/build—**not** “Ready for UX.”

---

## FAQ (from Jira epic)

| Question | Answer |
| --- | --- |
| Will historical Fast Funds records be deleted? | **No.** Historical data unchanged; update is UI/filter visibility. |
| Will AP report performance change? | **No.** Designed to maintain current load times. |

---

## Forecasted Costs — Product Manager

| Item | Value |
| --- | --- |
| **MVP cost** | *TBD — small multi-report change after QR sizing* |
| **Initial estimate** | *Engineering T-shirt after [DEV-278735](https://entrata.atlassian.net/browse/DEV-278735)* |
| **Refined estimate** | *Update post-QR if report count >> 2* |

---

## Forecasted Returns — Product Manager

| Type of return | Notes |
| --- | --- |
| **Support efficiency** | Fewer confused filter choices on AP Payment Register and peers. |
| **Suite consistency** | Reporting aligned with AP Payments / Bank Account cleanup. |
| **Risk reduction** | Users cannot filter on a deprecated payment type. |

---

## Development Strategy — Product Manager

| Topic | Recommendation |
| --- | --- |
| **Team** | In-house **AP Reporting** squad |
| **Sequencing** | (1) Complete [DEV-278735](https://entrata.atlassian.net/browse/DEV-278735) inventory → (2) Implement [DEV-269253](https://entrata.atlassian.net/browse/DEV-269253) per report → (3) QA + docs → (4) GA aligned with R3 |
| **Dependencies** | [DEV-267832](https://entrata.atlassian.net/browse/DEV-267832) messaging; AP Payments POC **Conner Dalton**; parent initiative [DEV-226031](https://entrata.atlassian.net/browse/DEV-226031) |
| **Feature flag** | **None** (Jira) |
| **Journey (Jira)** | Preparation → Technical Execution → Clean up |

### Supporting team

| Supporting team | Deliverable | Effort | Timeline |
| --- | --- | --- | --- |
| AP Reporting engineering | Filter/column removal per inventory | *TBD* | **R3 Oct 6, 2026** |
| QA | Per-report regression + saved-filter cases | *TBD* | Pre-GA |
| Tech writing / L&D | Docs + **Required at GA** training | *TBD* | GA |
| AP Payments | Suite release notes | *Their ownership* | GA |

### Suggested test cases (for [DEV-269253](https://entrata.atlassian.net/browse/DEV-269253))

| ID | Scenario | Expected |
| --- | --- | --- |
| TC-01 | Open AP Payment Register → Payment Types filter | “Fast Funds” **not** listed |
| TC-02 | Run report with other payment types selected | Results unchanged vs. baseline (excluding Fast Funds-only filter) |
| TC-03 | Load saved filter that previously included Fast Funds | Report **renders** without error |
| TC-04 | Export report (formats applicable) | No Fast Funds filter option in export UI/output metadata |
| TC-05 | Bank Register (if in inventory) | Same removal behavior as AP Payment Register |
| TC-06 | Regression | All non–Fast Funds payment types still filter correctly |

---

## Change Log — Product Manager

| Date | Description | Reason |
| --- | --- | --- |
| 2026-05-19 | PRD created from Jira epic DEV-270959, child issues, Figma link, and AP report catalog | Centralize product narrative for squad refinement |

---

## Roles & responsibilities (RACI)

| Deliverable | Product Manager | Designer | Engineer |
| --- | --- | --- | --- |
| Epic description | **A/R** | I | C |
| Business case | **A/R** | I | C |
| GTM | **A/R** | I | I |
| Success measures | **A/R** | I | C |
| Customer feedback | **A/R** | C* | I |
| User stories | **A/R** | C* | C |
| Costs / returns | **A/R** | I | C |
| Development strategy | **A/R** | I | **C** |
| Change log | **A/R** | I | I |

*\*Designer consulted only if layout ambiguity beyond Figma reference.*

---

## Appendix

- **Jira status (snapshot):** Waiting on Breakdown; **Priority:** P2; **On Track**; **No Feature Flag**.  
- **Issue links:** Split from [DEV-267832](https://entrata.atlassian.net/browse/DEV-267832).  
- **Looms (Jira):** [Epic share](https://www.loom.com/share/9940ad65b08947979cb80c4d0782c983); additional links on epic custom fields.  
- **Figma:** [AP Payment Register Interface](https://www.figma.com/make/E0UWNVPJ1E1TuvGYpmGhtk/AP-Payment-Register-Interface?p=f&t=sIVygA37skxfTrid-0) — use for Payment Types filter placement; not a full redesign spec.  
- **Related AP Payments spec quality reference:** Remove Fast Funds Payment Type (Conner Dalton grading in product-spec-kit) — reuse **inventory + saved-filter + data-handling** patterns where applicable to reports.
