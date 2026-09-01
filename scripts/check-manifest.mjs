// Validates docs.manifest.json against the platform content schema.
//
// The schema lives in bitcoinuniverseio/docs-platform. A copy is vendored here
// so this repository's gate does not depend on a sibling checkout being
// present on the runner. Refresh it from the platform when the schema version
// changes.

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const schema = JSON.parse(
  await readFile(fileURLToPath(new URL('../schemas/docs.manifest.schema.json', import.meta.url)), 'utf8'),
);
const manifest = JSON.parse(
  await readFile(fileURLToPath(new URL('../docs.manifest.json', import.meta.url)), 'utf8'),
);

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const validate = ajv.compile(schema);
if (!validate(manifest)) {
  console.error('docs.manifest.json is not valid:');
  for (const error of validate.errors) {
    console.error(`  ${error.instancePath || '/'} ${error.message}`);
  }
  process.exit(1);
}

// Every protocol id declared here must exist verbatim in the registry
// snapshot. The documentation portal keys its protocol pages on the registry
// id, so an id that is merely close to one associates with nothing:
// /protocols/op_return/ resolves and /protocols/op-return/ does not.
//
// The schema's pattern for these ids allows no underscore, and eight registry
// ids contain one: atomicals_nft, op_drop, op_inscriptions, op_names,
// op_return, rare_sats, runes_native, and tap_doge. Those cannot be declared
// here at all. A hyphenated variant would look right and resolve nowhere, so
// they are left out and this check keeps them out.
const snapshot = JSON.parse(
  await readFile(fileURLToPath(new URL('../src/data/capability-snapshot.json', import.meta.url)), 'utf8'),
);
const known = new Set(Object.keys(snapshot.protocols));
const unknown = (manifest.protocols ?? []).filter((id) => !known.has(id));

if (unknown.length) {
  console.error('docs.manifest.json declares protocol ids that are not registry ids:');
  for (const id of unknown) {
    const near = [...known].find((k) => k.replace(/_/g, '-') === id);
    console.error(`  ${id}${near ? ` (the registry id is "${near}", which the schema pattern cannot express)` : ''}`);
  }
  process.exit(1);
}

console.log(
  `docs.manifest.json is valid (${manifest.id}, ${manifest.lifecycle}), ` +
    `${manifest.protocols.length} protocol ids all matching the registry.`,
);
