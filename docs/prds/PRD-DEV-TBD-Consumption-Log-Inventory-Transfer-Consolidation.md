# PRD: Consumption Log + Inventory Transfer Reporting Consolidation

## Jira Epic — copy/paste format

**Jira Epic:** [DEV-335203 — Combine Consumption Log + Inventory Transfer Reports](https://entrata.atlassian.net/browse/DEV-335203)

**Epic title:** Combine Consumption Log and Inventory Transfer reports

**Epic summary:** Consolidate the Consumption Log and Inventory Transfer reports on a shared asset-transaction query foundation while preserving each report’s unique transaction fields and existing report behavior.

**Epic description:**

Consumption Log and Inventory Transfer are strong candidates for reporting consolidation because both reports are built from the same asset-transaction domain and use overlapping filters and reference data. The reports share:

- `asset_transactions`
- Catalog items
- Properties
- Asset locations
- Period filters
- GL account masks
- Transaction-level data

This Epic will combine the reporting experience and reduce duplicated SQL/query logic without forcing both reports to expose identical output. The shared layer should focus on **asset transactions**, rather than attempting to merge every report-specific field or every report presentation detail.

Engineering research has already been completed under [DEV-209587](https://entrata.atlassian.net/browse/DEV-209587). This Epic should use that research as the starting point for feasibility confirmation and implementation planning; the Q/R task should not repeat the completed analysis unless validation identifies a gap or changed assumption.

The recommended technical approach is to create a common transaction query builder with a transaction-type parameter:

```php
$transactionTypes = [CAssetTransactionType::CONSUME];
```

or:

```php
$transactionTypes = [CAssetTransactionType::ASSET_TRANSFER];
```

The shared query should provide canonical fields:

```text
catalog_item
property_name
transaction_date
post_month
item_number
unit_cost
extended_cost
asset_gl_account
from_location
```

Each report should retain its unique fields:

| Report | Report-specific fields |
| --- | --- |
| Consumption Log | `technician`, `reference`, `memo`, `bldg_unit`, `quantity`, `consumption_gl_account`, `tax_discount_shipping_amount` |
| Inventory Transfer | `transferred_to`, `to_location`, `units_transferred`, `description` |

The transfer-destination join should be implemented as an optional query fragment. It should be included for Inventory Transfer and excluded from the base query used by Consumption Log.

This approach is expected to provide approximately **85–90% reuse in the SQL foundation**, subject to feasibility validation and implementation constraints.

**Related work:**

- [DEV-209587 — Engineering research / consolidation analysis](https://entrata.atlassian.net/browse/DEV-209587)
- [DEV-191990 — Asset Tracking Reporting Consolidation](https://entrata.atlassian.net/browse/DEV-191990)

**Report locations:** Entrata Core → Reports (AP GL & Facilities) → Asset Operations / inventory reporting.

**Epic UX:** UX Not Needed — use existing report patterns. No dedicated epic-level design work is required unless implementation changes the report interaction model.

---

## Business value

Consolidating these reports should reduce duplicated engineering logic and make asset-transaction reporting easier to maintain and extend. Users should continue to receive the fields they need for consumption or transfer analysis, while the shared foundation improves consistency for dates, locations, catalog items, costs, GL accounts, and period filtering.

### Expected outcomes

- One shared query foundation for consumption and transfer transactions.
- Consistent canonical fields and filter behavior across both reports.
- Approximately 85–90% SQL-foundation reuse, if confirmed by Q/R.
- No loss of report-specific fields required by existing users.
- Lower future maintenance cost for asset-transaction reporting.
- Consistent screen and export results for both transaction types.

## In scope

- Feasibility confirmation based on DEV-209587 research.
- Common transaction query builder with transaction-type input.
- Shared canonical asset-transaction fields.
- Reuse of catalog item, property, asset location, period, GL mask, and transaction-level filtering logic.
- Consumption Log output using the Consumption-specific fields.
- Inventory Transfer output using the Transfer-specific fields.
- Optional transfer-destination join fragment.
- Existing report permissions, property scoping, screen behavior, and export behavior.
- Regression and parity testing against the existing reports.

## Out of scope

- Redesign of either report’s user interface.
- Changes to asset transaction creation, posting, inventory accounting, or GL calculations.
- Removal of required Consumption Log or Inventory Transfer columns.
- Merging unrelated asset reports into this Epic.
- Changes to transaction history or source-of-truth data.
- Deprecation or removal of either report before usage, support, and release decisions are completed.

## User stories

| Story | As a… | I want… | So that… |
| --- | --- | --- | --- |
| 1 | AP / inventory analyst | one consistent reporting foundation for consumption and transfer transactions | I can trust shared dates, locations, costs, and GL context across reports. |
| 2 | Consumption Log user | all existing Consumption Log fields and filters | I can continue reviewing inventory consumption without losing operational detail. |
| 3 | Inventory Transfer user | all existing transfer fields, including destination information | I can trace inventory movement between locations and properties. |
| 4 | Reporting engineer | a transaction-type-driven query builder | I can reduce duplicated SQL and safely extend asset-transaction reporting. |
| 5 | QA / peer tester | parity checks against the existing reports | I can confirm consolidation does not change expected results or permissions. |

## Nonfunctional requirements

| Area | Requirement |
| --- | --- |
| Correctness | Results must match the existing report behavior for the same transaction type, filters, property scope, and period. |
| Performance | The shared query must meet or improve current Consumption Log and Inventory Transfer performance baselines. |
| Maintainability | Shared fields and joins belong in the common query builder; report-specific fields remain in report-specific extensions. |
| Security | Existing permissions, GL masking, and property-access rules must remain unchanged. |
| Export parity | Screen, Excel, PDF, scheduled, and saved-report outputs must retain the applicable report-specific fields and filters. |
| Null handling | Missing destination, location, GL, catalog, or optional transaction values must follow current report behavior. |

## Success measures

| Objective | Success | How to measure | Deadline |
| --- | --- | --- | --- |
| Shared foundation | Common builder supports both transaction types | Code review and Q/R implementation checklist | Before implementation complete |
| SQL reuse | Approximately 85–90% reuse in the SQL foundation, or documented variance | Engineering comparison of shared vs. report-specific query logic | During implementation |
| Report parity | Existing report outputs remain accurate | Side-by-side comparison using representative data and filters | Before peer sign-off |
| No regression | Permissions, filters, exports, totals, and performance remain acceptable | Regression and peer-testing evidence | Before release |
| Maintainability | Future transaction-type changes can be made in the shared layer where applicable | Engineering review and documentation | Before Epic closure |

## Dependencies and assumptions

- DEV-209587 contains the completed engineering research and is the primary technical reference.
- Existing report query and export behavior can be accessed for baseline comparison.
- `CAssetTransactionType::CONSUME` and `CAssetTransactionType::ASSET_TRANSFER` are the applicable transaction-type values, subject to engineering confirmation.
- The transfer destination data is available through a join that can be added conditionally.
- Product and engineering will confirm whether the final user experience is a single combined report, a shared report implementation with separate report entries, or another catalog presentation. The implementation must preserve report-specific output requirements regardless of catalog presentation.

## Definition of Done for the Epic

- [ ] Feasibility is confirmed against DEV-209587 and any gaps are documented.
- [ ] Common transaction query builder supports Consumption and Inventory Transfer transaction types.
- [ ] Canonical shared fields are implemented and validated.
- [ ] Report-specific fields remain available in the correct report output.
- [ ] Transfer destination join is optional and is not unnecessarily applied to Consumption Log.
- [ ] Existing filters, permissions, GL masks, property scoping, and period behavior are preserved.
- [ ] Screen and export outputs are validated for both reports.
- [ ] Peer testing is completed and evidence is attached to the Jira tasks.
- [ ] Performance and regression checks pass.
- [ ] Release notes, help content, or deprecation messaging are updated if the report catalog experience changes.

---

## Child Jira tasks

### 1. Q/R — Feasibility: Combine Consumption Log + Inventory Transfer

**Suggested task title:** `Q/R - Confirm feasibility for Consumption Log + Inventory Transfer consolidation`

**Description:**

Validate the feasibility of consolidating Consumption Log and Inventory Transfer using a shared asset-transaction query foundation. Use the completed engineering research in [DEV-209587](https://entrata.atlassian.net/browse/DEV-209587) as the baseline. Focus the Q/R task on confirming current assumptions, identifying implementation gaps, and documenting the recommended delivery shape rather than repeating the original research.

**Research scope:**

- Confirm the common source tables, joins, filters, permissions, and GL masking behavior.
- Confirm the transaction-type values for Consume and Asset Transfer.
- Confirm the canonical shared fields and their current source expressions.
- Identify all report-specific fields and any fields that cannot be safely shared.
- Confirm that the transfer destination join can be applied as an optional fragment.
- Compare current query, screen, and export paths for both reports.
- Validate the expected 85–90% SQL-foundation reuse estimate.
- Identify performance, data-quality, null-handling, or permission risks.
- Recommend whether the user-facing outcome should be one combined report or a shared implementation behind separate report entries.

**Acceptance criteria:**

- [ ] DEV-209587 research is reviewed and linked in the task evidence.
- [ ] Shared tables, joins, filters, and canonical fields are documented.
- [ ] Consumption-specific and Transfer-specific fields are documented.
- [ ] Transaction-type parameter approach is confirmed or a replacement approach is documented.
- [ ] Optional transfer-destination join approach is confirmed or a risk is recorded.
- [ ] Reuse estimate is validated or the variance is explained.
- [ ] Performance, permissions, exports, and regression risks are listed with mitigations.
- [ ] Implementation task is updated with the confirmed technical approach and dependencies.
- [ ] Product and engineering agree on the recommended delivery shape.

**Deliverable:** Feasibility note or attached engineering analysis with implementation recommendation, risks, and updated acceptance criteria for the implementation task.

### 2. Implementation — Shared asset-transaction reporting foundation

**Suggested task title:** `Implementation - Combine Consumption Log + Inventory Transfer reports`

**Description:**

Implement the approved Q/R approach by creating a common transaction query builder driven by transaction type. Reuse the shared asset-transaction logic for catalog items, properties, asset locations, period filters, GL account masks, and canonical transaction fields. Keep report-specific fields in the appropriate report extension. Apply the transfer destination join only for Inventory Transfer.

**Implementation requirements:**

- [ ] Add transaction-type input for Consume and Asset Transfer.
- [ ] Return the canonical shared fields:
  - [ ] `catalog_item`
  - [ ] `property_name`
  - [ ] `transaction_date`
  - [ ] `post_month`
  - [ ] `item_number`
  - [ ] `unit_cost`
  - [ ] `extended_cost`
  - [ ] `asset_gl_account`
  - [ ] `from_location`
- [ ] Preserve Consumption Log fields:
  - [ ] `technician`
  - [ ] `reference`
  - [ ] `memo`
  - [ ] `bldg_unit`
  - [ ] `quantity`
  - [ ] `consumption_gl_account`
  - [ ] `tax_discount_shipping_amount`
- [ ] Preserve Inventory Transfer fields:
  - [ ] `transferred_to`
  - [ ] `to_location`
  - [ ] `units_transferred`
  - [ ] `description`
- [ ] Implement the transfer destination join as an optional query fragment.
- [ ] Preserve existing report filters, property scoping, permissions, GL masks, and period behavior.
- [ ] Preserve screen, Excel, PDF, scheduled, and saved-report output behavior.
- [ ] Add or update automated tests for both transaction types, optional joins, null values, and representative filters.
- [ ] Document the shared query builder and report-specific extensions.

**Acceptance criteria:**

- [ ] Consumption Log returns the expected rows and all required Consumption-specific fields.
- [ ] Inventory Transfer returns the expected rows and all required Transfer-specific fields.
- [ ] Transaction type selects the correct transaction population without cross-contamination.
- [ ] Consumption Log does not require or execute the transfer-only destination join unless explicitly needed by the approved design.
- [ ] Shared canonical fields match the existing report values for equivalent filters.
- [ ] Existing report permissions and GL masking behavior are unchanged.
- [ ] Screen and export outputs remain consistent with the approved field definitions.
- [ ] Automated tests pass.
- [ ] Performance is within the agreed baseline.
- [ ] Code review confirms shared logic is centralized and report-specific logic is appropriately isolated.

### 3. Peer Testing — Consolidated Consumption Log + Inventory Transfer

**Suggested task title:** `Peer Testing - Validate Consumption Log + Inventory Transfer consolidation`

**Description:**

Perform peer testing for both reports after implementation. Validate data parity, report-specific fields, shared filters, permissions, GL masks, screen/export consistency, and performance against the current report behavior. Attach test evidence, sample outputs, and defects to the task.

**Peer-testing coverage:**

- [ ] Run Consumption Log with date-range and post-month filters.
- [ ] Run Inventory Transfer with date-range and post-month filters.
- [ ] Validate property and asset-location filtering.
- [ ] Validate catalog item filtering.
- [ ] Validate Consume and Asset Transfer transaction populations separately.
- [ ] Validate shared fields: catalog item, property, dates, post month, item number, unit cost, extended cost, GL account, and from location.
- [ ] Validate Consumption-specific fields, including quantity and consumption GL account.
- [ ] Validate Transfer-specific fields, including transferred-to, to-location, and units transferred.
- [ ] Validate transfer rows with missing or optional destination data.
- [ ] Validate GL account masking and user permissions.
- [ ] Compare results with the existing Consumption Log and Inventory Transfer reports for equivalent criteria.
- [ ] Compare on-screen results with Excel/PDF/exported results where supported.
- [ ] Check row counts, duplicate rows, totals, null handling, and date boundaries.
- [ ] Run a performance comparison using representative high-volume criteria.
- [ ] Confirm no regression to unrelated asset reports or shared report filters.

**Acceptance criteria:**

- [ ] All planned peer-test scenarios are executed and evidence is attached.
- [ ] Results match the approved parity baseline, or documented deltas are accepted by Product and Engineering.
- [ ] No critical or high-severity defects remain open for release.
- [ ] Any field, filter, permission, export, or performance defect has a linked Jira defect.
- [ ] Product, Engineering, and QA/peer tester sign off on the implementation.
- [ ] Release readiness is recorded, including any documentation or training updates required by the catalog change.

---

## Open decisions before Epic closure

- Does the user-facing experience become one combined report, or do Consumption Log and Inventory Transfer remain separate report entries backed by shared implementation?
- Should the combined experience use a report-type selector, transaction-type toggle, or another existing reporting pattern?
- Are any legacy report columns intentionally renamed, reordered, or deprecated?
- Are report-specific filters required in the combined experience, or should they remain scoped to each report mode?
- Is a migration, redirect, or in-product message required for existing report users?

## Source references

- [DEV-209587 — Engineering research / consolidation analysis](https://entrata.atlassian.net/browse/DEV-209587)
- [DEV-191990 — Asset Tracking Reporting Consolidation](https://entrata.atlassian.net/browse/DEV-191990)
- [Consumption Log report reference](../../knowledge/reference/ap-reports/by-report/consumption_log.md)
- [Inventory Transfer report reference](../../knowledge/reference/ap-reports/by-report/inventory_transfer.md)

## Change log

| Date | Change | Reason |
| --- | --- | --- |
| 2026-09-09 | Created Jira-ready Epic and three child-task templates for Consumption Log + Inventory Transfer consolidation. | Capture the proposed shared asset-transaction approach and convert the completed DEV-209587 research into an actionable delivery structure. |
