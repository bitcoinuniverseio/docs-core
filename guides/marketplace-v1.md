# Marketplace v1

Marketplace v1 is Bitcoin Universe's fail-closed trading foundation for protocol assets. It gives
supported asset families a consistent listing, purchase, offer, settlement, and reorganization model
while keeping protocol-specific ownership and transaction rules authoritative.

## What the release candidate supports

- Executable, separately authenticated marketplace authorities for Ordinals, TAP, DMT, UNAT,
  Bitmap, Bitcoin Names, ARC-20, unified DROPS and OP_DROP, Dogecoin TAP, DRC-20, Doginals, and
  Tandem integrations.
- Wallet-reviewed prepared actions instead of hidden signing or custodial key handling.
- Durable listings, reservations, funded offers, broadcast lineage, confirmed settlement, and
  deterministic rollback where the protocol authority supports those operations.
- Protocol-specific explorers and capability messages that distinguish unavailable authority data
  from a confirmed empty result.
- Exact network, asset, amount, funding, and destination checks before an action can proceed.

Other protocol families remain visible only where their authoritative execution path is complete.
The application does not silently fall back to a generic transaction path for an unsupported asset.

### Bitmap execution

Bitmap trading is bound to the canonical first valid `{block-height}.bitmap` district claim. Listing,
repricing, delisting, buying, and funded offers use the live claim inscription and its exact Bitcoin
output. The authority rejects later duplicate claims, mixed protocol collateral, stale ownership,
changed economics, and unsigned or structurally different transactions. Settlement is not final until
the exact transaction is confirmed and the canonical claim is indexed at the buyer-owned output;
dropped transactions and reorganizations remain recoverable through the durable action journal.

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
