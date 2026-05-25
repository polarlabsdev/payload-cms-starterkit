import type { Field } from 'payload';
import { getBrandColorOptions } from '@/lib/colors';

type HighlightedTextHeaderArgs = {
  name?: string;
  label?: string;
  required?: boolean;
  overrides?: Record<string, unknown>;
};

export const highlightedTextHeaderField = ({
  name = 'header',
  label = 'Header',
  required = true,
  overrides = {},
}: HighlightedTextHeaderArgs = {}): Field => {
  const headerField: Field = {
    name,
    label,
    type: 'group',
    fields: [
      {
        name: 'text',
        label: 'Header Text',
        type: 'text',
        required,
        localized: true,
        admin: {
          placeholder: 'Enter your header text',
        },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'highlightColor',
            label: 'Background Color',
            type: 'select',
            required: true,
            defaultValue: 'Purple',
            options: getBrandColorOptions(),
            admin: {
              width: '50%',
              description: 'Choose the background color for the header text',
            },
          },
          {
            name: 'textColor',
            label: 'Text Color',
            type: 'select',
            required: true,
            defaultValue: 'White',
            options: getBrandColorOptions(),
            admin: {
              width: '50%',
              description: 'Choose the text color for the header',
            },
          },
        ],
      },
      {
        name: 'level',
        label: 'Heading Level',
        type: 'select',
        required: true,
        defaultValue: '2',
        options: [
          { label: 'H1', value: '1' },
          { label: 'H2', value: '2' },
          { label: 'H3', value: '3' },
          { label: 'H4', value: '4' },
          { label: 'H5', value: '5' },
          { label: 'H6', value: '6' },
        ],
        admin: {
          description: 'Choose the semantic heading level (H1-H6)',
        },
      },
    ],
    ...overrides,
  };

  return headerField;
};
