// The sitemap integration writes sitemap-index.xml and one shard per 45,000
// URLs. Plenty of crawlers and link checkers look for /sitemap.xml instead, so
// the build also emits that name as a sitemap index.
//
// That file is written by this script rather than checked into public/,
// because a checked-in copy would silently go stale the day a second shard
// appears. This runs after the build, reads the shards that were actually
// produced, and fails if anything about the sitemap is not what the site
// claims: a missing index, a missing shard, or a URL that is not absolute.

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const SITE = 'https://bitcoinuniverseio.github.io/docs-core';

const failures = [];
const files = await readdir(DIST);

const index = files.find((f) => f === 'sitemap-index.xml');
const shards = files.filter((f) => /^sitemap-\d+\.xml$/.test(f)).sort();

if (!index) failures.push('dist/sitemap-index.xml is missing.');
if (shards.length === 0) failures.push('No sitemap shard was generated.');

let urls = 0;
for (const shard of shards) {
  const xml = await readFile(path.join(DIST, shard), 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  urls += locs.length;
  for (const loc of locs) {
    if (!loc.startsWith(`${SITE}/`)) {
      failures.push(`${shard} carries a URL outside the site: ${loc}`);
      break;
    }
  }
}

if (urls === 0) failures.push('The sitemap lists no URLs.');

// /sitemap.xml, as an index over whatever shards exist.
const alias =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
  shards.map((s) => `<sitemap><loc>${SITE}/${s}</loc></sitemap>`).join('') +
  '</sitemapindex>\n';

await writeFile(path.join(DIST, 'sitemap.xml'), alias, 'utf8');

// robots.txt has to name a sitemap that exists.
const robots = await readFile(path.join(DIST, 'robots.txt'), 'utf8');
const declared = robots.match(/^Sitemap:\s*(\S+)$/m)?.[1];
if (!declared) {
  failures.push('robots.txt declares no sitemap.');
} else {
  const name = declared.split('/').pop();
  if (!files.includes(name) && name !== 'sitemap.xml') {
    failures.push(`robots.txt points at ${name}, which the build did not produce.`);
  }
}

if (failures.length) {
  console.error('Sitemap check failed:\n');
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log(
  `Sitemap check passed: ${urls} URLs across ${shards.length} shard(s), ` +
    'index and /sitemap.xml both present.',
);
