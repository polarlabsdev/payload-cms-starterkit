import { InlineYoutubeEmbedComponent } from '@/blocks/InlineYoutubeEmbed';
import { InlineYoutubeEmbedBlock } from '@/payload-types';
import { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { JSXConverter } from '@payloadcms/richtext-lexical/react';

export const inlineYoutubeEmbedConverter: JSXConverter<
  SerializedBlockNode<InlineYoutubeEmbedBlock>
> = ({ node }) => {
  const { videoId, caption } = node.fields;
  return <InlineYoutubeEmbedComponent videoId={videoId} caption={caption || undefined} />;
};
