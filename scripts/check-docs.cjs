#!/usr/bin/env node
/**
 * The gate for this documentation set.
 *
 * These pages are the public description of a product that moves money, so a
 * broken link, a missing screenshot, a leaked private host, or a claim the
 * running product cannot support are all release blockers rather than style
 * notes. Everything here runs on Node alone: a documentation repository that
 * needs an install step before it can be checked stops being checked.
 *
 *   node scripts/check-docs.cjs
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const LONG_DASH = String.fromCodePoint(0x2014);
const BLOCKED_TERM = String.fromCharCode(99, 97, 110, 111, 110, 105, 99, 97, 108);

/** Bytes above this make a GitHub page slow to open on a phone. */
const IMAGE_BYTE_BUDGET = 1_200_000;

const CLAIM_RULES = [
  {
    id: 'absolute-coverage',
    pattern:
      /(?<!\bnot\s)\bevery\s+(?:bitcoin\s+|dogecoin\s+)?(?:meta)?protocol\b(?!\s+(?:universe\s+(?:serves|covers)|this\s+build\s+serves|the\s+application\s+serves))/gi,
    why: 'states coverage the product cannot prove; scope it to what Universe serves',
  },
  {
    id: 'unproven-freshness',
    pattern: /\breal[\s-]?time\b/gi,
    why: 'promises freshness without a timestamp or a freshness contract',
  },
  {
    id: 'superlative',
    pattern:
      /\b(?:all[\s-]?in[\s-]?one|revolutionary|cutting[\s-]edge|game[\s-]chang(?:ing|er)|seamless(?:ly)?|next[\s-]generation|the\s+ultimate|the\s+future\s+of|world'?s\s+(?:\w+est|first|leading))\b/gi,
    why: 'marketing superlative with nothing in the product to substantiate it',
  },
  {
    id: 'unmeasured-ranking',
    pattern:
      /\b(?:trending|hottest|hot|popular)\s+(?:collections?|markets?|tokens?|mints?|stamps?|domains?|assets?|runes?|inscriptions?|now)\b/gi,
    why: 'ranking label with no stated measurement or time window',
  },
  {
    id: 'absolute-assurance',
    pattern:
      /\b(?:guaranteed|100%\s+secure|completely\s+safe|the\s+fastest|instantly)\b/gi,
    why: 'absolute assurance about safety or speed that cannot be guaranteed',
  },
];

/**
 * Anything here identifies private infrastructure. Public documentation
 * describes observable behavior; it never publishes an operator's address.
 */
const LEAK_RULES = [
  { id: 'private-ipv4', pattern: /\b(?:10|127)\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g },
  { id: 'private-ipv4', pattern: /\b192\.168\.\d{1,3}\.\d{1,3}\b/g },
  { id: 'operator-host', pattern: /\b[\w-]+\.hstgr\.cloud\b/gi },
  { id: 'ssh-invocation', pattern: /\bssh\s+(?:-\w+\s+\S+\s+)*root@/gi },
  { id: 'credential-word', pattern: /\b(?:password|passphrase|private key|seed phrase|api[_ -]?key|deploy key)\s*[:=]\s*\S+/gi },
  { id: 'github-token', pattern: /\bgh[pousr]_[A-Za-z0-9]{16,}\b/g },
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function relative(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}

function lineNumber(text, index) {
  return text.slice(0, index).split('\n').length;
}

/** Every markdown link and image, with its line. */
function references(markdown) {
  const found = [];
  for (const match of markdown.matchAll(/(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    found.push({
      isImage: match[1] === '!',
      text: match[2],
      target: match[3],
      line: lineNumber(markdown, match.index),
    });
  }
  for (const match of markdown.matchAll(/<img\s[^>]*src="([^"]+)"[^>]*>/gi)) {
    found.push({
      isImage: true,
      text: /alt="([^"]*)"/i.exec(match[0])?.[1] ?? '',
      target: match[1],
      line: lineNumber(markdown, match.index),
      html: true,
    });
  }
  // A <picture> theme swap carries its second file on a <source srcset>. The
  // alt text lives on the <img> the source replaces, so it is not repeated.
  for (const match of markdown.matchAll(/<source\s[^>]*srcset="([^"]+)"[^>]*>/gi)) {
    found.push({
      isImage: true,
      text: 'described by the img it replaces',
      target: match[1].split(',')[0].trim().split(/\s+/)[0],
      line: lineNumber(markdown, match.index),
      html: true,
    });
  }
  return found;
}

/** Heading anchors GitHub generates for a markdown file. */
function anchors(markdown) {
  const slugs = new Set();
  for (const match of markdown.matchAll(/^#{1,6}\s+(.+?)\s*$/gm)) {
    const slug = match[1]
      .replace(/`/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    slugs.add(slug);
  }
  return slugs;
}

/**
 * The checker and its test hold every banned pattern and one example of each
 * leak shape, so scanning them with their own rules can only ever fail. They
 * stay inside the em dash and blocked term checks, and the repository has
 * secret-scanning push protection behind them.
 */
const SELF = new Set(['scripts/check-docs.cjs', 'scripts/check-docs.test.cjs']);

function checkText(file, text, failures) {
  const name = relative(file);
  let index = text.indexOf(LONG_DASH);
  while (index !== -1) {
    failures.push(`${name}:${lineNumber(text, index)} em dash is not allowed`);
    index = text.indexOf(LONG_DASH, index + 1);
  }
  const blocked = new RegExp(`\\b${BLOCKED_TERM}\\b`, 'gi');
  for (const match of text.matchAll(blocked)) {
    failures.push(`${name}:${lineNumber(text, match.index)} blocked term`);
  }
  // Claim rules read published prose. This checker holds every banned phrase
  // as a pattern, and code comments are not copy anyone reads as a promise.
  if (file.endsWith('.md') && !SELF.has(name)) {
    for (const rule of CLAIM_RULES) {
      rule.pattern.lastIndex = 0;
      for (const match of text.matchAll(rule.pattern)) {
        failures.push(
          `${name}:${lineNumber(text, match.index)} ${rule.id} "${match[0].trim()}" ${rule.why}`,
        );
      }
    }
  }
  for (const rule of SELF.has(name) ? [] : LEAK_RULES) {
    rule.pattern.lastIndex = 0;
    for (const match of text.matchAll(rule.pattern)) {
      failures.push(
        `${name}:${lineNumber(text, match.index)} ${rule.id} would publish private infrastructure`,
      );
    }
  }
}

function checkMarkdown(file, markdown, failures) {
  const name = relative(file);
  const dir = path.dirname(file);
  const own = anchors(markdown);

  for (const reference of references(markdown)) {
    const { target, line, isImage } = reference;
    if (/^(https?:|mailto:)/i.test(target)) continue;

    if (target.startsWith('#')) {
      if (!own.has(target.slice(1))) {
        failures.push(`${name}:${line} anchor ${target} does not exist on this page`);
      }
      continue;
    }

    const [filePart, anchorPart] = target.split('#');
    const resolved = path.resolve(dir, decodeURIComponent(filePart));
    if (!fs.existsSync(resolved)) {
      failures.push(`${name}:${line} ${isImage ? 'image' : 'link'} target is missing: ${target}`);
      continue;
    }
    if (anchorPart && resolved.endsWith('.md')) {
      const targetAnchors = anchors(fs.readFileSync(resolved, 'utf8'));
      if (!targetAnchors.has(anchorPart)) {
        failures.push(`${name}:${line} anchor #${anchorPart} does not exist in ${filePart}`);
      }
    }
    if (isImage) {
      if (!reference.text.trim()) {
        failures.push(`${name}:${line} image has no alt text: ${target}`);
      }
      const bytes = fs.statSync(resolved).size;
      if (bytes > IMAGE_BYTE_BUDGET) {
        failures.push(
          `${name}:${line} image is ${Math.round(bytes / 1000)} kB, over the ${IMAGE_BYTE_BUDGET / 1000} kB budget: ${target}`,
        );
      }
    }
  }
}

/** An image nothing links to is an image nobody reviews. */
function checkOrphanImages(files, failures) {
  const referenced = new Set();
  for (const file of files.filter((f) => f.endsWith('.md'))) {
    const dir = path.dirname(file);
    for (const reference of references(fs.readFileSync(file, 'utf8'))) {
      if (/^https?:/i.test(reference.target)) continue;
      referenced.add(path.resolve(dir, decodeURIComponent(reference.target.split('#')[0])));
    }
  }
  for (const file of files) {
    if (!/\.(png|jpe?g|webp|avif|svg|gif)$/i.test(file)) continue;
    if (!referenced.has(path.resolve(file))) {
      failures.push(`${relative(file)} is not referenced by any page`);
    }
  }
}

function main() {
  const files = walk(ROOT);
  const failures = [];

  for (const file of files) {
    if (/\.(png|jpe?g|webp|avif|gif|ico)$/i.test(file)) continue;
    const buffer = fs.readFileSync(file);
    if (buffer.includes(0)) continue;
    const text = buffer.toString('utf8');
    checkText(file, text, failures);
    if (file.endsWith('.md')) checkMarkdown(file, text, failures);
  }
  checkOrphanImages(files, failures);

  if (failures.length) {
    process.stderr.write(`Documentation check failed:\n${failures.join('\n')}\n`);
    process.exitCode = 1;
    return;
  }
  process.stdout.write(
    `Documentation check passed across ${files.filter((f) => f.endsWith('.md')).length} pages.\n`,
  );
}

if (require.main === module) main();

module.exports = { anchors, references, CLAIM_RULES, LEAK_RULES };
