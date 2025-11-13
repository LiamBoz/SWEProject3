import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  server: {
    watch:{
      usePolling: true,
      interval: 200,
    },
    // bind to all interfaces so the dev server is reachable from Docker host
    host: "0.0.0.0",
    port: 5173,
  },
})
