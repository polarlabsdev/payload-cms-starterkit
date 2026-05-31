import path from 'path';
import { fileURLToPath } from 'url';
import { config as dotenvConfig } from 'dotenv';
import { getPayload } from 'payload';
import config from '../src/payload.config';

// Load environment variables from .env file
dotenvConfig();
import { COLLECTION_FIXTURES, GLOBAL_FIXTURES } from './utils/types';
import { seedCollection } from './utils/seedCollection';
import { seedGlobal } from './utils/seedGlobal';
import { validateUserExists } from './utils/validation';
import { loadSeedState, saveSeedState } from './utils/seedState';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FIXTURES_PATH = path.join(__dirname, 'fixtures');

/**
 * Main seeding function
 *
 * This script now uses a persistent state file (seedState.json) to track:
 * - ID mappings between old fixture IDs and new database IDs
 * - Which collections have been successfully seeded
 * - Which globals have been successfully seeded
 *
 * This allows for partial runs and resuming interrupted seeding operations.
 * To start fresh, delete the seedState.json file or run the clearState.ts script.
 */
const main = async (): Promise<void> => {
  // Load or create seed state
  const state = loadSeedState();

  // Setup cleanup handlers to save state on exit
  const cleanup = () => {
    console.log('🧹 Cleaning up - saving current progress...');
    saveSeedState(state);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', cleanup);
  console.log('🚀 Starting database seeding...');

  // Debug environment variables
  console.log('🔧 Environment check:');
  console.log('  - POSTGRES_URL:', process.env.POSTGRES_URL);
  console.log('  - PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET);

  // Calculate total processed records
  const totalProcessedRecords = Object.values(state.processedRecords).reduce(
    (total, recordSet) => total + recordSet.size,
    0,
  );

  console.log(
    `📊 State loaded - ${state.completedCollections.size} collections and ${state.completedGlobals.size} globals already completed`,
  );
  console.log(`📊 ${totalProcessedRecords} individual records already processed`);

  if (totalProcessedRecords > 0) {
    console.log('📝 Record breakdown:');
    Object.entries(state.processedRecords).forEach(([collection, recordSet]) => {
      if (recordSet.size > 0) {
        console.log(`   - ${collection}: ${recordSet.size} records`);
      }
    });
  }

  // Initialize Payload
  console.log('⚙️  Initializing PayloadCMS...');

  const payload = await getPayload({ config });
  console.log('✅ PayloadCMS initialized successfully');

  // Check if at least one user exists
  console.log('🔍 Starting user validation...');
  await validateUserExists(payload);
  console.log('✅ User validation completed');

  try {
    // Seed collections in dependency order
    // 1. Independent collections first
    await seedCollection(
      'media',
      path.join(FIXTURES_PATH, COLLECTION_FIXTURES.media),
      payload,
      state,
    );

    await seedCollection(
      'videos',
      path.join(FIXTURES_PATH, COLLECTION_FIXTURES.videos),
      payload,
      state,
    );

    await seedCollection(
      'story-categories',
      path.join(FIXTURES_PATH, COLLECTION_FIXTURES['story-categories']),
      payload,
      state,
    );

    // 2. Collections with dependencies
    await seedCollection(
      'stories',
      path.join(FIXTURES_PATH, COLLECTION_FIXTURES.stories),
      payload,
      state,
    );

    await seedCollection(
      'pages',
      path.join(FIXTURES_PATH, COLLECTION_FIXTURES.pages),
      payload,
      state,
    );

    // 3. Seed globals last (they may reference collections)
    await seedGlobal('header', path.join(FIXTURES_PATH, GLOBAL_FIXTURES.header), payload, state);

    await seedGlobal('footer', path.join(FIXTURES_PATH, GLOBAL_FIXTURES.footer), payload, state);

    await seedGlobal(
      'stories-page',
      path.join(FIXTURES_PATH, GLOBAL_FIXTURES['stories-page']),
      payload,
      state,
    );

    await seedGlobal(
      'announcement-bar',
      path.join(FIXTURES_PATH, GLOBAL_FIXTURES['announcement-bar']),
      payload,
      state,
    );

    console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log(
      'The last thing to do is go to the Media page in the Admin panel and click the "Regenerate All Media Sizes" button.',
    );

    // Final save of state
    saveSeedState(state);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding, saving current progress...');
    saveSeedState(state);
    throw error;
  }
};

// Run the seed function
await main();
