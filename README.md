# Bitcoin Universe

**Bitcoin markets, assets, and protocol tools in one connected experience.**

Bitcoin Universe brings wallet connection, portfolio views, live markets,
inscription tools, protocol explorers, and activity into one application. Each
workflow keeps its network and protocol rules visible so users can make an
informed decision before signing or broadcasting a transaction.

## Explore the platform

- Connect a supported self-custody wallet.
- Browse Bitcoin and Dogecoin protocol markets.
- Review listings, sales, holders, and on-chain activity.
- Explore Ordinals, token protocols, Stamps, OP_RETURN experiences, and other
  supported asset families.
- Open guided inscription and transaction tools.

Start with the [market and wallet safety guide](guides/market-safety.md).
For the current Marketplace v1 capabilities and safety gates, read the
[Marketplace v1 guide](guides/marketplace-v1.md).
Release checks are performed before a change is published; see the
[release validation note](guides/release-validation.md).
For the Bitcoin network-data availability contract, see
[Bitcoin data reliability](guides/bitcoin-data-reliability.md).

## Availability and data

Market and protocol data comes from independent nodes, indexers, and provider
APIs. A healthy page shell does not guarantee that every protocol reader is
available. The application identifies unavailable readers and avoids presenting
missing data as a confirmed empty market.

Release readiness also checks the indexers behind the application. The public
health response identifies each observed network and protocol reader with its
chain tip, indexed height, lag, and last successful update. Missing or stale
indexer evidence remains unavailable; it is never converted into an empty or
healthy result.

## Security

Bitcoin Universe is non-custodial. Never enter a seed phrase or private key into
a website, support chat, email, or social message. Review the network, asset,
amount, recipient, fee, and transaction details in your wallet before approval.
Blockchain transactions are difficult to reverse.

## Documentation scope

This repository contains public product and safety documentation. Internal
architecture, deployment, configuration, and operator procedures are maintained
in the private `docs-dev-core` repository.
