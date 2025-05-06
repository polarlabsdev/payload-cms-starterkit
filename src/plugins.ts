import { Plugin } from 'payload';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { s3Storage } from '@payloadcms/storage-s3';
import { seoPlugin as payloadSeoPlugin } from '@payloadcms/plugin-seo';
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types';
import { Page } from './payload-types';
import { getServerSideURL } from './lib/utils';

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  const websiteName = process.env.NEXT_PUBLIC_WEBSITE_NAME || '';
  return doc?.title ? `${doc.title} | ${websiteName}` : websiteName;
};

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

const storagePlugin = s3Storage({
  collections: {
    media: true, // Enable S3 storage for the Media collection
  },
  bucket: process.env.SUPABASE_STORAGE_BUCKET || 'media',
  config: {
    credentials: {
      accessKeyId: process.env.SUPABASE_STORAGE_ACCESS_KEY || '',
      secretAccessKey: process.env.SUPABASE_STORAGE_SECRET_KEY || '',
    },
    region: process.env.SUPABASE_STORAGE_REGION || '',
    endpoint: process.env.SUPABASE_STORAGE_ENDPOINT || '',
    forcePathStyle: true, // Required for Supabase compatibility
  },
});

// https://payloadcms.com/docs/plugins/seo
const seoPlugin = payloadSeoPlugin({
  generateTitle,
  generateURL,
});

export const plugins: Plugin[] = [payloadCloudPlugin(), storagePlugin, seoPlugin];
