import React, { HTMLAttributes } from 'react';
import { RichText } from '@/components/RichText';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { autoClassName } from '@/lib/utils';
import { HeroBlock, Media } from '@/payload-types';
import Link from 'next/link';

interface LeftAlignedHeroProps extends HTMLAttributes<HTMLDivElement> {
  title: HeroBlock['title'];
  body?: HeroBlock['body'];
  backgroundImage?: Media;
  featuredImage?: Media;
  ctas?: HeroBlock['ctas'];
  textDarkMode?: HeroBlock['textDarkMode'];
}

const LeftAlignedHero: React.FC<LeftAlignedHeroProps> = ({
  title,
  body,
  backgroundImage,
  featuredImage,
  ctas,
  className,
  textDarkMode,
  ...rest
}) => {
  const backgroundImageUrl = backgroundImage?.url || '';
  const backgroundImageAlt = backgroundImage?.alt || 'Background';

  const featuredImageUrl = featuredImage?.url || '';
  const featuredImageAlt = featuredImage?.alt || 'Featured';

  return (
    <div
      className={autoClassName('relative h-[60vh] p-8', className, textDarkMode ? 'dark' : 'light')}
      {...rest}
    >
      {backgroundImageUrl && (
        <Image
          src={backgroundImageUrl}
          alt={backgroundImageAlt}
          layout="fill"
          objectFit="cover"
          className="-z-10"
        />
      )}

      <div className="container mx-auto flex flex-col items-center gap-4 md:flex-row">
        <div className="flex-1">
          <h1 className="mb-4 text-4xl font-bold text-foreground">{title}</h1>

          {body && <RichText data={body} className="mb-6 text-foreground" />}

          <div className="flex gap-4">
            {ctas?.[0] && (
              <Button variant="default" asChild>
                <Link href={ctas[0].link.url}>{ctas[0].link.label}</Link>
              </Button>
            )}
            {ctas?.[1] && (
              <Button variant="outline" asChild>
                <Link href={ctas[1].link.url}>{ctas[1].link.label}</Link>
              </Button>
            )}
          </div>
        </div>

        {featuredImageUrl && (
          <div className="flex flex-1 items-center justify-center">
            {/* it's 2025 and we still can't set an auto height on a nextjs Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featuredImageUrl}
              alt={featuredImageAlt}
              className="max-h-[50vh] max-w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftAlignedHero;
