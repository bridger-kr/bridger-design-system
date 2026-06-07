import { defineConfig, type Options } from 'tsup';

const reactExternals = ['react', 'react-dom', 'react/jsx-runtime'];

export function libConfig(options: Options = {}) {
  return defineConfig({
    format: ['esm', 'cjs'],
    dts: true,
    treeshake: true,
    splitting: false,
    clean: true,
    sourcemap: true,
    ...options,
    external: [...new Set([...reactExternals, ...(options.external ?? [])])],
  });
}
