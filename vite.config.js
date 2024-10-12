import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    // uncomment below when deployingg
    base: "/github-repo/",
  plugins: [react()],

})
