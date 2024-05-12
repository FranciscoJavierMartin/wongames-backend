import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    passWithNoTests: true,
    include: ['tests/units/**/*.test.ts'],
    alias: {
      '@health/*': './src/health/*',
    },
  },
  resolve: {
    alias: {
      '@health/*': './src/health/*',
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
