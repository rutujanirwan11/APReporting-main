# PRD: Asset Tracking Reporting Consolidation

| Field | Value |
| --- | --- |
| **Jira Epic** | [DEV-191990 — Asset Tracking Reporting Consolidation](https://entrata.atlassian.net/browse/DEV-191990) |
| **Jira Initiative** | [DEV-185834 — Report Consolidation and Simplification](https://entrata.atlassian.net/browse/DEV-185834) |
| **Feature Overview** | *Link Confluence / Google Doc overview when available. Story mockups: [DEV-191991 mock sheet](https://docs.google.com/spreadsheets/d/1Cvi2ORKw6quj3NI51JrcQjJ9b7XO2w6Ykm9NwhaWl70/edit?gid=1481640155#gid=1481640155); [DEV-216857 spec sheet](https://docs.google.com/spreadsheets/d/18sFJYWVSkbMQAgdsWRl0kChYYyJ2XfP6oK9LjaOa8WE/edit?gid=0#gid=0).* |
| **Epic UX (Jira)** | **UX Not Needed** — this PRD uses the **UX Not Needed** workflow below (no epic-level UX gate). |

**Epic Owner:** Rutuja Nirwan  

**Key stakeholders**

| Role / area | Name (from Jira) |
| --- | --- |
| Epic assignee / product | Rutuja Nirwan |
| Reporter / product (epic creator) | Kolby Henry |
| Business / delivery contact | Preetam Yadav |
| Program / compliance (Jira custom fields) | Jenny Mack, Kolby Henry, Nilesh Solanki |
| Engineering leadership | *Confirm with squad* |

**Funnel entry date:** 2025-06-30 (epic `created` in Jira)  

**Last updated:** 2026-05-14 (PRD drafted from Jira; sync dates after edits)

### UX Not Needed — how this PRD is used

When the epic is classified **UX Not Needed** in Jira, delivery assumes **no dedicated UX epic owner**, **no “Ready for UX” transition**, and **no UX-led discovery track** for the epic as a whole.

| Expectation | UX Not Needed behavior |
| --- | --- |
| **Who owns experience decisions** | Product Manager + engineering, using **acceptance criteria**, **spreadsheets / Looms**, and **existing report patterns** (see linked stories). |
| **Designer involvement** | **Optional / story-level only** (e.g., consult on filter layout). Not a prerequisite to start build for the epic. |
| **Review gate (replaces “Ready for UX”)** | When **Business Case**, **Solution Analysis** (as reflected in backlog + tech tasks), **Success Measures**, **User Stories**, and **Customer Feedback** (PM-owned) are sufficient for engineering, **review with the squad** and advance work per your Jira workflow (e.g., **Ready for Dev** / refinement complete). |
| **Customer feedback section** | Still captured for evidence; **PM is accountable** for synthesis; design **consulted only if** a story explicitly needs it. |

---

## Epic Description — Product Manager

*Note: This is a “living document,” evolving with continuous feedback and iterations from cross-functional teams. The intent of this document is to ensure alignment with project goals and user needs during the collaboration phase of the SDLC.*

### Elevator pitch

Accounting teams using **Entrata Core → Reports (AP GL & Facilities)** face **many overlapping reports** around the **Asset List / Asset Tracking** area. That overlap increases cognitive load, support burden, and time-to-value for an ancillary product area. This epic **consolidates redundant asset-oriented reports** into a **smaller, clearer set**—preserving required data—so clients and internal teams have **fewer places to look** and a **more coherent** reporting experience.

*Source: Jira epic description on DEV-191990.*

### Report inventory (epic checklist — scope lens)

Reports called out in the epic for consolidation consideration:

- Asset Tracking  
- Asset Valuation  
- Catalog Items  
- Consumption Log  
- Inventory Quantities  
- Inventory Transfer  
- Inventory Valuation  
- Warranty Tracking  

---

## Business Case Hypothesis — Product Manager

### Business outcome hypothesis

If we **reduce duplicate surface area** and **combine complementary datasets** (e.g., warranty detail on Asset Tracking; combined inventory quantity + valuation), then **clients will run fewer, clearer reports**, **standard reporting will be easier to learn and support**, and we will **move toward the parent initiative’s goal** of report consolidation—without losing critical accounting visibility.

*Quantified targets (e.g., % reduction in distinct reports used, support ticket volume, time-on-task) should be agreed with analytics / support and filled in here.*

### Leading indicators (innovation accounting — examples; refine with data)

| Indicator | Example measure | Time horizon |
| --- | --- | --- |
| Report cardinality | Count of distinct asset/inventory report runs per org (or Entrata-wide) trending **down** for superseded reports | 30–90 days post-GA |
| Adoption of consolidated paths | **Increase** in runs of consolidated report(s); **decrease** in runs of deprecated / legacy entries | 30–90 days post-GA |
| Support & confusion | Fewer “which report do I use?”-class contacts; tag tickets linked to these report names | 60–180 days post-GA |
| Delivery health | AIF / build milestones met; no regression spikes in NR or CSAT for reporting | Per release |

### In scope (MVP and near-MVP)

| Feature / capability | Notes (from Jira child work) |
| --- | --- |
| **Warranty detail on Asset Tracking** | [DEV-191991](https://entrata.atlassian.net/browse/DEV-191991) **Done** — Warranty Detail dataset, toggles/columns, toward obsoleting standalone Warranty Tracking. |
| **Post-consolidation warranty + UX follow-up** | [DEV-219978](https://entrata.atlassian.net/browse/DEV-219978) **Ready for Dev** — version 1.3 criteria, warranty column dependencies, **Group by Item Type**, catalog filter UX. |
| **Combined Inventory Quantities + Valuation** | [DEV-192283](https://entrata.atlassian.net/browse/DEV-192283) **Resolved** (research); [DEV-216857](https://entrata.atlassian.net/browse/DEV-216857) **Not Started** — implement combined report; **Transfer** as separate dataset per task description. |
| **Consolidation follow-up / “closer to 100%”** | [DEV-209587](https://entrata.atlassian.net/browse/DEV-209587) **Not Started** — engineering analysis crossover; identify incremental simplifications. |
| **AIF / funding track** | [AIF-1679](https://entrata.atlassian.net/browse/AIF-1679) — **Needs Product VP Approval**; mirror [DEV-198580](https://entrata.atlassian.net/browse/DEV-198580). |

### Out of scope (unless explicitly pulled in)

- Net-new asset modules outside **AP Reporting** / listed standard reports (confirm with initiative).  
- Full redesign of **Asset List** transactional UI (this epic is **reporting consolidation**).  
- One-shot custom exports not in standard reporting catalog.  

### Nonfunctional requirements

| Area | Requirement |
| --- | --- |
| **Performance** | Combined datasets and period filters must meet or beat legacy report performance baselines ([DEV-216857](https://entrata.atlassian.net/browse/DEV-216857) calls out performance testing). |
| **Correctness** | Side-by-side validation vs. legacy **Inventory Valuation** / **Quantities** outputs where applicable. |
| **Security / entitlements** | Preserve existing report permissions and property scoping. |
| **Maintainability** | Reduce duplicate code paths where engineering has identified crossover ([DEV-209587](https://entrata.atlassian.net/browse/DEV-209587)). |
| **Usability** | Fewer reports to discover; toggles/datasets instead of separate menus where possible; Jira flags **Documentation: Needed**, **Training: Required at GA**. |
| **Reliability** | No increase in error budgets for reporting services; monitor after release. |

### Additional potential features

- Deeper **Catalog Items** filter organization (alphabetical vs. creation order) — raised in [DEV-219978](https://entrata.atlassian.net/browse/DEV-219978).  
- Further deprecation of **Inventory Transfer** as a first-class standalone report if usage remains negligible (hypothesis in [DEV-192283](https://entrata.atlassian.net/browse/DEV-192283)).  
- Extend consolidation pattern to **Asset Valuation**, **Consumption Log**, etc., pending initiative prioritization.  

### Reporting requirements

- Update **help / release notes / CS training** for consolidated report names and deprecation of superseded reports (**Required at GA** in Jira).  
- Identify **existing reports affected**, redirects or in-app messaging if product standards require it.  
- Analytics events (if used) updated so usage of **old vs. new** report keys is measurable.  

### Analysis summary

Product and engineering reviewed overlap between **Warranty Tracking** and **Asset Tracking** (historical [DEV-52559](https://entrata.atlassian.net/browse/DEV-52559), Loom in task), shipped **warranty-as-dataset** on Asset Tracking ([DEV-191991](https://entrata.atlassian.net/browse/DEV-191991)), and identified **inventory** reports as strong candidates to merge ([DEV-192283](https://entrata.atlassian.net/browse/DEV-192283)) with implementation spec [DEV-216857](https://entrata.atlassian.net/browse/DEV-216857). **Code crossover** between reports supports a phased technical approach ([DEV-209587](https://entrata.atlassian.net/browse/DEV-209587)). Parent initiative **DEV-185834** frames portfolio-level simplification.

---

## Go to Market Strategy — Product Manager

### External personas — impact

| Persona | Impact |
| --- | --- |
| **Property accountant / AP analyst** | Fewer reports to choose from; single place for asset + warranty and (when delivered) richer inventory view. |
| **Controller / accounting manager** | Clearer standard reporting story; less team training surface. |

### Internal personas — impact

| Persona | Contact / impact |
| --- | --- |
| **Support (Accounting)** | Fewer report variants to explain; update macros and articles. |
| **Professional Services / Implementation** | Training and blueprint updates for consolidated reports. |
| **Engineering (AP Reporting)** | Consolidated code paths; less long-term maintenance for redundant reports. |

### Programs / services impacted

- **Component:** AP Reporting  
- **Product catalog (Jira):** Entrata Core > Reports (AP GL & Facilities)  
- **Business unit (Jira):** Tech-Enabled Services  
- **Customer-facing (Jira):** Yes  
- **Reporting workstream (Jira):** Reporting  

### GTM narrative

- **Positioning:** Simplification and clarity—same data, fewer menus.  
- **Sales / solutions:** Align talk track with initiative **Report Consolidation and Simplification**; no new SKU implied.  
- **Implementation:** GA training materials; flag deprecations in release communications.  
- **Support:** Proactive deflection articles (“use X instead of Y”).  

This epic follows the **UX Not Needed** path documented at the top of this PRD: no separate UX epic deliverable; collateral is **PM/engineering artifacts** (spec sheets, criteria in Jira) unless a child issue pulls design in.

---

## Success Measures — Product Manager

| Objective | Success | How to measure | Deadline |
| --- | --- | --- | --- |
| Consolidated **inventory** experience shipped | Combined Qty + Valuation in production; validation sign-off | QA comparison to legacy; adoption metrics | Align to **Oct 6, 2026 (R3)** target in Jira |
| **Warranty** path complete | Follow-up story DONE; no critical regressions | DEV-219978 acceptance; defect rate | Squad-defined |
| Report portfolio simplification | Net −1 or more redundant **standard** reports where promised | Catalog count; usage of deprecated reports → 0 | Post-GA review |
| Initiative alignment | Parent initiative milestones visible in Jira | Status rollup DEV-185834 | Ongoing |

*Jira milestone hints: **Oct 6, 2026** and **Sep 17, 2026** on epic—confirm with release management.*

---

## Customer Feedback — Product Manager *(UX Not Needed: PM-owned)*

| Customer | Contact | Date contacted |
| --- | --- | --- |
| *TBD* |  |  |

*Under **UX Not Needed**, the Product Manager **synthesizes** feedback; Design is **not required** to maintain this table. Pull from CS / CSM / advisory calls and link Looms or comments (e.g., [DEV-52559](https://entrata.atlassian.net/browse/DEV-52559) video, [DEV-191991](https://entrata.atlassian.net/browse/DEV-191991) user story text).*

### MoSCoW (initial pass — refine in squad)

| Must have | Should have | Could have | Won’t have (for this epic) |
| --- | --- | --- | --- |
| Parity or documented deltas for merged **inventory** views; warranty dataset behavior per **DEV-191991** / **DEV-219978** | Catalog filter UX improvements | Alphabetical / custom sort for catalog categories | Full Asset List product redesign |
| Documentation + **Required at GA** training path | Deprecation messaging in-product | Extra datasets beyond agreed spec | Unscoped new reports |

---

## User Stories — Product Manager

*High-level; refine in backlog. Several stories already exist in Jira—link is canonical.*

| Story | As a… | I want… | So that… | Jira |
| --- | --- | --- | --- | --- |
| 1 | Property accountant | **warranty fields on Asset Tracking** (toggle/dataset) | I don’t run a second **Warranty Tracking** report for the same assets | [DEV-191991](https://entrata.atlassian.net/browse/DEV-191991) |
| 2 | Same | **refined warranty + grouping + catalog filters** after v1 consolidation | columns behave correctly when warranty is on; I can slice by item type | [DEV-219978](https://entrata.atlassian.net/browse/DEV-219978) |
| 3 | Inventory analyst | **one inventory report** that covers quantities and valuation | I reduce reconciliation time and report clutter | [DEV-216857](https://entrata.atlassian.net/browse/DEV-216857) |
| 4 | Engineering lead | **follow-up consolidation tasks** from code analysis | we approach “100%” consolidation safely | [DEV-209587](https://entrata.atlassian.net/browse/DEV-209587) |
| 5 | Internal Entrata user | **fewer overlapping asset reports** in the catalog | I onboard clients faster with less confusion | Epic + [AIF-1679](https://entrata.atlassian.net/browse/AIF-1679) |

**Review checkpoint (UX Not Needed format):** When **Business Case**, **Solution Analysis** (backlog + engineering analysis), **Success Measures**, **Customer Feedback** (PM-owned), and **User Stories** are complete enough for build, **review with the squad** and move issues through your standard path (**not** “Ready for UX”; Jira epic field remains **UX Not Needed**).

---

## Forecasted Costs — Product Manager

| Item | Value |
| --- | --- |
| **MVP cost** | *Fill from finance / capacity plan; tie to AIF if applicable ([AIF-1679](https://entrata.atlassian.net/browse/AIF-1679)).* |
| **Initial estimated implementation cost** | *Engineering T-shirt size after DEV-216857 / DEV-209587 refinement.* |
| **Refined estimate(s)** | *Update post-spike or mid-sprint learnings.* |

---

## Forecasted Returns — Product Manager

| Type of return | Notes |
| --- | --- |
| **Support efficiency** | Fewer ambiguous report choices. |
| **Implementation velocity** | Shorter training for standard asset/inventory reporting. |
| **Strategic** | Advances **DEV-185834** consolidation narrative. |

---

## Development Strategy — Product Manager

| Topic | Recommendation |
| --- | --- |
| **In-house vs. outsourced** | **In-house** AP Reporting squad (component **AP Reporting**). |
| **Incremental implementation** | Phases: (1) Warranty on Asset Tracking **shipped**; (2) warranty follow-ups; (3) combined inventory; (4) code consolidation / deprecation cleanup. |
| **Sequencing & dependencies** | **AIF-1679** approval; **DEV-216857** depends on resolved approach from **DEV-192283**; **DEV-219978** builds on **DEV-191991**; coordination with **DEV-185834** initiative. |
| **Journey (Jira custom field)** | Preparation → Technical Execution → Clean up |

### Supporting team (template grid — fill estimates)

| Supporting team | Proposed deliverable | Estimated effort | Timeline / deadline |
| --- | --- | --- | --- |
| AP Reporting engineering | Combined inventory + follow-ups | *TBD* | Target **R3 Oct 6, 2026** per Jira |
| QA | Parity / regression suites | *TBD* | |
| Tech writing / L&D | Docs + GA training | *TBD* | **Required at GA** |
| PM / initiative | Scope guardrails with DEV-185834 | *TBD* | |

---

## Change Log — Product Manager

| Date | Description | Reason | Cost of change | Time required | Trade-offs |
| --- | --- | --- | --- | --- | --- |
| 2026-05-14 | PRD created from Jira epic + child issues | Centralize product narrative | Low | — | Jira remains source of truth for status |
| 2026-05-14 | **UX Not Needed** workflow: gates, RACI, Customer Feedback ownership | Align PRD with Jira epic UX field | Low | — | No “Ready for UX” checkpoint for this epic |

*Usage tips: keep change log current; be concise; review periodically with team.*

---

## Roles & responsibilities (RACI)

| Deliverable | Product Manager | Designer | Engineer |
| --- | --- | --- | --- |
| Epic description | **A/R** | I | C |
| Business case hypothesis | **A/R** | I | C |
| Go to market strategy | **A/R** | I | I |
| Success measures | **A/R** | I | C |
| Customer feedback | **A/R** | C* | I |
| User stories | **A/R** | C* | C |
| Forecasted costs / returns | **A/R** | I | C |
| Development strategy | **A/R** | I | **C** |
| Change log | **A/R** | I | I |

*R = Responsible, A = Accountable, C = Consulted, I = Informed. **\***Designer **C** only when a story explicitly requests design input; otherwise **I**.*

*RACI reflects **UX Not Needed**: no standing **R** on Design for epic-level PRD sections.*

---

## Appendix

- **UX / design:** Epic **UX Not Needed** in Jira; use the **UX Not Needed** section at the top of this PRD for gates and ownership.  
- **Epic status (Jira snapshot):** In Refinement; **Priority:** P2; **Feature flag:** No Feature Flag (Jira).  
- **Linked “Achieves” issues:** [DEV-198580](https://entrata.atlassian.net/browse/DEV-198580), [AIF-1679](https://entrata.atlassian.net/browse/AIF-1679).  
- **SAFe / templates:** Use your org’s SAFe collaboration templates (Business Model Canvas, etc.) as needed—see your standard PRD appendix list.
