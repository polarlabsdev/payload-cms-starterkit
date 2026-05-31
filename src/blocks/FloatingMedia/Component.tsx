import React from 'react';
import type { Media, Video as VideoType } from '@/payload-types';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Video } from '@/components/ui/Video';

interface FloatingMediaBlockProps {
  mediaType: 'image' | 'video';
  media?: number | Media;
  video?: number | VideoType;
  position: 'left' | 'right';
  caption?: string;
}

const FloatingMediaBlock: React.FC<FloatingMediaBlockProps> = ({
  mediaType,
  media,
  video,
  position,
  caption,
}) => {
  const mediaObj = typeof media === 'number' ? null : (media as Media);
  const videoObj = typeof video === 'number' ? null : (video as VideoType);

  const hasValidMedia = mediaType === 'image' && mediaObj && mediaObj.url;
  const hasValidVideo = mediaType === 'video' && videoObj && videoObj.url;

  const aspectRatio =
    mediaObj?.width && mediaObj?.height ? mediaObj.width / mediaObj.height : 16 / 9; // fallback to 16:9 if dimensions not available

  return (
    <div
      className={cn(
        'floating-media-block not-prose mb-4 w-full overflow-hidden rounded-lg sm:w-3/5',
        position === 'left' ? 'sm:float-start sm:me-8 sm:ms-0' : 'sm:float-end sm:me-0 sm:ms-8',
        // Keep sizes on medium+ screens but remove negative margins so it doesn't pop out
        position === 'left'
          ? 'md:float-start md:me-5 md:ms-0 md:w-3/5 lg:me-8 lg:w-3/5 xl:me-10'
          : 'md:float-end md:me-0 md:ms-5 md:w-3/5 lg:ms-8 lg:w-3/5 xl:ms-10',
      )}
    >
      {hasValidMedia ? (
        <div
          className="relative w-full"
          style={{
            aspectRatio: aspectRatio.toString(),
            minHeight: '300px', // Ensure adequate minimum height while respecting aspect ratio
            maxHeight: '70vh', // Ensure image never takes more than 70% of viewport height
          }}
        >
          <OptimizedImage
            media={mediaObj}
            context="floating"
            defaultAlt="Floating image"
            className="h-full w-full object-cover"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      ) : hasValidVideo ? (
        <div className="relative w-full">
          <Video
            video={videoObj}
            className="h-full w-full rounded-lg object-cover"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      ) : (
        <Skeleton
          className="w-full rounded-lg"
          style={{
            aspectRatio: aspectRatio.toString(),
            minHeight: '300px',
            maxHeight: '70vh',
          }}
        />
      )}
      {caption && (
        <p className="clear-both mt-2 w-full text-center text-sm italic text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  );
};

export default FloatingMediaBlock;
