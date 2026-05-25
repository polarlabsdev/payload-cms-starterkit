/**
 * Access control — draft/publish status
 *
 * Verifies that `isPublishedOrHasAccess` correctly surfaces or hides documents
 * depending on the caller's identity and the document's _status.
 *
 * Rules under test:
 *   - Unauthenticated  → public pages/stories: published only
 *   - CMS admin        → public pages/stories: ALL (access returns `true`, no _status filter)
 *
 * Seed fixtures: ids 101 (published) and 102 (draft) in each collection.
 * Slugs are prefixed `e2e-` to avoid collisions with real content.
 */

import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const ADMIN_AUTH_FILE = path.join(process.cwd(), 'playwright/.auth/admin.json');

// ---------------------------------------------------------------------------
// Pages — unauthenticated
// ---------------------------------------------------------------------------

test.describe('Pages — unauthenticated access', () => {
  test('published page returns 200', async ({ request }) => {
    const res = await request.get('/en/e2e-page-published');
    expect(res.status()).toBe(200);
  });

  test('draft page returns 404', async ({ request }) => {
    const res = await request.get('/en/e2e-page-draft');
    expect(res.status()).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// Pages — CMS admin
// isPublishedOrHasAccess() returns `true` for admins — no _status filter is
// applied, so both published and draft documents are returned.
// ---------------------------------------------------------------------------

test.describe('Pages — CMS admin access', () => {
  test.use({ storageState: ADMIN_AUTH_FILE });

  test.beforeAll(() => {
    if (!fs.existsSync(ADMIN_AUTH_FILE)) test.skip();
  });

  test('published page returns 200', async ({ request }) => {
    const res = await request.get('/en/e2e-page-published');
    expect(res.status()).toBe(200);
  });

  test('draft page returns 200 — admin sees all statuses', async ({ request }) => {
    const res = await request.get('/en/e2e-page-draft');
    expect(res.status()).toBe(200);
  });
});

// ---------------------------------------------------------------------------
// Stories — unauthenticated
// ---------------------------------------------------------------------------

test.describe('Stories — unauthenticated access', () => {
  test('published story returns 200', async ({ request }) => {
    const res = await request.get('/en/stories/e2e-story-published');
    expect(res.status()).toBe(200);
  });

  test('draft story returns 404', async ({ request }) => {
    const res = await request.get('/en/stories/e2e-story-draft');
    expect(res.status()).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// Stories — CMS admin
// ---------------------------------------------------------------------------

test.describe('Stories — CMS admin access', () => {
  test.use({ storageState: ADMIN_AUTH_FILE });

  test.beforeAll(() => {
    if (!fs.existsSync(ADMIN_AUTH_FILE)) test.skip();
  });

  test('published story returns 200', async ({ request }) => {
    const res = await request.get('/en/stories/e2e-story-published');
    expect(res.status()).toBe(200);
  });

  test('draft story returns 200 — admin sees all statuses', async ({ request }) => {
    const res = await request.get('/en/stories/e2e-story-draft');
    expect(res.status()).toBe(200);
  });
});
