import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';

// fieldName is the name given to the tab or group we are generating these fields in
// for example, "meta"
export const generateSeoFields = (fieldName: string) => {
  return [
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
      // if the `generateUrl` function is configured
      hasGenerateFn: true,

      // field paths to match the target field for data
      titlePath: `${fieldName}.title`,
      descriptionPath: `${fieldName}.description`,
    }),
  ];
};
