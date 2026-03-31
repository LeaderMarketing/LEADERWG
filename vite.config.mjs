import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages deploys under /LEADERWG/; Railway (production) uses root /
const base = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
