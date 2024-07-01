import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/feedback': 'http://localhost:3000',
      '/generate': 'http://localhost:3000',
    },

  },
})
