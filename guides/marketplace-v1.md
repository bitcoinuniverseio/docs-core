# Marketplace v1

Marketplace v1 is Bitcoin Universe's fail-closed trading foundation for protocol assets. It gives
supported asset families a consistent listing, purchase, offer, settlement, and reorganization model
while keeping protocol-specific ownership and transaction rules authoritative.

## What the release candidate supports

- Executable, separately authenticated marketplace authorities for Ordinals, TAP, DMT, UNAT,
  Bitmap, ARC-20, unified DROPS and OP_DROP, Dogecoin TAP, and Tandem integrations.
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
