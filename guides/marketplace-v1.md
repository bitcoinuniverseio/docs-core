# Marketplace v1

Marketplace v1 is Bitcoin Universe's fail-closed trading foundation for protocol assets. It gives
supported asset families a consistent listing, purchase, offer, settlement, and reorganization model
while keeping protocol-specific ownership and transaction rules authoritative.

## What the release candidate supports

- Executable, separately authenticated marketplace authorities for Ordinals, TAP, DMT, UNAT,
  Bitmap, Bitcoin Names, ARC-20, Atomicals NFTs, Realms, Subrealms, unified DROPS and OP_DROP,
  Ordex public asks, Dogecoin TAP, DRC-20, Doginals, and Tandem integrations.
- Wallet-reviewed prepared actions instead of hidden signing or custodial key handling.
- Durable listings, reservations, funded offers, broadcast lineage, confirmed settlement, and
  deterministic rollback where the protocol authority supports those operations.
- Protocol-specific explorers and capability messages that distinguish unavailable authority data
  from a confirmed empty result.
- Exact network, asset, amount, funding, and destination checks before an action can proceed.

Other protocol families remain visible only where their authoritative execution path is complete.
The application does not silently fall back to a generic transaction path for an unsupported asset.

### Availability profiles

Bitcoin Universe reports browsing availability separately from transaction availability. A
read-only release can keep portfolio and market views online while trading actions remain closed.
The public health response labels this state clearly instead of treating a healthy page as evidence
that transactions are ready.

A mutation-ready release has a stronger gate. Every one of the 29 supported protocol authorities
must report current, matching evidence for three consecutive refresh cycles before transaction
traffic can open. Any missing, stale, conflicting, or failed authority resets that gate and keeps
wallet mutations unavailable while read traffic can continue safely.

### Accurate activity and payment controls

Marketplace activity is dated from when the event was created, not from a later reconciliation
write. Batch settlements keep each trade row distinct even when several purchases share one Bitcoin
transaction. Portfolio and sell lists use the full transaction outpoint, so several outputs created
by one transaction remain separate and keep their own entered prices.

Legacy Launchpad, BRC-20 IDO, and BRC-20 presale payment actions remain unavailable until their
wallet-authorized settlement paths are ready. Each disabled payment control now states the reason
beside the button and exposes that explanation to assistive technology.

### Wallet request privacy

Universe Wallet sends its supported `/v5` requests and phishing-list download to the Bitcoin
Universe API origin. The compatibility gateway accepts only a fixed route and method list, removes
browser identity headers, refuses redirects, and bounds request time and response size. Transaction
broadcast is excluded from that gateway and continues through the Universe mempool route.

### Market navigation and wallets

The primary market navigation is intentionally limited to **ORDINALS, RUNES, ALKANES, STAMPS,
ATOMICALS, and MORE MARKETS**. The obsolete Native Runes entry and the Discover menu are no longer
shown. Opening /trade selects the Bitmap market; historical Native Runes links resolve to the
canonical RUNES market.

Wizz Wallet is supported on Bitcoin mainnet. Desktop users connect through the validated Wizz
extension provider. On mobile, open Bitcoin Universe inside Wizz Discovery and connect from the
wallet's built-in browser. The application rejects unsupported networks and never asks for a seed
phrase or private key.

### Marketplace fees

Bitcoin Universe applies the same service-fee calculation across supported marketplace settlement
paths: 1.5% of the gross sale price is charged independently to the buyer and seller. Amounts are
calculated in integer satoshis with deterministic half-up rounding and are displayed for review
before signing. The service-fee calculation has no protocol-specific minimum; Bitcoin transaction
outputs must still satisfy the network and script dust rules needed to construct a valid settlement.

When Wizz signs a prepared Bitcoin transaction, the application converts its internal PSBT encoding
to the hexadecimal PSBT string required by the wallet and validates the signed result before it is
submitted. Exact transaction review remains fail closed: a required ownership, output, fee, or
signature mismatch blocks the action instead of being downgraded to an advisory confirmation.

### Bitmap execution

Bitmap trading is bound to the canonical first valid `{block-height}.bitmap` district claim. Listing,
repricing, delisting, buying, and funded offers use the live claim inscription and its exact Bitcoin
output. The authority rejects later duplicate claims, mixed protocol collateral, stale ownership,
changed economics, and unsigned or structurally different transactions. Settlement is not final until
the exact transaction is confirmed and the canonical claim is indexed at the buyer-owned output;
dropped transactions and reorganizations remain recoverable through the durable action journal.

Every Bitmap market surface also consolidates records by block height. Provider listing IDs,
inscription IDs, and historical activity IDs are observations of the same district, not separate
assets. Supply comes from the authoritative indexer status unless a complete first page proves an
exact unique total, so duplicate history rows cannot inflate the collection grid or its count.

Bitmap identity comes from the indexed block_number, not an inscription's mined block height or a
generic numeric presentation field. Activity uses the same canonical identity, and ambiguous
buyer/seller attribution is reported as unresolved instead of being guessed.

### Bitcoin Names execution

Bitcoin Names trading uses the canonical first Sats Names System registration inscription for each
name. The authority preserves the exact SNS name and namespace rules, verifies the current Ordinals
location against Bitcoin Core and the complete output inventory, and groups discovery by namespace
without implying that namespace registration grants ownership of member names. Listing, repricing,
delisting, buying, and funded offers use wallet-reviewed Bitcoin transactions with durable revisions,
funding fences, and idempotent broadcast. A background reconciliation pass records confirmation,
buyer ownership, settlement, dropped transactions, and reorganizations until the lifecycle reaches a
durable result.

The old `/trade/names` and name-detail URLs now reopen the canonical Marketplace v1 order book.
Portfolio controls also enter the same reviewed action flow. Legacy registration rows are never
converted into synthetic `domain-*` asset identifiers; when an inscription ID is not available, the
action screen requires the authoritative inscription before any signing step.

### Atomicals execution

ARC-20, Atomicals NFTs, Realms, and Subrealms use one isolated Atomicals
execution service with separate protocol routes and durable state. ARC-20
resolves the canonical ticker winner and transfers the complete colored value.
The non-fungible markets accept one canonical compact Atomical ID with quantity
one. Generic NFT listings cannot contain a Realm, Subrealm, FT, container, or
item subtype; Realm markets also require the verified canonical name winner.

Every mutation rechecks the exact Bitcoin output, owner script, spent state,
single-Atomical inventory, colored value, and stable Bitcoin/Atomicals
checkpoint. Prepared transactions must assign the selected Atomical to one
unburned output, preserve the reviewed seller payout and fees, and pass Bitcoin
Core preflight. Listing revisions, funded offers, reservations, broadcast
lineage, confirmation, dropped/replaced transactions, and reorganization
reconciliation remain durable and protocol-scoped.

### Ordex execution

Ordex public asks use a Core-owned authority backed by the local Bitcoin Core,
ord index, and Ordex order journal. The authority checks that Core and ord have
the same block height and hash, then verifies the inscription satpoint, unspent
output, owner script, and value before it prepares a seller PSBT. The wallet
signs only the reviewed Ordex input. Finalization rejects a changed template,
owner, outpoint, price, or signature before the ask enters the journal.

Ordex read and execution access use separate server-side credentials. The
deployment manifest also binds the exact authority identity, schema, indexer
revision, wallet executor, and Core release. A missing or mismatched field keeps
the mutation-ready profile closed.

### Dogecoin execution

Dogecoin TAP, DRC-20, and Doginals actions use a native Dogecoin wallet boundary. The review screen
binds the protocol, action, connected account, asset, amounts, transaction template, fees, and owned
inputs before the wallet is asked to sign. Listing-authority messages use standard Dogecoin signed
messages, while transaction actions require a signature envelope for every owned input. The backend
recovers the signing key and verifies that it matches the claimed Dogecoin address; mismatched,
partial, reordered, or structurally changed results fail closed.

## Why an action may be unavailable

A Marketplace v1 action remains blocked unless every required gate agrees. Depending on the asset,
this includes the application feature gate, indexer readiness, fresh chain checkpoint, complete asset
inventory, wallet and network match, clean funding proof, and protocol-specific settlement evidence.
An unavailable action is a safety decision, not proof that an asset or market does not exist.

Browse and asset-detail pages do not show controls for mutations the protocol does not support. If
the protocol supports an action but its live authority is not ready, the control is disabled and the
current reason is shown below it. Refreshing or opening another protocol checks that exact route
again; an earlier ready result is never reused for the new action.

## Before signing

1. Confirm the wallet network and connected account.
2. Review the protocol, asset identity, quantity, price, fees, inputs, and outputs.
3. Treat every wallet prompt as the final authorization boundary.
4. Do not continue when the application reports stale, incomplete, conflicting, or unavailable
   authority data.
5. Keep seed phrases and private keys outside the application and all support channels.

## Release status

The code is a validated release candidate, not a statement that every production gate is enabled.
Protocol authorities, protected configuration, live readiness checks, and funded canaries must pass
before production execution is declared available.

The Marketplace on `test.bitcoinuniverse.io` uses the isolated
`test.api.bitcoinuniverse.io` API lane for Marketplace v1 requests. It does not fall back to the
production Marketplace API. The staging edge permits only read and preflight requests while
authorities are being verified; create, sign, reserve, purchase, offer, cancel, and broadcast actions
remain unavailable until their complete staging execution and rollback gates pass.

As of 9 August 2026, the test frontend and isolated staging API run the same
verified Core release. DogeTap reads remain available, while Marketplace v1
returns an explicit unavailable state because its execution authorities are
not configured. This is a deployed safety boundary, not a claim that any
protocol has passed live listing, purchase, offer, or settlement acceptance.
