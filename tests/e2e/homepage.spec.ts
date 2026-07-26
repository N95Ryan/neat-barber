import { test, expect } from '@playwright/test';

/** Third-party / environment noise that should not fail CI */
const IGNORED_CONSOLE_ERROR_PATTERNS = [
  /favicon/i,
  /\b404\b/i,
  /Failed to load resource/i,
  /googletagmanager/i,
  /gtm/i,
  /revw\.me/i,
  /getcoucou/i,
  /EMR/i,
  /Content Security Policy/i,
  /net::ERR_/i,
];

function isIgnoredConsoleError(message: string): boolean {
  return IGNORED_CONSOLE_ERROR_PATTERNS.some((pattern) => pattern.test(message));
}

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/NEAT Barber/i);
  });

  test('should display main navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check if header is visible
    const header = page.locator('header.main-header');
    await expect(header).toBeVisible();
  });

  test('should have functional navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Check if "Le Mag" link exists and is clickable
    const magLink = page.locator('a[href*="/le-mag"]').first();
    if (await magLink.count() > 0) {
      await expect(magLink).toBeEnabled();
    }
  });

  test('should display footer', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to footer
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    
    // Check footer is visible
    await expect(footer).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check hero section is visible
    const hero = page.locator('section.hero');
    await expect(hero).toBeVisible();
    
    // Check hero title contains expected text
    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toContainText(/expérience/i);
  });

  test('should not have console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!isIgnoredConsoleError(text)) {
          consoleErrors.push(text);
        }
      }
    });
    
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    expect(
      consoleErrors,
      `Unexpected console errors:\n${consoleErrors.join('\n')}`
    ).toEqual([]);
  });
});
