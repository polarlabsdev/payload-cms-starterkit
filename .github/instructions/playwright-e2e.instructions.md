---
description: Playwright E2E testing — when to write tests and how to write them for this repo
applyTo: 'e2e/**'
---

## Philosophy

E2E tests here are a **critical-path smoke suite**, not exhaustive coverage. The goal is baseline confidence that the most important features aren't broken — not 100% coverage. Do not test copy, styling, or small UI details.

## When to Write a Test

Write a test when a **breaking regression would not be caught by TypeScript or a code review** and the feature is important enough that a silent failure would be a serious problem. Good candidates:

- A feature works end-to-end through middleware, the database, and the browser (e.g. redirects, auth gates)
- Client-side behaviour that depends on a live API response (e.g. the 404 suggestions fetch)
- A route guard where the wrong outcome (no redirect, wrong destination) would expose or break something for users

Do **not** write tests for:

- Copy, labels, or styling
- PayloadCMS admin panel behaviour
- Features already covered by TypeScript types or simple unit tests

## Setup

Tests require a running app with seeded data:

- App must be running on `http://localhost:3000` (`npm run start` or `npm run dev`)
- Database must be seeded: `npm run db:seed`
- `playwright.config.ts` uses `reuseExistingServer: true` — it won't start a server if one is already running

```bash
npm run test:e2e        # headless
npm run test:e2e:ui     # interactive UI
```

## Fixture Data

If a test needs specific DB content, add it to `seed/fixtures/`. Use clearly namespaced slugs (e.g. `e2e-redirect-301`). If adding a new fixture file, wire it into `seed/utils/types.ts`, `seed/utils/seedState.ts`, and `seed/seed.ts`.

## Writing Tests

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature name', () => {
  test('plain-English description of the expected behaviour', async ({ page }) => {
    // ...
  });
});
```

Use the `request` fixture for HTTP-level assertions (status codes, headers) and the `page` fixture for browser-level assertions (navigation, visible UI).

**Key patterns:**

```typescript
// HTTP assertion — always pass maxRedirects: 0 to prevent Playwright following it
const response = await request.get('/some-path', { maxRedirects: 0 });
expect(response.status()).toBe(308);

// Navigation outcome
await page.goto('/some-path');
await expect(page).toHaveURL(/expected-destination/);

// Async/client-rendered content
await expect(page.getByText('Some text')).toBeVisible({ timeout: 10_000 });
```

Note: Next.js maps redirect type `301` → HTTP 308 and type `302` → HTTP 307.

## Authenticated Tests

Authentication is handled by a **setup project** (`e2e/auth.setup.ts`) that runs automatically before every test suite and writes `storageState` files to `playwright/.auth/`. Tests declare which identity they need via `test.use()` — no manual login steps, no test-only server routes.

### Available identities

| `storageState` file                                | Who                                                                             |
| -------------------------------------------------- | ------------------------------------------------------------------------------- |
| `playwright/.auth/portal-1.json` … `portal-9.json` | Seed portal users 1–9 (see `seed/fixtures/portalUsers.json` for which is which) |
| `playwright/.auth/portal-10.json`                  | User 10 — no linked case, no `rfhSubmittedAt` (pre-RFH state)                   |
| `playwright/.auth/portal-11.json`                  | User 11 — no linked case, `rfhSubmittedAt` set (RFH pending state)              |
| `playwright/.auth/admin.json`                      | Seed admin (`superadmin` role)                                                  |

For third-party JS embeds (e.g. the Formstack form on `/portal/request-help`), the embed renders asynchronously after a `<script>` tag injection. Use a long timeout and wait for a specific input or element to appear before asserting:

```typescript
const emailInput = page.locator('input[name="Case.ContactId.Email"]');
await expect(emailInput).toBeVisible({ timeout: 30_000 });
```

### Writing an authenticated test

```typescript
import { test, expect } from '@playwright/test';

// Declare the identity for the whole describe block
test.describe('Portal feature', () => {
  test.use({ storageState: 'playwright/.auth/portal-1.json' });

  test('authenticated user sees their dashboard', async ({ page }) => {
    await page.goto('/portal');
    await expect(page).not.toHaveURL(/auth-error/);
  });
});
```

Use `test.use()` at the describe level, not inside individual tests. For unauthenticated tests, omit `test.use()` entirely — the `chromium` project has no default `storageState`.

For admin API assertions use the `request` fixture (no browser needed):

```typescript
test.use({ storageState: 'playwright/.auth/admin.json' });

test('admin API access', async ({ request }) => {
  const response = await request.get('/api/users/me');
  expect(response.status()).toBe(200);
});
```

### How auth files are generated

`e2e/auth.setup.ts` generates the auth files at the start of each test run:

- **Portal users** — JWTs are signed locally using `PAYLOAD_SECRET` + DB IDs from `seed/seedState.json`. The `seedState.json` file is produced by `npm run db:seed`, which must have run at least once.
- **Admin** — a real `POST /api/users/login` request using the seed admin credentials defined in `seed/utils/validation.ts`.

`PAYLOAD_SECRET` must be present in the environment. Locally it is loaded from `.env` via `dotenv` at the top of `auth.setup.ts`. In CI it is an injected environment variable.

### Prerequisites

```bash
npm run db:seed          # must run at least once to produce seed/seedState.json
npm run test:e2e:setup   # generates playwright/.auth/*.json — required before UI mode
npm run test:e2e         # headless full run (setup runs automatically)
npm run test:e2e:ui      # interactive UI mode (setup does NOT auto-run — see below)
```

### Adding a new test identity

If you need a portal user not covered by the existing 9 seed users, add an entry to `seed/fixtures/portalUsers.json` and a corresponding case in `seed/fixtures/cases.json`, then re-run `npm run db:seed`. The setup script will automatically generate an auth file for the new fixture ID.
