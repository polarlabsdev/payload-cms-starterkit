import { Plugin } from 'payload';
import { s3Storage } from '@payloadcms/storage-s3';
import { seoPlugin as payloadSeoPlugin } from '@payloadcms/plugin-seo';
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types';
import { importExportPlugin } from '@payloadcms/plugin-import-export';
import { searchPlugin } from '@payloadcms/plugin-search';
import { Page } from './payload-types';
import { getServerSideURL } from './lib/utils';
import { PoolConfig } from 'pg';
import { searchBeforeSync } from './lib/searchSync';
import { hasPermissionCheck, RoleName } from './accessControl/roles';

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  const websiteName = process.env.NEXT_PUBLIC_WEBSITE_NAME || '';
  return doc?.title ? `${doc.title} | ${websiteName}` : websiteName;
};

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

const buildSupabaseFileURL = ({ filename }: { filename?: string | null }): string => {
  if (!filename) return '';
  return `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_STORAGE_BUCKET || 'media'}/${filename}`;
};

const storagePlugin = process.env.SUPABASE_STORAGE_REGION
  ? s3Storage({
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: buildSupabaseFileURL,
        },
        videos: {
          disablePayloadAccessControl: true,
          generateFileURL: buildSupabaseFileURL,
        },
      },
      bucket: process.env.SUPABASE_STORAGE_BUCKET || 'media',
      config: {
        credentials: {
          accessKeyId: process.env.SUPABASE_STORAGE_ACCESS_KEY || '',
          secretAccessKey: process.env.SUPABASE_STORAGE_SECRET_KEY || '',
        },
        region: process.env.SUPABASE_STORAGE_REGION,
        endpoint: `${process.env.SUPABASE_URL}/storage/v1/s3` || '',
        forcePathStyle: true, // Required for Supabase compatibility
        // Disable automatic checksum headers — Supabase S3-compatible API
        // does not support x-amz-checksum-* and returns HTTP 400 if present
        requestChecksumCalculation: 'WHEN_REQUIRED' as const,
        responseChecksumValidation: 'WHEN_REQUIRED' as const,
      },
      // Enable client-side uploads to allow large file uploads without server size limits
      clientUploads: true,
    })
  : undefined;

// https://payloadcms.com/docs/plugins/seo
const seoPlugin = payloadSeoPlugin({
  generateTitle,
  generateURL,
});

// PostgreSQL SSL configuration generator
export const createPostgresPoolConfig = (): PoolConfig => {
  const poolMax = parseInt(
    process.env.POSTGRES_POOL_MAX || (process.env.NODE_ENV === 'production' ? '15' : '10'),
    10,
  );

  const config: PoolConfig = {
    connectionString: process.env.DATABASE_URI || '',
    max: poolMax,
    // Release idle connections quickly to avoid holding open backend connections
    // against Supabase's hard per-instance limit.
    idleTimeoutMillis: 5_000,
    // Fail fast rather than queueing indefinitely when the pool is saturated.
    connectionTimeoutMillis: 10_000,
    // Keep TCP connections alive during active use to avoid silent drops.
    keepAlive: true,
  };

  // Add SSL configuration if certificate is provided via environment variable
  if (process.env.POSTGRES_SSL_CERT_BASE64) {
    try {
      const sslCert = Buffer.from(process.env.POSTGRES_SSL_CERT_BASE64, 'base64').toString('utf-8');
      config.ssl = {
        ca: sslCert,
        rejectUnauthorized: true, // Set to false if using self-signed certificates
      };
    } catch (error) {
      console.error('Error decoding SSL certificate from base64:', error);
    }
  }

  return config;
};

const importPlugin = importExportPlugin({
  collections: [
    { slug: 'pages' },
    { slug: 'stories' },
    { slug: 'story-categories' },
    { slug: 'media' },
    { slug: 'videos' },
  ],
});

const search = searchPlugin({
  collections: ['pages', 'stories'],
  searchOverrides: {
    slug: 'search',
    admin: {
      group: 'Navigation',
      hidden: ({ user }) => {
        if (!user?.roles) return true;
        const roles = user.roles as RoleName[];
        return !hasPermissionCheck(roles, 'website:search:read');
      },
    },
    fields: ({ defaultFields }) => [
      ...defaultFields,
      {
        name: 'slug',
        type: 'text',
        admin: {
          readOnly: true,
          description: 'The slug of the referenced page or story (auto-populated)',
        },
      },
      {
        // beforeSync does run on updates, but the plugin does NOT persist priority changes on UPDATE.
        // Thus we needed to make noIndex part of beforeSync to ensure it gets updated properly.
        name: 'noIndex',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          readOnly: true,
          description: 'If checked, this content will be excluded from search results',
        },
      },
    ],
  },
  beforeSync: searchBeforeSync,
});

export const plugins: Plugin[] = [
  ...(storagePlugin ? [storagePlugin] : []),
  seoPlugin,
  importPlugin,
  search,
];
