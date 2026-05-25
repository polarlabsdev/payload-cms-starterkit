import { config as dotenvConfig } from 'dotenv';
import { test as setup, expect } from '@playwright/test';
import { SignJWT } from 'jose';
import fs from 'fs';
import path from 'path';
import { SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD } from '../seed/utils/validation';

// Load .env for local dev. In CI, env vars are already injected — dotenv skips gracefully.
dotenvConfig();

const AUTH_DIR = path.join(process.cwd(), 'playwright/.auth');
const SEED_STATE_PATH = path.join(process.cwd(), 'seed/seedState.json');

// --- Admin auth ---

setup('authenticate as seed admin', async ({ request }) => {
  const response = await request.post('/api/users/login', {
    data: { email: SEED_ADMIN_EMAIL, password: SEED_ADMIN_PASSWORD },
  });
  expect(
    response.ok(),
    `Admin login failed: ${response.status()} ${await response.text()}`,
  ).toBeTruthy();

  fs.mkdirSync(AUTH_DIR, { recursive: true });
  await request.storageState({ path: path.join(AUTH_DIR, 'admin.json') });
});
