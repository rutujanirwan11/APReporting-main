#!/usr/bin/env node
// Preflight check for Playwright MCP. Fast, offline, no side effects.
//
// Exit 0  => ready to use
// Exit 1  => not ready; prints actionable message to stderr.
//
// Intended to be called by the design-critique skill before invoking
// Playwright MCP, so failures surface as a clear Slack message instead
// of a silent skip.

import { existsSync, readdirSync } from 'node:fs';
import { homedir, platform } from 'node:os';
import { join } from 'node:path';

function die(msg) {
  process.stderr.write(
    `Playwright MCP not available: ${msg}\n` +
    'Run `npm run setup:mcp` from the repo root.\n',
  );
  process.exit(1);
}

// Node version
const major = parseInt(process.versions.node.split('.')[0], 10);
if (major < 18) {
  die(`Node ${process.versions.node} detected, need Node 18+`);
}

// Chromium browser binary in Playwright's cache dir
function playwrightCacheDir() {
  if (platform() === 'darwin') {
    return join(homedir(), 'Library', 'Caches', 'ms-playwright');
  }
  if (platform() === 'win32') {
    return join(homedir(), 'AppData', 'Local', 'ms-playwright');
  }
  return join(homedir(), '.cache', 'ms-playwright');
}

const cache = playwrightCacheDir();
if (!existsSync(cache)) {
  die('Playwright browser cache not found');
}

let hasChromium = false;
try {
  hasChromium = readdirSync(cache).some((entry) => entry.startsWith('chromium'));
} catch {
  die(`cannot read Playwright cache at ${cache}`);
}
if (!hasChromium) {
  die('Chromium browser binary missing');
}

process.exit(0);
