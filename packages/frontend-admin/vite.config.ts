import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,  // ← Permet à Docker d'accéder au serveur
  },
  preview: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
  },
})