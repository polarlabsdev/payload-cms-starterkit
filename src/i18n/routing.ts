import { defineRouting } from 'next-intl/routing';

/** Locales that require right-to-left text direction. Add new RTL locales here. */
export const RTL_LOCALES = new Set(['ar']);

/** Returns true if the given locale requires RTL text direction. */
export const isRtlLocale = (locale: string): boolean => RTL_LOCALES.has(locale);

export const routing = defineRouting({
  // This needs to match the locales in payload.config.ts
  locales: ['en', 'fr', 'es', 'ru', 'ar'],

  // Used when no locale matches
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

/** Strips the locale prefix from a pathname (e.g. /fr/about → /about, /about → /about). */
export const stripLocaleFromPath = (pathname: string): string => {
  for (const locale of routing.locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1) || '/';
    }
  }
  return pathname;
};

/**
 * Prepends the locale prefix to a path. With `localePrefix: 'as-needed'`, the
 * default locale has no prefix; all other locales get `/<locale>` prepended.
 */
export const buildLocalizedUrl = (path: string, locale: string): string => {
  if (locale === routing.defaultLocale) return path;
  return `/${locale}${path}`;
};
