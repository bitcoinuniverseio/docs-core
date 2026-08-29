# Reporting a security issue

Report privately, before anything public. Open a private report at
[Report a vulnerability](https://github.com/bitcoinuniverseio/docs-core/security/advisories/new).
Only the maintainers can read it, and you keep the thread with them until the
issue is resolved.

Do not open a public issue, a pull request, or a social post for a suspected
vulnerability. A public description gives an attacker the same head start it
gives us.

## What to include

- What you were doing, on which page or route.
- What you observed, and what you expected instead.
- The smallest set of steps that reproduces it.
- Screenshots, request and response bodies, or a short recording, with any
  personal data removed.

Never include a seed phrase, a private key, a signed transaction that has not
been broadcast, a session token, or anyone else's address. None of those are
needed to reproduce a defect, and they cannot be un-sent.

## What is in scope

- The Bitcoin Universe application at `https://www.bitcoinuniverse.io`.
- Its public API responses, including the health and readiness contracts.
- These public documentation pages.

Reports about a third party's wallet extension, node, or explorer belong with
that project. If the issue is that Bitcoin Universe handles their response
unsafely, that is in scope here.

## What we ask you not to do

- Do not run load tests, automated scanners, or denial of service attempts
  against production.
- Do not access, modify, or retain another person's data.
- Do not use a real transaction to demonstrate a defect when a description or
  a testnet reproduction would show the same thing.

## What Bitcoin Universe will never ask you for

Nobody working on Bitcoin Universe will ever ask for your seed phrase, your
private key, or a signature outside a transaction you started yourself. There
is no support process that needs any of them. Treat any such request as an
attack, whoever it appears to come from.

## After you report

You will get an acknowledgement in the private advisory thread. Fixes are
released through the same process as any other change, and the
[release validation note](guides/release-validation.md) describes the checks a
release passes before it is published.
