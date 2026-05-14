import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@uiw/react-codemirror') || id.includes('@codemirror')) {
            return 'codemirror';
          }

          if (id.includes('react-syntax-highlighter')) {
            return 'syntax-highlighter';
          }

          if (id.includes('@dnd-kit')) {
            return 'dnd-kit';
          }

          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('framer-motion') ||
            id.includes('lucide-react') ||
            id.includes('prop-types')
          ) {
            return 'framework';
          }

          return undefined;
        },
      },
    },
  },
});
