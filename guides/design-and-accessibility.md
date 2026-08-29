# How the interface is designed

Bitcoin Universe is a place to explore, verify, and act on Bitcoin-native
assets. The interface is built to serve that job: the data comes first, the
decoration stays out of the way, and the screen tells you where a number came
from and when it was read.

This page describes the design the product ships today. It replaced the
earlier pink "Couture Noir" identity on 29 August 2026.

## What you see

**A neutral surface, one brand colour.** Dark mode is a neutral graphite; light
mode is a warm neutral. Bitcoin orange marks the one action that matters on a
screen, the current selection, and the focus ring. It is not used as a page
background, so nothing competes with the data you came to read.

**Both themes are designed.** Light and dark are two complete designs rather
than one theme with inverted colours. The application follows your system
setting, and you can pick a theme yourself.

**Colour is never the only signal.** Every status also carries a label or an
icon, so a price change, a warning, or an unavailable market reads the same
way whether or not you distinguish those colours.

**Numbers line up.** Prices, amounts, fee rates, and supply figures are set in
digits of equal width, so a column stays aligned while values update and a
figure never changes width as it ticks.

**One typeface for the interface, one for data.** Text is set in Inter;
addresses, hashes, tickers, and code are set in JetBrains Mono. Both are
served from the application's own origin, so no third party is contacted to
render a page and no font request can track you across sites.

## What that means when a page loads

The fonts never move the page. On a first visit over a slow connection the
page paints in a system typeface whose letter spacing matches the one that
follows, and the interface font is used from the next visit onward once it is
cached. Measured on a mid-range phone profile with a slow connection and no
cache, the home, market, portfolio, and explorer screens record no layout
shift at all.

Loading states match the shape of the content that replaces them, so a screen
does not jump when its data arrives.

## States are distinct

The product separates facts that look similar but are not:

- **Nothing is listed** is not the same as **the market could not be read**.
- **Zero** is not the same as **unknown**, **unavailable**, or **not
  applicable**.
- An empty screen says what was checked and what to do next. An error says
  what failed, what is unaffected, and whether trying again is worthwhile.

## Accessibility

- Text and interface colours are checked against the WCAG 2.2 AA contrast
  targets in both themes, and the check runs on every change.
- Every action can be reached and operated from the keyboard, and the focused
  control is always visible.
- Touch targets are at least 44 by 44 pixels.
- If your system asks for reduced motion, animation is removed rather than
  shortened.
- Automated accessibility tests run against the application's screens and
  dialogs as part of the release gate.

If you find a screen that fails any of the above, open an
[issue](https://github.com/bitcoinuniverseio/docs-core/issues) and name the
screen and the width you saw it at.
