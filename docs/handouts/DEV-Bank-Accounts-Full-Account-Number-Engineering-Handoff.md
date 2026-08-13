# Engineering Handoff: Bank Accounts — Full Account Number

## Prototype Location

**Repo:** `rutujanirwan11/APReporting-main`  
**Branch:** `feat/DEV-241765-management-fees-filter-page`  
**Path:** `prototypes/bank-accounts-full-number/`

**Link:** [APReporting-main repository](https://github.com/rutujanirwan11/APReporting-main)

## PLACEMENT.md Summary

See **PLACEMENT.md** in the prototype for the suggested production placement and data-handling guidance.

**Target repo:** Entrata Reports (AP GL & Facilities) production report module  
**Target path:** Existing Bank Accounts report table and export serializer  
**New dependencies:** None

## Request Summary

The Bank Accounts report currently masks account numbers and displays only the last four digits. The client request is to show the complete bank account number in the report.

**Ticket context:** P2 · AP Reporting · Entrata Core > Reports (AP GL & Facilities)  
**Property:** Peak Campus CORPORATE  
**Database:** `entrata79`  
**Environment:** Standard  
**Client feedback:** Show the full bank account number instead of only the last four digits.

## Key Decisions

- Keep the existing Bank Accounts report structure and column order; update only the Account Number presentation.
- Label the column `ACCOUNT NUMBER`, consistent with the existing report.
- The prototype defaults to full account numbers to demonstrate the requested behavior and includes a mask toggle for comparison and privacy review.
- On-screen and exported values should follow the same display rule; engineering should confirm whether export behavior is always full or follows a user/permission setting.
- Full account numbers are sensitive data. Access must follow the existing report permissions and should not be written to application logs, analytics events, screenshots, or error messages.
- Existing masked behavior remains available as a fallback until the security/permission decision is finalized.

## What's Done

- Recreated the current legacy Bank Accounts table layout from the supplied screenshot.
- Included the existing report fields: account name/ID, bank ID, bank name, account type, routing number, account number, property/owning entity, status, GL account, merchant account, account subtype, ACH enabled, associated properties, reconciliation settings, and reconciled-through date.
- Added full account number display using representative sample data.
- Added a full/masked display toggle, search, status filter, export feedback, print action, and horizontal scrolling.
- Added a visible `NEW` marker and explanatory note for the requested Account Number change.

## What's Not Done

- The prototype uses representative mock account numbers and does not connect to the Bank Accounts API or database.
- Production permission/feature-flag behavior is not defined.
- Export implementation is represented by an interaction only; engineering must wire the real Excel/PDF/export serializers.
- The Google Docs template could not be accessed from this environment; this handoff follows the workspace engineering-handoff template and the ticket details supplied in Jira.
- Accessibility, security review, audit logging, and masking policy still require engineering/QA validation.

## Acceptance Criteria

- [ ] The Account Number column displays the complete stored account number for an authorized user.
- [ ] The existing report columns and row behavior remain unchanged.
- [ ] Full account numbers are preserved in Excel/PDF exports according to the approved security policy.
- [ ] Unauthorized users continue to see masked values or are prevented from running the report, as determined by the permission decision.
- [ ] Routing numbers remain unchanged.
- [ ] Search, sorting, horizontal scrolling, and existing report filters continue to work.
- [ ] Full account numbers are not exposed in logs, telemetry, URLs, or error messages.
- [ ] QA verifies the behavior using Peak Campus CORPORATE / `entrata79` in Standard.

## Open Questions

- [ ] Should full account numbers be available to every user with Bank Accounts report access, or only users with a separate sensitive-financial-data permission?
- [ ] Should exports always contain the full number, or should export output follow the on-screen masked/full setting?
- [ ] Is a feature flag required for rollout and client enablement?
- [ ] Should the full number be available in scheduled reports and saved report outputs?
- [ ] Does audit logging need to record access to full account numbers without recording the values themselves?

## How to Run Locally

1. From the repository root, run `npm install`.
2. Run `npm run dev`.
3. Open `http://localhost:5174/prototypes/bank-accounts-full-number`.
4. Use `Full account numbers` / `Masked account numbers` to compare the requested and existing behaviors.

## Design Critique Score

**Score:** N/A  
**Notes:** The prototype intentionally follows the supplied legacy screenshot rather than introducing a new report visual language.
