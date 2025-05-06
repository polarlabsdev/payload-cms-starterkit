import type { GlobalConfig } from 'payload';
import { linkField } from '@/fields/link';
import { anyone } from '@/accessControl/anyone';
import { isRole } from '@/accessControl/isRole';
import { generatePreviewPath } from '@/lib/utils';

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: anyone,
    update: isRole('editor'),
  },
  admin: {
    livePreview: {
      url: ({ req }) => {
        return generatePreviewPath({
          slug: 'home',
          collection: 'pages',
          req,
        });
      },
    },
    preview: (data, { req }) => {
      return generatePreviewPath({
        slug: 'home',
        collection: 'pages',
        req,
      });
    },
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Header Logo',
      admin: {
        description: 'Upload a logo to display in the header',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Links',
      admin: {
        description: 'Add links to the header navigation',
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Header/ArrayRowLabel#ArrayRowLabel',
        },
      },
      fields: [linkField()],
    },
  ],
  versions: {
    drafts: {
      // enabling autosave means hooks don't update the UI
      // https://github.com/payloadcms/payload/issues/10515
      // tbh, autosave might be annoying anyways
      autosave: false,
      schedulePublish: true,
    },
  },
};
