// Validates the published OpenAPI document.
//
// Two things are checked. First, that the document parses and resolves as a
// valid OpenAPI 3.1 description. Second, that it describes only GET
// operations: this repository publishes the public read surface, and a
// mutation route appearing here would be a mistake with consequences.

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import SwaggerParser from '@apidevtools/swagger-parser';

const file = fileURLToPath(new URL('../public/openapi/core-public-read.json', import.meta.url));
const raw = JSON.parse(await readFile(file, 'utf8'));

const failures = [];

if (raw.openapi !== '3.1.0') {
  failures.push(`Expected openapi 3.1.0, found ${raw.openapi}`);
}

for (const [path, item] of Object.entries(raw.paths ?? {})) {
  for (const method of Object.keys(item)) {
    if (!['get', 'parameters', 'summary', 'description', 'servers'].includes(method)) {
      failures.push(`${path} declares a non-GET operation: ${method}`);
    }
  }
}

if (raw.components?.securitySchemes || raw.security) {
  failures.push('The public read document must not declare authentication.');
}

try {
  const api = await SwaggerParser.validate(structuredClone(raw));
  const operations = Object.values(api.paths).reduce(
    (n, item) => n + Object.keys(item).filter((k) => k === 'get').length,
    0,
  );
  console.log(`OpenAPI 3.1 document is valid: ${operations} public read operations.`);
} catch (error) {
  failures.push(`Document did not validate: ${error.message}`);
}

if (failures.length) {
  console.error('OpenAPI check failed:');
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
