import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PayloadRequest, CollectionSlug } from 'payload';

// --------------------------
// TAILWIND UTIL CLASS MERGE
// --------------------------
// This utility function merges Tailwind CSS class names and removes duplicates.
// It uses the `clsx` library to handle conditional class names and the `tailwind-merge`
// library to merge Tailwind CSS classes intelligently.
export const autoClassName = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// --------------------------
// DOM-RELATED UTILITIES
// --------------------------
// This utility function checks if the DOM is available.
// It returns true if the code is running in a browser environment (i.e., if `window` and `document` are defined).
export const canUseDOM = () =>
  !!(typeof window !== 'undefined' && window.document && window.document.createElement);

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
