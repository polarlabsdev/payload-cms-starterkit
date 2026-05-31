import type { Block } from 'payload';
import { linkField } from '@/fields/link/config';

export const InlineItemBlock: Block = {
  slug: 'inlineItem',
  interfaceName: 'InlineItemBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'The title text for the item',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      localized: true,
      admin: {
        description: 'Optional description text for the item',
      },
    },
    {
      name: 'iconName',
      type: 'text',
      required: true,
      defaultValue: 'file-text-fill',
      admin: {
        description: 'Remix icon name (e.g., file-text-fill, download-line)',
      },
    },
    {
      name: 'itemVariant',
      type: 'select',
      required: false,
      defaultValue: 'muted',
      options: [
        { label: 'Default (Transparent)', value: 'default' },
        { label: 'Outline', value: 'outline' },
        { label: 'Muted', value: 'muted' },
      ],
      admin: {
        description: 'Choose the visual style for the item',
      },
    },
    {
      name: 'showLink',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Toggle to show or hide the link button',
      },
    },
    linkField({
      name: 'link',
      label: 'Link',
      showButton: false,
      overrides: {
        admin: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          condition: (_: any, siblingData: any) => siblingData?.showLink === true,
        },
      },
    }),
  ],
};
