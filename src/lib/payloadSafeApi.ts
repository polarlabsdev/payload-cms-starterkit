/**
 * Safe Payload API Utilities
 *
 * These utilities wrap PayloadCMS Local API operations to properly enforce access control.
 *
 * WHY THESE EXIST:
 * By default, the PayloadCMS Local API skips all access control (overrideAccess defaults to true).
 * This is convenient for server-side operations where you have full trust, but on the frontend
 * we often want to respect the access control rules defined on collections and globals.
 *
 * These utilities:
 * 1. Set `overrideAccess: false` to enforce access control
 * 2. Retrieve and pass the authenticated user from request headers
 * 3. Support draft mode for admin preview functionality (which bypasses access control)
 *
 * WHEN TO USE:
 * - Use these for any frontend data fetching where access control should be respected
 * - For authenticated content, always use these to ensure proper permission checks
 * - For public content (like pages, stories), these ensure the access control rules are followed
 *
 * WHEN NOT TO USE:
 * - Server-side scripts, seeds, migrations where you need full access
 * - Hooks or access control functions where you're already within Payload's context
 * - Admin panel operations (Payload handles this automatically)
 */

import { getPayload, TypedLocale, Where, Sort } from 'payload';
import { headers } from 'next/headers';
import { draftMode } from 'next/headers';
import config from '@/payload.config';
import type { Config } from '@/payload-types';

type CollectionSlug = keyof Config['collections'];
type GlobalSlug = keyof Config['globals'];

type SafeFindOptions<T extends CollectionSlug> = {
  collection: T;
  where?: Where;
  locale?: 'all' | TypedLocale;
  limit?: number;
  page?: number;
  sort?: Sort;
  depth?: number;
  pagination?: boolean;
  overrideAccess?: boolean;
};

type SafeFindGlobalOptions<T extends GlobalSlug> = {
  slug: T;
  locale?: 'all' | TypedLocale;
  depth?: number;
};

/**
 * Get the current authenticated user from request headers
 */
export const getAuthenticatedUser = async () => {
  const payload = await getPayload({ config });
  const requestHeaders = await headers();
  const { user } = await payload.auth({
    headers: requestHeaders,
  });
  return user;
};

/**
 * Get the current authenticated user and their collection from request headers
 */
export const getAuthenticatedUserWithCollection = async () => {
  const payload = await getPayload({ config });
  const requestHeaders = await headers();
  const { user } = await payload.auth({
    headers: requestHeaders,
  });
  return { user, collection: user?.collection };
};

/**
 * Get the locale from request headers, defaulting to 'en' if not found
 */
const getLocaleFromHeaders = async (): Promise<'en' | 'all' | 'fr' | 'es' | 'ru' | 'ar'> => {
  const requestHeaders = await headers();
  const locale = requestHeaders.get('x-next-intl-locale') || 'en';
  return locale as 'en' | 'all' | 'fr' | 'es' | 'ru' | 'ar';
};

/**
 * Safely find documents from a collection with access control enforced.
 * In draft mode, access control is bypassed to allow admin preview.
 * Returns the full result object including docs, totalDocs, etc., or null if access is denied.
 */
export const findCollectionSafe = async <T extends CollectionSlug>(options: SafeFindOptions<T>) => {
  const { collection, where, locale, limit, page, sort, depth, pagination, overrideAccess } =
    options;

  let localeToUse = locale;
  if (locale === undefined) {
    localeToUse = await getLocaleFromHeaders();
  }

  const payload = await getPayload({ config });
  const { isEnabled: isDraftMode } = await draftMode();

  // In draft mode, bypass access control for admin preview
  // When overrideAccess is explicitly set, respect it; otherwise enforce access control
  const shouldOverride = overrideAccess ?? isDraftMode;
  const user = shouldOverride ? undefined : await getAuthenticatedUser();

  try {
    const result = await payload.find({
      collection,
      where,
      locale: localeToUse,
      limit,
      page,
      sort,
      depth,
      pagination,
      draft: isDraftMode,
      overrideAccess: shouldOverride,
      user,
    });

    return result;
  } catch (error) {
    console.error(`Access denied for collection "${collection}":`, error);
    return null;
  }
};

/**
 * Safely find a global with access control enforced.
 * In draft mode, access control is bypassed to allow admin preview.
 * Returns the global document or null if access is denied.
 */
export const findGlobalSafe = async <T extends GlobalSlug>(
  options: SafeFindGlobalOptions<T>,
): Promise<Config['globals'][T] | null> => {
  const { slug, locale, depth } = options;

  const payload = await getPayload({ config });
  const { isEnabled: isDraftMode } = await draftMode();

  const user = isDraftMode ? undefined : await getAuthenticatedUser();

  try {
    const result = await payload.findGlobal({
      slug,
      locale,
      depth,
      draft: isDraftMode,
      overrideAccess: isDraftMode,
      user: isDraftMode ? undefined : user,
    });

    return result as Config['globals'][T];
  } catch (error) {
    console.error(`Access denied for global "${slug}":`, error);
    return null;
  }
};
