import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react() ,
    tailwindcss(),],
    server:{
      proxy:{
        '/api':{
           target:'http://192.168.1.109:8000/',
            changeOrigin:true,
            headers:{
              Accept:'application/json',
              // 'Content-Type':'application/json',
              // 'Access-Control-Allow-Origin':'*',
              // 'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS',
            }
      }
    }}
  
})
