import { test, expect } from '@playwright/test';

test.describe('404 page — layout', () => {
  test('a non-existent website URL renders with the website navigation', async ({ page }) => {
    await page.goto('/nonexistent-page-e2e-test');
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});
