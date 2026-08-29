# Add an Ordinals collection

Bitcoin Universe supports four collection membership sources: a public JSON
URL, a JSON file, pasted JSON, and an Ordinal Gallery parent inscription.

Open **Ordinals Market**, choose **Add Collection**, then complete Source,
Validate, Preview, and Publish. JSON files are limited to 4 MiB and 10,000
items. Validation reports the exact field that needs correction. Gallery
imports read the parent inscription's children and are published as
**Unverified**.

## What an import means

An import proposes collection metadata and membership. It does not control
ownership, UTXOs, listing state, price, verification, inscription number, or
confirmation state. Bitcoin Universe obtains those fields from its configured
chain authority and publishes only confirmed inscriptions.

The verification labels mean:

- **Official**: synchronized from a configured first-party collection source.
- **Verified**: reviewed and approved through the platform verification process.
- **Community**: community-maintained membership information.
- **Unverified**: imported metadata without an official identity claim.

A declared supply is informational. The confirmed count is the number of
members independently reconciled with the Bitcoin chain authority. These
numbers can differ while a collection is still minting.

Bitcoin Universe continuously monitors the collection-import service, its
queue, publication progress, chain reconciliation, and the official KNOT HEADS
feed. If an authority or import becomes unhealthy, the last verified
collection remains available while new publication fails safely; an upstream
failure is never shown as an empty collection.

The public browse catalog contains only active, published collections with
confirmed local inventory and a validated, server-cached logo. A provider may
enrich a matching collection, but it cannot create a new collection identity,
route, or inventory row. Collection IDs therefore remain stable even when two
collections have the same display name or an enrichment provider is offline.

Official synchronization is idempotent. A recoverable failed or cancelled job
for the current first-party source is requeued within its bounded retry budget;
an exhausted job remains visible to operators instead of retrying forever.

## JSON manifest v1

Use the published
[`OrdinalsCollectionManifest v1` schema](https://www.bitcoinuniverse.io/schemas/ordinals-collection-manifest-v1.json)
and [example](https://www.bitcoinuniverse.io/examples/ordinals-collection-manifest-v1.example.json).
Each item requires an authoritative inscription ID. Traits and display metadata are
optional. Future incompatible formats will use another `schemaVersion`.

## Safety

Only import a source you trust. A successful import does not prove authorship,
value, or intellectual-property rights. Never put private keys, seed phrases,
access tokens, or personal data in a collection manifest.
