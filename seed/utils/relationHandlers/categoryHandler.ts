import { RelationshipHandler, IdMap } from '../types';

/**
 * Handle category relationships array
 */
export const handleCategoryRelationships: RelationshipHandler = (
  value: unknown,
  currentIdMap: IdMap,
): unknown => {
  if (Array.isArray(value)) {
    console.log(`  🔗 Processing ${value.length} category relationships`);
    return value.map((category: unknown) => {
      if (typeof category === 'number') {
        const newId = currentIdMap['story-categories'][category];
        if (newId) {
          console.log(`    📂 Category ${category} → ${newId}`);
          return newId;
        }
        console.log(`    ⚠️  Category ID ${category} not found in mapping`);
        return category;
      }
      if (
        category &&
        typeof category === 'object' &&
        'id' in category &&
        typeof category.id === 'number'
      ) {
        const newId = currentIdMap['story-categories'][category.id];
        if (newId) {
          console.log(`    📂 Category ${category.id} → ${newId}`);
          return newId;
        }
        console.log(`    ⚠️  Category ID ${category.id} not found in mapping`);
        return category.id;
      }
      return category;
    });
  }
  return value;
};
