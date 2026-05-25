import type { Block } from 'payload';
import { minimalLexical } from '@/fields/lexicals/minimalLexical';
import { linkField } from '@/fields/link/config';
import { getTailwindThemeColorOptions } from '@/lib/colors';

export const InfoBlock: Block = {
  slug: 'info-block',
  interfaceName: 'InfoBlock',
  fields: [
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      required: true,
      defaultValue: 'Background',
      options: getTailwindThemeColorOptions(),
      admin: {
        description: 'Choose the background color for the section',
      },
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'select',
      required: true,
      defaultValue: 'default',
      options: [
        { label: 'Default (Gray)', value: 'default' },
        { label: 'Info (Blue)', value: 'info' },
        { label: 'Success (Green)', value: 'success' },
        { label: 'Error (Red)', value: 'error' },
        { label: 'Partial (Amber)', value: 'partial' },
      ],
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'text',
      required: false,
      admin: {
        description:
          'Enter a Remix Icon name, e.g. "calendar-line" or "mail-line". See remixicon.com for all icons.',
        placeholder: 'calendar-line',
      },
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      editor: minimalLexical,
      required: true,
      localized: true,
    },
    {
      name: 'actions',
      label: 'Actions',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      admin: {
        description: 'Add 1 or 2 action buttons',
      },
      fields: [
        {
          name: 'actionType',
          label: 'Action Type',
          type: 'select',
          required: true,
          defaultValue: 'link',
          options: [
            { label: 'Link', value: 'link' },
            { label: 'Email', value: 'email' },
          ],
        },
        {
          name: 'label',
          label: 'Button Label',
          type: 'text',
          required: true,
          localized: true,
        },
        linkField({
          showButton: false,
          showLabel: false,
          overrides: {
            admin: {
              condition: (_: Partial<unknown>, siblingData: Partial<{ actionType: string }>) =>
                siblingData?.actionType === 'link',
            },
          },
        }),
        {
          name: 'emailDetails',
          label: 'Email Details',
          type: 'group',
          admin: {
            condition: (_, siblingData) => siblingData?.actionType === 'email',
          },
          fields: [
            {
              name: 'to',
              label: 'To',
              type: 'email',
              required: false,
              admin: {
                placeholder: 'recipient@example.com',
              },
            },
            {
              name: 'subject',
              label: 'Subject',
              type: 'text',
              required: false,
              localized: true,
            },
            {
              name: 'body',
              label: 'Body',
              type: 'textarea',
              required: false,
              localized: true,
            },
          ],
        },
      ],
    },
  ],
};
