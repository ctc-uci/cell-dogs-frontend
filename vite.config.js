import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

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
  plugins: [react()],
});
