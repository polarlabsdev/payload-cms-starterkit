import { getTailwindThemeColorOptions } from '@/lib/colors';
import { linkField } from '@/fields/link/config';
import type { Block } from 'payload';
import { anchorLinkField } from '@/fields/anchorLink';

export const ImageGridBlock: Block = {
  slug: 'image-grid',
  interfaceName: 'ImageGridBlock',
  imageURL: `${process.env.ADMIN_CDN_BASE_URL}Image%20Grid.png`,
  imageAltText: 'Image grid block thumbnail',
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
        description: 'Choose the background color for the image grid section',
      },
    },
    {
      name: 'showTitle',
      label: 'Show Section Title',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Toggle to show or hide the section title',
      },
    },
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'The main heading for the image grid section',
        condition: (_, siblingData) => siblingData?.showTitle,
      },
    },
    {
      name: 'columns',
      label: 'Number of Columns',
      type: 'select',
      required: true,
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      admin: {
        description: 'Choose how many columns the grid should have',
      },
    },
    {
      name: 'category',
      label: 'Category',
      type: 'array',
      fields: [
        {
          name: 'name',
          label: 'Category Name',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the category for filtering grid items',
          },
        },
      ],
      admin: {
        description: 'Optional categories for filtering grid items',
      },
    },
    {
      name: 'showAll',
      label: "Show 'All' Category",
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: "Toggle to show the 'All' category regardless of other category selections",
        condition: (_: unknown, siblingData: { category?: { name?: string }[] }) =>
          (siblingData?.category?.length ?? 0) > 0,
      },
    },
    {
      name: 'items',
      label: 'Grid Items',
      type: 'array',
      required: true,
      minRows: 2,
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'The image for this grid item',
          },
        },
        {
          name: 'header',
          label: 'Header',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'The main heading for this grid item',
          },
        },
        {
          name: 'subheader',
          label: 'Subheader',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'The subheading/description for this grid item',
          },
        },
        {
          name: 'showLink',
          label: 'Show Link',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Toggle to add a clickable link to this grid item',
          },
        },
        {
          name: 'assignedCategories',
          type: 'json',
          admin: {
            // Chosen this approach to have dynamic options based on sibling category array
            // relationTo is only possible when the field is a collection type, and we want to allow multiple category assignments
            components: {
              Field: '@/blocks/ImageGridBlock/components/CategorySelect',
            },
            description: 'Select categories defined in the Category List above.',
            // Condition to only show this field if categories are defined, is in the custom component
          },
        },
        linkField({
          name: 'link',
          label: 'Link',
          showButton: true,
          enumName: 'imageGridItems',
          overrides: {
            admin: {
              condition: (_: unknown, siblingData: { showLink?: boolean }) => siblingData?.showLink,
            },
          },
        }),
      ],
    },
  ],
};
