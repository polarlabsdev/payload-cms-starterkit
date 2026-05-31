import { RelationshipHandler, IdMap } from '../types';

/**
 * Handle story relationships (for story cards blocks)
 */
export const handleStoryRelationship: RelationshipHandler = (
  value: unknown,
  currentIdMap: IdMap,
): unknown => {
  // Handle null values - keep them as null
  if (value === null || value === undefined) {
    console.log(`  ✓ Keeping story as null`);
    return null;
  }

  // Handle direct number ID
  if (typeof value === 'number') {
    const newId = currentIdMap.stories[value];
    if (newId) {
      console.log(`  🔗 Mapping story relationship: ${value} → ${newId}`);
      return newId;
    } else {
      console.log(`  ⚠️  Story ID ${value} not found in mapping, keeping original`);
      return value;
    }
  }

  // Handle object with id property (from fixture data)
  if (value && typeof value === 'object' && 'id' in value && typeof value.id === 'number') {
    const newId = currentIdMap.stories[value.id];
    if (newId) {
      console.log(`  🔗 Mapping story relationship: ${value.id} → ${newId}`);
      return newId;
    } else {
      console.log(`  ⚠️  Story ID ${value.id} not found in mapping, keeping original ID`);
      return value.id;
    }
  }

  // If we reach here, it's some other type of value - return as is
  return value;
};
