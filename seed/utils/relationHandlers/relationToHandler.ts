import { RelationshipHandler, IdMap } from '../types';
import { COLLECTION_HANDLERS } from '../relationshipFields';

/**
 * Handle relationTo fields that can reference different collections
 * Structure: { relationTo: "collection-name", value: { id: number, ... } }
 * This recursively uses existing handlers based on the relationTo type
 */
export const handleRelationToField: RelationshipHandler = (
  value: unknown,
  currentIdMap: IdMap,
): unknown => {
  // Handle null values - keep them as null
  if (value === null || value === undefined) {
    console.log(`  ✓ Keeping relationTo as null`);
    return null;
  }

  // Handle relationTo objects
  if (value && typeof value === 'object' && 'relationTo' in value && 'value' in value) {
    const relationToObj = value as { relationTo: string; value: unknown };
    const { relationTo, value: relationValue } = relationToObj;

    // Use the appropriate collection handler based on collection type
    const handler = COLLECTION_HANDLERS[relationTo];
    if (handler) {
      console.log(`  🔄 Processing relationTo ${relationTo} using existing handler`);
      const processedValue = handler(relationValue, currentIdMap);

      return {
        relationTo,
        value: processedValue,
      };
    } else {
      console.log(`  ⚠️  Unknown relationTo type: ${relationTo}, keeping original`);
      return value;
    }
  }

  // If we reach here, it's some other type of value - return as is
  return value;
};
