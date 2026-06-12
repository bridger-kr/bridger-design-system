/**
 * @bridger-ds/react — public barrel.
 *
 * Components are re-exported here per category. Each category barrel lives at
 * `src/components/<category>/index.ts` and re-exports its own components, so
 * parallel migrations never touch this file.
 */
export { cx } from './lib/cx';
export * from './components/core';
export * from './components/forms';
export * from './components/feedback';
export * from './components/data';
export * from './components/navigation';
export * from './components/product';
