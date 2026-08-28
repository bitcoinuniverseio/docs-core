# Protocol coverage

The `/coverage` page lists every Bitcoin and Dogecoin metaprotocol the running
application reads and serves, grouped by family, with the index and the
market for each one.

## What the page shows

Each row names a protocol, the chain it settles on, a one-line description, and
the routes that read it:

- **Index** opens the protocol explorer at `/index/<protocol>`. Not every
  protocol has a standalone index; those rows show only a market link.
- **Market** opens the order book or listing view for that protocol.

The counts at the top of the page are computed from the same registry that
builds the navigation, so the number on the page is always the number of
protocols the application can actually open. A protocol that is switched off in
a release does not appear.

## What "covered" means

Covered means this application reads the protocol and serves it here.

It does not mean:

- that Universe operates the index behind that row: some protocols are read
  through an external provider,
- that a market has listings right now,
- that a market has depth or liquidity,
- that every action is available for that protocol.

A market with nothing listed says so. A market whose reader failed says that
instead, and offers a retry. The two are never presented the same way, so an
empty table is never a way of hiding an outage. See
[Market and wallet safety](market-safety.md) for how to read an unavailable
reader.

## Why the list is worth checking

Most Bitcoin marketplaces cover one or two protocol families. This page states
its breadth as a list you can open rather than a claim you have to take on
trust: follow any row and you land on the live index or market for that
protocol. The counts are generated from the routing registry, so they cannot
drift away from what the application actually serves.

## Finding it

- The home screen links to it from the first paragraph.
- The footer links to it from every page.
- The direct address is `https://www.bitcoinuniverse.io/coverage`.
