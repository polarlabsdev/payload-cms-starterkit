import type { Field } from 'payload';

type LinkArgs = {
  disableLabel?: boolean;
  overrides?: Record<string, unknown>;
};

export const linkField = ({ disableLabel = false, overrides = {} }: LinkArgs = {}): Field => {
  const linkResult: Field = {
    name: 'link',
    type: 'group',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'url',
            type: 'text',
            required: true,
            admin: {
              width: '50%',
              placeholder: 'Enter URL',
            },
          },
          ...(disableLabel
            ? []
            : [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    placeholder: 'Link Label',
                  },
                } as Field,
              ]),
        ],
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
