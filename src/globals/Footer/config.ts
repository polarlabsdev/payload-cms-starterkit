import type { GlobalConfig } from 'payload';
import { anyone } from '@/accessControl/anyone';
import { isRole } from '@/accessControl/isRole';
import { defaultLexical } from '@/fields/lexicals/defaultLexical';
import { generatePreviewPath } from '@/lib/utils';

export const Footer: GlobalConfig = {
  slug: 'footer',
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
      name: 'tagline',
      type: 'richText',
      label: 'Footer Tagline',
      editor: defaultLexical,
      admin: {
        description: 'Editable tagline for the footer',
      },
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
