# Bank Accounts Report — Full Bank Account Number

## Description for Jira Task

The Bank Accounts report currently masks bank account numbers and displays only the last four digits. The client requested that the report display the complete bank account number.

This change is limited to the Bank Accounts report presentation and export behavior. Existing report columns, filters, reconciliation fields, and account data should remain unchanged.

**Ticket context:** P2 · AP Reporting · Entrata Core > Reports (AP GL & Facilities)  
**Property:** Peak Campus CORPORATE  
**Database:** `entrata79`  
**Environment:** Standard

## Report name

Bank Accounts

## Report Version - New / Existing

Existing report — current version shown in the supplied screenshot and workbook: **Bank Accounts 1.4**.

## Mock-up link

Prototype path:

`prototypes/bank-accounts-full-number/`

Run locally:

```text
http://localhost:5174/prototypes/bank-accounts-full-number
```

The prototype includes a full/masked display toggle to compare the requested behavior with the current behavior.

## User story

As an authorized user of the Bank Accounts report, I want to see the complete bank account number so that I can identify and reconcile the correct bank account without relying only on the last four digits.

## Requirements

- Change the `ACCOUNT NUMBER` column to display the complete account number for authorized users.
- Preserve the existing Bank Accounts report layout and column order.
- Preserve the existing `ACCOUNT NAME/ID`, `BANK ID`, `BANK NAME`, `ACCOUNT TYPE`, `ROUTING NUMBER`, `PROPERTY/OWNING ENTITY`, `STATUS`, `GL ACCOUNT`, `MERCHANT ACCOUNT`, `ACCOUNT SUBTYPE`, `ACH ENABLED`, `ASSOCIATED PROPERTIES`, reconciliation, ledger, and reconciled-through columns.
- Apply the same approved full/masked behavior to Excel, PDF, scheduled, and saved-report outputs.
- Do not expose full account numbers in URLs, logs, analytics events, error messages, or application telemetry.
- Apply the existing report permissions. Confirm whether a separate sensitive-financial-data permission or feature flag is required.
- Retain masked display as the fallback behavior for users who are not authorized to view full account numbers.

## Expected Behaviour - Tie-outs, Calculations, Layouts

- No calculations or tie-outs change; this is a display/output change only.
- The `ACCOUNT NUMBER` value must match the stored bank account number for the selected account.
- Routing number remains unchanged.
- The complete account number is displayed in the existing Account Number column without changing the position of other columns.
- Existing horizontal scrolling continues to expose all columns.
- On-screen and exported results must show consistent account-number values according to the approved masking policy.
- Existing row count, account status, reconciliation values, and report totals remain unchanged.
- Account numbers must remain text/string values so leading zeroes are preserved.

## Current Behaviour

- The Bank Accounts report displays only the last four digits of the account number, for example `••••7365` or `******7365`.
- The screenshot shows the current masked Account Number column between Routing Number and Property/Owning Entity.
- The supplied workbook contains the Bank Accounts 1.4 report structure and report parameters, but does not establish a full-number display requirement.

## Product screen, data source

**Product screen:** Entrata Core → Reports (AP GL & Facilities) → Accounting → Bank Accounts.

**Data source:** Existing Bank Accounts report query/service and account-number field. Use the existing source of truth; do not derive or reconstruct the number from masked output.

**Client context:** Peak Campus CORPORATE · client ID `15647` · database `entrata79`.

## Acceptance criteria

- [ ] For an authorized user, the Account Number column displays the complete bank account number.
- [ ] For an unauthorized user, the Account Number column remains masked or the report is unavailable, according to the approved permission policy.
- [ ] Account numbers with leading zeroes display correctly.
- [ ] Existing report columns and order remain unchanged.
- [ ] Routing Number values remain unchanged.
- [ ] Excel export follows the approved full/masked behavior.
- [ ] PDF export follows the approved full/masked behavior.
- [ ] Scheduled and saved reports follow the approved full/masked behavior.
- [ ] Search, filters, sorting, scrolling, and existing report actions continue to work.
- [ ] No full account numbers appear in logs, URLs, telemetry, or error messages.
- [ ] QA validates the report for Peak Campus CORPORATE in the Standard environment.
- [ ] QA confirms no row count or reconciliation-field regressions.

## Definition of Done

- [ ] Production implementation is complete in the existing Bank Accounts report path.
- [ ] Permission/feature-flag behavior is documented and implemented.
- [ ] UI and export outputs are consistent with the approved masking policy.
- [ ] Unit and integration tests cover full numbers, masked numbers, leading zeroes, empty/null values, and unauthorized access.
- [ ] QA test evidence is attached to the Jira task.
- [ ] Security/privacy review is completed for full account-number exposure.
- [ ] Regression testing passes for existing Bank Accounts columns and report parameters.
- [ ] Product and client-facing review is complete.
- [ ] Release notes or support documentation are updated if required.

## Reference - Videos links, Slack thread links, Task links

- Existing mockup: [Google Sheets — Bank Accounts](https://docs.google.com/spreadsheets/d/1oN9GfYqSxOvzviecY0spzXFIzGd1UtN6Go4X2gKjtx0/edit?usp=sharing)
- Current behavior screenshot: `Screenshot 2026-08-12 at 9.46.54 PM (2).png`
- Client login context: [Client Admin login](https://clientadmin.entrata.com/?module=clients-new&action=login_user&client_id=15647)
- Prototype engineering handoff: [DEV-Bank-Accounts-Full-Account-Number-Engineering-Handoff.md](./DEV-Bank-Accounts-Full-Account-Number-Engineering-Handoff.md)
- Production Jira task: add the DEV issue link here once the Jira key is assigned.
- Zendesk/support attachment: link from the Jira Zendesk Support tab.
- Slack thread: add the relevant AP Reporting thread link if available.

## Open decisions before development

- Should full account numbers be available to all Bank Accounts report users or only users with a sensitive-financial-data permission?
- Should exports always contain the full number, or should export behavior follow the on-screen display mode?
- Should scheduled reports and saved reports support full account numbers?
- Is a feature flag required for rollout to Peak Campus first?
