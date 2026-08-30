# The Ordex market

Ordex is a permanent part of Bitcoin Universe. Every build ships the Ordex
market at `/ordex` and the Ordex orders desk at `/ordex/orders`, and Ordex
leads the Trade market picker. There is no setting that removes the product
from the application.

## Browse by protocol family

The market is organised as a two-level hierarchy. Pick a protocol family first,
then narrow to a single subprotocol inside it.

| Family | Subprotocols |
| --- | --- |
| Bitcoin / Generic | Bitcoin PSBT |
| Ordinals | Ordinals, Bitmap, BRC-20, TAP, DMT, UNAT, Names |
| OP_RETURN | OP Inscriptions, OP-20, OP Names |
| OP_DROP | Taproot OP_DROP |
| Atomicals | ARC-20 |
| Runes | Runes |
| Tokens / Metaprotocols | Alkanes, Mezcal, DUST20 |
| Dogecoin | TAP-DOGE, DRC-20, Doginals |
| Stamps | Stamps, SRC-20 |

Choosing **Ordinals** shows every Ordinals-family order. Choosing **BRC-20**
shows only BRC-20 orders. The same applies to every family, and the result
stays correct across more than one page of inventory because the filter is
applied before the market is paginated.

On a desktop the family list sits beside the orderbook. On a phone the same
list opens inside the **Protocols and filters** sheet.

The family list is read from the live Ordex catalog, so a protocol Ordex adds
or retires is reflected in the market without a separate update. Ordex only
offers protocols it actually supports.

## Keep a view you can share

A family or subprotocol selection is part of the address, for example
`/ordex?group=ordinals` or `/ordex?group=ordinals&protocol=brc20`. Search,
token, source, state, safety, side, and sort selections travel with it. Back,
forward, reload, and a shared link all restore the same view.

## Browse a changing order book without losing your place

Ordex pages by the selected sort value and the order ID that breaks ties. The
next-page marker therefore resumes after the last order you saw instead of
counting rows from the start again. A listing that is added, sold, or withdrawn
between reads does not shift the page boundary and cause an older row to be
skipped or repeated. An invalid or mismatched marker is rejected rather than
silently reopening page one.

Offers are the live bid side of the same order book. Activity is different: it
is the append-only record of listing lifecycle changes, such as an order being
created, cancelled, filled, expired, or found spent. The market does not turn a
listing's current state into a made-up historical event.

Collection labels come from published Ordinals collection membership. When no
published collection contains an inscription, the inscription keeps its own
identity instead of being grouped into a shared fallback collection.

## Buying a listing

Buying happens in your own wallet, in four named steps.

1. **Review this purchase.** Ordex rechecks the listing against Bitcoin Core
   and the ordinals index, reads the value of the outputs your wallet would
   spend from the node itself, and composes the buyer half of the transaction.
   You are shown the seller's proceeds, the Ordex fee, the creator royalty, the
   network fee and the rate it was priced at, the change coming back to you,
   the total you pay, and the exact address the asset arrives at. Nothing has
   been signed at this point.
2. **Approve in my wallet.** Your wallet signs your own inputs only. The
   seller's half arrived already signed and is never touched.
3. **The node's own verdict.** The signed transaction goes back to Ordex, which
   binds it to the order again, proves the asset movement, and asks Bitcoin
   Core whether it would accept the transaction. Nothing has been sent yet.
4. **Send this transaction.** Only this step reaches the network, and only the
   exact bytes the node checked are sent.

Ordex never receives a private key or a seed phrase, never contributes funds,
and never broadcasts on its own initiative.

### Why a purchase needs two small outputs

A public ask is signed so that the seller's payment output must sit at the same
position as the offered output being spent. Sats leave a transaction in the
order their inputs appear, so if the offered output were first, its sats would
be the first thing the seller's payment is paid from, and the inscription, its
sat position, and its postage would go straight back to the seller. The
transaction would be perfectly valid and the buyer would receive nothing.

Ordex therefore places two small outputs of yours ahead of the offered one, so
the asset lands in an output you own. Those outputs come back to you in the
first output of the same transaction, so they are not a cost. A wallet holding
no small outputs is told so plainly rather than handed a purchase built from
the wrong ones.

Ordex refuses to spend an output that carries an inscription or a rune balance
as fees or as padding, and treats an output the ordinals index has not examined
as unknown rather than as empty.

### Completing in another wallet

The raw signed order is still available, behind a disclosure, for a wallet
Ordex cannot drive. Building, funding, and sending it is then entirely yours,
including placing the asset in an output you own. Read the section above before
using it.

## Settlement is not the same for every family

Bitcoin families carry a real PSBT. For a listing, Ordex builds it from the
live asset output, your wallet signs it, and only then is it indexed. For a
purchase, Ordex composes the buyer half and checks it, your wallet signs your
own inputs, and you send it. Ordex never receives a private key, contributes
funds, signs on your behalf, or broadcasts on its own initiative.

Dogecoin and Stamps orders are recorded peer-to-peer intents settled with a
Dogecoin or Counterparty aware wallet. The market labels them clearly and never
presents them as a Bitcoin PSBT.

## What the market states mean

The market distinguishes conditions that look similar but are not:

- **Loading** - the request is still in flight.
- **No matching artifacts** - Ordex answered and has no order for this
  selection. This is a confirmed empty result.
- **Ordex inventory is unavailable** - the request failed. The number of
  orders is unknown, and it is never shown as zero.
- **Switched off by an operator** - Ordex is deliberately paused. The market
  and desk stay in place and say so.
- **Degraded** - Ordex is running, but a Bitcoin Core or ordinals reader is
  unavailable. Existing orders stay listed and new listings cannot be verified
  until the reader returns.

A public ask remains first-claimer-wins. Ordex never labels one reserved.
Refresh an order and review every transaction detail in a wallet you trust
immediately before settling.

## Next

- [Marketplace v1 capabilities and safety gates](marketplace-v1.md): what each gate means.
- [Market and wallet safety](market-safety.md): what to check before signing.

All guides are indexed in the [documentation home](../README.md#guides).
