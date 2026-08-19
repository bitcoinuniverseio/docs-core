# Backend Operations Console

Bitcoin Universe provides an authenticated operations console for authorized platform operators at `/backend/admin`.

The console brings service health, API behavior, indexer freshness, Bitcoin connectivity, database migration state, worker status, cache health, and recent operational activity into one responsive interface. It is separate from the product administration experience at `/admin`.

## What operators can verify

- Live readiness across the database, Bitcoin provider, public ingress, indexers, media storage, and background work.
- API inventory, request volume, latency, error rates, and approved synthetic checks.
- Indexer identity, network, tip, lag, authority agreement, and declared capabilities.
- Database pool use and migration history without revealing credentials.
- Media registry and storage readiness without revealing private bucket identifiers.
- Recent protected operations with sanitized outcomes and request identifiers.

## Safe operations

The console exposes a small allowlist of bounded operations. Each operation reports whether it is currently available, requires an exact confirmation phrase when risk warrants it, prevents duplicate execution, and verifies a post-condition before reporting success.

Long-running work keeps its database lock until the underlying task finishes. If the browser request reaches its deadline, the task continues safely and its final state is recorded. Interrupted operation records are reconciled after a restart and are never repeated automatically.

## Status meanings

- Healthy means every required dependency passed its live check.
- Degraded means the service is available but a required freshness or fallback condition needs attention.
- Failed means a required dependency is unavailable and production readiness is blocked.

The readiness label and detailed cards use the same evaluation rules, so the summary cannot report success while a required subsystem is failing.

## Security and privacy

Access requires the operator password and a short-lived protected session. Requests are checked for the expected browser origin and session fingerprint. Responses are not cached or indexed, and sensitive values are redacted from errors, activity details, provider data, and storage diagnostics.

The interface supports keyboard navigation, visible focus, mobile layouts, and clear availability reasons for disabled actions.
