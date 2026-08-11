# Atomicals markets and Portfolio

The Atomicals market menu contains four distinct views:

- ARC-20 for fungible colored-sat tokens;
- NFTs for Atomicals collectibles;
- Realms for top-level Realm names;
- Subrealms for names below a parent Realm.

NFTs, Realms, and Subrealms are canonical browse views from one synchronized
Atomicals index. They show indexed ownership and mint evidence but do not imply
that an asset is listed for sale. ARC-20 keeps its existing market and listing
rules.

Portfolio has two views: Dashboard and Activity. Dashboard contains asset
filters and asset details. Activity contains wallet inscription activity. The
former Holdings view and its bulk-list page are retired; listing actions open
the verified Ordex PSBT listing flow.

If the Portfolio index does not include a BTC balance, the Dashboard attempts a
Bitcoin address-statistics fallback. If neither source returns valid evidence,
the balance is shown as unavailable rather than zero.
