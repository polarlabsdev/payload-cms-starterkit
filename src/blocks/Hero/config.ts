import { minimalLexical } from '@/fields/lexicals/minimalLexical';
import { linkField } from '@/fields/link';
import type { Block } from 'payload';

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'heroType',
      label: 'Hero Type',
      type: 'select',
      required: true,
      options: [
        { label: 'Centered', value: 'centered' },
        { label: 'Left Aligned', value: 'left-aligned' },
      ],
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'textDarkMode',
      label: 'Text Dark Mode',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'If checked, the text will be displayed in dark mode. This is useful for backgrounds that are dark and need white text.',
      },
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      label: 'Body Text',
      type: 'richText',
      editor: minimalLexical,
      required: false,
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        condition: (_, { heroType }) => heroType === 'left-aligned',
      },
    },
    {
      name: 'ctas',
      label: 'Calls to Action',
      labels: {
        singular: 'Call to Action',
        plural: 'Calls to Action',
      },
      type: 'array',
      admin: {
        description: 'Shows as buttons in the hero',
      },
      fields: [linkField()],
      maxRows: 2,
    },
  ],
};
