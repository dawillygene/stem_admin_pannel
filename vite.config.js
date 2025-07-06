import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_URL || 'http://localhost:8000/',
          changeOrigin: true,
          headers: { 
            Accept: 'application/json',
            // 'Content-Type':'application/json',
            // 'Access-Control-Allow-Origin':'*',
            // 'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS',
          }
        }
      }
    }
  }
})
