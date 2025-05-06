import React from 'react';
import { HeroBlock, Media } from '@/payload-types';
import CenteredHero from './Centered';
import LeftAlignedHero from './LeftAligned';

export const Hero: React.FC<HeroBlock> = ({
  heroType,
  title,
  body,
  backgroundImage,
  ctas,
  featuredImage,
  textDarkMode,
}) => {
  if (heroType === 'centered') {
    return (
      <CenteredHero
        title={title}
        body={body}
        backgroundImage={backgroundImage as Media}
        ctas={ctas}
        textDarkMode={textDarkMode}
      />
    );
  }

  if (heroType === 'left-aligned') {
    return (
      <LeftAlignedHero
        title={title}
        body={body}
        backgroundImage={backgroundImage as Media}
        featuredImage={featuredImage as Media}
        ctas={ctas}
        textDarkMode={textDarkMode}
      />
    );
  }
};
