// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['i18next-browser-languagedetector']
  }
});