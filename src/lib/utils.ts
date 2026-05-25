import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PayloadRequest, CollectionSlug } from 'payload';
import slugify from 'slugify';

// --------------------------
// TAILWIND UTIL CLASS MERGE
// --------------------------
// This utility function merges Tailwind CSS class names and removes duplicates.
// It uses the `clsx` library to handle conditional class names and the `tailwind-merge`
// library to merge Tailwind CSS classes intelligently.
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// --------------------------
// DOM-RELATED UTILITIES
// --------------------------
// This utility function checks if the DOM is available.
// It returns true if the code is running in a browser environment (i.e., if `window` and `document` are defined).
export const canUseDOM = () =>
  !!(typeof window !== 'undefined' && window.document && window.document.createElement);

// --------------------------
// EMAIL VALIDATION
// --------------------------
// Validates email addresses using a practical regex pattern
// Based on RFC 5322 but simplified for real-world use
// Matches 99% of email addresses in use today
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Validates an email address format
 * @param email - The email address to validate
 * @returns true if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  return EMAIL_REGEX.test(email.trim());
};

// --------------------------
// URL GENERATION FUNCTIONS
// --------------------------
const DEV_URL = 'http://localhost:3000';

// This function generates the server-side URL based on environment variables.
export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (!url) {
    url = DEV_URL;
  }

  return url;
};

// This function generates the client-side URL based on the current window location.
export const getClientSideURL = () => {
  if (canUseDOM()) {
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;

    return `${protocol}//${domain}${port ? `:${port}` : ''}`;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || DEV_URL;
};

// This function generates a preview path for a given collection and slug.
// It constructs a URL with query parameters for previewing content in the CMS.
// https://payloadcms.com/docs/admin/preview#step-1-format-the-preview-url
const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: '',
  stories: '/stories',
};

type Props = {
  collection: keyof typeof collectionPrefixMap;
  slug: string;
  req: PayloadRequest;
};

export const generatePreviewPath = ({ collection, slug }: Props) => {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: `${collectionPrefixMap[collection]}/${slug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  });

  const url = `/preview/init?${encodedParams.toString()}`;

  return url;
};

// --------------------------
// MISC UTILITIES
// --------------------------
// Any utility functions that don't fit into the above categories can be added here.
export const titleCase = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};

// --------------------------
// DEVICE DETECTION UTILITIES
// --------------------------
// These utility functions detect device types and operating systems.
// They check the user agent and platform strings to determine device characteristics.

export const isMacOS = () => {
  if (typeof window === 'undefined') return false;
  return /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
};

export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent,
  );
};

/*
  Convert a given any text string into a URL-friendly slug.
  Function used to generate anchor links for sections.
*/
export const convertTitleToSlug = (title: string): string => {
  return slugify(title, {
    lower: true,
    strict: true, //removes non-alphanumeric characters except hyphens
    trim: true,
  });
};
