import { anchorLinkField } from '@/fields/anchorLink';
import { getTailwindThemeColorOptions } from '@/lib/colors';
import type { Block } from 'payload';

export const YoutubeEmbedBlock: Block = {
  slug: 'youtube-embed',
  labels: {
    singular: 'YouTube Embed',
    plural: 'YouTube Embeds',
  },
  interfaceName: 'YoutubeEmbedBlock',
  imageURL: `${process.env.ADMIN_CDN_BASE_URL}YouTube%20Embed%20Block.png`,
  imageAltText: 'YouTube embed block thumbnail',
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
        description: 'Choose the background color for the YouTube embed section',
      },
    },
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      required: false,
      localized: true,
      admin: {
        description: 'Optional title to display above the YouTube video',
      },
    },
    {
      name: 'videoId',
      label: 'YouTube Video ID',
      type: 'text',
      required: true,
      admin: {
        description:
          'The YouTube video ID (e.g., "dQw4w9WgXcQ" from the URL https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
        placeholder: 'dQw4w9WgXcQ',
      },
    },
  ],
};
