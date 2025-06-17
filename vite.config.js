import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    
  ],
  server: {
    port: 5173
  },
  /*proxy: {
      '/api': {
        target: 'https://localhost:8000', // your backend server
        changeOrigin: true,
        secure: false, // if you're using self-signed certs locally
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }*/
})
