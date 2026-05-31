import type { GlobalConfig } from 'payload';
import { linkField } from '@/fields/link/config';
import { anyone } from '@/accessControl/anyone';
import { hasPermission } from '@/accessControl/hasPermission';
import { generatePreviewPath } from '@/lib/utils';
import { themeAwareImageField } from '@/fields/themeAwareImage/config';

export const Header: GlobalConfig = {
  slug: 'header',
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
      label: 'Header Logo',
      admin: {
        description: 'Upload a logo to display in the header',
      },
    }),
    {
      name: 'navItems',
      dbName: 'nav_items',
      type: 'array',
      label: 'Navigation Items',
      admin: {
        description: 'Add links or dropdown menus to the header navigation',
        components: {
          RowLabel: '@/components/admin/LinkArrayRowLabel#ArrayRowLabel',
        },
      },
      fields: [
        {
          name: 'type',
          type: 'radio',
          label: 'Navigation Type',
          defaultValue: 'link',
          options: [
            {
              label: 'Link',
              value: 'link',
            },
            {
              label: 'Dropdown Menu',
              value: 'dropdown',
            },
          ],
          admin: {
            layout: 'horizontal',
          },
        },
        // Link configuration using linkField
        linkField({
          name: 'linkConfig',
          label: 'Link Configuration',
          showLabel: true,
          overrides: {
            admin: {
              condition: (_: unknown, siblingData: Record<string, unknown>) =>
                siblingData?.type === 'link',
            },
          },
        }),
        // Dropdown menu fields
        {
          name: 'dropdownLabel',
          type: 'text',
          label: 'Dropdown Menu Label',
          required: true,
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
          },
        },
        {
          name: 'hasDropdownLabelLink',
          type: 'checkbox',
          label: 'Make label clickable',
          defaultValue: false,
          admin: {
            width: '30%',
          },
        },
        linkField({
          name: 'dropdownLabelLink',
          label: 'Dropdown Label Link',
          showLabel: false,
          overrides: {
            admin: {
              condition: (_: unknown, siblingData: Record<string, unknown>) =>
                siblingData?.type === 'dropdown' && siblingData?.hasDropdownLabelLink === true,
              description: 'This link is used when the dropdown label itself should navigate.',
            },
          },
        }),
        {
          name: 'dropdownLinks',
          dbName: 'dd_links',
          type: 'array',
          maxRows: 7,
          label: 'Dropdown Links',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
            components: {
              RowLabel: '@/components/admin/LinkArrayRowLabel#ArrayRowLabel',
            },
          },
          fields: [
            {
              name: 'isFeatured',
              type: 'checkbox',
              label: 'Featured Link',
              admin: {
                description: 'Mark this link as featured (only one per dropdown)',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Featured Background Image',
              admin: {
                condition: (_, siblingData) => siblingData?.isFeatured,
                description:
                  'Optional background image for featured link. If not provided, a gradient will be used.',
              },
            },
            linkField({
              name: 'link',
              label: 'Link',
              overrides: {
                admin: {
                  description: 'Configure each dropdown link',
                },
              },
            }),
            {
              name: 'description',
              type: 'text',
              label: 'Link Description',
              admin: {
                description:
                  'Optional description text under the link. Required for featured links. Max 80 characters.',
              },
              validate: (
                value: string | null | undefined,
                { siblingData }: { siblingData: Record<string, unknown> },
              ) => {
                // Required validation for featured links
                if (siblingData?.isFeatured && (!value || value.length === 0)) {
                  return 'Description is required for featured links';
                }

                // Character limit validation
                if (value && value.length > 80) {
                  return 'Description must be less than 80 characters';
                }

                return true;
              },
            },
          ],
          validate: (value: unknown[] | null | undefined) => {
            if (!value || value.length === 0) {
              return 'At least one dropdown link is required';
            }

            // Ensure only one featured link per dropdown
            const featuredCount = value.filter((item: unknown) => {
              const typedItem = item as Record<string, unknown>;
              return typedItem.isFeatured;
            }).length;
            if (featuredCount > 1) {
              return 'Only one featured link is allowed per dropdown';
            }

            return true;
          },
        },
      ],
    },
    {
      name: 'navButtons',
      dbName: 'nav_buttons',
      type: 'array',
      label: 'Call to Actions',
      maxRows: 2,
      admin: {
        description: 'Add call to action links to the header',
        components: {
          RowLabel: '@/components/admin/LinkArrayRowLabel#ArrayRowLabel',
        },
      },
      fields: [linkField({ showButton: true })],
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
