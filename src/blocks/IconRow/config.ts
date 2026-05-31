import { getTailwindThemeColorOptions, getBrandColorOptions } from '@/lib/colors';
import { linkField } from '@/fields/link/config';
import type { Block } from 'payload';
import { anchorLinkField } from '@/fields/anchorLink';

export const IconRowBlock: Block = {
  slug: 'icon-row',
  interfaceName: 'IconRowBlock',
  imageURL: `${process.env.ADMIN_CDN_BASE_URL}Icon%20row.png`,
  imageAltText: 'Icon row block thumbnail',
  fields: [
    anchorLinkField,
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      required: true,
      defaultValue: 'Background',
      options: getTailwindThemeColorOptions(),
      admin: {
        description: 'Choose the background color for the icon row section',
      },
    },
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      required: false,
      localized: true,
      admin: {
        description: 'The main heading for the icon row section (optional)',
      },
    },
    {
      name: 'items',
      label: 'Icon Items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 3,
      admin: {
        description: 'Add up to 3 icon items',
      },
      fields: [
        {
          name: 'iconName',
          label: 'Remix Icon Name',
          type: 'text',
          required: true,
          admin: {
            description:
              'Enter the Remix Icon name (e.g., "heart-line", "user-line"). See https://remixicon.com/ for available icons',
            placeholder: 'heart-line',
          },
        },
        {
          name: 'iconBackgroundColor',
          label: 'Icon Background Color',
          type: 'select',
          required: false,
          options: getBrandColorOptions(),
          admin: {
            description:
              'Choose the background color for the icon circle (optional - leave empty for no background)',
          },
        },
        {
          name: 'iconColor',
          label: 'Icon Color (Light Mode)',
          type: 'select',
          required: true,
          defaultValue: 'Black',
          options: getBrandColorOptions(),
          admin: {
            description: 'Choose the color for the icon in light mode',
            condition: (data, siblingData) => !siblingData?.iconBackgroundColor,
          },
        },
        {
          name: 'iconColorDark',
          label: 'Icon Color (Dark Mode)',
          type: 'select',
          required: false,
          options: getBrandColorOptions(),
          admin: {
            description: 'Choose the color for the icon in dark mode (optional)',
            condition: (data, siblingData) => !siblingData?.iconBackgroundColor,
          },
        },
        {
          name: 'iconColorWithBackground',
          label: 'Icon Color',
          type: 'select',
          required: true,
          defaultValue: 'White',
          options: getBrandColorOptions(),
          admin: {
            description: 'Choose the color for the icon',
            condition: (data, siblingData) => !!siblingData?.iconBackgroundColor,
          },
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'The title for this icon item',
          },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          localized: true,
          admin: {
            description: 'Brief description for this icon item',
          },
        },
        {
          name: 'hasButton',
          label: 'Include Action Button',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Check this to add/remove an action button to this icon item',
          },
        },
        linkField({
          showButton: true,
          overrides: {
            name: 'button',
            label: 'Action Button',
            admin: {
              description: 'The action button for this icon item',
              condition: (_: unknown, siblingData: Record<string, unknown>) =>
                siblingData?.hasButton,
            },
          },
        }),
      ],
    },
  ],
};
