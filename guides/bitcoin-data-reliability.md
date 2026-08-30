# Bitcoin data reliability

Bitcoin Universe uses Universe-operated Mempool and Ordinals services on the
shared Indexers server for fee estimates, chain height, transactions, address
activity and balances, address UTXOs, validated block metadata, exact raw block
bytes, inscriptions, and other Bitcoin data. Internal protocol indexers use the
same operator-owned block routes to verify chain continuity. The public API
reaches these services through persistent private tunnels. Public
blockchain providers are never used as fallbacks.

## What users can expect

- Normal healthy requests stay within Universe-operated infrastructure.
- A failed or slow service uses bounded retries and a circuit breaker. It is
  retried after a cooldown without redirecting reads to a public provider.
- Responses are checked for the expected content and shape before they are
  shown or used by a transaction workflow.
- Fee and chain-tip responses may use short-lived validated cache entries to
  smooth a brief provider interruption. Identical requests arriving together
  share one read of the Universe-operated service instead of each opening
  their own.
- Inscription images and previews are immutable, so they are cached and served
  with a long-lived immutable cache header and a content fingerprint. A browser
  that already holds a copy revalidates it without downloading it again, and a
  gallery of many tiles no longer competes with ordinary Bitcoin reads.
- The public application health contract reads its verified Bitcoin mainnet
  head through the same provider registry. An unavailable or invalid chain tip
  makes application read readiness fail closed.
- A failed protocol indexer remains visible in health diagnostics but does not
  replace the authoritative Bitcoin chain head with zero.
- Address UTXO failure is reported as unavailable. It is never presented as a
  confirmed empty wallet.
- The primary service uses overlapping workers so routine software reloads do
  not interrupt Bitcoin data requests.

## Transaction broadcasts

A transaction broadcast is submitted once. If the network response is
uncertain, Bitcoin Universe checks whether the transaction is already visible
before returning success. It does not blindly send the same transaction to a
second provider.

## During an outage

There is no public provider fallback. Short-lived validated cache entries may
smooth a momentary interruption. If the Universe-operated service is unavailable
or returns invalid data, the API returns an explicit unavailable response. Wait
for recovery and refresh Bitcoin state before signing or repeating an action.

## Fiat prices

The USD figures next to Bitcoin amounts (portfolio totals, floor prices, fee
costs, the header price chip) come from one Universe-operated market price
service that the browser reads once a minute. No exchange API is called from
the page.

- When the service has not answered yet, and when it cannot answer at all,
  there is no price. The USD figure is left out. It is never replaced with a
  placeholder number, a last-known guess with no age, or $0.
- The Bitcoin amount is always shown. Fiat is a convenience on top of it, so
  losing the quote never hides the number that matters.
- A quote that did answer is kept in the browser for up to a day, so a single
  failed refresh still shows the last measured price rather than nothing.
- The price says where it came from and when it was measured. Open the fee
  panel in the header and the line under the price reads the source and the
  time, for example "Coinbase, 16:05". A quote resting on yesterday's reading
  shows yesterday's time, so a stale price is visible rather than silent.
- The exchange rate is the one figure Bitcoin Universe does not read from its
  own infrastructure, because Bitcoin Universe does not run an exchange. It is
  read once a minute by the API and shared, so no visitor's browser contacts
  the exchange. Chain data is never sourced this way.

## Next

- [Secure blockchain data access](secure-blockchain-data-access.md): the public reader boundary.
- [Market and wallet safety](market-safety.md): what to do when a reader is unavailable.

All guides are indexed in the [documentation home](../README.md#guides).
