import { getBrandColorOptions, getTailwindThemeColorOptions } from '@/lib/colors';
import { linkField } from '@/fields/link/config';
import type { Block } from 'payload';
import { anchorLinkField } from '@/fields/anchorLink';

export const StoryCardsBlock: Block = {
  slug: 'story-cards',
  interfaceName: 'StoryCardsBlock',
  imageURL: `${process.env.ADMIN_CDN_BASE_URL}Story%20card.png`,
  imageAltText: 'Story cards block thumbnail',
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
        description: 'Choose the background color for the stories section',
      },
    },
    {
      name: 'variant',
      label: 'Display Variant',
      type: 'select',
      defaultValue: 'featured-cards',
      options: [
        {
          label: 'Featured Cards',
          value: 'featured-cards',
        },
        {
          label: 'Story Previews',
          value: 'story-previews',
        },
      ],
      admin: {
        description: 'Choose how to display the stories',
      },
    },
    {
      name: 'showTitle',
      label: 'Show Title',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Toggle to show or hide the section title',
      },
    },
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      localized: true,
      required: false,
      admin: {
        condition: (data, siblingData) => siblingData?.showTitle === true,
        description: 'The main heading for the stories section',
      },
    },
    {
      name: 'stories',
      label: 'Stories',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 3,
      admin: {
        description: 'Add up to 3 story cards',
      },
      fields: [
        {
          name: 'story',
          label: 'Story',
          type: 'relationship',
          relationTo: 'stories',
          required: true,
          admin: {
            description: 'Select a story from the stories collection',
          },
        },
        {
          name: 'color',
          label: 'Text Color',
          type: 'select',
          required: true,
          defaultValue: 'Teal',
          options: getBrandColorOptions(),
          admin: {
            description: 'Choose the color theme for this story card',
            condition: (data, _siblingData, context) => {
              // For array fields, we need to access blockData to get the parent block's variant
              const blockData = context?.blockData;
              return !blockData?.variant || blockData?.variant === 'featured-cards';
            },
          },
        },
        {
          name: 'textBackground',
          label: 'Text Background Color',
          type: 'select',
          required: true,
          defaultValue: 'Teal',
          options: getBrandColorOptions(),
          admin: {
            description: 'Choose the background color for the text content area',
            condition: (data, _siblingData, context) => {
              // For array fields, we need to access blockData to get the parent block's variant
              const blockData = context?.blockData;
              return !blockData?.variant || blockData?.variant === 'featured-cards';
            },
          },
        },
      ],
    },
    {
      name: 'showButton',
      label: 'Show Bottom Button',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Toggle to show or hide the bottom action button',
      },
    },
    linkField({
      showButton: true,
      overrides: {
        name: 'bottomButton',
        label: 'Bottom Button',
        admin: {
          // @ts-expect-error - The types on link field overrides are not perfect
          condition: (data, siblingData) => siblingData?.showButton === true,
          description: 'The main action button at the bottom of the section',
        },
      },
    }),
  ],
};
