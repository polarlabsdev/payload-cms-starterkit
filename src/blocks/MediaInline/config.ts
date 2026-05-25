import type { Block } from 'payload';

export const MediaInlineBlock: Block = {
  slug: 'mediaInline',
  interfaceName: 'MediaInlineBlock',
  fields: [
    {
      name: 'mediaType',
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
        description: 'Choose whether to display an image or video',
        layout: 'horizontal',
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Select an image to display inline in the rich text content',
        condition: (_, siblingData) => siblingData?.mediaType === 'image',
      },
      validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) => {
        if (siblingData?.mediaType === 'image' && !value) {
          return 'Please select an image.';
        }
        return true;
      },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'videos',
      admin: {
        description: 'Select a video to display inline in the rich text content',
        condition: (_, siblingData) => siblingData?.mediaType === 'video',
      },
      validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) => {
        if (siblingData?.mediaType === 'video' && !value) {
          return 'Please select a video.';
        }
        return true;
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption to display below the media',
      },
    },
    {
      name: 'maxHeight',
      type: 'text',
      label: 'Max Height',
      defaultValue: '400px',
      admin: {
        description:
          'Maximum height of the media using valid CSS values (e.g., 400px, 80vh). "px" is pixels and "vh" means height of the window as a percentage (for example 80vh means 80% of the window height).',
        placeholder: '400px',
        condition: (_, siblingData) => siblingData?.mediaType === 'image',
      },
    },
  ],
};
