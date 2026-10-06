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

export default libConfig({
  entry: ['src/index.ts', ...categoryEntries],
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
