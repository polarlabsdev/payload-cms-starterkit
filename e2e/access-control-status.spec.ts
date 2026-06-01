/**
 * Access control — draft/publish status
 *
 * Verifies that `isPublishedOrHasAccess` correctly surfaces or hides documents
 * depending on the caller's identity and the document's _status.
 *
 * Rules under test:
 *   - Unauthenticated  → public pages/stories: published only (frontend + REST API)
 *   - CMS admin        → Payload REST API: ALL (isPublishedOrHasAccess returns `true`, no _status filter)
 *
 * Note: frontend routes gate drafts behind Next.js draft mode regardless of user role.
 * Admin access control is therefore verified via the Payload REST API, not the frontend.
 *
 * Seed fixtures: ids 101 (published) and 102 (draft) in each collection.
 * Slugs are prefixed `e2e-` to avoid collisions with real content.
 */

import { test, expect } from '@playwright/test';

const ADMIN_AUTH_FILE = 'playwright/.auth/admin.json';

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
// Pages — CMS admin (via Payload REST API)
// isPublishedOrHasAccess() returns `true` for admins — no _status filter is
// applied, so both published and draft documents are returned.
// ---------------------------------------------------------------------------

test.describe('Pages — CMS admin access', () => {
  test.use({ storageState: ADMIN_AUTH_FILE });

  test('published page is returned by REST API', async ({ request }) => {
    const res = await request.get('/api/pages?where[slug][equals]=e2e-page-published');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.totalDocs).toBe(1);
  });

  test('draft page is returned by REST API — admin sees all statuses', async ({ request }) => {
    const res = await request.get('/api/pages?where[slug][equals]=e2e-page-draft');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.totalDocs).toBe(1);
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
// Stories — CMS admin (via Payload REST API)
// ---------------------------------------------------------------------------

test.describe('Stories — CMS admin access', () => {
  test.use({ storageState: ADMIN_AUTH_FILE });

  test('published story is returned by REST API', async ({ request }) => {
    const res = await request.get('/api/stories?where[slug][equals]=e2e-story-published');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.totalDocs).toBe(1);
  });

  test('draft story is returned by REST API — admin sees all statuses', async ({ request }) => {
    const res = await request.get('/api/stories?where[slug][equals]=e2e-story-draft');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.totalDocs).toBe(1);
  });
});
