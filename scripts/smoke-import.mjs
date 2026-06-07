import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);

function usage() {
  return [
    'Usage: node scripts/smoke-import.mjs <dist-dir> <expected-export>...',
    '',
    'Imports <dist-dir>/index.js with ESM import() and requires',
    '<dist-dir>/index.cjs with CommonJS require(), then verifies each expected',
    'named export exists in both module shapes.',
    '',
    'Example:',
    '  node scripts/smoke-import.mjs packages/tokens/dist colors spacing',
  ].join('\n');
}

function assertExports(moduleNamespace, expectedExports, label) {
  const missing = expectedExports.filter((name) => !(name in moduleNamespace));

  if (missing.length > 0) {
    throw new Error(
      [
        `Missing expected exports from ${label}:`,
        ...missing.map((name) => `  - ${name}`),
        '',
        'Available exports:',
        ...Object.keys(moduleNamespace).sort().map((name) => `  - ${name}`),
      ].join('\n'),
    );
  }
}

export async function smokeImport({ distDir, expectedExports, esmEntry = 'index.js', cjsEntry = 'index.cjs' }) {
  if (!distDir || !Array.isArray(expectedExports) || expectedExports.length === 0) {
    throw new Error(usage());
  }

  const resolvedDistDir = resolve(distDir);
  const esmPath = resolve(resolvedDistDir, esmEntry);
  const cjsPath = resolve(resolvedDistDir, cjsEntry);
  const esmModule = await import(pathToFileURL(esmPath).href);
  const cjsModule = require(cjsPath);

  assertExports(esmModule, expectedExports, `ESM entry ${esmEntry}`);
  assertExports(cjsModule, expectedExports, `CJS entry ${cjsEntry}`);

  return {
    esmExports: Object.keys(esmModule).sort(),
    cjsExports: Object.keys(cjsModule).sort(),
  };
}

async function main() {
  const [distDir, ...expectedExports] = process.argv.slice(2);
  const result = await smokeImport({ distDir, expectedExports });
  console.log(
    `import smoke passed with ${result.esmExports.length} ESM exports and ${result.cjsExports.length} CJS exports.`,
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
