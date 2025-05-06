import { isLoggedInOrPublished } from '@/accessControl/isLoggedIn';
import { isRole } from '@/accessControl/isRole';
import { ButtonBlock } from '@/blocks/Button/config';
import { HeroBlock } from '@/blocks/Hero/config';
import { generateSeoFields } from '@/fields/seo';
import { genSlugField } from '@/fields/slugField';
import { populatePublishedAt } from '@/hooks/populatePublishedAt';
import { generatePreviewPath } from '@/lib/utils';
import { CollectionConfig } from 'payload';

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: isRole('contributor'),
    delete: isRole('editor'),
    read: isLoggedInOrPublished,
    update: isRole('contributor'),
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt', 'publishedAt'],
    livePreview: {
      url: ({ data, req }) => {
        return generatePreviewPath({
          slug: data?.slug as string,
          collection: 'pages',
          req,
        });
      },
    },
    preview: (data, { req }) => {
      return generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      });
    },
    components: {
      beforeList: ['@/collections/Pages/HomePageInfo'],
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    genSlugField('title'),
    {
      name: 'publishedAt',
      label: 'Last Published At:',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Layout',
          fields: [
            {
              name: 'pullBehindNav',
              label: 'Pull Content Up Behind Navigation Bar',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description:
                  'This will pull the content up behind the navigation bar, which is useful for a hero section you want to be exactly full screen height.',
              },
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [HeroBlock],
              required: true,
              admin: {
                initCollapsed: true,
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
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      // enabling autosave means hooks don't update the UI
      // https://github.com/payloadcms/payload/issues/10515
      // tbh, autosave might be annoying anyways
      autosave: false,
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
