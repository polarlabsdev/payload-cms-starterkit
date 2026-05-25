import React from 'react';
import { RichText } from '@/components/RichText';
import { CustomLink } from '@/fields/link/CustomLink';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Video } from '@/components/ui/Video';
import type { HeroProps } from './types';
import { CustomLinkType } from '@/fields/link';
import type { Media, Video as VideoType } from '@/payload-types';

export const FullScreenHero: React.FC<HeroProps> = ({
  bannerImage,
  bannerVideo,
  mediaType,
  title,
  body,
  buttons,
  textOrientation = 'left',
  // textDarkMode = false,
}) => {
  return (
    <div className="relative flex h-[42rem] w-full items-center bg-background 4xl:h-[54rem]">
      {/* Background Media */}
      {mediaType === 'video' ? (
        <Video
          video={bannerVideo as VideoType}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          controls={false}
        />
      ) : (
        <OptimizedImage
          media={bannerImage as Media}
          context="hero"
          defaultAlt={title || 'Hero background'}
          priority
          fill
          className="z-0 object-cover"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-muted/80 via-muted/50 to-muted/30" />

      {/* Content Container */}
      <div
        className={cn(
          'container flex flex-row',
          textOrientation === 'right' ? 'justify-end' : 'justify-start',
        )}
      >
        <div
          className={cn(
            'relative z-10 h-full w-full space-y-6 text-foreground md:w-4/5 md:px-4 lg:w-2/3 lg:px-0 4xl:max-w-[48rem]',
            textOrientation === 'right' ? 'text-end' : 'text-start',
          )}
        >
          <h1 className="font-header text-4xl font-extrabold leading-tight lg:text-5xl xl:text-6xl">
            {title}
          </h1>

          {body && (
            <div className="text-sm font-semibold md:text-base lg:text-lg 2xl:text-xl">
              <RichText data={body} />
            </div>
          )}

          {buttons && buttons.length > 0 && (
            <div
              className={cn(
                'flex w-full flex-col gap-2 sm:flex-row',
                textOrientation === 'right' ? 'justify-end' : 'justify-start',
              )}
            >
              {buttons.map((button, index) => (
                <CustomLink key={index} link={button.link as CustomLinkType} buttonSize="lg" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
