# Getting help

## Before asking

Four pages answer most questions:

1. [Reading the numbers](https://bitcoinuniverseio.github.io/docs-core/start/reading-the-numbers/),
   for anything that looks like a wrong figure.
2. [The protocol support matrix](https://bitcoinuniverseio.github.io/docs-core/protocols/support-matrix/),
   for anything that looks like a missing feature.
3. [Troubleshooting](https://bitcoinuniverseio.github.io/docs-core/troubleshooting/),
   organised by symptom.
4. <https://api.bitcoinuniverse.io/health>, for whether the deployment is open
   for trading right now.

## Where to go

| What | Where |
| --- | --- |
| A question about using Core | [Open an issue](https://github.com/bitcoinuniverseio/docs-core/issues) |
| A page that does not match the product | [Open an issue](https://github.com/bitcoinuniverseio/docs-core/issues), naming the page and the screen. That mismatch is a defect in this repository |
| A broken link or a rendering problem | [Open an issue](https://github.com/bitcoinuniverseio/docs-core/issues) |
| A suspected security issue | [SECURITY.md](SECURITY.md). Do not open a public issue |
| Other Bitcoin Universe products | <https://docs.bitcoinuniverse.io> |

## What to include

- The page or route, and the width you saw it at.
- What you observed, and what you expected instead.
- The smallest set of steps that reproduces it.
- The `X-Request-Id` header, if an API call was involved.
- The `X-Universe-Release` header, so the report is pinned to a build.
- Screenshots or response bodies, with personal data removed.

**Never include** a seed phrase, a private key, an unbroadcast signed
transaction, a session token, or anyone else's address. None of those are
needed to reproduce a defect, and they cannot be un-sent.

## What nobody will ever ask you for

Nobody working on Bitcoin Universe will ever ask for your seed phrase, your
private key, or a signature outside a transaction you started yourself. There
is no support process that needs any of them. Treat any such request as an
attack, whoever it appears to come from.
