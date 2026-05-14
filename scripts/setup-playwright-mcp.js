#!/usr/bin/env node
// Playwright MCP setup — idempotent, cross-platform, no external deps.
//
// Usage:
//   node scripts/setup-playwright-mcp.js                     (manual, full verification)
//   node scripts/setup-playwright-mcp.js --from-postinstall  (quiet, never fails install)

import { spawnSync } from 'node:child_process';

const fromPostinstall = process.argv.includes('--from-postinstall');
const isWin = process.platform === 'win32';

const ok = (m) => console.log(`\u2705 ${m}`);
const bad = (m) => console.log(`\u274C ${m}`);
const warn = (m) => console.log(`\u26A0\uFE0F  ${m}`);
const info = (m) => console.log(m);

function die(msg, detail) {
  if (fromPostinstall) {
    warn(msg);
    if (detail) info(detail);
    warn('Postinstall continuing — run `npm run setup:mcp` later to finish setup.');
    process.exit(0);
  }
  bad(msg);
  if (detail) info(detail);
  process.exit(1);
}

// --- Step 1: Node version ------------------------------------------------
const major = parseInt(process.versions.node.split('.')[0], 10);
if (major < 18) {
  bad(`Node ${process.versions.node} detected. Playwright MCP requires Node 18+.`);
  info('Install the latest LTS from https://nodejs.org, or via nvm:');
  info('  nvm install --lts && nvm use --lts');
  process.exit(fromPostinstall ? 0 : 1);
}
ok(`Node ${process.versions.node}`);

// --- Step 2: Chromium browser binary (idempotent) ------------------------
info('Installing Chromium for Playwright (skipped if already present)...');
const install = spawnSync(
  'npx',
  ['-y', 'playwright@latest', 'install', 'chromium'],
  { stdio: 'inherit', shell: isWin },
);
if (install.status !== 0) {
  die('Failed to install Chromium for Playwright.');
} else {
  ok('Chromium ready');
}

// --- Step 3: MCP package smoke test --------------------------------------
// Skipped in postinstall mode to keep `npm install` fast and offline-friendly.
// Explicit `npm run setup:mcp` runs the full end-to-end check.
if (fromPostinstall) {
  info('(Skipping MCP launch smoke test in postinstall — run `npm run setup:mcp` to verify end-to-end.)');
} else {
  info('Launching `@playwright/mcp@latest --help` to verify the package is fetchable...');
  const smoke = spawnSync(
    'npx',
    ['-y', '@playwright/mcp@latest', '--help'],
    { stdio: 'pipe', shell: isWin, timeout: 120_000, encoding: 'utf8' },
  );
  if (smoke.status !== 0) {
    const detail = (smoke.stderr || smoke.stdout || '').trim();
    die('@playwright/mcp smoke test failed.', detail || undefined);
  }
  ok('@playwright/mcp launches correctly');
}

// --- Done ----------------------------------------------------------------
console.log('');
ok('Playwright MCP setup complete.');
console.log('');
console.log('\u26A0\uFE0F  IMPORTANT: Fully quit Cursor (\u2318Q on macOS, File > Exit elsewhere)');
console.log('   and reopen it. A window reload is NOT enough — MCP servers only');
console.log('   register on full Cursor restart.');
