import type { CollectionBeforeChangeHook } from 'payload';

export const populatePublishedAt: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation === 'create' || operation === 'update') {
    if (data && data._status === 'published') {
      // Only set publishedAt if it's not already set (first time publishing)
      if (!data.publishedAt) {
        const now = new Date();
        return {
          ...data,
          publishedAt: now,
        };
      }
    }
  }

  return data;
};
