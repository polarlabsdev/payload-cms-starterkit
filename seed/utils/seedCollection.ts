import fs from 'fs';
import type { Payload } from 'payload';
import { COLLECTION_FIXTURES, SeedState } from './types';
import { updatePayloadRelations } from './relationMapper';
import { extractEnglishValues } from './dataProcessing';
import {
  isCollectionCompleted,
  markCollectionCompleted,
  updateIdMap,
  isRecordProcessed,
  markRecordProcessed,
  getProcessedRecordCount,
} from './seedState';

/**
 * Seeds a collection with data from a fixture file
 */
export const seedCollection = async (
  collectionSlug: keyof typeof COLLECTION_FIXTURES,
  fixturePath: string,
  payload: Payload,
  state: SeedState,
): Promise<void> => {
  // Check if this collection has already been completed
  if (isCollectionCompleted(state, collectionSlug)) {
    console.log(`\n⏭️  SKIPPING ${collectionSlug} - ALREADY COMPLETED`);
    return;
  }

  console.log(`\n📦 Seeding ${collectionSlug}...`);

  if (!fs.existsSync(fixturePath)) {
    console.log(`⚠️  Fixture file not found: ${fixturePath}`);
    return;
  }

  console.log(`📄 Reading fixture file: ${fixturePath}`);
  const fixtureData = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

  if (!Array.isArray(fixtureData)) {
    console.log(`⚠️  Expected array in fixture file: ${fixturePath}`);
    return;
  }

  const processedCount = getProcessedRecordCount(state, collectionSlug);
  console.log(
    `📊 Found ${fixtureData.length} ${collectionSlug} items to seed (${processedCount} already processed)`,
  );

  let count = 0;
  for (const [index, item] of fixtureData.entries()) {
    const oldId = item.id;

    // Check if this record has already been processed
    if (isRecordProcessed(state, collectionSlug, oldId)) {
      console.log(
        `\n  ⏭️  SKIPPING ${collectionSlug} ITEM ${index + 1}/${fixtureData.length} WITH ID ${oldId} - ALREADY PROCESSED`,
      );
      count++;
      continue;
    }

    console.log(
      `\n  PROCESSING ${collectionSlug} ITEM ${index + 1}/${fixtureData.length} WITH ID ${oldId}...`,
    );

    // Create a copy of the item to avoid modifying the original
    const itemCopy = JSON.parse(JSON.stringify(item));

    // Remove the old ID since Payload will generate a new one
    delete itemCopy.id;

    // Keep original dates - don't delete them
    console.log(
      `  📅 Preserving original dates (created: ${itemCopy.createdAt}, updated: ${itemCopy.updatedAt})`,
    );

    // Update relationship fields
    console.log(`  🔄 Processing relationships...`);
    let processedItem = updatePayloadRelations(itemCopy, state.idMap);

    let newDoc;

    // Special handling for upload collections that have file upload fields
    if (
      collectionSlug === 'media' ||
      collectionSlug === 'videos'
    ) {
      console.log(`  🎭 Using direct database insert for ${collectionSlug} item...`);
      // For upload collections, we need to insert directly into the database
      // to bypass file upload validation since we're seeding existing file metadata
      try {
        // console.log(`    Attempting to save data: ${JSON.stringify(processedItem)}`);
        newDoc = await payload.db.create({
          collection: collectionSlug,
          data: processedItem as Record<string, unknown>,
        });
      } catch (error) {
        console.error(`  ❌ ERROR CREATING DOCUMENT: ${JSON.stringify(error)}`);
        process.exit(1);
      }
    } else {
      // Create the document in Payload normally
      console.log(`  💾 Creating ${collectionSlug} item in PayloadCMS...`);

      // Extract English values from localized fields
      processedItem = extractEnglishValues(processedItem);

      // The strange syntax is an AI hack to get around the typing of collections
      // when this is a generic utility. Since this is just a seed script, we can ignore type safety here.
      try {
        // console.log(`    Attempting to save data: ${JSON.stringify(processedItem)}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        newDoc = await (payload.create as any)({
          collection: collectionSlug,
          data: processedItem,
          overrideAccess: true,
          showHiddenFields: true,
          locale: 'en',
        });
      } catch (error) {
        console.log(error);
        console.error(`  ❌ ERROR CREATING DOCUMENT: ${JSON.stringify(error)}`);
        process.exit(1);
      }
    }

    // Store the ID mapping for future relationships
    if (oldId && newDoc.id) {
      updateIdMap(state, collectionSlug, oldId, newDoc.id);
      console.log(`  🆔 ID mapping: ${oldId} → ${newDoc.id}`);
    }

    // Mark this record as processed
    markRecordProcessed(state, collectionSlug, oldId);

    count++;
    console.log(`  ✅ ${collectionSlug} ITEM ${index + 1} CREATED SUCCESSFULLY`);
  }

  console.log(`✅ ${collectionSlug} SEEDED (${count}/${fixtureData.length} ITEMS SUCCESSFULLY)\n`);

  // Mark collection as completed
  markCollectionCompleted(state, collectionSlug);
};
