import { test, expect } from '@playwright/test';

test.describe('Auth — admin user', () => {
  test.use({ storageState: 'playwright/.auth/admin.json' });

  test('authenticated admin user is recognised by /api/users/me', async ({ request }) => {
    const response = await request.get('/api/users/me');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body?.user?.collection).toBe('users');
  });
});
