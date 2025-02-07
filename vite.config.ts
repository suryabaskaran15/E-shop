import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Optional: Auto open browser on dev server start
  },
  build: {
    outDir: 'dist',
  },
  base: '/', // Ensures correct routing in production
  resolve: {
    alias: {
      '@': '/src', // Optional: Helps with cleaner imports
    },
  },
})
