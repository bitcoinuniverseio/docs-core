# Manage assets from Portfolio

Portfolio shows the identity and live market state of each supported
collectible directly below its artwork.

- Unlisted assets show **Not listed** and **List** when that protocol supports
  listing.
- Active listings show their atomic price and marketplace, with **Edit** and
  **Delist** when those operations are supported.
- Read-only protocols remain viewable without presenting controls that cannot
  execute.

Asset names prefer verified collection item and asset metadata. For example, a
collection item is shown as **Knot Head #1** with **Knot Heads** as its
collection, rather than as a shortened inscription ID. When verified metadata
is unavailable, Portfolio falls back to protocol identity, inscription number,
and finally a shortened identifier; it never invents a collection or derives
an item number from card order.

Click or tap the artwork, asset name, or identifier to open the same asset
detail. Artwork is keyboard accessible with Enter or Space, and listing
controls do not trigger the detail action.

## Safe listing state

Portfolio reads open listings from the authoritative marketplace for the
viewed owner. It batches those reads by protocol and paginates them, so large
wallets do not cause a request for every card. Until that read succeeds, the
card shows a checking or retry state instead of guessing that an asset is
unlisted.

List, Edit, and Delist open the standard Marketplace v1 review flow. Before a
wallet is asked to sign, the service rechecks live readiness, ownership,
listing revision, and protocol state. Unsupported actions are not shown.

The asset detail presents the same market state and controls as the card, so
there is no separate Portfolio-only listing workflow.
