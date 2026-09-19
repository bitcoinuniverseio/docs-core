<!--
IMPLEMENTATION-HANDOFF [DG-WP-13] DG-A-038
Coverage: DG-SHARED-DOCS-RELEASE. Defects: DG-F15, DG-F20, DG-F21, DG-F22.
Preparation 20260919-0438 only. Executable behavior is unchanged.
Current baseline: 0257f7f85d126a70e42d8c2d6ccab8b5ff7df184.
Observed: Observed: documentation needs to follow the accepted implementation and actual public
release, not the existence of source code.
Sources: SRC-USER release/coverage requirements; repository docs conventions.
Dependencies: DG-WP-01, DG-WP-02, DG-WP-03, DG-WP-04, DG-WP-05, DG-WP-06, DG-WP-07, DG-WP-08,
DG-WP-09, DG-WP-10, DG-WP-11, DG-WP-12, DG-WP-02R.
1. 1. Update the existing Dogecoin index/trading documentation only after the actual flow and wallet
contract are verified. Preserve protocol names and distinguish submitted, confirmed, indexed and
settled.
2. 2. Document the real public navigation, supported wallet/network behavior,
error/retry/cancel/recovery and original media behavior. Do not present local tickets as purchases.
3. 3. Keep this public documentation free of internal hosts, filesystem paths, credentials, private
operational logs and unverified completion claims. Link only approved public product routes.
4. 4. Reconcile docs with the source-annotation index and release coverage matrix; verify every
advertised operation remains discoverable.
Verify: Verification: npm test and npm run build using existing package scripts. Test links against
the accepted public release.
Acceptance: All applicable coverage rows PASS and complete public Mainnet deployment with exact
receipts; no legitimate work stranded in PRs/worktrees/unpushed commits. No secrets/test state leak
and every affected unchanged capability retains verified regression evidence.
Migration/rollback: Prepare explicit artifact/configuration/database compatibility rollback before
promotion; leave background indexing undisturbed, pause only affected new mutation intake through
existing safe controls if rollout fails.
-->
# Core documentation

Public product documentation for **Core**, the Bitcoin Universe explorer,
portfolio, activity, and marketplace application at
[www.bitcoinuniverse.io](https://www.bitcoinuniverse.io).

**Read it at [bitcoinuniverseio.github.io/docs-core](https://bitcoinuniverseio.github.io/docs-core/)**

The most useful page is the
[protocol support matrix](https://bitcoinuniverseio.github.io/docs-core/protocols/support-matrix/):
all 29 marketplace protocols against all 13 marketplace actions, generated from
the Core protocol registry, with the registry's own stated reason for every
action that is not supported.

## What is here

| Section | Answers |
| --- | --- |
| Start here | What Core is, a guided first five minutes, safety, and how to read a figure correctly |
| Protocol support | Which protocols are enabled, feature-gated, or read-only, and why |
| Explorer | Search, blocks, transactions, addresses, UTXOs, protocol assets, asset-bearing outputs, indexes |
| Portfolio and activity | What you hold and what happened |
| Markets | How a market works, and task guides for buying, listing, updating, and delisting |
| Data and provenance | Where each number comes from, and how fresh it was |
| Wallets and signing | Connecting, transaction safety, market safety |
| Public API | An OpenAPI 3.1 document for the verified public read endpoints |
| Interface quality | Design, accessibility, responsive behaviour, performance, release evidence |
| Troubleshooting and reference | By symptom, plus a glossary and a changelog |

## The rules this repository follows

- **Code presence is not released capability.** A route existing is not
  production availability. A parser existing is not wallet support. Where the
  registry records a protocol as read-only, these pages say you can see it and
  not trade it. Where it is feature-gated, they say it is implemented and
  switched off unless an operator enables it.
- **Unknown is not zero, and empty is not unavailable.** The product draws that
  distinction on every screen, and so does this documentation.
- **Nothing private is published here.** The application source is private and
  is read for facts. No hostnames, IP addresses, credentials, environment
  values, internal admin routes, or operator runbooks appear on these pages,
  and a check enforces it.
- **Every screenshot is a real capture** of the running product, taken with no
  wallet connected. Where a real capture is impossible, these pages use an
  accurate hand-drawn diagram and describe the interface in words rather than
  presenting a mock as a capture.

## Working on it

```bash
npm install
npm run dev      # local preview at http://localhost:4321/docs-core
npm test         # every gate that runs in CI, except the build and the audit
npm run build    # also validates every internal link and anchor
```

The 29 protocol pages are generated. Do not edit them by hand:

```bash
node scripts/generate-protocol-pages.mjs
```

`npm run check:registry` regenerates them into a temporary directory and fails
if the committed pages differ, so a hand edit or a stale snapshot cannot ship.

## Structure

```text
src/content/docs/     the pages
src/components/       Astro components that render registry and OpenAPI data
src/data/             the pinned capability snapshot and its reader
public/openapi/       the published OpenAPI 3.1 document
scripts/              generators and the checks that run in CI
docs.manifest.json    what the documentation portal ingests
```

## Grounding

Protocol facts come from a sanitized snapshot of the Core protocol registry,
committed at `src/data/capability-snapshot.json` and pinned to an exact Core
commit named in its own provenance block. Every protocol claim on this site is
rendered from that file at build time rather than written into prose.

API facts were verified against the live service. Live values, such as the
marketplace profile and per-protocol freshness, are quoted with the date they
were read and a link to the endpoint that answers them now:

- <https://api.bitcoinuniverse.io/health>
- <https://api.bitcoinuniverse.io/indexer-health>

## Contributing, support, security

- [CONTRIBUTING.md](CONTRIBUTING.md): house rules for prose, screenshots, and
  the checks.
- [SUPPORT.md](SUPPORT.md): where to ask, and what to include.
- [SECURITY.md](SECURITY.md): report a vulnerability privately. Never open a
  public issue for one.

## Elsewhere

- The application: [www.bitcoinuniverse.io](https://www.bitcoinuniverse.io).
  The bare `bitcoinuniverse.io` address redirects to a different Bitcoin
  Universe application.
- All Bitcoin Universe documentation:
  [docs.bitcoinuniverse.io](https://docs.bitcoinuniverse.io)

## Licence

Documentation content is licensed [CC BY 4.0](LICENSE). The site's source code
is MIT, as stated in that file.
