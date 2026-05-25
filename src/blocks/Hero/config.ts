import { minimalLexical } from '@/fields/lexicals/minimalLexical';
import { linkField } from '@/fields/link/config';
import type { Block } from 'payload';
import { anchorLinkField } from '@/fields/anchorLink';

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  imageURL: `${process.env.ADMIN_CDN_BASE_URL}Hero.png`,
  imageAltText: 'Hero block thumbnail',
  fields: [
    anchorLinkField,
    {
      name: 'heroType',
      label: 'Hero Type',
      type: 'select',
      required: true,
      options: [
        { label: 'Full Screen', value: 'fullscreen' },
        { label: 'Half Screen', value: 'half' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    {
      name: 'mediaType',
      label: 'Media Type',
      type: 'radio',
      required: true,
      defaultValue: 'image',
      options: [
        {
          label: 'Image',
          value: 'image',
        },
        {
          label: 'Video',
          value: 'video',
        },
      ],
      admin: {
        condition: (data, siblingData) => siblingData?.heroType !== 'minimal',
        description: 'Choose whether to display an image or video',
        layout: 'horizontal',
      },
    },
    {
      name: 'textOrientation',
      label: 'Text Orientation',
      type: 'select',
      required: true,
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        condition: (data, siblingData) => siblingData?.heroType !== 'minimal',
        description: 'Choose which side the text content appears on',
      },
    },
    {
      name: 'bannerImage',
      label: 'Banner Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.heroType !== 'minimal' && siblingData?.mediaType === 'image',
        description: 'Main image for the hero section',
      },
      validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) => {
        if (siblingData?.heroType !== 'minimal' && siblingData?.mediaType === 'image' && !value) {
          return 'Please select an image.';
        }
        return true;
      },
    },
    {
      name: 'bannerVideo',
      label: 'Banner Video',
      type: 'upload',
      relationTo: 'videos',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.heroType !== 'minimal' && siblingData?.mediaType === 'video',
        description:
          'Main video for the hero section (will autoplay, mute, and loop with no controls)',
      },
      validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) => {
        if (siblingData?.heroType !== 'minimal' && siblingData?.mediaType === 'video' && !value) {
          return 'Please select a video.';
        }
        return true;
      },
    },
    {
      name: 'title',
      label: 'Header',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'body',
      label: 'Description',
      type: 'richText',
      editor: minimalLexical,
      required: false,
      localized: true,
    },
    {
      name: 'buttons',
      label: 'Buttons',
      type: 'array',
      maxRows: 2,
      admin: {
        description: 'Add up to 2 action buttons',
      },
      fields: [linkField({ showButton: true })],
    },
    // {
    //   name: 'textDarkMode',
    //   label: 'Dark Text Mode',
    //   type: 'checkbox',
    //   defaultValue: false,
    //   admin: {
    //     condition: (data, siblingData) => siblingData?.heroType === 'fullscreen',
    //     description:
    //       'If checked, the text will be displayed in dark mode. This is useful for light backgrounds that need dark text.',
    //   },
    // },
  ],
};
