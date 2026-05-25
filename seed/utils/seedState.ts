import fs from 'fs';
import path from 'path';
import { SeedState, IdMap, ProcessedRecords } from './types';

const SEED_STATE_FILE = 'seedState.json';

/**
 * Get the path to the seed state file
 */
const getStateFilePath = (): string => {
  // Get the directory where this script is located
  const currentDir = process.cwd();
  const seedDir = path.join(currentDir, 'seed');

  // Ensure we're looking in the seed directory
  if (fs.existsSync(seedDir)) {
    return path.join(seedDir, SEED_STATE_FILE);
  }

  // Fallback to current directory
  return path.resolve(SEED_STATE_FILE);
};

/**
 * Create an initial empty seed state
 */
const createInitialState = (): SeedState => ({
  idMap: {
    media: {},
    'story-categories': {},
    stories: {},
    pages: {},
    videos: {},
  },
  processedRecords: {
    media: new Set<number>(),
    'story-categories': new Set<number>(),
    stories: new Set<number>(),
    pages: new Set<number>(),
    videos: new Set<number>(),
  },
  completedCollections: new Set<string>(),
  completedGlobals: new Set<string>(),
  lastUpdated: new Date().toISOString(),
});

/**
 * Load seed state from file, or create initial state if file doesn't exist
 */
export const loadSeedState = (): SeedState => {
  const statePath = getStateFilePath();

  if (!fs.existsSync(statePath)) {
    console.log('📝 No existing seed state found, creating new state');
    return createInitialState();
  }

  try {
    console.log(`📝 Loading seed state from ${statePath}`);
    const rawData = fs.readFileSync(statePath, 'utf8');
    const parsedData = JSON.parse(rawData);

    // Convert arrays back to Sets
    const state: SeedState = {
      ...parsedData,
      processedRecords: {
        media: new Set(parsedData.processedRecords?.media || []),
        'story-categories': new Set(parsedData.processedRecords?.['story-categories'] || []),
        stories: new Set(parsedData.processedRecords?.stories || []),
        pages: new Set(parsedData.processedRecords?.pages || []),
        videos: new Set(parsedData.processedRecords?.videos || []),
      },
      completedCollections: new Set(parsedData.completedCollections || []),
      completedGlobals: new Set(parsedData.completedGlobals || []),
    };

    console.log(
      `✅ Loaded state with ${state.completedCollections.size} completed collections and ${state.completedGlobals.size} completed globals`,
    );
    return state;
  } catch (error) {
    console.warn(`⚠️  Error reading seed state file, creating new state: ${error}`);
    return createInitialState();
  }
};

/**
 * Save seed state to file
 */
export const saveSeedState = (state: SeedState): void => {
  const statePath = getStateFilePath();

  try {
    // Convert Sets to arrays for JSON serialization
    const dataToSave = {
      ...state,
      processedRecords: {
        media: Array.from(state.processedRecords.media),
        'story-categories': Array.from(state.processedRecords['story-categories']),
        stories: Array.from(state.processedRecords.stories),
        pages: Array.from(state.processedRecords.pages),
        videos: Array.from(state.processedRecords.videos),
      },
      completedCollections: Array.from(state.completedCollections),
      completedGlobals: Array.from(state.completedGlobals),
      lastUpdated: new Date().toISOString(),
    };

    fs.writeFileSync(statePath, JSON.stringify(dataToSave, null, 2));
    console.log(`💾 Saved seed state to ${statePath}`);
  } catch (error) {
    console.error(`❌ Error saving seed state: ${error}`);
  }
};

/**
 * Check if a collection has already been processed
 */
export const isCollectionCompleted = (state: SeedState, collectionSlug: string): boolean => {
  return state.completedCollections.has(collectionSlug);
};

/**
 * Mark a collection as completed
 */
export const markCollectionCompleted = (state: SeedState, collectionSlug: string): void => {
  state.completedCollections.add(collectionSlug);
  console.log(`✅ Marked collection '${collectionSlug}' as completed`);
  saveSeedState(state);
};

/**
 * Check if a global has already been processed
 */
export const isGlobalCompleted = (state: SeedState, globalSlug: string): boolean => {
  return state.completedGlobals.has(globalSlug);
};

/**
 * Mark a global as completed
 */
export const markGlobalCompleted = (state: SeedState, globalSlug: string): void => {
  state.completedGlobals.add(globalSlug);
  console.log(`✅ Marked global '${globalSlug}' as completed`);
  saveSeedState(state);
};

/**
 * Update the idMap in state and save
 */
export const updateIdMap = (
  state: SeedState,
  collection: keyof IdMap,
  oldId: number,
  newId: number,
): void => {
  state.idMap[collection][oldId] = newId;
  // We don't save on every ID update for performance - save when collections complete
};

/**
 * Check if a record has already been processed
 */
export const isRecordProcessed = (
  state: SeedState,
  collectionSlug: keyof ProcessedRecords,
  recordId: number,
): boolean => {
  return state.processedRecords[collectionSlug].has(recordId);
};

/**
 * Mark a record as processed
 */
export const markRecordProcessed = (
  state: SeedState,
  collectionSlug: keyof ProcessedRecords,
  recordId: number,
): void => {
  state.processedRecords[collectionSlug].add(recordId);
};

/**
 * Get count of processed records for a collection
 */
export const getProcessedRecordCount = (
  state: SeedState,
  collectionSlug: keyof ProcessedRecords,
): number => {
  return state.processedRecords[collectionSlug].size;
};
