/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js', // Optional: Setup for Jest DOM
    include: ['src/test/**/*.test.jsx'], // Specify where to look for test files
    coverage: {
        reportsDirectory: './coverage', // Directory for coverage reports
        reporter: ['text', 'html'], // Output formats (e.g., text, HTML)
      },
  },
});
