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

## Settlement is not the same for every family

Bitcoin families carry a real PSBT. Ordex builds it from the live asset output,
your wallet signs it, and only then is it indexed. Ordex never receives a
private key, funds a transaction, signs on your behalf, or broadcasts.

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
