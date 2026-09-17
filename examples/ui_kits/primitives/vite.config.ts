import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const exampleRoot = fileURLToPath(new URL('.', import.meta.url));
const packageRoot = resolve(exampleRoot, '../../../packages');

export default defineConfig({
  root: exampleRoot,
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@bridger-kr\/react\/styles\.css$/, replacement: resolve(packageRoot, 'react/dist/styles.css') },
      { find: /^@bridger-kr\/tokens\/css$/, replacement: resolve(packageRoot, 'tokens/css/index.css') },
      { find: /^@bridger-kr\/react$/, replacement: resolve(packageRoot, 'react/dist/index.mjs') },
    ],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
