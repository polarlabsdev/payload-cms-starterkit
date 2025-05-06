import type { CollectionBeforeChangeHook } from 'payload';

export const populatePublishedAt: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation === 'create' || operation === 'update') {
    if (data && data._status === 'published') {
      const now = new Date();
      return {
        ...data,
        publishedAt: now,
      };
    }
  }

  return data;
};
