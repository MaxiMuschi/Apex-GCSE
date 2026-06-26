import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Apex Academy GCSE — standalone Vite + React SPA.
// Talks to the existing Render backend through VITE_API_URL at runtime.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8889,
    host: true,
  },
})
