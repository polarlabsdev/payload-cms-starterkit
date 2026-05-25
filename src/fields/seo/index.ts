import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';
import { Field } from 'payload';

export const generateSeoFields = (
  fieldName: string,
  showNoIndexOption: boolean = false,
): Field[] => {
  const fields: Field[] = [
    OverviewField({
      titlePath: `${fieldName}.title`,
      descriptionPath: `${fieldName}.description`,
      imagePath: `${fieldName}.image`,
    }),
    MetaTitleField({
      hasGenerateFn: true,
    }),
    MetaImageField({
      relationTo: 'media',
    }),
    MetaDescriptionField({}),
    PreviewField({
      hasGenerateFn: true,
      titlePath: `${fieldName}.title`,
      descriptionPath: `${fieldName}.description`,
    }),
    {
      name: 'noIndex',
      label: 'Hide from Search Engines',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Prevent search engines from indexing this page. The page will also be excluded from the sitemap.',
        hidden: !showNoIndexOption, // Conditionally hide in admin UI
      },
    },
  ];

  return fields;
};
