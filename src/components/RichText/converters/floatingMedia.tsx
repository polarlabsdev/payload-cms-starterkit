import { FloatingMediaComponent } from '@/blocks/FloatingMedia';
import { FloatingMediaBlock } from '@/payload-types';
import { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { JSXConverter } from '@payloadcms/richtext-lexical/react';
import type { Media, Video } from '@/payload-types';

export const floatingMediaConverter: JSXConverter<SerializedBlockNode<FloatingMediaBlock>> = ({
  node,
}) => {
  const { mediaType, media, video, position, caption } = node.fields;
  return (
    <FloatingMediaComponent
      mediaType={mediaType}
      media={media as Media | undefined}
      video={video as Video | undefined}
      position={position}
      caption={caption || undefined}
    />
  );
};
