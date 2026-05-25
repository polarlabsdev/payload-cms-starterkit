import { IdMap } from './types';
import { RELATIONSHIP_FIELDS } from './relationshipFields';
import { handleRelationToField } from './relationHandlers/relationToHandler';
import { handleReferenceRelationship } from './relationHandlers/referenceHandler';

// Add handlers that reference COLLECTION_HANDLERS here to avoid circular dependencies
// between relationshipFields and the individual handler files.
RELATIONSHIP_FIELDS.relationTo = handleRelationToField;
RELATIONSHIP_FIELDS.reference = handleReferenceRelationship;

/**
 * Recursively updates relationship fields in a document object
 * Replaces old fixture IDs with new database IDs and sets user relationships to ID 1
 */
export const updatePayloadRelations = (obj: unknown, currentIdMap: IdMap): unknown => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => updatePayloadRelations(item, currentIdMap));
  }

  if (typeof obj === 'object') {
    const updated: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      // Check if this is a known relationship field
      if (key in RELATIONSHIP_FIELDS) {
        updated[key] = RELATIONSHIP_FIELDS[key](value, currentIdMap);
        continue;
      }

      // Recursively process nested objects and arrays
      updated[key] = updatePayloadRelations(value, currentIdMap);
    }

    return updated;
  }

  return obj;
};
