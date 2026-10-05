import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);

function usage() {
  return [
    'Usage: node scripts/smoke-import.mjs <dist-dir> <expected-export>... [--entries <a.mjs=x+y,b.mjs=x,...>]',
    '',
    'Imports <dist-dir>/<esm-entry> with ESM import() and requires',
    '<dist-dir>/<cjs-entry> with CommonJS require(), then verifies each expected',
    'named export exists in both module shapes. With --entries, every listed',
    'ESM entry ("file.mjs=export+export") is imported and each named export is',
    'verified to be the same module instance (===) in every entry that lists',
    'it — the code-splitting guard.',
    '',
    'Example:',
    '  node scripts/smoke-import.mjs packages/tokens/dist colors spacing',
    '  node scripts/smoke-import.mjs packages/react/dist Button cx \\',
    '    --entries "index.mjs=Button+Checkbox,components/core/index.mjs=Button,components/forms/index.mjs=Checkbox"',
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

export async function smokeImport({ distDir, expectedExports, esmEntry = 'index.mjs', cjsEntry = 'index.cjs' }) {
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

/**
 * Imports several ESM entry files from the same dist build and asserts that
 * every export listed for more than one entry resolves to the identical
 * binding — proof that shared modules (component implementations, lib/cx,
 * future context providers) are emitted as one chunk instead of being
 * duplicated per entry.
 *
 * Each entry is "path.mjs=export+export"; exports after "=" must exist in
 * that entry and are compared across every entry that lists them.
 */
export async function smokeSharedEntries({ distDir, entries }) {
  if (!distDir || !Array.isArray(entries) || entries.length < 2) {
    throw new Error(usage());
  }

  const resolvedDistDir = resolve(distDir);
  const modules = new Map();
  const sightings = new Map();
  for (const spec of entries) {
    const [entry, names = ''] = spec.split('=');
    const expected = names.split('+').filter(Boolean);
    modules.set(entry, await import(pathToFileURL(resolve(resolvedDistDir, entry)).href));
    assertExports(modules.get(entry), expected, `ESM entry ${entry}`);
    for (const name of expected) {
      sightings.set(name, [...(sightings.get(name) ?? []), entry]);
    }
  }

  let checked = 0;
  for (const [name, seen] of sightings) {
    if (seen.length < 2) continue;
    checked += 1;
    const [first, ...rest] = seen;
    for (const entry of rest) {
      if (modules.get(entry)[name] !== modules.get(first)[name]) {
        throw new Error(
          `Export "${name}" differs between ${first} and ${entry} — ` +
            'the shared module was duplicated per entry (tsup splitting regressed).',
        );
      }
    }
  }

  return { entries: [...modules.keys()], checkedExports: checked };
}

async function main() {
  const args = process.argv.slice(2);
  const entriesFlag = args.indexOf('--entries');
  let entries = null;
  if (entriesFlag !== -1) {
    entries = (args[entriesFlag + 1] ?? '').split(',').filter(Boolean);
    args.splice(entriesFlag, 2);
  }
  const [distDir, ...expectedExports] = args;

  const result = await smokeImport({ distDir, expectedExports });
  console.log(
    `import smoke passed with ${result.esmExports.length} ESM exports and ${result.cjsExports.length} CJS exports.`,
  );

  if (entries) {
    const shared = await smokeSharedEntries({ distDir, entries });
    console.log(
      `shared-entry smoke passed: ${shared.checkedExports} export(s) identical across ${shared.entries.length} entries.`,
    );
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
