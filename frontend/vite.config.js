import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.VERCEL ? '/' : '/queue-manage/',
  plugins: [react()],
  server: {
    port: 5173,
  },
});