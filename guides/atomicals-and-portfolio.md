# Atomicals markets and Portfolio

The Atomicals market menu contains four distinct views:

- ARC-20 for fungible colored-sat tokens;
- NFTs for Atomicals collectibles;
- Realms for top-level Realm names;
- Subrealms for names below a parent Realm.

All four views use authoritative Atomicals identity and ownership evidence. ARC-20
trades the complete fungible balance at its live output. NFTs, Realms, and
Subrealms trade one exact Atomical at a time; a browse result does not by itself
mean that the asset is listed for sale.

Transaction actions remain fail closed until the Marketplace reports current
Atomicals and Bitcoin checkpoints, a live unspent owner output, and a matching
execution authority. Realms and Subrealms must also be the verified authoritative
name winner. Mixed outputs, stale ownership, burns, changed transaction
economics, and signatures for another protocol route are rejected.

The same honesty applies to reads. When the Universe Atomicals indexer cannot
answer, the ARC-20 market, token pages, holder rankings, and ARC-20 portfolio
balances report that the data is unavailable and offer a retry. They never
substitute sample rows or show an unreadable balance as zero, so an outage is
always distinguishable from a genuinely empty market or wallet.

## NFT artwork

Atomicals NFT cards display authoritative inline artwork when the unified
Atomicals index publishes a safe media field and SHA-256 digest. The browser
loads that field from Bitcoin Universe, not from an indexer or third-party
media origin. Bitcoin Universe caps the response at 16 MiB, accepts only a
narrow set of image, audio, video, JSON, and plain-text media types, and checks
the complete body against its digest before returning it. Invalid or tampered
media falls back to the asset name and identifier; it is never treated as
ownership, listing, or settlement evidence.

An Atomicals digital object may hold several payload files, or none at all. When
several images are present the card always shows the same one, so a thumbnail
does not change between refreshes. When the index confirms an object carries no
image payload, its card shows a neutral placeholder instead of a name-and-
identifier tile, which keeps a genuinely image-free object visually distinct
from artwork that failed to load. Artwork that was briefly unavailable is
retried rather than left as a placeholder for the rest of the visit.

Selecting anywhere on an NFT card, including its artwork, opens that asset's own
page. The page has its own address, so it can be linked, opened in a new tab,
reloaded, and reached again with the browser's Back and Forward buttons.

## Listing an ARC-20 lot

An ARC-20 balance is held in complete colored-sat UTXOs. Open the token from
Portfolio or its ARC-20 market, select one available lot, enter the sale price,
review the 1.5% seller service fee and net proceeds, then approve the PSBT in
the connected wallet. The application never splits the selected colored lot or
uses it as ordinary Bitcoin change.

Wizz is shown as Wizz, not as UniSat. Desktop users connect the validated Wizz
extension; mobile users open Bitcoin Universe in Wizz Discovery. Bitcoin
Universe converts the prepared PSBT to the hexadecimal format Wizz expects.
If a connected extension no longer exposes a signer, the form is disabled with
an unlock-and-reconnect explanation before any listing transaction is prepared.

The listing appears only after the signed offer passes ownership, outpoint,
ticker, quantity, payout, and signature checks. Refreshing or reconnecting reads
the open listing from the market; retrying cannot create a second open listing
for the same ARC-20 outpoint. Buying independently applies the buyer service
fee and preserves every colored sat in the buyer output.

Portfolio has two views: Dashboard and Activity. Dashboard contains asset
filters and asset details. Activity contains wallet inscription activity. The
former Holdings view and its bulk-list page are retired; listing actions open
the verified Ordex PSBT listing flow.

If the Portfolio index does not include a BTC balance, the Dashboard attempts a
Bitcoin address-statistics fallback. If neither source returns valid evidence,
the balance is shown as unavailable rather than zero.
