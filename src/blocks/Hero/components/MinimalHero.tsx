import React from 'react';
import { RichText } from '@/components/RichText';
import { CustomLink } from '@/fields/link/CustomLink';
import { CustomLinkType } from '@/fields/link';
import { HeroBlock } from '@/payload-types';

// MinimalHero doesn't need the full HeroProps since it doesn't use bannerImage or textOrientation
export interface MinimalHeroProps {
  title: string;
  body?: HeroBlock['body'];
  buttons?: HeroBlock['buttons'];
}

export const MinimalHero: React.FC<MinimalHeroProps> = ({ title, body, buttons }) => {
  return (
    <div className="flex w-full items-center justify-center bg-background py-16 text-center lg:py-20">
      <div className="container">
        <div className="mx-auto w-full space-y-4 md:w-4/5 lg:w-2/3">
          <h1 className="font-header text-4xl font-extrabold leading-tight text-foreground lg:text-5xl xl:text-6xl">
            {title}
          </h1>

          {body && (
            <div className="text-sm font-medium text-foreground md:text-base lg:text-lg 2xl:text-xl">
              <RichText data={body} />
            </div>
          )}

          {buttons && buttons.length > 0 && (
            <div className="flex w-full items-center justify-center gap-2">
              {buttons.map((button, index) => (
                <CustomLink key={index} link={button.link as CustomLinkType} buttonSize="md" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
