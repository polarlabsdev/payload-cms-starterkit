import { test, expect } from '@playwright/test';

test.describe('Navigation — desktop search icon', () => {
  test('clicking the search button opens the search modal', async ({ page }) => {
    await page.goto('/');
    // Desktop search button has aria-label="Search" (hidden on mobile, visible at lg viewport)
    await page.getByRole('button', { name: 'Search' }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5_000 });
    await expect(page.getByPlaceholder(/search pages and stories/i)).toBeVisible();
  });
});

test.describe('Navigation — mobile menu', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('hamburger button opens the mobile menu', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('button', { name: 'Close menu' })).toBeVisible({ timeout: 5_000 });
  });

  test('close button hides the mobile menu', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('button', { name: 'Close menu' })).toBeVisible({ timeout: 5_000 });
    await page.getByRole('button', { name: 'Close menu' }).click();
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible({ timeout: 5_000 });
  });

  test('clicking a nav link navigates and closes the menu', async ({ page }) => {
    // Start on a page that is not Home so navigation is observable
    await page.goto('/stories');
    await page.getByRole('button', { name: 'Open menu' }).click();
    // "Home" is the first plain link in the mobile nav
    const homeLink = page.getByRole('link', { name: 'Home' }).first();
    await expect(homeLink).toBeVisible({ timeout: 5_000 });
    await homeLink.click();
    // With localePrefix: 'as-needed', the default locale (en) has no prefix — home is just /
    await expect(page).not.toHaveURL(/\/stories/, { timeout: 10_000 });
    // Menu should be closed after navigation
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible({ timeout: 5_000 });
  });
});
