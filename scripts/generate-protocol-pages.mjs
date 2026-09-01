// Generates one page per marketplace protocol from the registry snapshot.
//
// The pages are stubs on purpose. Their frontmatter is derived from the
// registry so a title or a description cannot drift from what the registry
// says, and their body is a single component that reads the same data at
// build time. There is no prose in these files for a maintainer to forget to
// update.
//
// Run: node scripts/generate-protocol-pages.mjs
// Check: node scripts/check-protocol-matrix.mjs  (regenerates and diffs)

import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import {
  marketplaceProtocols,
  AVAILABILITY,
  slugFor,
  supportedActions,
} from '../src/data/registry.mjs';

const OUT = fileURLToPath(new URL('../src/content/docs/protocols/detail/', import.meta.url));

function description(p) {
  const availability = AVAILABILITY[p.marketplace.availability].label.toLowerCase();
  const supported = supportedActions(p);
  const tradable = supported.has('buy') || supported.has('list');
  const verb = tradable
    ? `${supported.size} of the 13 marketplace actions are supported`
    : 'no trading action is supported';
  return `${p.displayName} on ${p.chain} in Core: ${availability}, ${verb}. The registry's source of truth, indexer, freshness, confirmation, and reorg policy, and its stated reason for every action that is unavailable.`;
}

function page(p) {
  const slug = slugFor(p.id);
  return `---
title: ${p.displayName}
description: >-
  ${description(p)}
sidebar:
  order: ${String(marketplaceProtocols.indexOf(p) + 1).padStart(2, '0')}
---

import ProtocolDetail from '../../../../components/ProtocolDetail.astro';
import Provenance from '../../../../components/Provenance.astro';

<Provenance
  repo="bitcoinuniverseio/core (private)"
  source="backend/packages/ecosystem-contracts/lib/protocols.js"
  chain="${p.chain}"
  network="mainnet"
  lifecycle="${p.marketplace.availability}"
  verified="2026-09-01"
/>

<ProtocolDetail id="${p.id}" />

## Read this alongside

- [The support matrix](/docs-core/protocols/support-matrix/), for how ${p.displayName} compares with the other 28 marketplace protocols.
- [How to read a protocol row](/docs-core/protocols/how-to-read/), for what each value on this page means.
- [Market safety](/docs-core/wallets/market-safety/), before acting on anything here.
`;
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const p of marketplaceProtocols) {
  await writeFile(path.join(OUT, `${slugFor(p.id)}.mdx`), page(p), 'utf8');
}

const written = (await readdir(OUT)).length;
console.log(`Generated ${written} protocol pages in src/content/docs/protocols/detail/`);
