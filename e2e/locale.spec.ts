import { test, expect } from '@playwright/test';

test.describe('Language / locale switch', () => {
  test('footer language select shows the current locale', async ({ page }) => {
    await page.goto('/');
    // Scroll to footer where the language select lives
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText('English')).toBeVisible({ timeout: 5_000 });
  });

  test('selecting Français navigates to the French locale', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // Open the language select
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Français' }).click();
    await expect(page).toHaveURL(/\/fr/, { timeout: 10_000 });
  });

  test('selecting Español navigates to the Spanish locale', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Español' }).click();
    await expect(page).toHaveURL(/\/es/, { timeout: 10_000 });
  });

  test('switching locale preserves the current path', async ({ page }) => {
    await page.goto('/stories');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Français' }).click();
    await expect(page).toHaveURL(/\/fr\/stories/, { timeout: 10_000 });
  });
});
