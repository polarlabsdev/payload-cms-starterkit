import React from 'react';
import type { Media, Video as VideoType } from '@/payload-types';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Video } from '@/components/ui/Video';

interface MediaInlineBlockProps {
  mediaType: 'image' | 'video';
  media?: number | Media;
  video?: number | VideoType;
  caption?: string;
  maxHeight?: string;
}

const MediaInlineBlock: React.FC<MediaInlineBlockProps> = ({
  mediaType,
  media,
  video,
  caption,
  maxHeight = '400px',
}) => {
  const mediaObj = typeof media === 'number' ? null : (media as Media);
  const videoObj = typeof video === 'number' ? null : (video as VideoType);

  const hasValidMedia = mediaType === 'image' && mediaObj && mediaObj.url;
  const hasValidVideo = mediaType === 'video' && videoObj && videoObj.url;

  return (
    <div className="media-inline-block my-6 block w-full">
      {hasValidMedia ? (
        <div className="relative w-full overflow-hidden rounded-lg">
          <OptimizedImage
            media={mediaObj}
            context="inline"
            defaultAlt="Inline image"
            className={`!m-0 h-auto w-full object-cover`}
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: maxHeight,
              objectFit: 'cover',
            }}
          />
        </div>
      ) : hasValidVideo ? (
        <div className="relative w-full overflow-hidden rounded-lg">
          <Video
            video={videoObj}
            className="!m-0 h-auto w-full rounded-lg"
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: maxHeight,
            }}
          />
        </div>
      ) : (
        <Skeleton className="h-64 w-full rounded-lg" />
      )}
      {caption && (
        <p className="mt-2 text-center text-sm italic text-muted-foreground">{caption}</p>
      )}
    </div>
  );
};

export default MediaInlineBlock;
