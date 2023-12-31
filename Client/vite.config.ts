import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// if you using Typescript need to install type definitions for Node.js: npm install @types/node
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
