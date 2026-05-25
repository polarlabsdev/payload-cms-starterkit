import { RelationshipHandler, IdMap } from '../types';

/**
 * Handle page relationships (for page link fields)
 */
export const handlePageRelationship: RelationshipHandler = (
  value: unknown,
  currentIdMap: IdMap,
): unknown => {
  // Handle null values - keep them as null
  if (value === null || value === undefined) {
    console.log(`  ✓ Keeping page as null`);
    return null;
  }

  // Handle direct number ID
  if (typeof value === 'number') {
    const newId = currentIdMap.pages[value];
    if (newId) {
      console.log(`  🔗 Mapping page relationship: ${value} → ${newId}`);
      return newId;
    } else {
      console.log(`  ⚠️  Page ID ${value} not found in mapping, keeping original`);
      return value;
    }
  }

  // Handle object with id property (from fixture data)
  if (value && typeof value === 'object' && 'id' in value && typeof value.id === 'number') {
    const newId = currentIdMap.pages[value.id];
    if (newId) {
      console.log(`  🔗 Mapping page relationship: ${value.id} → ${newId}`);
      return newId;
    } else {
      console.log(`  ⚠️  Page ID ${value.id} not found in mapping, keeping original ID`);
      return value.id;
    }
  }

  // If we reach here, it's some other type of value - return as is
  return value;
};
