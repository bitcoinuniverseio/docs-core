// One reader for the protocol registry snapshot, used by every page that
// states a protocol fact.
//
// The snapshot in capability-snapshot.json is generated from the Core
// protocol registry (backend/packages/ecosystem-contracts/lib/protocols.js)
// by the ecosystem-registry package in bitcoinuniverseio/docs-platform. Its
// provenance block names the exact Core commit it was taken from.
//
// Nothing on this site may state a protocol capability that is not in this
// file. That is the whole point of reading it here rather than writing the
// same claim into prose that can age.

import snapshot from './capability-snapshot.json' with { type: 'json' };

export const provenance = snapshot.provenance;
export const counts = snapshot.counts;

/** Every protocol in the registry, marketplace or not, in registry order. */
export const protocols = Object.values(snapshot.protocols);

/** The 29 protocols that have a marketplace policy. */
export const marketplaceProtocols = protocols.filter((p) => p.marketplace !== null);

/** The protocols Core reads but never trades. */
export const readOnlySurfaceProtocols = protocols.filter((p) => p.marketplace === null);

/** The 13 marketplace capability actions, in registry order. */
export const ACTIONS = [
  'view',
  'view-collection',
  'view-activity',
  'list',
  'update-listing',
  'unlist',
  'buy',
  'make-offer',
  'accept-offer',
  'cancel-offer',
  'sell',
  'settle',
  'reconcile',
];

/** Short labels for the action ids, for a column header that has to fit. */
export const ACTION_LABELS = {
  view: 'View',
  'view-collection': 'View collection',
  'view-activity': 'View activity',
  list: 'List',
  'update-listing': 'Update listing',
  unlist: 'Delist',
  buy: 'Buy',
  'make-offer': 'Make offer',
  'accept-offer': 'Accept offer',
  'cancel-offer': 'Cancel offer',
  sell: 'Sell',
  settle: 'Settle',
  reconcile: 'Reconcile',
};

/**
 * What each availability value means for a reader, in one sentence each.
 * These are the definitions the whole site uses. They are not in the
 * registry: the registry gives the value, this gives the reading.
 */
export const AVAILABILITY = {
  enabled: {
    label: 'Enabled',
    tone: 'live',
    meaning:
      'Switched on in the shipped build. The actions marked supported below are the ones Core can execute.',
  },
  'feature-gated': {
    label: 'Feature-gated',
    tone: 'stale',
    meaning:
      'Implemented, but switched off unless an operator enables its feature gate. Treat it as unavailable until you can see it working.',
  },
  'read-only': {
    label: 'Read-only',
    tone: 'stale',
    meaning:
      'You can see it but you cannot trade it. Core reads the protocol and shows it; no marketplace mutation is available.',
  },
  'feature-gated-testnet-only': {
    label: 'Gated, testnet only',
    tone: 'stale',
    meaning:
      'Behind a feature gate and confined to a test network. There is no mainnet trading.',
  },
};

/** What the execution mode tells a reader about who does the work. */
export const MODE = {
  'in-app-execution': 'Core builds and validates the transaction; your wallet signs it.',
  'external-execution':
    'An external marketplace or provider owns the order book and the execution path; Core routes to it.',
  'read-only': 'Reads only. No execution path is deployed.',
  'live-read-only':
    'Live reads against a real index, with no production execution path.',
  'trade-preview-only':
    'A trade can be previewed but never signed or broadcast: there is no signer.',
  'psbt-routing-only':
    'Signed PSBTs are validated and routed. Core never funds, signs, or broadcasts settlement.',
};

export function byId(id) {
  const found = snapshot.protocols[id];
  if (!found) throw new Error(`Unknown protocol id: ${id}`);
  return found;
}

/** Slug used for a protocol's detail page. */
export function slugFor(id) {
  return id.replace(/_/g, '-');
}

export function supportedActions(protocol) {
  return new Map(
    (protocol.marketplace?.actions.supported ?? []).map((a) => [a.action, a.mode]),
  );
}

export function unsupportedReasons(protocol) {
  return new Map(
    (protocol.marketplace?.actions.unsupported ?? []).map((a) => [a.action, a.reason]),
  );
}

/** Counts used on the matrix page, computed rather than written down. */
export function availabilityCounts() {
  const tally = {};
  for (const p of marketplaceProtocols) {
    const key = p.marketplace.availability;
    tally[key] = (tally[key] ?? 0) + 1;
  }
  return tally;
}

/** How many marketplace protocols can execute a given action. */
export function actionSupportCount(action) {
  return marketplaceProtocols.filter((p) =>
    p.marketplace.actions.supported.some((a) => a.action === action),
  ).length;
}

export function chains() {
  return [...new Set(protocols.map((p) => p.chain))].sort();
}
