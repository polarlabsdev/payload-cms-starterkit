import slugify from 'slugify';
import type { FieldHook, TextField } from 'payload';

type SourceField = string;
type SlugFieldGenerator = (
  sourceField: SourceField,
  options?: {
    inSidebar?: boolean;
    adminUpdatesOnly?: boolean;
  },
) => TextField;
// god rest the soul of whoever tries to type FieldHook with generics
type SlugFieldFormatter = (sourceField: SourceField) => FieldHook;

const slugifyOptions = {
  lower: true,
  strict: true,
  locale: 'en',
  replacement: '-',
  trim: true,
};

const formatSlugHook: SlugFieldFormatter = (sourceField) => {
  return ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return slugify(value, slugifyOptions);
    }

    if (operation === 'create' || !data?.slug) {
      const sourceFieldData = data?.[sourceField] || data?.[sourceField];

      if (sourceFieldData && typeof sourceFieldData === 'string') {
        return slugify(sourceFieldData, slugifyOptions);
      }
    }

    return value;
  };
};

export const genSlugField: SlugFieldGenerator = (
  sourceField,
  { inSidebar = true, adminUpdatesOnly = true } = {},
) => {
  const slugField: TextField = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'Slug',
    hooks: {
      beforeValidate: [formatSlugHook(sourceField)],
    },
    admin: {
      position: inSidebar ? 'sidebar' : undefined,
      description: 'This field is the URL you will be able to access this resource at.',
      components: {
        Field: {
          path: '@/fields/slugField/component.server#SlugComponent',
          serverProps: {
            adminUpdatesOnly,
          },
        },
      },
    },
  };

  return slugField;
};
