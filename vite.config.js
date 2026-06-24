import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Multi-page: marketing site at /, order form at /order/.
// Each entry is its own HTML file with its own bundle — no SPA router,
// works cleanly on GitHub Pages without 404-redirect tricks.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        order: resolve(__dirname, 'order/index.html'),
      },
    },
  },
});
