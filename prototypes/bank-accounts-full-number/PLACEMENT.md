# Placement — Bank Accounts Full Account Number

## Prototype-only files

- `index.tsx` — interactive Bank Accounts report mockup and display-mode behavior
- `styles.css` — prototype styling matching the current legacy report layout
- `metadata.json` — Product OS prototype discovery metadata

## Suggested production placement

The production change should be made in the existing Bank Accounts report feature under the Reports (AP GL & Facilities) module.

- Report view/table component: existing Bank Accounts report table
- Account number field mapping: preserve the existing account-number source field; change only presentation/output masking behavior
- Export serializer: apply the same full-versus-masked display rule as the on-screen table
- Permissions/configuration: confirm whether full account numbers are available to all users who can run the report or require a permission/feature flag

## Data handling

The prototype uses representative account numbers only. Do not copy prototype values into production or log full account numbers. Full values should be handled only in authorized report responses and exports.
