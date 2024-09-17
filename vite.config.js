import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/GymMate/',
  define: {
    'process.env': {},
  },
  build: {
    rollupOptions: {
      external: ['@react-oauth/google'],
    },
  },
})
