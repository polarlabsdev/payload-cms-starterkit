'use client';

import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { Skeleton } from '@/components/ui/skeleton';

interface InlineYoutubeEmbedProps {
  videoId: string;
  caption?: string;
}

const InlineYoutubeEmbedBlock: React.FC<InlineYoutubeEmbedProps> = ({ videoId, caption }) => {
  // Return skeleton if no video ID
  if (!videoId) {
    return <Skeleton className="h-64 w-full rounded-lg" />;
  }

  return (
    <div className="inline-youtube-embed-block my-6 block w-full">
      <div className="relative w-full overflow-hidden rounded-lg">
        <div className="aspect-video">
          <LiteYouTubeEmbed id={videoId} title={caption || 'YouTube video'} />
        </div>
      </div>
      {caption && (
        <p className="mt-2 text-center text-sm italic text-muted-foreground">{caption}</p>
      )}
    </div>
  );
};

export default InlineYoutubeEmbedBlock;
