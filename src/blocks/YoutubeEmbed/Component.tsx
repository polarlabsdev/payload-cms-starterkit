'use client';

import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { YoutubeEmbedBlock } from '@/payload-types';
import { TAILWIND_THEME_COLORS, TailwindThemeColorKey } from '@/lib/colors';
import { cn } from '@/lib/utils';

export const YoutubeEmbed: React.FC<YoutubeEmbedBlock> = (props) => {
  const { backgroundColor, title, videoId } = props;

  // Return null if no video ID
  if (!videoId) {
    return null;
  }

  const bgClass = TAILWIND_THEME_COLORS[backgroundColor as TailwindThemeColorKey];

  return (
    <section className={cn('lg:py-18 py-14', bgClass)}>
      <div className="container">
        {/* Section Title */}
        {title && (
          <div className="mx-auto mb-8 max-w-4xl text-center">
            <h2 className="font-header text-4xl font-extrabold text-foreground md:text-5xl">
              {title}
            </h2>
          </div>
        )}

        {/* YouTube Embed */}
        <div className="mx-auto max-w-4xl">
          <div className="aspect-video overflow-hidden rounded-lg">
            <LiteYouTubeEmbed id={videoId} title={title || 'YouTube video'} />
          </div>
        </div>
      </div>
    </section>
  );
};
