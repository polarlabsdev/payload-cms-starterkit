import type { HeroBlock, Media, Video } from '@/payload-types';

export interface HeroProps {
  bannerImage?: Media;
  bannerVideo?: Video;
  mediaType: 'image' | 'video';
  title: string;
  body?: HeroBlock['body'];
  buttons?: HeroBlock['buttons'];
  textOrientation: 'left' | 'right';
  // textDarkMode?: boolean;
}
