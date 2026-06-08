import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'logo.svg'],
      manifest: {
        name: 'Название вашего приложения',
        short_name: 'AppName',
        description: 'Описание приложения',
        theme_color: '#42b883',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/stDashboard/',
        start_url: '/stDashboard/',
        server: {
          proxy: {
            '/api': {
              target: 'https://api.rb.asu.ru',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
            }
          }
        },
        icons: [
          {
            src: '/stDashboard/icons/icon-192x192.svg',
            sizes: '192x192',
            type: 'image/svg'
          },
          {
            src: '/stDashboard/icons/icon-512x512.ico',
            sizes: '512x512',
            type: 'image/ico'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24
              }
            }
          }
        ]
      }
    })
  ],
  base: '/stDashboard/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})