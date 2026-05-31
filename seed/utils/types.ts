// ID mapping to track old fixture IDs to new database IDs
export interface IdMap {
  media: Record<number, number>;
  'story-categories': Record<number, number>;
  stories: Record<number, number>;
  pages: Record<number, number>;
  videos: Record<number, number>;
}

/**
 * Handler function type for relationship field processing
 */
export type RelationshipHandler = (value: unknown, currentIdMap: IdMap) => unknown;

// Record tracking to track which individual records have been processed
export interface ProcessedRecords {
  media: Set<number>;
  'story-categories': Set<number>;
  stories: Set<number>;
  pages: Set<number>;
  videos: Set<number>;
}

// Seed state structure for persistence
export interface SeedState {
  idMap: IdMap;
  processedRecords: ProcessedRecords;
  completedCollections: Set<string>;
  completedGlobals: Set<string>;
  lastUpdated: string;
}

// Mapping of collection slugs to fixture files
export const COLLECTION_FIXTURES = {
  media: 'media.json',
  'story-categories': 'storyCategories.json',
  stories: 'stories.json',
  pages: 'pages.json',
  videos: 'videos.json',
} as const;

export const GLOBAL_FIXTURES = {
  header: 'header.json',
  footer: 'footer.json',
  'stories-page': 'storiesPage.json',
  'announcement-bar': 'announcementBar.json',
} as const;
