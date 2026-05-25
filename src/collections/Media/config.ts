import { anyone } from '@/accessControl/anyone';
import { hasPermission } from '@/accessControl/hasPermission';
import type { CollectionConfig } from 'payload';
import { regenerateMediaSizesHandler } from './regenEndpoint';

// Export image sizes configuration for use in utils
export const IMAGE_SIZES = [
  // Responsive sizes (maintains aspect ratio)
  {
    name: 'xs',
    width: 320,
    position: 'centre',
  },
  {
    name: 'sm',
    width: 640,
    position: 'centre',
  },
  {
    name: 'md',
    width: 960,
    position: 'centre',
  },
  {
    name: 'lg',
    width: 1280,
    position: 'centre',
  },
  {
    name: 'xl',
    width: 1920,
    position: 'centre',
  },
  // Square variants
  {
    name: 'xs-square',
    width: 320,
    height: 320,
    position: 'centre',
  },
  {
    name: 'sm-square',
    width: 640,
    height: 640,
    position: 'centre',
  },
  {
    name: 'md-square',
    width: 960,
    height: 960,
    position: 'centre',
  },
  {
    name: 'lg-square',
    width: 1280,
    height: 1280,
    position: 'centre',
  },
  {
    name: 'xl-square',
    width: 1920,
    height: 1920,
    position: 'centre',
  },
];

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: hasPermission('website:media:create'),
    read: anyone,
    update: hasPermission('website:media:update'),
    delete: hasPermission('website:media:delete'),
  },
  admin: {
    useAsTitle: 'alt',
    description: 'Media files stored in Supabase S3 storage',
    group: 'Content',
    components: {
      beforeListTable: ['@/components/admin/RegenerateMediaSizesButton'],
    },
  },
  endpoints: [
    {
      path: '/regenerate-sizes',
      method: 'post',
      handler: regenerateMediaSizesHandler,
    },
  ],
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'disclaimer',
          type: 'ui',
          admin: {
            components: {
              Field:
                '@/collections/Media/MediaFileNamingNoticeUIServer#MediaFileNamingNoticeUIServer',
            },
          },
        },
      ],
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      localized: true,
    },
  ],
  upload: {
    disableLocalStorage: true,
    adminThumbnail: ({ doc }) => {
      // Build the Supabase URL directly from the stored filename so the admin
      // thumbnail never hits the Payload proxy (/api/media/file/), which is
      // disabled by disablePayloadAccessControl in the S3 storage plugin.
      const d = doc as Record<string, unknown>;
      const sizes = d.sizes as Record<string, { filename?: string | null }> | undefined;
      const filename = sizes?.['sm-square']?.filename ?? (d.filename as string | null | undefined);
      if (!process.env.SUPABASE_URL || !filename) return null;
      return `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_STORAGE_BUCKET || 'media'}/${filename}`;
    },
    focalPoint: true,
    imageSizes: IMAGE_SIZES,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
  },
};
