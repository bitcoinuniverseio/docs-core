# Bitcoin data reliability

Bitcoin Universe uses Universe-operated Mempool and Ordinals services on the
shared Indexers server for fee estimates, chain height, transactions, address
activity and balances, address UTXOs, inscriptions, and other Bitcoin data. The
public API reaches these services through persistent private tunnels. Public
blockchain providers are never used as fallbacks.

## What users can expect

- Normal healthy requests stay within Universe-operated infrastructure.
- A failed or slow service uses bounded retries and a circuit breaker. It is
  retried after a cooldown without redirecting reads to a public provider.
- Responses are checked for the expected content and shape before they are
  shown or used by a transaction workflow.
- Fee and chain-tip responses may use short-lived validated cache entries to
  smooth a brief provider interruption.
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
