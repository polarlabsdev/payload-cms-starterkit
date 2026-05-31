import type { GlobalConfig } from 'payload';
import { generateSeoFields } from '@/fields/seo';
import { anyone } from '@/accessControl/anyone';
import { hasPermission } from '@/accessControl/hasPermission';
import { generatePreviewPath } from '@/lib/utils';

export const StoriesPage: GlobalConfig = {
  slug: 'stories-page',
  access: {
    read: anyone,
    update: hasPermission('website:globals:update'),
  },
  admin: {
    group: 'Static Page Settings',
    // collection in live preview is to map the slugs, this page
    // is not actually part of the pages collection.
    livePreview: {
      url: ({ req }) => {
        return generatePreviewPath({
          slug: 'stories',
          collection: 'pages',
          req,
        });
      },
    },
    preview: (data, { req }) => {
      return generatePreviewPath({
        slug: 'stories',
        collection: 'pages',
        req,
      });
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'allStoriesLabel',
              label: 'All Stories Label',
              type: 'text',
              defaultValue: 'All Stories',
              localized: true,
              admin: {
                description: 'The main title displayed on the all stories category',
              },
            },
            {
              name: 'defaultDescription',
              label: 'Default Category Description',
              type: 'textarea',
              defaultValue: 'Discover inspiring stories from our community',
              localized: true,
              admin: {
                description:
                  'This description is shown when "all stories" is selected or when a category has no description',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: generateSeoFields('meta'),
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: false,
      schedulePublish: true,
    },
  },
};
