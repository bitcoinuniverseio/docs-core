// A backstop against publishing something private.
//
// The product source is private and is read for facts. This check exists
// because a fact read from a private repository can arrive with a hostname, an
// IP address, or a credential attached to it, and nobody notices until it is
// on the public internet.
//
// It is a backstop, not a substitute for judgement.

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.astro', 'shots']);
// The lockfile is thousands of registry URLs and no prose, and the vendored
// schema is a copy of a platform file rather than something authored here.
const SKIP_FILES = new Set(['package-lock.json', 'docs.manifest.schema.json']);
const EXTENSIONS = new Set(['.md', '.mdx', '.astro', '.json', '.mjs', '.js', '.css', '.yml', '.txt', '.svg']);

// Hosts a public documentation page is allowed to name.
const ALLOWED_HOSTS = [
  'bitcoinuniverse.io',
  'bitcoinuniverseio.github.io',
  'github.com',
  'json-schema.org',
  'creativecommons.org',
  'unisat.io',
  'xverse.app',
  'okx.com',
  'wizz.cash',
  'chromewebstore.google.com',
  'mempool.space',
  'localhost',
  // XML namespaces are markup, not network requests.
  'w3.org',
  'sitemaps.org',
];

const RULES = [
  {
    id: 'private-ipv4',
    pattern: /\b(?:10|127)\.\d{1,3}\.\d{1,3}\.\d{1,3}\b|\b172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}\b|\b192\.168\.\d{1,3}\.\d{1,3}\b/,
    message: 'a private IP address.',
  },
  {
    id: 'github-token',
    pattern: /\bgh[pousr]_[A-Za-z0-9]{16,}\b/,
    message: 'a GitHub token.',
  },
  {
    id: 'generic-secret',
    pattern: /\b(?:api[_-]?key|secret[_-]?key|access[_-]?token|private[_-]?key|password)\s*[:=]\s*["'][^"']{8,}["']/i,
    message: 'a credential assignment.',
  },
  {
    id: 'pem-block',
    pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
    message: 'a private key block.',
  },
  {
    id: 'connection-string',
    pattern: /\b(?:mysql|postgres(?:ql)?|mongodb|redis|amqp):\/\/[^\s"'<)]+/i,
    message: 'a database or broker connection string.',
  },
  {
    id: 'ssh-target',
    pattern: /\bssh\s+[A-Za-z0-9._-]+@[A-Za-z0-9.-]+/,
    message: 'an SSH target.',
  },
  {
    id: 'internal-hostname',
    // Something that reads like an internal service name rather than a domain.
    pattern: /https?:\/\/[A-Za-z0-9-]+(?:-[A-Za-z0-9-]+){2,}(?:[/:]|$)/,
    message: 'a hostname with no public domain suffix, which usually means an internal service.',
  },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (!SKIP_FILES.has(entry.name) && EXTENSIONS.has(path.extname(entry.name))) yield full;
  }
}

const failures = [];
let scanned = 0;

for await (const file of walk(ROOT)) {
  if (file.endsWith('check-public-safety.mjs')) continue;
  scanned += 1;
  const lines = (await readFile(file, 'utf8')).split('\n');
  lines.forEach((line, index) => {
    for (const rule of RULES) {
      if (!rule.pattern.test(line)) continue;
      failures.push(
        `${path.relative(ROOT, file)}:${index + 1}  ${rule.id}: ${rule.message}\n    ${line.trim().slice(0, 140)}`,
      );
    }

    // Every absolute URL must point at a host on the allow list.
    for (const match of line.matchAll(/https?:\/\/([A-Za-z0-9.-]+)/g)) {
      const host = match[1].toLowerCase().replace(/[.,;:)]+$/, '');
      const ok = ALLOWED_HOSTS.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
      if (!ok) {
        failures.push(
          `${path.relative(ROOT, file)}:${index + 1}  unlisted-host: ${host} is not on the allow list in this script.\n    ${line.trim().slice(0, 140)}`,
        );
      }
    }
  });
}

if (failures.length) {
  console.error(`Public-safety scan failed in ${failures.length} place(s):\n`);
  for (const failure of failures) console.error(failure);
  process.exit(1);
}

console.log(`Public-safety scan clean across ${scanned} files.`);
