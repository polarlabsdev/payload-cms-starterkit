import type { Block } from 'payload';
import { linkField } from '@/fields/link/config';

export const ButtonInlineBlock: Block = {
  slug: 'buttonInline',
  interfaceName: 'ButtonInlineBlock',
  fields: [
    linkField({
      name: 'link',
      label: 'Button Link',
      showLabel: true,
      showButton: true,
    }),
  ],
};
