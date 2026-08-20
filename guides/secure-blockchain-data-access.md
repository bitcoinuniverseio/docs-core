# Secure blockchain data access

Bitcoin Universe serves selected blockchain and protocol reads through the
platform HTTPS API. Native Bitcoin node, Ordinals, Mempool, TAP, database, and
cache ports are not public application interfaces.

## Public access

Public applications use `https://api.bitcoinuniverse.io` on port 443. The
reviewed blockchain reader facades provide narrowly validated lookups such as:

- block and fee information;
- transaction and address lookups;
- inscription content, previews, and status;
- Dogecoin TAP tokens, balances, activity, and protocol state.

Each facade denies unknown routes. Public access accepts read methods and safe
browser CORS preflights only, and
applies per-client burst, sustained-rate, concurrency, request-size, response,
and upstream-timeout protections. Generic Bitcoin RPC method selection is not
available through the public API.

## Safety and availability

Public responses may include rate-limit headers. A `429` response means the
caller should wait for the indicated retry interval. A `404` on an unregistered
reader path is intentional and does not mean that an internal service exists at
that path.

Bitcoin Universe operates the nodes and indexers behind these readers. The
gateway uses fixed private upstreams, so a caller cannot select an upstream
host, port, filesystem path, or RPC method.

Operator access uses separate authenticated private paths. Public client
credentials never provide access to native node or indexer ports.
