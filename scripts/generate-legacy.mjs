#!/usr/bin/env node
/* ============================================================
   generate-legacy.mjs — regenerate the root mirror tree (components/ + tokens/)
   from the canonical sources that live under packages/.

   Single-source rule:
     packages/tokens/css/  (every .css)          -> tokens/
     packages/react/src/   (.ts/.tsx)            -> components/  (.jsx + .d.ts)
     packages/react/src/   (.css)                -> components/  (.css)
     packages/react/src/   (.prompt.md)          -> components/  (.prompt.md)
     examples/cards/       (.card.html)          -> components/<family>/

   The src mirror strips one leading 'components/' segment:
     src/components/<f>/X.tsx  -> components/<f>/X.jsx
     src/lib/x.ts              -> components/lib/x.jsx
     src/locale/x.ts           -> components/locale/x.jsx
     src/index.ts              -> components/index.jsx
     src/styles.css            -> components/styles.css

   Relative import specifiers are rewritten by resolving them in source space
   and re-relativizing in mirror space, so any src subtree (lib/, locale/,
   hooks/, ...) is covered without a hardcoded path list. Extensionless
   specifiers get '.jsx' in the .jsx mirror so it resolves in a plain
   ES-module context; .d.ts mirrors keep TypeScript-style extensionless
   specifiers.

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
const posix = (p) => p.split('\\').join('/');

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

/* Mirror path for a file that lives under SRC_REACT:
   src/components/<f>/X -> components/<f>/X; any other src subtree keeps its
   relative path under components/. */
function mirrorPathForSrc(absPath) {
  let r = posix(relative(SRC_REACT, absPath));
  if (r.startsWith('components/')) r = r.slice('components/'.length);
  return join(OUT_COMPONENTS, r);
}

/* Rewrite one relative specifier from source space into mirror space.
   Resolves the specifier against the source file's directory (probing
   extensions and directory index files like a bundler), maps the hit to its
   mirror path, then re-relativizes from the emitted file's directory.
   - jsxExt=true: the mirrored .ts/.tsx target keeps a '.jsx' suffix so a plain
     ES-module resolver can follow it.
   - jsxExt=false (.d.ts): the target keeps the TypeScript convention of an
     extensionless specifier. */
function mirrorSpecifier(srcFileAbs, spec, outFileAbs, { jsxExt }) {
  const base = resolve(dirname(srcFileAbs), spec);
  const isFile = (p) => existsSync(p) && statSync(p).isFile();
  const candidates = /\.[a-z0-9]+$/i.test(base)
    ? [base]
    : [
        base,
        ...['.tsx', '.ts', '.jsx', '.js'].map((ext) => base + ext),
        ...['index.tsx', 'index.ts', 'index.jsx', 'index.js'].map((name) => join(base, name)),
      ];
  const hit = candidates.find(isFile);
  if (!hit) return spec; // outside src/ — left for check-mirror.mjs to flag
  let target = mirrorPathForSrc(hit);
  if (jsxExt && /\.(tsx?|jsx?)$/.test(target)) target = target.replace(/\.[^.]+$/, '.jsx');
  if (!jsxExt) target = target.replace(/\.(tsx?|jsx?)$/, '');
  let out = posix(relative(dirname(outFileAbs), target));
  if (!out.startsWith('.')) out = './' + out;
  return out;
}

function rewriteImports(code, srcFileAbs, outFileAbs, { jsxExt }) {
  return code.replace(
    /(from\s+['"]|import\s*['"])(\.{1,2}\/[^'"]+)(['"])/g,
    (match, pre, spec, post) => pre + mirrorSpecifier(srcFileAbs, spec, outFileAbs, { jsxExt }) + post,
  );
}

// --- 1. tokens/ <- packages/tokens/css/ -------------------------------------
let countTokens = 0;
for (const src of listFiles(SRC_TOKENS, ['.css'])) {
  const out = join(OUT_TOKENS, basename(src));
  write(out, GENERATED_CSS(rel(src)) + readFileSync(src, 'utf8'));
  countTokens += 1;
}

// --- 2. components/**/*.jsx <- transpile every src .ts/.tsx ------------------
// Mirrors all of packages/react/src (components/, lib/, locale/, index.ts, and
// any subtree added later) so generated imports can never point at a subtree
// the mirror does not cover.
let countJsx = 0;
const srcCodeFiles = listFiles(SRC_REACT, ['.ts', '.tsx']).filter(
  (src) => !src.endsWith('.d.ts') && !src.includes('.test.'),
);

for (const src of srcCodeFiles) {
  const outPath = mirrorPathForSrc(src).replace(/\.tsx?$/, '.jsx');
  const { outputText } = ts.transpileModule(readFileSync(src, 'utf8'), {
    fileName: basename(src),
    compilerOptions: {
      jsx: ts.JsxEmit.Preserve,
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
    },
  });
  write(outPath, GENERATED_JS(rel(src)) + rewriteImports(outputText, src, outPath, { jsxExt: true }));
  countJsx += 1;
}

// --- 3. components/**/*.css + .prompt.md <- src copies -----------------------
let countCss = 0;
for (const src of listFiles(SRC_REACT, ['.css'])) {
  const out = mirrorPathForSrc(src);
  write(out, GENERATED_CSS(rel(src)) + readFileSync(src, 'utf8'));
  countCss += 1;
}

let countPrompts = 0;
for (const src of listFiles(SRC_REACT, ['.prompt.md'])) {
  const out = mirrorPathForSrc(src);
  write(out, GENERATED_DOC(rel(src)) + readFileSync(src, 'utf8'));
  countPrompts += 1;
}

// --- 4. components/**/*.d.ts <- real declaration emit -------------------------
const rootNames = srcCodeFiles.slice();

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
  const srcRel = relative('__gen__', fileName); // mirrors src/ layout
  if (srcRel.includes('.test.')) continue;
  const srcRelTs = srcRel.replace(/\.d\.ts$/, '');
  const srcFile = join(SRC_REACT, srcRelTs + '.tsx');
  const src = existsSync(srcFile) ? srcFile : join(SRC_REACT, srcRelTs + '.ts');
  const out = mirrorPathForSrc(join(SRC_REACT, srcRelTs + '.d.ts'));
  write(out, GENERATED_JS(rel(src)) + rewriteImports(text, src, out, { jsxExt: false }));
  countDts += 1;
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
    `${countCss} css, ${countPrompts} prompt.md, ${countCards} card.html (${removed} stale removed)`,
);
