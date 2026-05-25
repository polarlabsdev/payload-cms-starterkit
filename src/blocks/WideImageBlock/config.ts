import { minimalLexical } from '@/fields/lexicals/minimalLexical';
import { highlightedTextHeaderField } from '@/fields/highlightedTextHeader/config';
import { getTailwindThemeColorOptions } from '@/lib/colors';
import type { Block } from 'payload';
import { anchorLinkField } from '@/fields/anchorLink';

export const WideImageBlock: Block = {
  slug: 'wide-image',
  interfaceName: 'WideImageBlock',
  imageURL: `${process.env.ADMIN_CDN_BASE_URL}Wide%20Image%20Block.png`,
  imageAltText: 'Wide image block thumbnail',
  fields: [
    anchorLinkField,
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main wide image for the block',
      },
    },
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
      required: false,
      localized: true,
      admin: {
        description: 'Rich text content that appears below the image',
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
        description: 'Choose the background color for the section',
      },
    },
  ],
};
