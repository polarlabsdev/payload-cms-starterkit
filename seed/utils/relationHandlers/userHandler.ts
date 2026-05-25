import { RelationshipHandler, IdMap } from '../types';

/**
 * Handle user relationship fields - set to user ID 1
 */
export const handleUserRelationship: RelationshipHandler = (
  value: unknown,
  _currentIdMap: IdMap,
): unknown => {
  if (typeof value === 'number') {
    console.log(`  🔗 Mapping user relationship: author ${value} → 1`);
    return 1;
  }

  // Handle case where author is an object with id property (populated relationship)
  if (typeof value === 'object' && value !== null && 'id' in value) {
    const authorObj = value as { id: number };
    console.log(`  🔗 Mapping user relationship: author ${authorObj.id} → 1`);
    return 1;
  }

  return value;
};
