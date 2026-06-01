import { test, expect } from '@playwright/test';

test.describe('Theme toggle', () => {
  test('toggle button is visible on all pages', async ({ page }) => {
    await page.goto('/');
    // The toggle lives in a fixed bottom-end div (RTL-friendly logical class)
    const toggleBtn = page.locator('[data-testid="theme-toggle-container"] button');
    await expect(toggleBtn).toBeVisible({ timeout: 5_000 });
  });

  test('clicking the toggle switches the data-theme attribute', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const toggleBtn = page.locator('[data-testid="theme-toggle-container"] button');

    const initialTheme = await html.getAttribute('data-theme');
    await toggleBtn.click();

    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('theme persists after page reload', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const toggleBtn = page.locator('[data-testid="theme-toggle-container"] button');

    await toggleBtn.click();
    const themeAfterToggle = await html.getAttribute('data-theme');

    await page.reload();
    // data-theme is set client-side by ThemeProvider after hydration — wait for it
    await page.waitForFunction(() => document.documentElement.hasAttribute('data-theme'));
    const themeAfterReload = await html.getAttribute('data-theme');
    expect(themeAfterReload).toBe(themeAfterToggle);
  });
});
