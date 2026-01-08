module.exports = {
    ci: {
      collect: {
        // Important pages to audit
        url: [
          'http://localhost:4321/',
          'http://localhost:4321/le-mag/',
          'http://localhost:4321/404/',
        ],
        
        // Start preview server
        startServerCommand: 'yarn preview',
        startServerReadyPattern: 'Local',
        
        // Number of runs for averaging
        numberOfRuns: 3,
      },
      
      assert: {
        preset: 'lighthouse:recommended',
        assertions: {
          // Performance
          'categories:performance': ['warn', { minScore: 0.8 }],
          
          // Accessibility (strict)
          'categories:accessibility': ['error', { minScore: 0.9 }],
          
          // Best practices
          'categories:best-practices': ['warn', { minScore: 0.9 }],
          
          // SEO
          'categories:seo': ['error', { minScore: 0.9 }],
          
          // Disable PWA (not necessary for a showcase website)
          'categories:pwa': 'off',
        },
      },
      
      upload: {
        target: 'temporary-public-storage',
      },
    },
  };
