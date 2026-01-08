import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // E2E tests directory
  testDir: './tests/e2e',
  
  // Timeout per test
  timeout: 30000,
  
  // Run tests in parallel
  fullyParallel: true,
  
  // Don't retry failed tests locally
  retries: process.env.CI ? 2 : 0,
  
  // Number of workers
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter
  reporter: 'html',
  
  // Global configuration
  use: {
    // Base URL
    baseURL: 'http://localhost:4321',
    
    // Trace failed tests
    trace: 'on-first-retry',
    
    // Screenshots
    screenshot: 'only-on-failure',
  },
  
  // Browsers to test
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Add Firefox and Safari if needed
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],
  
  // Start server automatically
  webServer: {
    command: 'yarn preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});