import React, { HTMLAttributes } from 'react';
import { RichText } from '@/components/RichText';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { autoClassName } from '@/lib/utils';
import { HeroBlock, Media } from '@/payload-types';
import Link from 'next/link';

type CenteredHeroProps = {
  title: HeroBlock['title'];
  body?: HeroBlock['body'];
  backgroundImage?: Media;
  ctas?: HeroBlock['ctas'];
  textDarkMode?: HeroBlock['textDarkMode'];
} & HTMLAttributes<HTMLDivElement>;

const CenteredHero: React.FC<CenteredHeroProps> = ({
  title,
  body,
  backgroundImage,
  ctas,
  className,
  textDarkMode,
  ...rest
}) => {
  const imageUrl = backgroundImage?.url || '';
  const imageAlt = backgroundImage?.alt || 'Background';

  return (
    <div
      className={autoClassName(
        'relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden p-8 text-center',
        className,
        textDarkMode ? 'dark' : 'light',
      )}
      {...rest}
    >
      {imageUrl && (
        <Image src={imageUrl} alt={imageAlt} layout="fill" objectFit="cover" className="-z-10" />
      )}

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
  );
};

export default CenteredHero;
