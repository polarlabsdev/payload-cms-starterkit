import type { CollectionBeforeChangeHook } from 'payload';
import { calculateReadingTime } from '@/lib/readingTime';
import { extractTextFromLexical } from '@/lib/richTextUtils';

export const calculateReadingTimeCollectionHook: CollectionBeforeChangeHook = ({
  data,
  operation,
  originalDoc,
}) => {
  // Only calculate during create or update operations
  if (operation === 'create' || operation === 'update') {
    const bodyContent = data?.body;

    if (bodyContent) {
      // Handle Lexical editor format - extract text from JSON structure
      let textContent = '';

      if (typeof bodyContent === 'string') {
        textContent = bodyContent;
      } else if (bodyContent && typeof bodyContent === 'object') {
        // For Lexical editor, extract text from the JSON structure
        textContent = extractTextFromLexical(bodyContent);
      }

      const newReadingTime = calculateReadingTime(textContent);

      // Only update if the reading time has actually changed to prevent unnecessary saves
      if (operation === 'update' && originalDoc && originalDoc.readingTime === newReadingTime) {
        return data;
      }

      return {
        ...data,
        readingTime: newReadingTime,
      };
    }
  }

  return data;
};
