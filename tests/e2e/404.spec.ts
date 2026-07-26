import { test, expect } from '@playwright/test';

test.describe('404 Page', () => {
  test('should display 404 page for non-existent routes', async ({ page }) => {
    // Navigate to non-existent page
    const response = await page.goto('/page-qui-nexiste-pas');
    
    // Check response status
    expect(response?.status()).toBe(404);
  });

  test('should display 404 heading', async ({ page }) => {
    await page.goto('/page-inexistante');
    
    // Check if "Page non trouvée" heading is visible
    const heading = page.locator('h2').filter({ hasText: /page non trouvée/i });
    await expect(heading).toBeVisible();
  });

  test('should have a link back to homepage', async ({ page }) => {
    await page.goto('/route-invalide');
    
    // Check if there's a link to go back home
    const homeLink = page.locator('a[href="/"]');
    await expect(homeLink.first()).toBeVisible();
    
    // Verify button text
    const backButton = page.locator('a.btn-default');
    await expect(backButton).toContainText(/accueil/i);
  });

  test('should maintain site navigation on 404', async ({ page }) => {
    await page.goto('/erreur-404');
    
    // Check if header/navigation is still present
    const header = page.locator('header.main-header');
    await expect(header).toBeVisible();
  });
});
