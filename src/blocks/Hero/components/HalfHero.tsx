import React from 'react';
import { RichText } from '@/components/RichText';
import { CustomLink } from '@/fields/link/CustomLink';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Video } from '@/components/ui/Video';
import type { HeroProps } from './types';
import { CustomLinkType } from '@/fields/link';
import type { Media, Video as VideoType } from '@/payload-types';

export const HalfHero: React.FC<HeroProps> = ({
  bannerImage,
  bannerVideo,
  mediaType,
  title,
  body,
  buttons,
  textOrientation = 'left',
}) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col bg-background md:h-[42rem] 4xl:h-[54rem]',
        textOrientation === 'left' ? 'md:flex-row-reverse' : 'md:flex-row',
      )}
    >
      {/* Media Container */}
      <div className="relative h-72 w-full md:h-full md:w-1/2">
        {mediaType === 'video' ? (
          <Video
            video={bannerVideo as VideoType}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            controls={false}
          />
        ) : (
          <OptimizedImage
            media={bannerImage as Media}
            context="hero"
            defaultAlt={title || 'Hero image'}
            priority
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Text Content Container */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-8 text-center text-foreground sm:text-start md:h-full md:w-1/2 md:p-8">
        <div className="w-full max-w-[30rem] space-y-6 4xl:max-w-[40rem]">
          <h1 className="font-header text-4xl font-extrabold leading-tight lg:text-5xl xl:text-6xl">
            {title}
          </h1>

          {body && (
            <div className="text-sm font-medium md:text-base 2xl:text-lg">
              <RichText data={body} />
            </div>
          )}

          {buttons && buttons.length > 0 && (
            <div className="flex w-full flex-col justify-start gap-2 sm:flex-row">
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
