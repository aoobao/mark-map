import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'lib'),
      src: path.resolve(__dirname, 'src')
    }
  },
  plugins: [react()]
})
