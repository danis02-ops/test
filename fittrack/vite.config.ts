import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/test/index.html',
        navigateFallbackDenylist: [/^\/test\/sw\.js/, /^\/test\/workbox-/],
      },
      manifest: {
        name: 'FitTrack',
        short_name: 'FitTrack',
        description: 'Trainings-Tracker für Übungen, Sätze und Gewichte',
        theme_color: '#3B82F6',
        background_color: '#030712',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/test/',
        scope: '/test/',
        icons: [
          { src: '/test/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/test/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
  base: '/test/',
})
