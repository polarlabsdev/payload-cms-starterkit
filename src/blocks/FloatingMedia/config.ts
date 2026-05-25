import type { Block } from 'payload';

export const FloatingMediaBlock: Block = {
  slug: 'floatingMedia',
  interfaceName: 'FloatingMediaBlock',
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
        description:
          'Select an image to display floating left or right with text flowing around it',
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
        description: 'Select a video to display floating left or right with text flowing around it',
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
      name: 'position',
      type: 'select',
      required: true,
      defaultValue: 'left',
      options: [
        {
          label: 'Float Left',
          value: 'left',
        },
        {
          label: 'Float Right',
          value: 'right',
        },
      ],
      admin: {
        description: 'Choose whether the media should float to the left or right',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption to display below the media',
      },
    },
  ],
};
