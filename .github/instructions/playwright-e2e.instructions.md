---
description: Playwright E2E testing — when to write tests and how to write them for this repo
applyTo: 'e2e/**'
---

## Philosophy

E2E tests here are a **critical-path smoke suite**, not exhaustive coverage. The goal is baseline confidence that the most important features aren't broken — not 100% coverage. Do not test copy, styling, or small UI details.

## When to Write a Test

Write a test when a **breaking regression would not be caught by TypeScript or a code review** and the feature is important enough that a silent failure would be a serious problem. Good candidates:

- A feature works end-to-end through middleware, the database, and the browser (e.g. auth gates, page rendering)
- Client-side behaviour that depends on a live API response
- A route guard where the wrong outcome (no redirect, wrong destination) would expose or break something for users

Do **not** write tests for:

- Copy, labels, or styling
- PayloadCMS admin panel behaviour
- Features already covered by TypeScript types or simple unit tests

## Setup

Tests require a running app with seeded data:

- App must be running on `http://localhost:3000` (`npm run start` or `npm run dev`)
- Database must be seeded: `npm run db:seed` (see Seed System below)
- `playwright.config.ts` uses `reuseExistingServer: true` — it won't start a server if one is already running

```bash
npm run test:e2e        # headless
npm run test:e2e:ui     # interactive UI
```

## Seed System

> The seed system is not yet implemented. When added, it should live in `seed/` and follow this pattern:

- Fixture data lives in `seed/fixtures/` with clearly namespaced slugs (e.g. `e2e-home-page`)
- `npm run db:seed` populates the database and writes `seed/seedState.json` (IDs of created records)
- The auth setup script reads `seed/seedState.json` to generate auth files
- If adding a new fixture file, wire it into `seed/utils/types.ts`, `seed/utils/seedState.ts`, and `seed/seed.ts`

When implementing seeds, create at minimum:
- A home page (`slug: 'home'`) for smoke testing page rendering
- A seed admin user for auth testing (credentials defined in `seed/utils/validation.ts`)

## Fixture Data

If a test needs specific DB content, add it to `seed/fixtures/`. Use clearly namespaced slugs (e.g. `e2e-my-feature`). Wire new fixture files into the seed system as described above.

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

### Available Identities

| `storageState` file                    | Who                                          |
| -------------------------------------- | -------------------------------------------- |
| `playwright/.auth/admin.json`          | Seed admin (`superadmin` role)               |
| `playwright/.auth/website-admin.json`  | Website admin (full content control)         |
| `playwright/.auth/website-editor.json` | Website editor (create/edit, no delete)      |
| `playwright/.auth/website-reader.json` | Website reader (read-only)                   |

### Writing an authenticated test

```typescript
import { test, expect } from '@playwright/test';

test.describe('Admin feature', () => {
  test.use({ storageState: 'playwright/.auth/admin.json' });

  test('admin can access the API', async ({ request }) => {
    const response = await request.get('/api/users/me');
    expect(response.status()).toBe(200);
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

### Adding a New Test Identity

Add a new user to `seed/fixtures/` with the desired role, re-run `npm run db:seed`, and add a corresponding entry in `e2e/auth.setup.ts` to generate the auth file.

## Simple Smoke Test

The following test ships with the starterkit and serves as a baseline check that the app is running and auth works:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Smoke', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).not.toHaveURL(/error/);
  });

  test.describe('Admin auth', () => {
    test.use({ storageState: 'playwright/.auth/admin.json' });

    test('authenticated admin can reach the API', async ({ request }) => {
      const response = await request.get('/api/users/me');
      expect(response.status()).toBe(200);
    });
  });
});
```