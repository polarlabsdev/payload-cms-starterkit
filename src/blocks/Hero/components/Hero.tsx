import React from 'react';
import { HeroBlock, Media, Video } from '@/payload-types';
import { MinimalHero } from '@/blocks/Hero/components/MinimalHero';
import { Skeleton } from '@/components/ui/Skeleton';
import type { HeroProps } from './types';
import { heroComponents } from './heroComponents';

const HeroSkeleton: React.FC = () => (
  <div className="h-96 w-full">
    <Skeleton className="h-full w-full" />
  </div>
);

export const Hero: React.FC<HeroBlock> = (props) => {
  const { heroType, bannerImage, bannerVideo, mediaType, title } = props;

  // For minimal hero, we don't need an image
  if (heroType === 'minimal') {
    if (!title) {
      return <HeroSkeleton />;
    }
    return <MinimalHero title={title} body={props.body} buttons={props.buttons} />;
  }

  // For other hero types, we need media (image or video)
  const media = mediaType === 'video' ? (bannerVideo as Video) : (bannerImage as Media);

  if (!heroType || !media?.url || !title) {
    return <HeroSkeleton />;
  }

  if (heroType in heroComponents) {
    const HeroComponent = heroComponents[heroType as keyof typeof heroComponents].component;
    const heroProps: HeroProps = {
      bannerImage: bannerImage as Media,
      bannerVideo: bannerVideo as Video,
      mediaType: mediaType as 'image' | 'video',
      title: title,
      body: props.body,
      buttons: props.buttons,
      textOrientation: props.textOrientation || 'left',
      // textDarkMode: props.textDarkMode || false,
    };
    return <HeroComponent {...heroProps} />;
  }

  return <HeroSkeleton />;
};
