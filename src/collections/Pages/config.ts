import { isPublishedOrHasAccess } from '@/accessControl/isLoggedIn';
import { hasPermission, hasPermissionField } from '@/accessControl/hasPermission';
import { HeroBlock } from '@/blocks/Hero/config';
import { StoryCardsBlock } from '@/blocks/StoryCards/config';
import { IconRowBlock } from '@/blocks/IconRow/config';
import { NewsletterBlock } from '@/blocks/Newsletter/config';
import { ImpactNumbersBlock } from '@/blocks/ImpactNumbers/config';
import { DonateBlock } from '@/blocks/Donate/config';
import { StandardContentBlock } from '@/blocks/StandardContentBlock/config';
import { WideImageBlock } from '@/blocks/WideImageBlock/config';
import { ImageGridBlock } from '@/blocks/ImageGridBlock/config';
import { DocumentListBlock } from '@/blocks/DocumentList/config';
import { FaqBlock } from '@/blocks/FaqBlock/config';
import { StepsExplainerBlock } from '@/blocks/StepsExplainerBlock/config';
import { SimpleRichTextBlock } from '@/blocks/SimpleRichTextBlock/config';
import { YoutubeEmbedBlock } from '@/blocks/YoutubeEmbed/config';
import { FormstackEmbedBlock } from '@/blocks/FormstackEmbed/config';
import { IssuuEmbedBlock } from '@/blocks/IssuuEmbedBlock/config';
import { PllentyBlock } from '@/blocks/PllentyBlock/config';
import { JobBoardBlock } from '@/blocks/JobBoard/config';
import { LanguageDisclaimerBlock } from '@/blocks/LanguageDisclaimer/config';
import { generateSeoFields } from '@/fields/seo';
import { genSlugField } from '@/fields/slugField';
import { populatePublishedAt } from '@/hooks/payload/populatePublishedAt';
import { generatePreviewPath } from '@/lib/utils';
import { CollectionConfig } from 'payload';

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: hasPermission('website:pages:create'),
    delete: hasPermission('website:pages:delete'),
    read: isPublishedOrHasAccess(),
    update: hasPermission('website:pages:update'),
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    group: 'Content',
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
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    genSlugField('title', { editPermission: 'website:slugs:update' }),
    {
      name: 'publishedAt',
      label: 'Publish Date',
      type: 'date',
      access: {
        create: hasPermissionField('website:pagePublishDate:create'),
        update: hasPermissionField('website:pagePublishDate:update'),
      },
      admin: {
        position: 'sidebar',
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
            // {
            //   name: 'pullBehindNav',
            //   label: 'Pull Content Up Behind Navigation Bar',
            //   type: 'checkbox',
            //   defaultValue: false,
            //   admin: {
            //     description:
            //       'This will pull the content up behind the navigation bar, which is useful for a hero section you want to be exactly full screen height.',
            //   },
            // },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                HeroBlock,
                StoryCardsBlock,
                IconRowBlock,
                NewsletterBlock,
                ImpactNumbersBlock,
                DonateBlock,
                StandardContentBlock,
                WideImageBlock,
                ImageGridBlock,
                DocumentListBlock,
                FaqBlock,
                StepsExplainerBlock,
                SimpleRichTextBlock,
                YoutubeEmbedBlock,
                FormstackEmbedBlock,
                IssuuEmbedBlock,
                PllentyBlock,
                JobBoardBlock,
                LanguageDisclaimerBlock,
              ],
              required: true,
              admin: {},
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: generateSeoFields('meta', true),
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
