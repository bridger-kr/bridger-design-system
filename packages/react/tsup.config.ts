import { globSync } from 'node:fs';
import { libConfig } from '../../tsup.base';

/**
 * Entry points:
 *  - src/index.ts: the package barrel (re-exports every category).
 *  - src/components/<category>/index.ts: one entry per family so consumers
 *    can deep-import `@bridger-kr/react/components/<category>`.
 *
 * `splitting: true` gives the ESM graph shared chunks, so mixing the barrel
 * with category deep imports never duplicates `lib/cx` or future shared
 * context (Toast queue, LocaleProvider) into a second module instance.
 *
 * The `"use client"` banner marks every output file as a client boundary so
 * stateful components stay importable from Next.js server components.
 */
const categoryEntries = globSync('src/components/*/index.ts', {
  cwd: import.meta.dirname,
});

// One entry per component file so consumer bundlers can tree-shake at
// component granularity: `import { Alert }` resolves to Alert's module
// alone instead of dragging the whole family bundle (and the positioned
// components' usePositioner runtime) into the entry chunk.
const componentEntries = globSync('src/components/*/*.tsx', {
  cwd: import.meta.dirname,
}).filter((file) => !file.endsWith('.test.tsx'));

export default libConfig({
  entry: ['src/index.ts', ...categoryEntries, ...componentEntries],
  splitting: true,
  // Keep treeshake off: tsup's rollup treeshake pass rewrites every chunk and
  // would strip the "use client" banner. esbuild still drops unreferenced
  // code inside each entry, and consumer bundlers tree-shake on import.
  treeshake: false,
  banner: { js: '"use client";' },
  onSuccess: 'pnpm build:css',
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
});
