import { test, expect } from '@playwright/test';

test.describe('Auth — portal user', () => {
  test.use({ storageState: 'playwright/.auth/portal-1.json' });

  test('authenticated portal user can access /portal without being redirected to auth-error', async ({
    page,
  }) => {
    await page.goto('/portal');
    await expect(page).not.toHaveURL(/auth-error/);
    await expect(page).toHaveURL(/\/portal/);
  });
});

test.describe('Auth — admin user', () => {
  test.use({ storageState: 'playwright/.auth/admin.json' });

  test('authenticated admin user is recognised by /api/users/me', async ({ request }) => {
    const response = await request.get('/api/users/me');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body?.user?.collection).toBe('users');
  });
});
