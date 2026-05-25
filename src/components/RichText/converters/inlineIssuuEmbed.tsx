import { InlineIssuuEmbedComponent } from '@/blocks/InlineIssuuEmbed';
import { InlineIssuuEmbedBlock } from '@/payload-types';
import { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { JSXConverter } from '@payloadcms/richtext-lexical/react';

export const inlineIssuuEmbedConverter: JSXConverter<
  SerializedBlockNode<InlineIssuuEmbedBlock>
> = ({ node }) => {
  const { embedUrl, caption } = node.fields;
  return <InlineIssuuEmbedComponent embedUrl={embedUrl} caption={caption || undefined} />;
};
