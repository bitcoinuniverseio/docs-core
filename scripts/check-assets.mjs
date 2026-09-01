// No image over 200 KB, and no unreferenced screenshot.
//
// A documentation site that quietly grows a 2 MB hero image is a documentation
// site nobody reads on a phone.

import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const LIMIT = 200 * 1024;
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.svg']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.astro']);

const failures = [];
const images = [];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

for await (const file of walk(ROOT)) {
  if (!IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase())) continue;
  images.push(file);
  const { size } = await stat(file);
  if (size > LIMIT) {
    failures.push(
      `${path.relative(ROOT, file)} is ${Math.round(size / 1024)} KB, over the 200 KB limit.`,
    );
  }
}

// Every screenshot must be imported by a page. An orphan is either a mistake
// or an image nobody has looked at in a while.
const shots = images.filter((file) => file.includes(`${path.sep}shots${path.sep}`));
if (shots.length) {
  const sources = [];
  for await (const file of walk(path.join(ROOT, 'src'))) {
    if (['.mdx', '.md', '.astro'].includes(path.extname(file))) {
      sources.push(await readFile(file, 'utf8'));
    }
  }
  const haystack = sources.join('\n');
  for (const shot of shots) {
    if (!haystack.includes(path.basename(shot))) {
      failures.push(`${path.relative(ROOT, shot)} is not referenced by any page.`);
    }
  }
}

if (failures.length) {
  console.error('Asset check failed:\n');
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log(`Asset check passed: ${images.length} images, all within budget.`);
