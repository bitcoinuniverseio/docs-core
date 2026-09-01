// House copy rules, enforced on every change.
//
// Two of these are absolute and are worth stating plainly:
//
//   - No em dash. Anywhere. Commas, colons, periods and parentheses do the
//     same work and survive every terminal, feed reader and screen reader.
//   - Not the word that starts with "canon". The HTML attribute
//     rel="canonical" is required markup and is exempt; the word in prose is
//     not. Use authoritative, owning, official, or the source of truth.
//
// The rest catch the failure modes documentation of a live product falls into:
// promising, guessing, and leaving a hole.

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const SCAN = ['src/content/docs', 'src/components', 'public/openapi', '.'];
const EXTENSIONS = new Set(['.md', '.mdx', '.astro', '.json', '.mjs', '.js', '.css', '.yml']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.astro', 'shots', 'data']);

const RULES = [
  {
    id: 'em-dash',
    pattern: /[—–]/u,
    message: 'em dash or en dash. Use a comma, colon, period, or parentheses.',
  },
  {
    id: 'banned-word',
    // The attribute value rel="canonical" is required markup, so a match is
    // only a failure when it is not immediately part of that attribute.
    pattern: /(?<!rel=")canonical(?!")/i,
    message: 'the banned word. Use authoritative, owning, official, or the source of truth.',
  },
  {
    id: 'coming-soon',
    pattern: /\b(coming soon|stay tuned|watch this space|to be announced)\b/i,
    message: 'a promise. Document what ships, not what is planned.',
  },
  {
    id: 'placeholder',
    pattern: /\b(TODO|TBD|FIXME|XXX|lorem ipsum|placeholder text)\b/,
    message: 'a placeholder. Finish it or remove the section.',
  },
  {
    id: 'superlative',
    pattern: /\b(world[- ]class|best[- ]in[- ]class|cutting[- ]edge|state of the art|revolutionary|seamless(ly)?|blazing(ly)? fast|unparalleled|game[- ]chang)/i,
    message: 'an unsupported superlative. State the measured fact instead.',
  },
  {
    id: 'hedged-capability',
    pattern: /\b(should (?:soon|shortly) (?:be|support)|will be available (?:soon|shortly)|planned for a future release)\b/i,
    message: 'an aspirational capability presented as near. Say what is true today.',
  },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXTENSIONS.has(path.extname(entry.name))) yield full;
  }
}

const seen = new Set();
const failures = [];

for (const target of SCAN) {
  const dir = path.join(ROOT, target);
  for await (const file of walk(dir)) {
    if (seen.has(file)) continue;
    seen.add(file);
    const lines = (await readFile(file, 'utf8')).split('\n');
    lines.forEach((line, index) => {
      for (const rule of RULES) {
        // The rules file itself necessarily contains every pattern it bans.
        if (file.endsWith('check-copy-rules.mjs')) continue;
        if (rule.pattern.test(line)) {
          failures.push(
            `${path.relative(ROOT, file)}:${index + 1}  ${rule.id}: ${rule.message}\n    ${line.trim().slice(0, 120)}`,
          );
        }
      }
    });
  }
}

if (failures.length) {
  console.error(`Copy rules failed in ${failures.length} place(s):\n`);
  for (const failure of failures) console.error(failure);
  process.exit(1);
}

console.log(`Copy rules pass across ${seen.size} files.`);
