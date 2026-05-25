import { IdMap } from '../types';

/**
 * Handle single media relationship fields (bannerImage, thumbnail, etc.)
 */
export const handleMediaRelationship = (
  value: unknown,
  currentIdMap: IdMap,
  fieldName: string,
): unknown => {
  // Handle null values - keep them as null
  if (value === null || value === undefined) {
    console.log(`  ✓ Keeping ${fieldName} as null`);
    return null;
  }

  // Handle direct number ID
  if (typeof value === 'number') {
    const newId = currentIdMap.media[value];
    if (newId) {
      console.log(`  🔗 Mapping media relationship: ${fieldName} ${value} → ${newId}`);
      return newId;
    } else {
      console.log(`  ⚠️  Media ID ${value} not found in mapping, keeping original`);
      return value;
    }
  }

  // Handle object with id property (from fixture data)
  if (value && typeof value === 'object' && 'id' in value && typeof value.id === 'number') {
    const newId = currentIdMap.media[value.id];
    if (newId) {
      console.log(`  🔗 Mapping media relationship: ${fieldName} ${value.id} → ${newId}`);
      return newId;
    } else {
      console.log(`  ⚠️  Media ID ${value.id} not found in mapping, keeping original ID`);
      return value.id;
    }
  }

  // If we reach here, it's some other type of value - return as is
  return value;
};
