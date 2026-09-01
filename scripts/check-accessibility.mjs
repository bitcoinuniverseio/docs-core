// Runs axe-core against every built page, in both themes, at a desktop width
// and a phone width, and additionally checks that no page overflows
// horizontally at 320 pixels.
//
// The horizontal-overflow check is here rather than in axe because axe does
// not cover it and because a wide table pushing the page sideways is the most
// common way a documentation site becomes unusable on a phone. This site is
// mostly tables, so it is the failure mode most likely to appear.
//
// Requires a built site and a running preview server.

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const axeSource = await readFile(
  fileURLToPath(new URL('../node_modules/axe-core/axe.min.js', import.meta.url)),
  'utf8',
);

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const ORIGIN = process.env.PREVIEW_ORIGIN ?? 'http://localhost:4323';
const BASE = '/docs-core';

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'phone', width: 320, height: 720 },
];
const THEMES = ['light', 'dark'];

async function* htmlFiles(dir, prefix = '') {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === 'pagefind' || entry.name === '_astro') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full, `${prefix}/${entry.name}`);
    else if (entry.name === 'index.html') yield prefix || '/';
    else if (entry.name.endsWith('.html')) yield `${prefix}/${entry.name.replace(/\.html$/, '')}`;
  }
}

const routes = [];
for await (const route of htmlFiles(DIST)) {
  // The /guides/* pages are redirect stubs: they navigate away before axe can
  // finish, and there is nothing on them to audit. They are checked by the
  // build instead, which fails if a redirect target does not resolve.
  if (route.startsWith('/guides/')) continue;
  routes.push(route);
}
routes.sort();

const browser = await chromium.launch();
const failures = [];

for (const viewport of VIEWPORTS) {
  for (const theme of THEMES) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      colorScheme: theme,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();

    for (const route of routes) {
      const url = `${ORIGIN}${BASE}${route === '/' ? '/' : route}`;
      await page.goto(url, { waitUntil: 'load' });
      await page.evaluate((t) => {
        document.documentElement.dataset.theme = t;
      }, theme);

      await page.addScriptTag({ content: axeSource });
      const results = await page.evaluate(async () =>
        // eslint-disable-next-line no-undef
        axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
        }),
      );

      for (const violation of results.violations) {
        failures.push(
          `${route} [${viewport.name}/${theme}] ${violation.id}: ${violation.help}\n    ${violation.nodes
            .slice(0, 2)
            .map((n) => n.target.join(' '))
            .join('\n    ')}`,
        );
      }

      if (viewport.name === 'phone') {
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        if (overflow > 1) {
          failures.push(
            `${route} [phone/${theme}] the page scrolls horizontally by ${overflow}px. Wide content must scroll inside its own container.`,
          );
        }
      }
    }

    await context.close();
  }
}

await browser.close();

if (failures.length) {
  console.error(`Accessibility audit failed in ${failures.length} place(s):\n`);
  for (const failure of failures) console.error(failure);
  process.exit(1);
}

console.log(
  `Accessibility audit passed: ${routes.length} pages, ${VIEWPORTS.length} widths, ${THEMES.length} themes.`,
);
