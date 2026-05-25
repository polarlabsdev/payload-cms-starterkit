import { test, expect } from '@playwright/test';

test.describe('404 page — suggestions', () => {
  test('visiting a URL with a close typo shows the "Did you mean?" heading with a relevant suggestion', async ({
    page,
  }) => {
    await page.goto('/abou');
    await expect(page.getByText('Did you mean?')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByRole('link').filter({ hasText: /about/i }).first()).toBeVisible();
  });

  test('each suggestion is clickable and navigates to the correct page', async ({ page }) => {
    await page.goto('/abou');
    await page.waitForSelector('text=Did you mean?', { timeout: 10_000 });
    const link = page.getByRole('link').filter({ hasText: /about/i }).first();
    const href = await link.getAttribute('href');
    await link.click();
    await expect(page).toHaveURL(new RegExp(href!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  });

  test('visiting a completely gibberish URL shows the no-suggestions fallback', async ({
    page,
  }) => {
    await page.goto('/xq7zz9pkm2');
    await expect(page.getByText('Try searching for what you need')).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByText('Did you mean?')).not.toBeVisible();
  });
});
