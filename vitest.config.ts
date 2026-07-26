import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test environment (node by default, browser if DOM is needed)
    environment: 'node',
    
    // Test file patterns
    include: ['src/**/*.{test,spec}.{js,ts}'],
    
    // Exclude specific folders
    exclude: ['node_modules', 'dist', '.astro'],
    
    // Coverage (optional but recommended)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
      ],
    },
  },
});