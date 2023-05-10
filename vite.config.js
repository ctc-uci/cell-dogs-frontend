/* eslint-disable */
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  root: 'src',
  preview: {
    port: 3000,
  },
  server: {
    port: 3000,
    hmr: {
      overlay: false,
      reload: true,
    },
  },

  define: {
    'process.env': loadEnv('.env', process.cwd()),
  },
  build: {
    emptyOutDir: true,
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    sourcemap: false,
    outDir: '../build',
  },
  plugins: [react(), eslint()],
});
