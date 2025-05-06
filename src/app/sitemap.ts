import { MetadataRoute } from 'next';
import { getPayload } from 'payload';
import type { Payload } from 'payload';
import config from '../payload.config';
import pagesToSitemap from '@/collections/Pages/sitemapMapper';

export type SitemapFile = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: {
    languages?: Record<string, string>;
  };
};

export type SitemapMapper = (payload: Payload) => Promise<SitemapFile[]>;

// Array of map functions that convert different content types to sitemap entries
const sitemapMappers: SitemapMapper[] = [pagesToSitemap];

// Main sitemap generation function
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });

  let entries: SitemapFile[] = [];

  // Execute all mappers and combine their results
  for (const mapper of sitemapMappers) {
    const results = await mapper(payload);
    entries = [...entries, ...results];
  }

  return entries;
}
