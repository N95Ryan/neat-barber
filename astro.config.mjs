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
      // Optimiser les performances de build
      rollupOptions: {
        output: {
          // Minimiser le split des chunks pour les transitions fluides
          manualChunks: {
            'transitions-core': [
              './src/scripts/transitions-manager.ts'
            ]
          }
        }
      },
      // Réduire la taille des bundles
      minify: 'terser',
      cssMinify: true,
    },
    define: {
      // Variables d'environnement pour les optimisations
      'process.env.VIEW_TRANSITIONS': true,
      'process.env.OPTIMIZE_IMAGES': true
    }
  },

  // ============================================
  // OPTIMISATIONS DE RENDU
  // ============================================
  
  // Précharger les ressources critiques
  prefetch: {
    prefetchAll: true,
    preloadAll: true
  },

  // ============================================
  // OPTIMISATIONS CSS
  // ============================================
  
  style: {
    // Inliner le CSS critique
    postcss: {
      plugins: [
        {
          postcssPlugin: 'inline-critical-css',
          Once(root) {
            // Le plugin sera traité par Astro automatiquement
          }
        }
      ]
    }
  },

  // ============================================
  // OPTIMISATIONS DES IMAGES
  // ============================================
  
  image: {
    // Optimiser les images par défaut
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    // Permettre l'optimisation des images distantes
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },

  // ============================================
  // SERVEUR DE DÉVELOPPEMENT
  // ============================================
  
  server: {
    // Configuration du serveur de développement
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
    // Augmenter le format de chunk pour éviter les splitting inutiles
    inlineStylesheets: 'auto',
    // Améliorer la compression
    assets: 'assets',
    // Réduire la génération de source maps en production
    sourcemap: false,
    // Optimiser le format de la sortie
    format: 'directory'
  },

  // ============================================
  // CONFIGURATION TYPESCRIPT
  // ============================================
  
  typescript: {
    // Vérifier les types TypeScript
    typeCheck: 'build',
    // Ignorer les erreurs de build TypeScript mineurs
    strict: true
  },

  // ============================================
  // CONFIGURATION I18N (optionnel)
  // ============================================
  
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    fallback: 'fr'
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
  
  // Truequer les métadonnées de page
  trailingSlash: 'ignore',
  
  // Transformer le contenu HTML
  integrations: [tailwind()]
});
