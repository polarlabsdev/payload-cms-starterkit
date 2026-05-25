import { isPublishedOrHasAccess } from '@/accessControl/isLoggedIn';
import { hasPermission, hasPermissionField } from '@/accessControl/hasPermission';
import { StoryCardsBlock } from '@/blocks/StoryCards/config';
import { generateSeoFields } from '@/fields/seo';
import { genSlugField } from '@/fields/slugField';
import { populatePublishedAt } from '@/hooks/payload/populatePublishedAt';
import { calculateReadingTimeCollectionHook } from '@/hooks/payload/calculateReadingTimeCollection';
import { generatePreviewPath } from '@/lib/utils';
import { defaultLexical } from '@/fields/lexicals/defaultLexical';
import { CollectionConfig } from 'payload';
import { minimalLexical } from '@/fields/lexicals/minimalLexical';
import { ImageGridBlock } from '@/blocks/ImageGridBlock/config';

export const Stories: CollectionConfig = {
  slug: 'stories',
  access: {
    create: hasPermission('website:stories:create'),
    delete: hasPermission('website:stories:delete'),
    read: isPublishedOrHasAccess(),
    update: hasPermission('website:stories:update'),
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'stories'>
  defaultPopulate: {
    title: true,
    slug: true,
    thumbnail: true,
    summary: true,
    categories: true,
    featured: true,
    publishedAt: true,
    readingTime: true,
    isExternalLink: true,
    externalUrl: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'slug',
      'author',
      'categories',
      'featured',
      'readingTime',
      '_status',
      'updatedAt',
      'publishedAt',
    ],
    group: 'Stories',
    livePreview: {
      url: ({ data, req }) => {
        return generatePreviewPath({
          slug: data?.slug as string,
          collection: 'stories',
          req,
        });
      },
    },
    preview: (data, { req }) => {
      return generatePreviewPath({
        slug: data?.slug as string,
        collection: 'stories',
        req,
      });
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    genSlugField('title', { editPermission: 'website:slugs:update' }),
    {
      name: 'isExternalLink',
      label: 'Link to External Article',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Check this to make the story link to an external URL instead of the full story page',
      },
    },
    {
      name: 'externalUrl',
      label: 'External URL',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'The external URL to link to when the story is clicked',
        condition: (data) => data.isExternalLink === true,
        placeholder: 'https://example.com/article',
      },
    },
    {
      name: 'publishedAt',
      label: 'Publish Date',
      type: 'date',
      access: {
        create: hasPermissionField('website:storyPublishDate:create'),
        update: hasPermissionField('website:storyPublishDate:update'),
      },
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'story-categories',
      hasMany: true,
      index: true, // Optimization for filtering stories by category
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true, // Optimization for filtering stories by author
      defaultValue: ({ user }) => user?.id,
      admin: {
        position: 'sidebar',
        description: 'Story author - defaults to current user',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      index: true, // Optimization for filtering featured stories
      admin: {
        position: 'sidebar',
        description: 'Mark as featured story for homepage display',
      },
    },
    {
      name: 'readingTime',
      label: 'Reading Time (minutes)',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Automatically calculated based on post content',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'bannerImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Shown at the top of the story when you open it to read it.',
                condition: (data) => !data.isExternalLink,
              },
            },
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Shown in story cards and in social shares.',
              },
            },
            {
              name: 'summary',
              type: 'richText',
              admin: {
                description: 'Optional summary for the story (max 180 characters)',
              },
              localized: true,
              editor: minimalLexical,
            },
            {
              name: 'body',
              label: 'Post Body',
              type: 'richText',
              localized: true,
              editor: defaultLexical,
              admin: {
                condition: (data) => !data.isExternalLink,
              },
            },
          ],
        },
        {
          label: 'Pre-footer',
          admin: {
            condition: (data) => !data.isExternalLink,
          },
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                StoryCardsBlock,
                ImageGridBlock,
              ],
              admin: {
                description: 'Above the footer layout blocks',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          admin: {
            condition: (data) => !data.isExternalLink,
          },
          fields: generateSeoFields('meta', true),
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [populatePublishedAt, calculateReadingTimeCollectionHook],
  },
  versions: {
    drafts: {
      autosave: false,
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
