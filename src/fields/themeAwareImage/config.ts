import { Media } from '@/payload-types';
import type { Field } from 'payload';

import { deepMerge } from 'payload';

export type ThemeAwareImageType = {
  light: number | Media;
  dark: number | Media;
};

export const themeAwareImageField = (
  overrides: Partial<Field> & {
    name: string;
  },
): Field =>
  deepMerge<Field>(
    {
      type: 'group',
      admin: {
        hideGutter: true,
      },
      fields: [
        {
          name: 'light',
          label: 'Light Mode',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'dark',
          label: 'Dark Mode',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    overrides,
  );
