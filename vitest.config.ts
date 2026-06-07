import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.{ts,tsx}', 'packages/**/src/**/*.test.{ts,tsx}'],
  },
});
