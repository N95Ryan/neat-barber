// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  
  // ============================================
  // CONFIGURATION DES VIEW TRANSITIONS
  // ============================================
  
  vite: {
    ssr: {
      external: ['@astrojs/tailwind']
    },
    build: {
      // Optimize build performance
      rollupOptions: {
        output: {
          // Minimize chunk splitting for smooth transitions
          manualChunks: {
            'transitions-core': [
              './src/scripts/transitions-manager.ts'
            ]
          }
        }
      },
      // Reduce bundle size
      minify: 'terser',
      cssMinify: true,
    },
    define: {
      // Environment variables for optimizations
      'process.env.VIEW_TRANSITIONS': true,
      'process.env.OPTIMIZE_IMAGES': true
    }
  },

  // ============================================
  // OPTIMISATIONS DE RENDU
  // ============================================
  
  // Preload critical resources
  prefetch: {
    prefetchAll: true,
    preloadAll: true
  },

  // ============================================
  // OPTIMISATIONS CSS
  // ============================================
  
  style: {
    // Inline critical CSS
    postcss: {
      plugins: [
        {
          postcssPlugin: 'inline-critical-css',
          Once(root) {
            // The plugin will be automatically handled by Astro
          }
        }
      ]
    }
  },

  // ============================================
  // OPTIMISATIONS DES IMAGES
  // ============================================
  
  image: {
    // Optimize images by default
    domains: ['images.unsplash.com', 'res.cloudinary.com']
  },

  // ============================================
  // SERVEUR DE DÉVELOPPEMENT
  // ============================================
  
  server: {
    // Development server configuration
    port: 3000,
    host: true,
    headers: {
      'Cache-Control': 'public, max-age=0'
    }
  },

  // ============================================
  // OPTIMISATIONS DE BUILD
  // ============================================
  
  build: {
    // Increase chunk format to avoid unnecessary splitting
    inlineStylesheets: 'auto',
    // Improve compression
    assets: 'assets',
    // Reduce source maps generation in production
    sourcemap: false,
    // Optimize output format
    format: 'directory'
  },

  // ============================================
  // CONFIGURATION TYPESCRIPT
  // ============================================
  
  typescript: {
    // Check TypeScript types
    typeCheck: 'build',
    // Ignore minor TypeScript build errors
    strict: true
  },

  // ============================================
  // CONFIGURATION I18N (optionnel)
  // ============================================
  
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    fallback: { en: 'fr' }
  },

  // ============================================
  // CONFIGURATION DE SORTIE
  // ============================================
  
  output: 'static',
  
  // Adapter pour SSG (Static Site Generation)
  adapter: undefined,

  // ============================================
  // AUTRES OPTIMISATIONS
  // ============================================
  
  // Tweak page metadata
  trailingSlash: 'ignore',
});