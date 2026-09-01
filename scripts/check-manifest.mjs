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

console.log(`docs.manifest.json is valid (${manifest.id}, ${manifest.lifecycle}).`);
