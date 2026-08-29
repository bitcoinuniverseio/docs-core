# Performance and the UI 3.0 experience

Bitcoin Universe renders its trading, portfolio, collection and explorer
screens from Universe-operated infrastructure only. The UI 3.0 release
(August 2026) makes those screens materially faster and more consistent on
every device while keeping the Couture Noir identity: pink for the one action
that matters, lavender for information, chrome and violet-black for the rest.

## What changed for you

- **Faster first paint.** The startup JavaScript shipped to every visitor was
  cut by more than half (446 KB to 250 KB compressed), so the shell, navigation
  and first market data appear sooner, especially on mid-range phones and slow
  connections.
- **Lighter, cached assets.** Scripts, styles and images are served with
  long-lived, immutable caching, API responses are compressed, and collection
  and token logos arrive as right-sized WebP derivatives instead of original
  uploads. A typical screen transfers a third of the bytes it used to.
- **Fewer requests.** Token tables no longer probe one URL per logo, listing
  grids fetch traits in a single batch, activity feeds are shared between the
  panels that display them, and fiat prices come from the Universe API rather
  than from a third-party exchange API in your browser.
- **Stable layouts.** Loading placeholders have the same shape as the content
  that replaces them, the footer stays below the first screen, and the
  collections table reserves its rows, so nothing jumps while a page loads.
- **One design language.** Page titles are real titles, each screen has one
  primary action, light mode no longer shows dark gradients, prices use
  tabular numerals, and phones get one purpose-built layout instead of a
  shrunken desktop table.
- **Performance mode.** On Save-Data, slow networks or low-power devices the
  app automatically reduces blur, animation and off-screen media work.

## The final evolution (22 August 2026)

A second pass closed the items the first release had deferred:

- **A modern browser edge.** Bitcoin Universe is now served through an HTTP/2,
  keep-alive, Brotli-capable edge. A page that used to open 50 to 130 TLS
  connections opens a handful, and API round trips from a warm connection
  take a third of the time.
- **Collection pages that do not move.** Collection and inscription pages
  reserve their final layout before the data arrives: header, stat chips,
  toolbar, chart and price panel keep their place on phones and desktops
  (measured layout shift 0.000 on phones).
- **Only the market you open.** Each market hub downloads only its own code;
  neighbouring markets load when you reach for them. Phones spend about half
  the main-thread time they used to on hub pages.
- **Complete media coverage.** Every discovered inscription, UNAT, DMT,
  stamp and Atomicals asset is classified (visual, nonvisual, unsupported
  with a reason, or a recorded source failure), visual assets get right-sized
  WebP / AVIF derivatives, posters or waveforms, and cards receive immutable
  object URLs directly, so grids paint from one response.

## How performance is kept

- Real-user vitals (LCP, INP, CLS, FCP, TTFB and route transitions) are
  sampled from production and reviewed per screen in the operations console.
- Every API response carries timing headers so slow requests can be attributed
  to database, upstream indexer or application time.
- A startup bundle budget and a repeatable route / API benchmark run with every
  release; a screen that becomes slower does not ship.

## Related guides

- [Ordinals collection market](ordinals-collection-market.md)
- [Secure blockchain data access](secure-blockchain-data-access.md)
- [Release validation](release-validation.md)

## Next

- [Instant interaction and route continuity](performance-and-ui-4.md): the pass that followed.

All guides are indexed in the [documentation home](../README.md#guides).
