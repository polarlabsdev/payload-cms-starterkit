import { IdMap, RelationshipHandler } from './types';
import {
  handleUserRelationship,
  handleMediaRelationship,
  handleVideoRelationship,
  handleCategoryRelationships,
  handleStoryRelationship,
  handlePageRelationship,
} from './relationHandlers';

/**
 * Map of relationship field names to their handler functions
 */
export const RELATIONSHIP_FIELDS: Record<string, RelationshipHandler> = {
  author: handleUserRelationship,
  bannerImage: (value: unknown, idMap: IdMap) =>
    handleMediaRelationship(value, idMap, 'bannerImage'),
  bannerVideo: (value: unknown, idMap: IdMap) =>
    handleVideoRelationship(value, idMap, 'bannerVideo'),
  thumbnail: (value: unknown, idMap: IdMap) => handleMediaRelationship(value, idMap, 'thumbnail'),
  image: (value: unknown, idMap: IdMap) => handleMediaRelationship(value, idMap, 'image'),
  light: (value: unknown, idMap: IdMap) => handleMediaRelationship(value, idMap, 'light'),
  dark: (value: unknown, idMap: IdMap) => handleMediaRelationship(value, idMap, 'dark'),
  media: (value: unknown, idMap: IdMap) => handleMediaRelationship(value, idMap, 'media'),
  video: (value: unknown, idMap: IdMap) => handleVideoRelationship(value, idMap, 'video'),
  categories: handleCategoryRelationships,
  story: handleStoryRelationship,
  page: handlePageRelationship,
};

/**
 * Map of collection slugs to their handler functions for relationTo fields
 */
export const COLLECTION_HANDLERS: Record<string, RelationshipHandler> = {
  pages: handlePageRelationship,
  stories: handleStoryRelationship,
};
