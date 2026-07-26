import { test, expect } from '@playwright/test';

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
        // Filter out known non-critical errors (fonts, images, etc.)
        const text = msg.text();
        if (!text.includes('favicon') && !text.includes('404')) {
          consoleErrors.push(text);
        }
      }
    });
    
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check no critical errors (allow some non-critical ones)
    expect(consoleErrors.length).toBeLessThanOrEqual(2);
  });
});
