import { test, expect } from '@playwright/test';

test.describe('Search modal', () => {
  test('opens with Cmd/Ctrl+K and shows the empty state', async ({ page }) => {
    await page.goto('/en');
    await page.keyboard.press('Meta+k');
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5_000 });
    await expect(page.getByPlaceholder(/search/i)).toBeVisible();
  });

  test('shows "type more" hint for 1-2 character queries', async ({ page }) => {
    await page.goto('/en');
    await page.keyboard.press('Meta+k');
    await page.getByPlaceholder(/search/i).fill('ab');
    await expect(page.getByText(/type/i)).toBeVisible({ timeout: 5_000 });
  });

  test('returns results for a known page title', async ({ page }) => {
    await page.goto('/en');
    await page.keyboard.press('Meta+k');
    await page.getByPlaceholder(/search/i).fill('About');
    await expect(page.getByText('About')).toBeVisible({ timeout: 10_000 });
  });

  test('returns results for a known story title', async ({ page }) => {
    await page.goto('/en');
    await page.keyboard.press('Meta+k');
    await page.getByPlaceholder(/search/i).fill('E2E Story Published');
    await expect(page.getByText('E2E Story Published')).toBeVisible({ timeout: 10_000 });
  });

  test('shows no-results state for a gibberish query', async ({ page }) => {
    await page.goto('/en');
    await page.keyboard.press('Meta+k');
    await page.getByPlaceholder(/search/i).fill('xq7zz9pkm2abc');
    await expect(page.getByText(/no results/i)).toBeVisible({ timeout: 10_000 });
  });

  test('navigates to the correct page when a result is selected', async ({ page }) => {
    await page.goto('/en');
    await page.keyboard.press('Meta+k');
    await page.getByPlaceholder(/search/i).fill('About');
    const result = page.getByRole('option').filter({ hasText: /^about$/i }).first();
    await expect(result).toBeVisible({ timeout: 10_000 });
    await result.click();
    await expect(page).toHaveURL(/\/about/);
  });

  test('closes when Escape is pressed', async ({ page }) => {
    await page.goto('/en');
    await page.keyboard.press('Meta+k');
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5_000 });
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });
});
