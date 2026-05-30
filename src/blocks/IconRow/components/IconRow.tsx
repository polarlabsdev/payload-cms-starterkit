import React from 'react';
import { IconRowBlock } from '@/payload-types';
import { CustomLink } from '@/fields/link/CustomLink';
import { CustomLinkType } from '@/fields/link/config';
import { TAILWIND_THEME_COLORS, TailwindThemeColorKey, BrandColorKey } from '@/lib/colors';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/icon';

interface IconItemProps {
  iconName: string;
  iconBackgroundColor?: BrandColorKey;
  iconColor?: BrandColorKey;
  iconColorDark?: BrandColorKey;
  iconColorWithBackground?: BrandColorKey;
  title: string;
  description: string;
  hasButton: boolean;
  button?: CustomLinkType;
}

const IconItem: React.FC<IconItemProps> = ({
  iconName,
  iconBackgroundColor,
  iconColor,
  iconColorDark,
  iconColorWithBackground,
  title,
  description,
  hasButton,
  button,
}) => {
  // Determine the appropriate icon colors based on whether background is set
  const finalIconColor = iconBackgroundColor ? iconColorWithBackground : iconColor;
  const finalIconColorDark = iconBackgroundColor ? undefined : iconColorDark;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6">
        <Icon
          iconName={iconName}
          backgroundColor={iconBackgroundColor}
          iconColor={finalIconColor}
          iconColorDark={finalIconColorDark}
          iconSize="4xl"
          backgroundSize="xl"
        />
      </div>

      <h3 className="mb-4 text-2xl font-bold text-foreground">{title}</h3>

      <p className="mb-6 max-w-xs text-sm text-foreground/80 md:text-base 2xl:text-lg">
        {description}
      </p>

      {hasButton && button && <CustomLink link={button} />}
    </div>
  );
};

export const IconRow: React.FC<IconRowBlock> = ({ backgroundColor, title, items }) => {
  const bgClass = TAILWIND_THEME_COLORS[backgroundColor as TailwindThemeColorKey];

  return (
    <section className={cn(`${bgClass} py-20`)}>
      <div className="container">
        {/* Section Title */}
        {title && (
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-extrabold text-foreground md:text-5xl">{title}</h2>
          </div>
        )}

        {/* Icons Grid */}
        <div
          className={cn('grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8', {
            'mt-0': !title,
          })}
        >
          {items?.map((item: IconRowBlock['items'][0], index: number) => (
            <IconItem
              key={index}
              iconName={item.iconName}
              iconBackgroundColor={item.iconBackgroundColor as BrandColorKey | undefined}
              iconColor={item.iconColor as BrandColorKey | undefined}
              iconColorDark={item.iconColorDark as BrandColorKey | undefined}
              iconColorWithBackground={item.iconColorWithBackground as BrandColorKey | undefined}
              title={item.title}
              description={item.description}
              hasButton={item.hasButton as boolean}
              button={item.button as CustomLinkType}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
