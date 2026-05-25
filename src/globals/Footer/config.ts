import type { GlobalConfig } from 'payload';
import { anyone } from '@/accessControl/anyone';
import { hasPermission } from '@/accessControl/hasPermission';
import { defaultLexical } from '@/fields/lexicals/defaultLexical';
import { generatePreviewPath } from '@/lib/utils';
import { themeAwareImageField } from '@/fields/themeAwareImage/config';
import { linkField } from '@/fields/link/config';

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: anyone,
    update: hasPermission('website:globals:update'),
  },
  admin: {
    group: 'Navigation',
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
    themeAwareImageField({
      name: 'logo',
      label: 'Footer Logo',
      admin: {
        description: 'Upload a logo to display in the footer',
      },
    }),
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      admin: {
        components: {
          RowLabel: '@/components/admin/LinkArrayRowLabel#ArrayRowLabel',
        },
      },
      fields: [
        {
          name: 'iconName',
          type: 'text',
          required: true,
          admin: {
            description:
              'Visit remixicon.com to see the available icons. Click one and copy its name and paste it here. For example: `facebook-fill`.',
          },
        },
        linkField({ showLabel: false }),
      ],
    },
    {
      name: 'navButtons',
      type: 'array',
      label: 'Call to Actions',
      maxRows: 2,
      admin: {
        description: 'Add call to action links to the footer',
        components: {
          RowLabel: '@/components/admin/LinkArrayRowLabel#ArrayRowLabel',
        },
      },
      fields: [linkField({ showButton: true })],
    },
    {
      name: 'navGroups',
      type: 'array',
      label: 'Navigation Groups',
      maxRows: 6,
      admin: {
        description: 'Add groups of navigation links to the footer',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'navItems',
          type: 'array',
          label: 'Navigation Links',
          admin: {
            components: {
              RowLabel: '@/components/admin/LinkArrayRowLabel#ArrayRowLabel',
            },
          },
          fields: [linkField()],
        },
      ],
    },
    {
      name: 'footerText',
      type: 'richText',
      label: 'Footer Text',
      editor: defaultLexical,
      localized: true,
      admin: {
        description: 'Editable text for the footer bottom',
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
