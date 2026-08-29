# Browse an Ordinals collection market

An Ordinals collection page starts from the collection's authoritative
inventory. Listings and sales are overlays on that inventory, so an item does
not disappear merely because it is not currently listed.

## Find an item

Use search, price, listing status, sorting, and traits together. Trait choices
are **OR** within one category and **AND** across categories. For example,
selecting Blue and Red under Background plus Gold under Crown finds items with
a Blue or Red background that also have a Gold crown.

Large trait dictionaries load in bounded pages. Use **Show more** or the trait
value search instead of expecting every value to render at once. A selected
value stays visible even when it is outside the current page. Facet counts show
distinct inscriptions and update without counting a multi-valued trait twice.

On a small screen, the filter sheet is a draft. **Apply filters** commits every
change together. Close, the backdrop, and Escape discard the draft. **Reset**
also remains a draft until it is applied.

The address bar records applied discovery state. Refresh, sharing the URL, and
browser Back or Forward restore the same filters. Cart contents are separate
from discovery filters.

## Availability and media

The browse catalog is the set of active, published collections with confirmed
local inventory. Each row links with its stable collection ID; a provider
cannot invent a collection or route, and collections with the same name remain
distinct.

A collection logo is identity media. It is downloaded, decoded, bounded, and
served from Bitcoin Universe's cache. Featured artwork and item thumbnails are
separate fields and do not replace that logo. Item thumbnails are also served
from the cache on the browsing path, so changing a warmed filter does not
contact an artwork host.

A published collection remains browsable while its logo is unavailable. Open
an item to load the authoritative cached inscription details, including its number,
asset identity, metadata status, traits, and collection metadata. Market data
from a collection provider may enrich a known local collection, but it cannot
create a collection or route by itself.

Ordinals, DMT, and UNAT item artwork is served by the shared Universe media
system. It discovers identities from Bitcoin Universe's own inventories,
preserves exact originals, globally deduplicates equal content, and publishes
content-addressed thumbnail variants. The web client accepts these internal
media routes and does not contact a public artwork host when a thumbnail is
missing. Until a derivative is ready, a tile shows a loading surface or its
explicit text identity. See [Shared collection media](shared-collection-media.md).

If an upstream reader is unavailable or data is incomplete, the page reports
that state instead of presenting it as a confirmed empty market. A successful
catalog response with no published inventory displays an explicit empty state;
a verified zero-result filter is separately distinguished from an unavailable
response.

## Trading availability

Listings overlay the authoritative inventory and never create membership.
Action controls appear only when the selected protocol's live ownership,
listing, settlement, and broadcast readiness permits that action. A read-only
market remains browsable but does not present a buy, list, edit, cancel, or
offer control as if it could execute. Refresh after an error before signing or
retrying.

Before buying, review the inscription, seller, price, fees, network, and wallet
request. Bitcoin Universe is non-custodial and never needs a seed phrase or
private key.

## Next

- [Add an Ordinals collection](ordinals-collection-imports.md): for creators listing a collection.
- [Shared collection media](shared-collection-media.md): why a thumbnail can be unavailable.
- [Market and wallet safety](market-safety.md): what to check before buying.

All guides are indexed in the [documentation home](../README.md#guides).
