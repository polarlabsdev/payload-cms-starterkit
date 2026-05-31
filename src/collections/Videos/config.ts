import { anyone } from '@/accessControl/anyone';
import { hasPermission } from '@/accessControl/hasPermission';
import type { CollectionConfig } from 'payload';
import { APIError } from 'payload';

const MAX_FILE_SIZE_MEGABYTES = parseInt(
  process.env.NEXT_PUBLIC_VIDEO_MAX_FILE_SIZE_MB || '15',
  10,
); // Default to 15 MB if not set
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MEGABYTES * 1024 * 1024;

export const Videos: CollectionConfig = {
  slug: 'videos',
  access: {
    create: hasPermission('website:videos:create'),
    read: anyone,
    update: hasPermission('website:videos:update'),
    delete: hasPermission('website:videos:delete'),
  },
  admin: {
    useAsTitle: 'alt',
    group: 'Content',
    components: {
      Description: '@/collections/Videos/VideoDescription#VideoDescription',
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text / Description',
      localized: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        /**
         * NOTE:
         * This file size check happens AFTER the file has already been uploaded
         * to Supabase, but BEFORE Payload registers it in the collection.
         *
         * Tradeoff:
         * - The large video may still exist in storage if the upload succeeds.
         * - Payload will reject the record, preventing the video from being
         *   streamed or referenced by the application.
         *
         * Lookout:
         * - Client-side uploads make it difficult to fully block large files.
         * - Server-side uploads are capped by Vercel limits.
         * - Our primary goal is to prevent streaming/usage of large videos,
         *   which this approach successfully enforces.
         *
         * Users are expected to see the error and avoid uploading oversized files.
         */
        if (data?.filesize > MAX_FILE_SIZE_BYTES) {
          throw new APIError(
            `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MEGABYTES} MB.`,
            400,
          );
        }

        return data;
      },
    ],
  },
  upload: {
    pasteURL: false,
    disableLocalStorage: true,
    mimeTypes: ['video/mp4', 'video/webm', 'video/ogg'],
  },
};
