import { MediaInlineComponent } from '@/blocks/MediaInline';
import { MediaInlineBlock } from '@/payload-types';
import { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { JSXConverter } from '@payloadcms/richtext-lexical/react';
import type { Media, Video } from '@/payload-types';

export const mediaInlineConverter: JSXConverter<SerializedBlockNode<MediaInlineBlock>> = ({
  node,
}) => {
  const { mediaType, media, video, caption, maxHeight } = node.fields;
  return (
    <MediaInlineComponent
      mediaType={mediaType}
      media={media as Media | undefined}
      video={video as Video | undefined}
      caption={caption || undefined}
      maxHeight={maxHeight || undefined}
    />
  );
};
