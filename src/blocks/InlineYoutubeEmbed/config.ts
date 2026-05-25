import type { Block } from 'payload';

export const InlineYoutubeEmbedBlock: Block = {
  slug: 'inlineYoutubeEmbed',
  interfaceName: 'InlineYoutubeEmbedBlock',
  fields: [
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
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption to display below the YouTube video',
      },
    },
  ],
};
