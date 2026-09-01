// Generates the social preview card and the robots.txt / llms.txt files that
// have to carry absolute URLs.
//
// The card is drawn here rather than checked in as a binary, so it stays in
// step with the figures it quotes: those come from the registry snapshot, the
// same source the support matrix reads.
//
// Run: node scripts/build-assets.mjs

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import {
  counts,
  availabilityCounts,
  actionSupportCount,
} from '../src/data/registry.mjs';

const SITE = 'https://bitcoinuniverseio.github.io/docs-core';
const publicDir = fileURLToPath(new URL('../public/', import.meta.url));

const tally = availabilityCounts();
const gated = (tally['feature-gated'] ?? 0) + (tally['feature-gated-testnet-only'] ?? 0);

// ---------------------------------------------------------------- social card
const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#131c22"/>
  <g stroke="#27353d" stroke-width="1">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="${(i + 1) * 52}" x2="1200" y2="${(i + 1) * 52}"/>`).join('')}
  </g>
  <rect x="0" y="0" width="1200" height="6" fill="#4fd1c5"/>
  <text x="80" y="150" fill="#8fa0a9" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="22" letter-spacing="4">BITCOIN UNIVERSE</text>
  <text x="80" y="248" fill="#f2f6f8" font-family="ui-sans-serif, system-ui, Segoe UI, Roboto, sans-serif" font-size="94" font-weight="700">Core documentation</text>
  <text x="80" y="312" fill="#b3c0c7" font-family="ui-sans-serif, system-ui, Segoe UI, Roboto, sans-serif" font-size="30">Explorer, portfolio, activity, and marketplace for Bitcoin and Dogecoin.</text>
  <text x="80" y="356" fill="#b3c0c7" font-family="ui-sans-serif, system-ui, Segoe UI, Roboto, sans-serif" font-size="30">Every figure traced to the reader it came from.</text>

  ${[
    { label: 'PROTOCOLS', value: String(counts.protocols), note: 'in the registry' },
    { label: 'MARKETPLACE', value: String(counts.marketplaceProtocols), note: 'with a policy' },
    { label: 'ENABLED', value: String(tally.enabled ?? 0), note: 'in the build' },
    { label: 'FEATURE-GATED', value: String(gated), note: 'switched off' },
    { label: 'READ-ONLY', value: String(tally['read-only'] ?? 0), note: 'never traded' },
    { label: 'SUPPORT BUY', value: String(actionSupportCount('buy')), note: 'declared' },
  ]
    .map((stat, i) => {
      const x = 80 + i * 178;
      return `
  <rect x="${x}" y="424" width="162" height="130" fill="#18232a" stroke="#27353d"/>
  <text x="${x + 16}" y="454" fill="#8fa0a9" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="14" letter-spacing="1.6">${stat.label}</text>
  <text x="${x + 16}" y="510" fill="#4fd1c5" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="52" font-weight="700">${stat.value}</text>
  <text x="${x + 16}" y="536" fill="#8fa0a9" font-family="ui-sans-serif, system-ui, sans-serif" font-size="16">${stat.note}</text>`;
    })
    .join('')}
</svg>`;

await sharp(Buffer.from(card)).png({ compressionLevel: 9 }).toFile(`${publicDir}social-card.png`);

// ------------------------------------------------------------------- robots
await writeFile(
  `${publicDir}robots.txt`,
  `# Core documentation, bitcoinuniverseio/docs-core
User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap-index.xml
`,
  'utf8',
);

// ------------------------------------------------------------------ llms.txt
await writeFile(
  `${publicDir}llms.txt`,
  `# Core

> Product documentation for Core, the Bitcoin Universe explorer, portfolio,
> activity, and marketplace application at https://www.bitcoinuniverse.io.
> Core reads Bitcoin and Dogecoin and the metaprotocol assets carried on them.
> It is non-custodial: keys stay in the reader's own wallet.

Core has no semantic version. Its release identifier is the exact commit a
deployment was built from, returned in the \`release\` field of
https://api.bitcoinuniverse.io/health and in the \`X-Universe-Release\` header
on every response.

The protocol registry holds ${counts.protocols} protocols, of which ${counts.marketplaceProtocols} have a marketplace policy: ${tally.enabled ?? 0} enabled, ${gated} feature-gated, and ${tally['read-only'] ?? 0} read-only. ${actionSupportCount('buy')} declare buy support, and none supports the \`sell\` action.

Code presence is not released capability. A route existing is not production
availability, and a parser existing is not wallet support. Where a protocol is
recorded read-only, it can be seen and not traded. Where it is feature-gated,
it is implemented and switched off unless an operator enables it.

## Start here

- [What Core is](${SITE}/start/what-core-is/): the four surfaces, and what Core deliberately does not do.
- [Your first five minutes](${SITE}/start/first-five-minutes/): a guided walk with no wallet connected.
- [Safety in sixty seconds](${SITE}/start/safety/): the six things to know before a first transaction.
- [Reading the numbers](${SITE}/start/reading-the-numbers/): unknown is not zero, empty is not unavailable.
- [Product tour](${SITE}/start/product-tour/): real captures of the running product.

## Protocol support

- [The support matrix](${SITE}/protocols/support-matrix/): all ${counts.marketplaceProtocols} marketplace protocols against all 13 marketplace actions, generated from the Core registry.
- [How to read a protocol row](${SITE}/protocols/how-to-read/): what availability, execution mode, freshness, confirmation and reorg mean.
- [Confirmation and reorg policy](${SITE}/protocols/confirmation-and-reorg/): settlement depth and reconciliation, per protocol.
- [Indexer sources of truth](${SITE}/protocols/indexer-sources/): which index answers which question.
- [Coverage beyond the marketplace](${SITE}/protocols/coverage/): the nine protocols with no marketplace at all.

## Explorer

- [Search](${SITE}/explorer/search/): what is recognised, and the exact, likely and candidate confidence levels.
- [Blocks](${SITE}/explorer/blocks/): the verified chain tip, and why there is no block detail page.
- [Transactions](${SITE}/explorer/transactions/): the public transaction endpoint and broadcast handling.
- [Addresses](${SITE}/explorer/addresses/): confirmed and mempool totals kept apart.
- [UTXOs](${SITE}/explorer/utxos/): why the outpoint is the unit that matters.
- [Asset-bearing outputs](${SITE}/explorer/asset-bearing-outputs/): how a valid transaction destroys an asset, and what Core refuses.
- [Protocol assets](${SITE}/explorer/protocol-assets/): identity, naming, and verified media.
- [Protocol indexes](${SITE}/explorer/protocol-indexes/): the per-protocol catalogs.

## Portfolio and markets

- [Portfolio](${SITE}/portfolio/portfolio/)
- [Activity](${SITE}/portfolio/activity/)
- [Task: manage assets from Portfolio](${SITE}/portfolio/manage-assets/)
- [How a market works](${SITE}/markets/how-markets-work/)
- [Browsing a market](${SITE}/markets/browsing/)
- [Task: buy a listing](${SITE}/markets/buy/)
- [Task: list an asset](${SITE}/markets/list/)
- [Task: update or delist](${SITE}/markets/update-and-delist/)
- [Collection markets](${SITE}/markets/collection-markets/)
- [Task: add an Ordinals collection](${SITE}/markets/collection-imports/)
- [Ordex](${SITE}/markets/ordex/)
- [Atomicals](${SITE}/markets/atomicals/)
- [Marketplace v1 gates](${SITE}/markets/marketplace-v1/)
- [Collection media](${SITE}/markets/collection-media/)

## Data provenance

- [Where each number comes from](${SITE}/data/provenance/)
- [Indexer freshness](${SITE}/data/indexer-freshness/)
- [Bitcoin and Dogecoin data](${SITE}/data/chain-data/)
- [The public reader boundary](${SITE}/data/reader-boundary/)
- [Fiat prices](${SITE}/data/fiat-prices/)

## Wallets and signing

- [Connecting a wallet](${SITE}/wallets/connecting/)
- [Transaction safety](${SITE}/wallets/transaction-safety/)
- [Market safety](${SITE}/wallets/market-safety/)
- [Private chat verification](${SITE}/wallets/chat-verification/)

## Public API

- [What is public](${SITE}/api/overview/): the 13 verified unauthenticated read endpoints.
- [Health and readiness](${SITE}/api/health/): why a 200 is not readiness.
- [OpenAPI reference](${SITE}/api/reference/)
- [Public integrations](${SITE}/api/integrations/)
- OpenAPI document: ${SITE}/openapi/core-public-read.json

## Interface quality

- [Design and accessibility](${SITE}/quality/design-and-accessibility/)
- [Responsive behaviour](${SITE}/quality/responsive/)
- [Performance](${SITE}/quality/performance/)
- [Release evidence](${SITE}/quality/release-evidence/)

## Troubleshooting and reference

- [Troubleshooting](${SITE}/troubleshooting/)
- [Market and reader states](${SITE}/troubleshooting/states/)
- [Wallet and signing problems](${SITE}/troubleshooting/wallet/)
- [Glossary](${SITE}/reference/glossary/)
- [Changelog](${SITE}/reference/changelog/)
- [Moved pages](${SITE}/reference/moved-pages/)
- [Support](${SITE}/reference/support/)

## Optional

- Live health: https://api.bitcoinuniverse.io/health
- Live per-protocol freshness: https://api.bitcoinuniverse.io/indexer-health
- The application: https://www.bitcoinuniverse.io (the bare domain redirects elsewhere)
- Repository: https://github.com/bitcoinuniverseio/docs-core
- Bitcoin Universe portal: https://docs.bitcoinuniverse.io
`,
  'utf8',
);

console.log('Wrote public/social-card.png, public/robots.txt, public/llms.txt');
