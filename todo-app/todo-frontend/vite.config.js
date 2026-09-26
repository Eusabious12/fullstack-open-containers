import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['localhost', 'app'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
