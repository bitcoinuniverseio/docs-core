# Shared collection media

Bitcoin Universe mirrors supported artwork, metadata, thumbnails, renders,
audio, and video into one shared media system. This includes media for
Ordinals, DMT, UNAT, Doginals, Atomicals, Bitcoin Stamps, and other supported
asset families.

## Exact originals and efficient display

The exact bytes discovered from a blockchain or an authoritative Universe
indexer are retained as the authoritative original. A thumbnail, compressed SVG,
responsive image, poster, waveform, or deterministic render is a separate
derivative. A derivative never replaces the original.

Objects are identified by their SHA-256 content hash. Identical bytes used by
different assets or projects share one stored object. Display variants use
modern formats and useful sizes so a card does not download a full-resolution
original unnecessarily.

## Browser behavior

Collection and marketplace pages use Bitcoin Universe media routes instead of
contacting public artwork hosts from the browser. Visible cards receive useful
display sizes first; off-screen cards load as they approach the viewport.
Hashed media is cached immutably, while a stable asset identity resolves to the
current verified object.

Recursive and deterministic artwork is archived with its dependencies and
render state. An unchanged asset can reuse its verified render instead of
fetching or rendering the same content again.

## Availability

Media ingestion, verification, and derivative generation continue in the
background. A missing derivative may temporarily show an explicit text or
loading fallback, but it does not authorize a browser request to an untrusted
media origin. Missing, corrupt, or unverified media is reported as unavailable
rather than being presented as a successful empty response.

When the shared media system is enabled, collection cards and market rows use
only verified shared-media routes. A missing shared logo, original, or
thumbnail remains visibly unavailable; Bitcoin Universe does not silently
substitute an older collection-cache URL.
