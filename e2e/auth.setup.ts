import { config as dotenvConfig } from 'dotenv';
import { test as setup, expect } from '@playwright/test';
import { SignJWT } from 'jose';
import fs from 'fs';
import path from 'path';
import {
  SEED_ADMIN_EMAIL,
  SEED_ADMIN_PASSWORD,
  SEED_WEBSITE_ADMIN_EMAIL,
  SEED_WEBSITE_ADMIN_PASSWORD,
  SEED_EDITOR_EMAIL,
  SEED_EDITOR_PASSWORD,
  SEED_READER_EMAIL,
  SEED_READER_PASSWORD,
} from '../seed/utils/validation';

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

// ---------------------------------------------------------------------------
// Helper: login as superadmin, create a test user (if not already existing),
// then log in as that user and save the storageState.
// ---------------------------------------------------------------------------

const setupRoleUser = async (
  request: Parameters<Parameters<typeof setup>[1]>[0]['request'],
  {
    email,
    password,
    roles,
    authFile,
  }: { email: string; password: string; roles: string[]; authFile: string },
) => {
  // Step 1: Login as superadmin to obtain a JWT for user creation.
  const adminLogin = await request.post('/api/users/login', {
    data: { email: SEED_ADMIN_EMAIL, password: SEED_ADMIN_PASSWORD },
  });
  expect(
    adminLogin.ok(),
    `Superadmin login failed during role setup: ${adminLogin.status()}`,
  ).toBeTruthy();
  const { token: adminToken } = await adminLogin.json();

  // Step 2: Create the test user. If the user already exists Payload returns a
  // validation error — that is fine; the login below will still work.
  await request.post('/api/users', {
    headers: { Authorization: `JWT ${adminToken}` },
    data: { name: email, email, password, roles },
  });

  // Step 3: Login as the role user and persist the auth state.
  const roleLogin = await request.post('/api/users/login', {
    data: { email, password },
  });
  expect(roleLogin.ok(), `Role user login failed (${email}): ${roleLogin.status()}`).toBeTruthy();

  fs.mkdirSync(AUTH_DIR, { recursive: true });
  await request.storageState({ path: path.join(AUTH_DIR, authFile) });
};

// --- Role-based auth ---

setup('authenticate as website-admin', async ({ request }) => {
  await setupRoleUser(request, {
    email: SEED_WEBSITE_ADMIN_EMAIL,
    password: SEED_WEBSITE_ADMIN_PASSWORD,
    roles: ['website-admin'],
    authFile: 'website-admin.json',
  });
});

setup('authenticate as website-editor', async ({ request }) => {
  await setupRoleUser(request, {
    email: SEED_EDITOR_EMAIL,
    password: SEED_EDITOR_PASSWORD,
    roles: ['website-editor'],
    authFile: 'website-editor.json',
  });
});

setup('authenticate as website-reader', async ({ request }) => {
  await setupRoleUser(request, {
    email: SEED_READER_EMAIL,
    password: SEED_READER_PASSWORD,
    roles: ['website-reader'],
    authFile: 'website-reader.json',
  });
});
