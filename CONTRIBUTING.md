# Contributing to these docs

This repository holds the public product and safety documentation for Core.
The application source lives elsewhere; what is published here is what a reader
can observe and check for themselves.

## Before you write

Read one existing page first. Every page follows the same shape: who it is for,
what they will be able to do, the concrete detail, and a link to the next task.
Task guides additionally state the reader, the goal, the prerequisites, the
chain and network, the safety considerations, the exact steps, the expected
result, how to verify, the common failure states, and a recovery path.

## What belongs here

- How a screen behaves, and how to read it.
- What a state means, and what to do about it.
- Safety rules a reader needs before they sign a transaction.
- Limits: what a market cannot do yet, and what a reader should not infer.

## What does not belong here

- Internal architecture, deployment steps, or operator runbooks.
- Host names, IP addresses, ports, credentials, or key names.
- Roadmap promises, launch dates, or partner claims.
- Any number the running product does not show.

## The truthfulness rules

These are not style preferences. They are the reason this documentation is
worth reading.

1. **Code presence is not released capability.** A route existing is not
   production availability. A parser existing is not wallet support. Never
   present an unreleased operation as available.
2. **Use the registry's own reason.** Where the protocol registry gives a
   reason an action is unsupported, quote it. It is the most useful sentence
   you can give a reader.
3. **Distinguish the four states.** Nothing listed, market unavailable,
   partial, and retired are four different facts. A dash is not a zero.
4. **Date every live value.** A figure read from the running service is quoted
   with the date it was read and a link to the endpoint that answers it now.
5. **Never fabricate a screenshot.** Images must be real captures of the
   running product with no wallet connected. Where a capture is impossible, use
   an accurate hand-drawn SVG diagram and describe the interface in words. That
   is explicitly better than inventing imagery.

## House rules for prose

- Short sentences. Lead with the reader's task.
- Explain a term the first time it appears, and use the same word for the same
  thing on every page.
- State a time window whenever you state a change, a volume, or a ranking.
- No em dash. Use a comma, a colon, a period, or parentheses.
- Not the word that begins with "canon". Use authoritative, owning, official,
  or the source of truth.
- No unsupported superlatives, no fake urgency, no placeholder sections, no
  untested examples.
- Prefer a descriptive link over a bare URL.

`npm run check:copy` enforces the punctuation, vocabulary, and superlative
rules.

## Generated pages

The 29 pages under `src/content/docs/protocols/detail/` are generated from the
pinned registry snapshot. **Do not edit them by hand.** Change the generator or
refresh the snapshot, then:

```bash
node scripts/generate-protocol-pages.mjs
```

`npm run check:registry` fails if the committed pages and the snapshot
disagree.

## Diagrams

Inline SVG only. Every diagram carries a `<title>` and a `<desc>` that
describes the mechanism rather than the picture, uses theme tokens for colour
so it is legible in both themes, and is legible at 320 pixels wide.

## Screenshots

Images live in `src/assets/shots/` as WebP. They must show the running product,
captured with no wallet connected and optional storage declined. Never publish
an image containing a wallet address, a balance, or anyone's holdings. Every
image needs alt text saying what it shows, and must stay under 200 KB.

## Before you open a pull request

```bash
npm test
npm run build
```

`npm test` runs the copy rules, the public-safety scan, the manifest
validation, the OpenAPI validation, the protocol-matrix regeneration check, the
asset budget, and markdown lint. `npm run build` additionally validates every
internal link and anchor. The same commands run in CI, so a green local run is
the same answer you will get there.

Open the pull request against `develop`. Say what a reader can now do that they
could not before.

## Reporting a problem

- A documentation error, a broken link, or a page that does not match the
  product: open an [issue](https://github.com/bitcoinuniverseio/docs-core/issues).
- A security issue: follow [SECURITY.md](SECURITY.md) instead. Do not open a
  public issue for it.
