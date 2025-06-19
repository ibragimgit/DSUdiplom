import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  assetsInclude: ['**/*.gltf'],
  server: {
    allowedHosts: [
      'localhost',
      '5624ab680b05dd5b7a48de26c05965b9.serveo.net'
    ],
    proxy: {
      '/v1': {
        target: 'http://150.241.84.213:5000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/v1/, '/v1'),
      },
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path, // Keep the full path (e.g., /api/ask-ai)
      },
    },
  },
})