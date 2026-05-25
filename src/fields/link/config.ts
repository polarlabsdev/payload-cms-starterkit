import type { DBIdentifierName, Field } from 'payload';
import type { Page, Story } from '../../payload-types';

import { variantClasses } from '@/components/ui/Button';
import { titleCase } from '@/lib/utils';
import { getBrandColorOptions, type BrandColorKey } from '@/lib/colors';

// We maintain and export this type so that links generated from the linkField
// can be strongly typed when using them in components. Ensure it matches
// the fields defined in the linkField function below.
export type CustomLinkType = {
  linkType?: 'manual' | 'relation';
  url?: string;
  // we should keep an eye out for if Payload ever offers a better way to type
  // relationship fields so we don't have to ourselves
  relationTo?:
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'stories';
        value: number | Story;
      } | null);
  label?: string | null;
  buttonType?: keyof typeof variantClasses;
  buttonColor?: BrandColorKey;
  textColor?: BrandColorKey;
  newTab?: boolean;
};

type LinkArgs = {
  name?: string;
  label?: string;
  showLabel?: boolean;
  showButton?: boolean;
  enumName?: DBIdentifierName;
  defaultUrl?: string;
  defaultLabel?: string;
  overrides?: Record<string, unknown>;
};

export const linkField = ({
  name,
  label,
  showLabel = true,
  showButton = false,
  enumName,
  defaultUrl,
  defaultLabel,
  overrides = {},
}: LinkArgs = {}): Field => {
  const linkResult: Field = {
    name: name || 'link',
    label: label || 'Link',
    type: 'group',
    fields: [
      {
        name: 'linkType',
        type: 'radio',
        label: 'Link Type',
        defaultValue: 'manual',
        options: [
          {
            label: 'Manual Link',
            value: 'manual',
          },
          {
            label: 'Internal Link',
            value: 'relation',
          },
        ],
        admin: {
          layout: 'horizontal',
        },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'url',
            type: 'text',
            defaultValue: defaultUrl,
            admin: {
              width: '50%',
              placeholder: 'Enter URL',
              condition: (_, siblingData) => siblingData?.linkType === 'manual',
            },
          },
          {
            name: 'relationTo',
            type: 'relationship',
            relationTo: ['pages', 'stories'],
            maxDepth: 1,
            admin: {
              width: '50%',
              condition: (_, siblingData) => siblingData?.linkType === 'relation',
            },
          },
          {
            name: 'label',
            type: 'text',
            required: showLabel,
            defaultValue: defaultLabel,
            localized: true,
            admin: {
              width: '50%',
              placeholder: 'Link Label',
              condition: () => showLabel,
            },
          },
        ],
      },
      {
        name: 'buttonType',
        type: 'select',
        enumName: enumName ? `${enumName}_button_type` : undefined,
        defaultValue: showButton ? 'default' : 'link',
        options: Object.keys(variantClasses).map((variant) => ({
          label: titleCase(variant),
          value: variant,
        })),
        admin: {
          condition: () => showButton,
        },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'buttonColor',
            type: 'select',
            enumName: enumName ? `${enumName}_btn_color` : undefined,
            label: 'Button Color',
            defaultValue: 'Teal',
            options: getBrandColorOptions(),
            admin: {
              width: '50%',
            },
          },
          {
            name: 'textColor',
            type: 'select',
            enumName: enumName ? `${enumName}_text_color` : undefined,
            label: 'Text Color',
            defaultValue: 'White',
            options: getBrandColorOptions(),
            admin: {
              width: '50%',
            },
          },
        ],
        admin: {
          condition: (_, siblingData) => siblingData?.buttonType === 'brand' && showButton,
        },
      },
      {
        name: 'newTab',
        type: 'checkbox',
        label: 'Open in new tab',
        defaultValue: false,
      },
    ],
    ...overrides,
  };

  return linkResult;
};
