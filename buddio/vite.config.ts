import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'cross-origin',
     'Cross-Origin-Embedder-Policy': 'credentialless',
    },
  },
});
