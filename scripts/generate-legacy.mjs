#!/usr/bin/env node
/* ============================================================
   generate-legacy.mjs — regenerate the root mirror tree (components/ + tokens/)
   from the canonical sources that live under packages/.

   Single-source rule:
     packages/tokens/css/  (every .css)          -> tokens/
     packages/react/src/components/  (.ts/.tsx)  -> components/  (.jsx + .d.ts)
     packages/react/src/lib/         (.ts)       -> components/lib/  (.jsx + .d.ts)
     packages/react/src/components/  (.prompt.md)-> components/  (.prompt.md)
     examples/cards/                 (.card.html)-> components/<family>/

   Everything under components/ and tokens/ is generated output. Never edit it
   by hand — change the source and re-run `pnpm generate`. CI fails the build
   when committed output drifts from regeneration.

   Run: pnpm generate   (from repo root)
============================================================ */
import { readdirSync, readFileSync, rmSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC_REACT = join(ROOT, 'packages/react/src');
const SRC_TOKENS = join(ROOT, 'packages/tokens/css');
const SRC_CARDS = join(ROOT, 'examples/cards');
const OUT_COMPONENTS = join(ROOT, 'components');
const OUT_TOKENS = join(ROOT, 'tokens');

const require = createRequire(import.meta.url);
const ts = require('typescript');

const GENERATED_CSS = (src) =>
  `/* ============================================================\n   GENERATED FILE — DO NOT EDIT.\n   Source: ${src}\n   Regenerate: pnpm generate\n   ============================================================ */\n\n`;
const GENERATED_JS = (src) =>
  `// GENERATED FILE — DO NOT EDIT.\n// Source: ${src}\n// Regenerate: pnpm generate\n\n`;
const GENERATED_DOC = (src) =>
  `<!-- GENERATED FILE — DO NOT EDIT. Source: ${src}. Regenerate: pnpm generate. -->\n`;

const written = new Set();
const rel = (p) => relative(ROOT, p).split('\\').join('/');

function write(outPath, text) {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, text);
  written.add(outPath);
}

function listFiles(dir, exts) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true })
    .map(String)
    .filter((p) => exts.some((ext) => p.endsWith(ext)))
    .sort()
    .map((p) => join(dir, p));
}

/* Rewrite relative import specifiers for the mirrored tree.
   - '../../lib/x' (src/components/<family>/ -> src/lib/) becomes '../lib/x'
     because components/<family>/ -> components/lib/.
   - Extensionless relative specifiers get '.jsx' so the mirror resolves in
     a plain ES-module context. */
function rewriteImports(code) {
  return code.replace(/(from\s+['"])(\.{1,2}\/[^'"]+)(['"])/g, (match, pre, spec, post) => {
    let next = spec.startsWith('../../lib/') ? spec.replace('../../lib/', '../lib/') : spec;
    if (!/\.[a-z0-9]+$/i.test(next)) next += '.jsx';
    return pre + next + post;
  });
}

/* Only the lib path fix for .d.ts (extensionless is fine for TS resolution). */
function rewriteDtsImports(code) {
  return code.replace(/(from\s+['"])(\.{1,2}\/[^'"]+)(['"])/g, (match, pre, spec, post) => {
    const next = spec.startsWith('../../lib/') ? spec.replace('../../lib/', '../lib/') : spec;
    return pre + next + post;
  });
}

// --- 1. tokens/ <- packages/tokens/css/ -------------------------------------
let countTokens = 0;
for (const src of listFiles(SRC_TOKENS, ['.css'])) {
  const out = join(OUT_TOKENS, basename(src));
  write(out, GENERATED_CSS(rel(src)) + readFileSync(src, 'utf8'));
  countTokens += 1;
}

// --- 2. components/**/*.jsx <- transpile packages/react/src ------------------
// Mirrors src/components/** -> components/** and src/lib/** -> components/lib/**.
let countJsx = 0;
const transpileTargets = [
  ...listFiles(join(SRC_REACT, 'components'), ['.ts', '.tsx']).map((src) => ({
    src,
    out: join(OUT_COMPONENTS, relative(join(SRC_REACT, 'components'), src)),
  })),
  ...listFiles(join(SRC_REACT, 'lib'), ['.ts']).map((src) => ({
    src,
    out: join(OUT_COMPONENTS, 'lib', basename(src)),
  })),
].filter(({ src }) => !src.endsWith('.d.ts') && !src.includes('.test.'));

for (const { src, out } of transpileTargets) {
  const outPath = out.replace(/\.tsx?$/, '.jsx');
  const { outputText } = ts.transpileModule(readFileSync(src, 'utf8'), {
    fileName: basename(src),
    compilerOptions: {
      jsx: ts.JsxEmit.Preserve,
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
    },
  });
  write(outPath, GENERATED_JS(rel(src)) + rewriteImports(outputText));
  countJsx += 1;
}

// --- 3. components/**/*.d.ts <- real declaration emit -------------------------
const rootNames = [
  ...listFiles(join(SRC_REACT, 'components'), ['.ts', '.tsx']),
  ...listFiles(join(SRC_REACT, 'lib'), ['.ts']),
]
  .filter((f) => !f.includes('.test.') && !f.endsWith('.d.ts'))
  .concat([join(SRC_REACT, 'index.ts')]);

const emitted = {};
const program = ts.createProgram(rootNames, {
  jsx: ts.JsxEmit.ReactJSX,
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  declaration: true,
  emitDeclarationOnly: true,
  strict: true,
  skipLibCheck: true,
  types: ['node', 'react', 'react-dom'],
  rootDir: SRC_REACT,
  outDir: '__gen__',
  noEmitOnError: true,
});
const result = program.emit(undefined, (fileName, text) => {
  emitted[fileName] = text;
});
const diagnostics = ts.getPreEmitDiagnostics(program);
if (result.emitSkipped || diagnostics.length > 0) {
  for (const d of diagnostics.slice(0, 10)) {
    console.error(ts.flattenDiagnosticMessageText(d.messageText, ' '));
  }
  throw new Error(`declaration emit failed (${diagnostics.length} diagnostics)`);
}

let countDts = 0;
for (const [fileName, text] of Object.entries(emitted)) {
  const srcRel = relative('__gen__', fileName); // mirrors src/ layout: components/<f>/X.d.ts, lib/x.d.ts
  if (srcRel === 'index.d.ts') continue; // root barrel has no mirror home
  if (srcRel.includes('.test.')) continue;
  const mirrorRel = srcRel.startsWith('components/') ? srcRel.slice('components/'.length) : srcRel;
  const out = join(OUT_COMPONENTS, mirrorRel);
  const srcRelTs = srcRel.replace(/\.d\.ts$/, '');
  const srcFile = ['.tsx', '.ts'].map((ext) => join(SRC_REACT, srcRelTs + ext)).find(existsSync);
  write(out, GENERATED_JS(srcFile ? rel(srcFile) : 'packages/react/src/' + srcRel) + rewriteDtsImports(text));
  countDts += 1;
}

// --- 4. components/**/*.prompt.md <- colocated sources in packages/react ----
let countPrompts = 0;
for (const src of listFiles(join(SRC_REACT, 'components'), ['.prompt.md'])) {
  const out = join(OUT_COMPONENTS, relative(join(SRC_REACT, 'components'), src));
  write(out, GENERATED_DOC(rel(src)) + readFileSync(src, 'utf8'));
  countPrompts += 1;
}

// --- 5. components/<family>/*.card.html <- examples/cards/ --------------------
// Card sources are named <family>[-segment].card.html; the family segment
// selects the output directory.
let countCards = 0;
for (const src of listFiles(SRC_CARDS, ['.card.html'])) {
  const family = basename(src).split(/[-.]/)[0];
  const out = join(OUT_COMPONENTS, family, basename(src));
  write(out, GENERATED_DOC(rel(src)) + readFileSync(src, 'utf8'));
  countCards += 1;
}

// --- 6. remove stale generated files -----------------------------------------
let removed = 0;
function prune(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) {
      prune(p);
      if (readdirSync(p).length === 0) rmSync(p, { recursive: true });
    } else if (!written.has(p)) {
      rmSync(p);
      removed += 1;
      console.log(`removed stale ${rel(p)}`);
    }
  }
}
prune(OUT_COMPONENTS);
prune(OUT_TOKENS);

console.log(
  `generate-legacy: ${countTokens} token css, ${countJsx} jsx, ${countDts} d.ts, ` +
    `${countPrompts} prompt.md, ${countCards} card.html (${removed} stale removed)`,
);
