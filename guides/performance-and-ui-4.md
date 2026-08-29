# UI 4.0: instant interaction and route continuity

Bitcoin Universe UI 4.0 (22 August 2026) is the release after the UI 3.0
final evolution. It keeps the same powerful application and the same Couture
Noir identity, and makes moving through it feel native: screens you come back
to are already there, market switches and Back are immediate, the first
viewport paints what you can act on first, and every screen ships only the
code it needs.

## What changed for you

- **Back brings you back.** Open a collection, scroll, open an asset or your
  portfolio, press Back: the collection grid is on screen in the first frame,
  at the same scroll position, with the same view mode, selection, cart and
  the rows you had already paged in. The page refreshes its rows quietly
  behind you instead of showing a skeleton. The same applies to the Ordinals
  hub (search, filters, table page) and to Forward.
- **Nothing shrinks under you.** A quiet refresh, a purchase or a new page of
  results never collapses a grid you scrolled through; the list keeps its
  length and the scrollbar stays honest (off-screen tiles now reserve their
  real height).
- **Calm transitions.** Hub to collection, market to market and Back use a
  short cross-fade (150 ms) where the browser supports it. If you prefer
  reduced motion, or the device is in performance mode, the new screen simply
  appears.
- **What you can act on comes first.** On collection pages the listing tiles
  paint before the chart and the activity feed; those tools follow as soon as
  the main thread is idle, into boxes that were reserved from the first frame,
  so nothing jumps.
- **Lighter routes.** Every index page now loads only the protocol you opened
  (the others load when you switch), the home, trade, collection, asset,
  portfolio, index and explorer routes no longer download a legacy component
  theme, and the explorer no longer downloads a 500 KB utility library for one
  function. Typical route JavaScript dropped by 25 to 60 KB compressed on
  every major route; in the lab (a mid-range phone profile) a collection page
  reaches its largest paint in less than half the time it used to (7.2 s to
  3.2 s), the Ordinals index ships a third fewer bytes and shows useful
  content 1.8 s sooner, and opening the market picker costs a third of the
  main-thread time it did.
- **Same primitives everywhere.** The index filter menus, the Mezcal market
  pager, the Mezcal proof console and the market chat spinner now use the
  Universe UI primitives (Menu, Sheet, pagination, spinner): one look, one
  keyboard behaviour, one touch size.

## What did not change

- Trading, listing, offers, portfolio and inscription logic are untouched;
  checkout always re-validates listings against fresh data before you sign.
- Couture Noir: pink for the one action that matters, lavender for
  information, chrome and violet-black for everything else; light and dark
  themes; the 300 KB startup budget (measured 251 KB).
- Your privacy: the anonymous performance beacon still carries no wallet,
  asset, account or transaction identifier.

## For operators and integrators

The measurements, the budgets each route is held to, and the procedure for
reproducing them live in the private engineering documentation. This page
describes what a reader can observe; nothing here depends on access to it.

## Next

- [Earlier performance work](performance-and-ui-3.md): what the previous pass changed.
- [Release validation](release-validation.md): the checks a release passes.

All guides are indexed in the [documentation home](../README.md#guides).
