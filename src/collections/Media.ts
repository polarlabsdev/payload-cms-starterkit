import { anyone } from '@/accessControl/anyone';
import { isLoggedIn } from '@/accessControl/isLoggedIn';
import { isRole } from '@/accessControl/isRole';
import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: isLoggedIn,
    read: anyone,
    update: isLoggedIn,
    delete: isRole('editor'),
  },
  admin: {
    useAsTitle: 'alt',
    description: 'Media files stored in Supabase S3 storage',
    group: 'Content',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
    ],
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  },
};
