import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5173'
    }
  },
  plugins: [react()],
  base: "https://github.com/shashii-03/candidate-management-system.git",
})
