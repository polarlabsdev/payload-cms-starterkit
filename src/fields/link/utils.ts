import type { CustomLinkType } from './config';

// Mapping of collection types to their base paths
const relationToBasePathMap = {
  pages: '',
  stories: 'stories',
} as const;

/**
 * Resolves a populated relation reference to a root-relative path.
 * Returns null when the reference is missing, or when `value` is a numeric ID
 * (i.e. the document was not populated — caller must fetch with depth >= 1 first).
 *
 * Used by CustomLink (via getLinkUrl) and checkRedirect so both resolve slugs the same way.
 */
export const resolveReferenceToPath = (reference: CustomLinkType['relationTo']): string | null => {
  if (!reference) return null;
  const { relationTo, value } = reference;

  // Numeric value means the relation was not populated — can't resolve slug
  if (!value || typeof value === 'number') return null;
  const slug = 'slug' in value ? value.slug : null;
  if (!slug) return null;

  // basePath is '' for pages (falsy) and 'stories' for stories (truthy)
  const basePath = relationToBasePathMap[relationTo];
  return basePath ? `/${basePath}/${slug}` : `/${slug}`;
};

const getUrlFromRelation = (relationData: CustomLinkType['relationTo']): string => {
  if (!relationData?.value) return '#';
  if (typeof relationData.value === 'number') {
    console.warn(
      'Relationship value is just an ID, cannot generate URL without populated document',
    );
    return '#';
  }
  return resolveReferenceToPath(relationData) ?? '#';
};

/**
 * Gets the URL from a link field, handling both manual URLs and relation-based URLs
 * @param link - The link field data from PayloadCMS
 * @returns The URL string to use for navigation
 */
export const getLinkUrl = (link: CustomLinkType): string => {
  if (!link) return '#';

  const { linkType = 'manual', url, relationTo } = link;

  // For relation links, generate URL from the relation data
  if (linkType === 'relation' && relationTo) {
    return getUrlFromRelation(relationTo);
  }

  // For manual links, use the provided URL
  return url || '#';
};
