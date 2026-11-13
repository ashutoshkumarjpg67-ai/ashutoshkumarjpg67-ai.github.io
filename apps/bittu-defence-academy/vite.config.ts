import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Production assets are served from https://<user>.github.io/bittu-defence-academy/
// In development we stay at the origin root so `npm run dev` is a plain localhost URL.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/bittu-defence-academy/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    target: 'es2020',
    cssCodeSplit: true,
  },
}));
