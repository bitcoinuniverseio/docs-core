# Contributing to these docs

This repository holds the public product and safety documentation for Bitcoin
Universe. The application source lives elsewhere; what is published here is
what a reader can observe and check for themselves.

## Before you write

Read one existing guide first. Every page in `guides/` follows the same shape:
who it is for, what they will be able to do, a concrete example, and a link to
the next task.

## What belongs here

- How a screen behaves, and how to read it.
- What a state means, and what to do about it.
- Safety rules a reader needs before they sign a transaction.
- Limits: what a market cannot do yet, and what a reader should not infer.

## What does not belong here

- Internal architecture, deployment steps, or operator runbooks.
- Host names, IP addresses, ports, credentials, or key names.
- Roadmap promises, launch dates, or partner claims.
- Any number that the running product does not show.

`scripts/check-docs.cjs` fails a change that would publish a private address or
credential-shaped string. It is a backstop, not a substitute for judgement.

## House rules for prose

- Write short sentences and lead with the reader's task.
- Explain a term the first time it appears.
- Use the same word for the same thing on every page.
- State a time window whenever you state a change, a volume, or a ranking.
- Distinguish "nothing is listed" from "the market could not be read". They
  are different facts and the product shows them differently.
- No em dashes, and no unsupported superlatives. The check enforces both.
- Prefer a descriptive link over a bare URL.

## Screenshots

Images live in `docs/assets/` and must show the running product. They are
produced by the capture script in the application repository, which visits the
public origin, waits for each route to render rather than its skeleton,
declines optional storage, and connects no wallet. Never publish an image that
contains a wallet address, a balance, or anyone's holdings.

Every image needs alt text that says what the image shows, and must stay under
the size budget the check enforces.

## Before you open a pull request

```bash
node scripts/check-docs.cjs
```

It checks links, anchors, image existence, alt text, image size, forbidden
punctuation, unsupported claims, and private-infrastructure leaks. The same
command runs in CI, so a green local run is the same answer you will get there.

Open the pull request against `develop`. Say what a reader can now do that they
could not before.

## Reporting a problem

- A documentation error, a broken link, or a page that does not match the
  product: open an [issue](https://github.com/bitcoinuniverseio/docs-core/issues).
- A security issue: follow [SECURITY.md](SECURITY.md) instead. Do not open a
  public issue for it.
