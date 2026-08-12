# Atomicals markets and Portfolio

The Atomicals market menu contains four distinct views:

- ARC-20 for fungible colored-sat tokens;
- NFTs for Atomicals collectibles;
- Realms for top-level Realm names;
- Subrealms for names below a parent Realm.

All four views use canonical Atomicals identity and ownership evidence. ARC-20
trades the complete fungible balance at its live output. NFTs, Realms, and
Subrealms trade one exact Atomical at a time; a browse result does not by itself
mean that the asset is listed for sale.

Transaction actions remain fail closed until the Marketplace reports current
Atomicals and Bitcoin checkpoints, a live unspent owner output, and a matching
execution authority. Realms and Subrealms must also be the verified canonical
name winner. Mixed outputs, stale ownership, burns, changed transaction
economics, and signatures for another protocol route are rejected.

Portfolio has two views: Dashboard and Activity. Dashboard contains asset
filters and asset details. Activity contains wallet inscription activity. The
former Holdings view and its bulk-list page are retired; listing actions open
the verified Ordex PSBT listing flow.

If the Portfolio index does not include a BTC balance, the Dashboard attempts a
Bitcoin address-statistics fallback. If neither source returns valid evidence,
the balance is shown as unavailable rather than zero.
