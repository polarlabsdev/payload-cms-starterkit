import { minimalLexical } from '@/fields/lexicals/minimalLexical';
import { linkField } from '@/fields/link/config';
import { highlightedTextHeaderField } from '@/fields/highlightedTextHeader/config';
import { getBrandColorOptions, getTailwindThemeColorOptions } from '@/lib/colors';
import type { Block } from 'payload';
import { anchorLinkField } from '@/fields/anchorLink';

export const StandardContentBlock: Block = {
  slug: 'standard-content',
  interfaceName: 'StandardContentBlock',
  imageURL: `${process.env.ADMIN_CDN_BASE_URL}Standard%20Content.png`,
  imageAltText: 'Standard content block thumbnail',
  fields: [
    anchorLinkField,
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            highlightedTextHeaderField({
              name: 'header',
              label: 'Header',
              required: true,
            }),
            {
              name: 'content',
              label: 'Content',
              type: 'richText',
              editor: minimalLexical,
              required: true,
              localized: true,
              admin: {
                description: 'Main content text',
              },
            },
            {
              name: 'buttons',
              label: 'Buttons',
              type: 'array',
              maxRows: 2,
              admin: {
                description: 'Add up to 2 action buttons',
              },
              fields: [linkField({ showButton: true, canUsePortal: true })],
            },
            {
              name: 'image',
              label: 'Content Image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description:
                  'Main content image (max height 600px, full width with aspect ratio preserved)',
              },
            },
          ],
        },
        {
          label: 'Styling',
          fields: [
            {
              name: 'imagePosition',
              label: 'Image Position',
              type: 'select',
              required: true,
              defaultValue: 'right',
              options: [
                {
                  label: 'Left (Desktop)',
                  value: 'left',
                },
                {
                  label: 'Right (Desktop)',
                  value: 'right',
                },
              ],
              admin: {
                description:
                  'Choose whether the image appears on the left or right on desktop screens. On mobile, the image will always be on top.',
              },
            },
            {
              name: 'themeMode',
              label: 'Theme Mode',
              type: 'select',
              required: false,
              defaultValue: 'inherit',
              options: [
                {
                  label: 'Inherit from system/parent',
                  value: 'inherit',
                },
                {
                  label: 'Light Mode',
                  value: 'light',
                },
                {
                  label: 'Dark Mode',
                  value: 'dark',
                },
              ],
              admin: {
                description: 'Override the theme mode for this block (light/dark/inherit)',
              },
            },
            {
              name: 'backgroundImage',
              label: 'Background Image (Optional)',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: 'Optional background image (will be displayed with overlay)',
              },
            },
            {
              name: 'backgroundOverlay',
              label: 'Background Overlay Color',
              type: 'select',
              required: false,
              defaultValue: 'Purple',
              options: getBrandColorOptions(),
              admin: {
                description: 'Choose the overlay color when using a background image',
                condition: (_, siblingData) => !!siblingData.backgroundImage,
              },
            },
            {
              name: 'backgroundColor',
              label: 'Background Color',
              type: 'select',
              required: false,
              defaultValue: 'Background',
              options: getTailwindThemeColorOptions(),
              admin: {
                description: 'Choose the background color (used when no background image is set)',
                condition: (_, siblingData) => !siblingData.backgroundImage,
              },
            },
          ],
        },
      ],
    },
  ],
};
