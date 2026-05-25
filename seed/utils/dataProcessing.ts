import { RELATIONSHIP_FIELDS } from './relationshipFields';

/**
 * Extract English values from localized fields and flatten the data structure recursively
 */
export const extractEnglishValues = (data: unknown): unknown => {
  if (data === null || data === undefined) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => extractEnglishValues(item));
  }

  if (typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      // Skip processing relationship fields that have already been mapped to string IDs
      if (
        key in RELATIONSHIP_FIELDS &&
        (typeof value === 'string' ||
          (Array.isArray(value) && value.every((v) => typeof v === 'string')))
      ) {
        // This is a relationship field that has already been processed - don't recurse
        result[key] = value;
        continue;
      }

      // Check if this field has localized data (is an object with 'en' key)
      if (
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        'en' in (value as Record<string, unknown>)
      ) {
        // Extract the English value and recursively process it
        result[key] = extractEnglishValues((value as Record<string, unknown>).en);
      } else {
        // Recursively process non-localized fields
        result[key] = extractEnglishValues(value);
      }
    }

    return result;
  }

  return data;
};
