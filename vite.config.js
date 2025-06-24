import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/cosmic-greetings/',
  plugins: [react()],
  optimizeDeps: {
    include: ['i18next-browser-languagedetector']
  }
});