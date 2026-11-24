import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configured for seamless deployment on GitHub Pages (any repository subpath or custom domain)
// as well as local/cloud preview environments.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || './',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
