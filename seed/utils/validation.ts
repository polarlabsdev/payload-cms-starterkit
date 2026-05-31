import type { Payload } from 'payload';

export const SEED_ADMIN_EMAIL = 'admin@seed.local';
export const SEED_ADMIN_PASSWORD = 'SeedAdmin1!';

export const SEED_WEBSITE_ADMIN_EMAIL = 'website-admin@seed.local';
export const SEED_WEBSITE_ADMIN_PASSWORD = 'SeedWebAdmin1!';

export const SEED_EDITOR_EMAIL = 'editor@seed.local';
export const SEED_EDITOR_PASSWORD = 'SeedEditor1!';

export const SEED_READER_EMAIL = 'reader@seed.local';
export const SEED_READER_PASSWORD = 'SeedReader1!';

/**
 * Validates that at least one user exists in the database.
 * If none exist, creates a temporary seed admin user.
 */
export const validateUserExists = async (payload: Payload): Promise<void> => {
  console.log('👤 Checking for existing users...');

  const users = await payload.find({
    collection: 'users',
    limit: 1,
  });

  if (users.docs.length === 0) {
    console.log('⚠️  No users found — creating seed admin user...');
    await payload.create({
      collection: 'users',
      overrideAccess: true,
      data: {
        name: 'Seed Admin',
        email: SEED_ADMIN_EMAIL,
        password: SEED_ADMIN_PASSWORD,
        roles: ['superadmin'],
      },
    });
    console.log(`✅ Seed admin created (${SEED_ADMIN_EMAIL})`);
    return;
  }

  console.log(`✅ Found existing user(s), proceeding with seeding...`);
};
