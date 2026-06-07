import { globSync } from 'node:fs';
import { libConfig } from '../../tsup.base';

/**
 * Entry points:
 *  - src/index.ts: the package barrel (re-exports every category).
 *  - src/components/<category>/<Name>.tsx: one entry per component so consumers
 *    can deep-import `@bridger-ds/react/components/<category>/<Name>` and bundlers
 *    can tree-shake at the file level.
 *
 * Wave-4 migrations only drop .tsx files into the category folders; this glob
 * discovers them automatically, so no migration needs to edit this file.
 */
const componentEntries = globSync('src/components/*/*.tsx', {
  cwd: import.meta.dirname,
}).filter((p) => !p.endsWith('.test.tsx') && !p.endsWith('index.ts'));

export default libConfig({
  entry: ['src/index.ts', ...componentEntries],
  onSuccess: 'cp src/styles.css dist/styles.css',
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
});
