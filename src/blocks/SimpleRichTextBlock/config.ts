import { getTailwindThemeColorOptions } from '@/lib/colors';
import { defaultLexical } from '@/fields/lexicals/defaultLexical';
import type { Block } from 'payload';
import { anchorLinkField } from '@/fields/anchorLink';

export const SimpleRichTextBlock: Block = {
  slug: 'simple-rich-text',
  interfaceName: 'SimpleRichTextBlock',
  imageURL: `${process.env.ADMIN_CDN_BASE_URL}Simple%20Rich%20Text%20Block.png`,
  imageAltText: 'Simple rich text block thumbnail',
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
        description: 'Choose the background color for the section',
      },
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: false,
      localized: true,
      admin: {
        description:
          'The main heading for the section. If this is blank, no title will be displayed.',
      },
    },
    {
      name: 'body',
      label: 'Body Text',
      type: 'richText',
      editor: defaultLexical,
      required: true,
      localized: true,
      admin: {
        description: 'The rich text content for the section',
      },
    },
  ],
};
