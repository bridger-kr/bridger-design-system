#!/usr/bin/env node
/* ============================================================
   check-mirror.mjs — verify the generated components/ mirror resolves as a
   standalone consumer surface.

   Checks (each failure lists the offending file + specifier):
     1. Every relative import specifier in generated .jsx/.d.ts resolves to a
        file on disk (catches a source subtree the mirror forgot to emit, e.g.
        a new src/locale/).
     2. Every bare package specifier is declared in the root package.json
        `dependencies` (the generated consumer's explicit dep surface;
        devDependencies and node: builtins are exempt).
     3. Every declared root dependency is actually installed under root
        node_modules (catches a stale lockfile/install).
     4. esbuild bundles every generated .jsx with declared deps externalized
        via a resolve plugin — so the bundle cannot pass through incidental
        workspace hoisting, and any unresolved relative import fails the build.

   Run: pnpm verify:mirror   (after `pnpm generate`)
============================================================ */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const COMPONENTS = join(ROOT, 'components');
const require = createRequire(import.meta.url);

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const declared = new Set(Object.keys(pkg.dependencies ?? {}));

const failures = [];
const fail = (msg) => failures.push(msg);

function listFiles(dir, exts) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true })
    .map(String)
    .filter((p) => exts.some((ext) => p.endsWith(ext)))
    .sort()
    .map((p) => join(dir, p));
}

const pkgName = (spec) =>
  spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0];

const isFile = (p) => existsSync(p) && statSync(p).isFile();

// --- 1+2. specifier scan over generated .jsx and .d.ts ------------------------
const SPEC_RE = /(?:from\s+['"]|import\s*['"])([^'"]+)['"]/g;
const jsxFiles = listFiles(COMPONENTS, ['.jsx']);
const dtsFiles = listFiles(COMPONENTS, ['.d.ts']);
const bareSeen = new Map(); // pkg -> [specifiers]

function checkFile(file) {
  const code = readFileSync(file, 'utf8');
  for (const match of code.matchAll(SPEC_RE)) {
    const spec = match[1];
    const where = `${relative(ROOT, file)}: ${spec}`;
    if (spec.startsWith('.')) {
      const base = resolve(dirname(file), spec);
      const hit = isFile(base)
        ? base
        : /\.[a-z0-9]+$/i.test(base)
          ? null
          : [
                ...['.jsx', '.js', '.d.ts', '.css', '.md', '.json'].map((ext) => base + ext),
                ...['index.jsx', 'index.js', 'index.d.ts'].map((name) => join(base, name)),
              ].find(isFile);
      if (!hit) fail(`unresolved relative specifier — ${where}`);
    } else if (!spec.startsWith('node:')) {
      const name = pkgName(spec);
      bareSeen.set(name, [...(bareSeen.get(name) ?? []), spec]);
      if (!declared.has(name)) fail(`undeclared package specifier — ${where} (add "${name}" to root dependencies)`);
    }
  }
}
for (const f of [...jsxFiles, ...dtsFiles]) checkFile(f);

// --- 3. declared deps must be installed ---------------------------------------
for (const name of declared) {
  if (!isFile(join(ROOT, 'node_modules', name, 'package.json'))) {
    fail(`declared dependency "${name}" is not installed at root node_modules — run pnpm install`);
  }
}

// --- 4. esbuild root bundle with declared-only externals -----------------------
let bundled = 0;
if (failures.length === 0) {
  const esbuild = require('esbuild');
  const result = await esbuild.build({
    entryPoints: jsxFiles,
    outdir: 'mirror-check',
    write: false,
    bundle: true,
    format: 'esm',
    platform: 'browser',
    jsx: 'automatic',
    loader: { '.js': 'jsx', '.jsx': 'jsx' },
    logLevel: 'silent',
    plugins: [
      {
        name: 'declared-deps-only',
        setup(build) {
          // Only bare package specifiers: skip relative ('./', '../'), absolute
          // ('/'), and namespace ('node:') paths — esbuild resolves those itself.
          build.onResolve({ filter: /^[\w@]/ }, (args) => {
            if (args.path.startsWith('node:')) return { path: args.path, external: true };
            const name = pkgName(args.path);
            if (!declared.has(name)) {
              return {
                errors: [
                  {
                    text: `bare specifier "${args.path}" is not a declared root dependency`,
                    detail: `imported from ${args.importer}`,
                  },
                ],
              };
            }
            return { path: args.path, external: true };
          });
        },
      },
    ],
  }).catch((err) => err);
  if (result instanceof Error || result.errors?.length) {
    const errors = result instanceof Error ? [result.message] : result.errors.map((e) => e.text);
    for (const e of errors.slice(0, 15)) fail(`esbuild bundle — ${e}`);
  } else {
    bundled = jsxFiles.length;
  }
}

if (failures.length) {
  console.error(`check-mirror: ${failures.length} failure(s)`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}

console.log(
  `check-mirror: ${jsxFiles.length} jsx + ${dtsFiles.length} d.ts scanned, ` +
    `${bareSeen.size} declared packages (${[...bareSeen.keys()].join(', ')}), ` +
    `${bundled} entrypoints bundled — all resolvable`,
);
