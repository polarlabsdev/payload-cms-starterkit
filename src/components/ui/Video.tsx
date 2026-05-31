import React from 'react';
import type { Video as VideoType } from '@/payload-types';

interface VideoProps {
  video: VideoType;
  className?: string;
  style?: React.CSSProperties;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

export const Video: React.FC<VideoProps> = ({
  video,
  className,
  style,
  controls = true,
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
}) => {
  if (!video?.url) {
    return null;
  }

  return (
    <video
      src={video.url}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      className={className}
      style={style}
      aria-label={video.alt || 'Video'}
    >
      Your browser does not support the video tag.
    </video>
  );
};
