import { BeforeSync } from '@payloadcms/plugin-search/types';

/**
 * Before creating or updating a search record, the beforeSync function runs.
 * This is an afterChange hook that allows you to modify the data or provide fallbacks
 * before its search record is created or updated.
 */
export const searchBeforeSync: BeforeSync = ({ originalDoc, searchDoc }) => {
  const collection = searchDoc.doc.relationTo;

  if (collection === 'pages' || collection === 'stories') {
    const syncDoc = {
      ...searchDoc,
      title: originalDoc.title,
      slug: originalDoc.slug,
      noIndex: originalDoc.meta?.noIndex,
    };

    return syncDoc;
  }
  return searchDoc;
};
