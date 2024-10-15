import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  //uncomment for github deploy
  base:"/FaceSpace/",
  plugins: [react()],
  server: process.env.PORT||10000
})
