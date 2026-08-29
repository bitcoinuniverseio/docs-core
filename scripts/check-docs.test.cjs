const test = require('node:test');
const assert = require('node:assert/strict');

const { anchors, references, CLAIM_RULES, LEAK_RULES } = require('./check-docs.cjs');

function ruleHits(id, text) {
  const rule = CLAIM_RULES.find((entry) => entry.id === id);
  rule.pattern.lastIndex = 0;
  return [...text.matchAll(rule.pattern)].map((match) => match[0]);
}

function leakHits(text) {
  const hits = [];
  for (const rule of LEAK_RULES) {
    rule.pattern.lastIndex = 0;
    for (const match of text.matchAll(rule.pattern)) hits.push(rule.id);
  }
  return hits;
}

test('reads markdown links, images, and a picture theme swap', () => {
  const found = references(
    [
      '[Safety](guides/market-safety.md)',
      '![A market that could not be read](docs/assets/markets.png)',
      '<source media="(prefers-color-scheme: dark)" srcset="docs/assets/banner-dark.svg">',
      '<img alt="Bitcoin Universe" src="docs/assets/banner-light.svg" width="100%">',
    ].join('\n'),
  );

  assert.deepEqual(
    found.map((entry) => entry.target),
    [
      'guides/market-safety.md',
      'docs/assets/markets.png',
      'docs/assets/banner-light.svg',
      'docs/assets/banner-dark.svg',
    ],
  );
  assert.equal(found[0].isImage, false);
  assert.equal(found[1].isImage, true);
});

test('builds the heading anchors GitHub would build', () => {
  const slugs = anchors(
    ['# Bitcoin Universe', '## How data and availability work', '### `/coverage` page'].join('\n'),
  );

  assert.ok(slugs.has('bitcoin-universe'));
  assert.ok(slugs.has('how-data-and-availability-work'));
  assert.ok(slugs.has('coverage-page'));
});

test('flags an unscoped coverage claim', () => {
  assert.deepEqual(ruleHits('absolute-coverage', 'Every Bitcoin metaprotocol in one place'), [
    'Every Bitcoin metaprotocol',
  ]);
});

test('allows a scoped or negated coverage sentence', () => {
  assert.deepEqual(ruleHits('absolute-coverage', 'every protocol Universe serves'), []);
  assert.deepEqual(ruleHits('absolute-coverage', 'Not every protocol has an index'), []);
});

test('flags a ranking with no measurement and allows one with a window', () => {
  assert.deepEqual(ruleHits('unmeasured-ranking', 'Trending collections'), [
    'Trending collections',
  ]);
  assert.deepEqual(ruleHits('unmeasured-ranking', 'Most volume in the last 7 days'), []);
});

test('flags superlatives, freshness promises, and absolute assurances', () => {
  assert.deepEqual(ruleHits('superlative', 'the ultimate explorer'), ['the ultimate']);
  assert.deepEqual(ruleHits('unproven-freshness', 'real-time order books'), ['real-time']);
  assert.deepEqual(ruleHits('absolute-assurance', 'completely safe and guaranteed'), [
    'completely safe',
    'guaranteed',
  ]);
});

test('refuses to publish private infrastructure', () => {
  assert.deepEqual(leakHits('the API listens on 127.0.0.1:3000'), ['private-ipv4']);
  assert.deepEqual(leakHits('srv000000.hstgr.cloud'), ['operator-host']);
  assert.deepEqual(leakHits('ssh -p 22 root@example'), ['ssh-invocation']);
  assert.deepEqual(leakHits('password: hunter2'), ['credential-word']);
});

test('leaves a public address and a public port alone', () => {
  assert.deepEqual(leakHits('https://www.bitcoinuniverse.io'), []);
  assert.deepEqual(leakHits('Open the app and press Ctrl+K'), []);
});
