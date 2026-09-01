// The published protocol pages must be exactly what the generator produces
// from the pinned registry snapshot.
//
// This is the gate that makes the support matrix trustworthy. A maintainer who
// edits a protocol page by hand, or who updates the snapshot without
// regenerating, fails here rather than shipping a page that disagrees with the
// registry the application enforces.

import { execFileSync } from 'node:child_process';
import { readFile, readdir, cp, rm, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const PAGES = path.join(ROOT, 'src/content/docs/protocols/detail');

const backup = await mkdtemp(path.join(tmpdir(), 'docs-core-matrix-'));
await cp(PAGES, backup, { recursive: true });

const before = await snapshot(backup);

try {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts/generate-protocol-pages.mjs')], {
    stdio: 'pipe',
  });
} catch (error) {
  console.error('The protocol page generator failed:');
  console.error(error.stderr?.toString() || error.message);
  process.exit(1);
}

const after = await snapshot(PAGES);

const names = new Set([...before.keys(), ...after.keys()]);
const differences = [];
for (const name of [...names].sort()) {
  if (!before.has(name)) differences.push(`${name}: generated but not committed`);
  else if (!after.has(name)) differences.push(`${name}: committed but no longer generated`);
  else if (before.get(name) !== after.get(name)) differences.push(`${name}: content differs`);
}

await rm(backup, { recursive: true, force: true });

if (differences.length) {
  console.error('Protocol pages disagree with the registry snapshot:\n');
  for (const difference of differences) console.error(`  ${difference}`);
  console.error('\nRun: node scripts/generate-protocol-pages.mjs');
  process.exit(1);
}

const registry = JSON.parse(
  await readFile(path.join(ROOT, 'src/data/capability-snapshot.json'), 'utf8'),
);
if (after.size !== registry.counts.marketplaceProtocols) {
  console.error(
    `Expected ${registry.counts.marketplaceProtocols} protocol pages, found ${after.size}.`,
  );
  process.exit(1);
}

console.log(
  `Protocol pages match the snapshot: ${after.size} pages from Core commit ${registry.provenance.sourceCommit}.`,
);

async function snapshot(dir) {
  const map = new Map();
  for (const name of await readdir(dir)) {
    map.set(name, await readFile(path.join(dir, name), 'utf8'));
  }
  return map;
}
