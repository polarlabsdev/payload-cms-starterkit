import fs from 'fs';
import type { Payload } from 'payload';
import { GLOBAL_FIXTURES, SeedState } from './types';
import { updatePayloadRelations } from './relationMapper';
import { extractEnglishValues } from './dataProcessing';
import { isGlobalCompleted, markGlobalCompleted } from './seedState';

/**
 * Seeds a global with data from a fixture file
 */
export const seedGlobal = async (
  globalSlug: keyof typeof GLOBAL_FIXTURES,
  fixturePath: string,
  payload: Payload,
  state: SeedState,
): Promise<void> => {
  // Check if this global has already been completed
  if (isGlobalCompleted(state, globalSlug)) {
    console.log(`\n⏭️  SKIPPING GLOBAL ${globalSlug} - ALREADY COMPLETED`);
    return;
  }

  console.log(`\n🌐 SEEDING GLOBAL: ${globalSlug}...`);

  if (!fs.existsSync(fixturePath)) {
    console.log(`⚠️  Fixture file not found: ${fixturePath}`);
    return;
  }

  console.log(`📄 Reading fixture file: ${fixturePath}`);
  const fixtureData = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

  // Create a copy to avoid modifying the original
  const dataCopy = JSON.parse(JSON.stringify(fixtureData));

  // Remove Payload metadata fields but keep dates
  delete dataCopy.id;
  delete dataCopy.globalType;

  // Keep original dates - don't delete them
  console.log(
    `📅 Preserving original dates (created: ${dataCopy.createdAt}, updated: ${dataCopy.updatedAt})`,
  );

  // Update relationship fields
  console.log(`🔄 Processing relationships...`);
  let processedData = updatePayloadRelations(dataCopy, state.idMap);

  // Extract English values from localized fields
  processedData = extractEnglishValues(processedData);

  // Update the global in Payload
  console.log(`💾 Updating global in PayloadCMS...`);
  try {
    await payload.updateGlobal({
      slug: globalSlug,
      data: processedData as Record<string, unknown>,
      overrideAccess: true,
      showHiddenFields: true,
      locale: 'all',
    });
  } catch (error) {
    console.error(`❌ ERROR UPDATING GLOBAL: ${JSON.stringify(error)}`);
    process.exit(1);
  }

  console.log(`✅ GLOBAL ${globalSlug} SEEDED SUCCESSFULLY`);
  // Mark global as completed
  markGlobalCompleted(state, globalSlug);
};
