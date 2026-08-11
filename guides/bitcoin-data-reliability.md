# Bitcoin data reliability

Bitcoin Universe uses a self-hosted Bitcoin data service as the primary source
for fee estimates, chain height, transactions, address activity and balances,
and address UTXOs. Independent public providers are retained as bounded
fallbacks so a single upstream outage does not silently disable Bitcoin
workflows.

## What users can expect

- Normal healthy requests use the Bitcoin Universe primary service.
- A failed or slow provider is temporarily removed from request rotation and
  retried after a cooldown.
- Responses are checked for the expected content and shape before they are
  shown or used by a transaction workflow.
- Fee and chain-tip responses may use short-lived validated cache entries to
  smooth a brief provider interruption.
- Address UTXO failure is reported as unavailable. It is never presented as a
  confirmed empty wallet.

## Transaction broadcasts

A transaction broadcast is submitted once. If the network response is
uncertain, Bitcoin Universe checks whether the transaction is already visible
before returning success. It does not blindly send the same transaction to a
second provider.

## During an outage

Fallback is automatic for read requests and is bounded by request timeouts and
circuit breakers. If every provider is unavailable or returns invalid data,
the API returns an explicit unavailable response. Wait for service recovery and
refresh the current Bitcoin state before signing or repeating an action.
