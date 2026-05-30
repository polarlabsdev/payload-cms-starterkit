import { test, expect } from '@playwright/test';

// Requires the announcement bar to be enabled in seed data with this text.
// Add an announcementBar.json fixture and wire it into the seed script.
const ANNOUNCEMENT_TEXT = 'E2E Test Announcement — please ignore';

test.describe('Announcement bar', () => {
  test('renders when enabled with the configured text', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(ANNOUNCEMENT_TEXT)).toBeVisible({ timeout: 5_000 });
  });

  test('close button dismisses the bar for the session', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(ANNOUNCEMENT_TEXT)).toBeVisible({ timeout: 5_000 });
    await page.getByRole('button', { name: 'Close announcement' }).click();
    await expect(page.getByText(ANNOUNCEMENT_TEXT)).not.toBeVisible();
  });

  test('bar appears on all pages while enabled', async ({ page }) => {
    await page.goto('/stories');
    await expect(page.getByText(ANNOUNCEMENT_TEXT)).toBeVisible({ timeout: 5_000 });
  });
});
