import { RelationshipHandler, IdMap } from '../types';
import { COLLECTION_HANDLERS } from '../relationshipFields';

/**
 * Handle the `{ relationTo, value }` reference shape used by the redirects plugin.
 * Remaps the inner `value` ID using the appropriate collection handler.
 */
export const handleReferenceRelationship: RelationshipHandler = (
  value: unknown,
  currentIdMap: IdMap,
): unknown => {
  if (value === null || value === undefined) {
    console.log(`  ✓ Keeping reference as null`);
    return null;
  }

  if (value && typeof value === 'object' && 'relationTo' in value && 'value' in value) {
    const ref = value as { relationTo: string; value: unknown };
    const handler = COLLECTION_HANDLERS[ref.relationTo];
    if (handler) {
      console.log(`  🔄 Processing reference.${ref.relationTo} using existing handler`);
      return { ...ref, value: handler(ref.value, currentIdMap) };
    }
    console.log(`  ⚠️  Unknown reference collection: ${ref.relationTo}, keeping original`);
  }

  return value;
};
