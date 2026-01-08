module.exports = {
    ci: {
      collect: {
        // Important pages to audit
        url: [
          'http://localhost:4321/',
          'http://localhost:4321/le-mag/',
        ],
        
        // Start preview server with explicit configuration
        startServerCommand: 'yarn preview',
        startServerReadyPattern: 'http://localhost:4321',
        startServerReadyTimeout: 60000,
        
        // Number of runs for averaging
        numberOfRuns: 1, // Reduced to 1 for faster CI
      },
      
      assert: {
        preset: 'lighthouse:recommended',
        assertions: {
          // Performance (more lenient for CI)
          'categories:performance': ['warn', { minScore: 0.7 }],
          
          // Accessibility
          'categories:accessibility': ['warn', { minScore: 0.85 }],
          
          // Best practices
          'categories:best-practices': ['warn', { minScore: 0.85 }],
          
          // SEO
          'categories:seo': ['warn', { minScore: 0.85 }],
          
          // Disable PWA (not necessary for a showcase website)
          'categories:pwa': 'off',
        },
      },
      
      upload: {
        target: 'temporary-public-storage',
      },
    },
  };
