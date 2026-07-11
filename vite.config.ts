import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // Les textes intégraux des pièces (src/data/texts/*) sont routés dans un
        // dossier dédié pour être EXCLUS du précache PWA (cf. workbox.globIgnores)
        // et mis en cache à la demande (runtimeCaching) : install léger même avec
        // des centaines de pièces, offline préservé après 1re ouverture.
        chunkFileNames(info) {
          if (info.facadeModuleId && info.facadeModuleId.includes('/src/data/texts/')) {
            return 'assets/texts/[name]-[hash].js';
          }
          return 'assets/[name]-[hash].js';
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Theathror — le compagnon du comédien',
        short_name: 'Theathror',
        description:
          "Encyclopédie du théâtre, bibliothèque de pièces, atelier du comédien et carnet de bord.",
        lang: 'fr',
        dir: 'ltr',
        theme_color: '#130d12',
        background_color: '#171015',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2,svg,png,json}'],
        // Les textes des pièces ne sont PAS précachés (trop volumineux à grande échelle) :
        // ils sont mis en cache à la première ouverture via runtimeCaching ci-dessous.
        globIgnores: ['**/assets/texts/**'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            // Textes intégraux des pièces : cache à la demande → hors-ligne après 1re lecture.
            urlPattern: ({ url }) => url.pathname.includes('/assets/texts/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'play-texts',
              expiration: { maxEntries: 400, maxAgeSeconds: 60 * 60 * 24 * 180 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Images Wikimedia déjà consultées — cache offline.
            urlPattern: ({ url }) =>
              url.hostname.includes('wikimedia.org') ||
              url.hostname.includes('wikipedia.org'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'wikimedia-images',
              expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Tuiles OpenStreetMap déjà consultées.
            urlPattern: ({ url }) => url.hostname.includes('tile.openstreetmap.org'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'osm-tiles',
              expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
});
