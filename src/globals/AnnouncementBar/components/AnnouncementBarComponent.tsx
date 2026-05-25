'use client';

import React, { useState } from 'react';
import { BRAND_COLORS, type BrandColorKey } from '@/lib/colors';
import { cn } from '@/lib/utils';
import type { AnnouncementBar } from '@/payload-types';
import { CustomLink } from '@/fields/link/CustomLink';
import type { CustomLinkType } from '@/fields/link';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

interface AnnouncementBarComponentProps {
  data: AnnouncementBar | null;
}

export const AnnouncementBarComponent: React.FC<AnnouncementBarComponentProps> = ({ data }) => {
  const t = useTranslations('AnnouncementBar');
  const [isVisible, setIsVisible] = useState(true);

  if (!data?.enabled || !data?.text || !isVisible) return null;

  const bgColor = BRAND_COLORS[data.backgroundColor as BrandColorKey] || BRAND_COLORS.Teal;
  const textColor = BRAND_COLORS[data.textColor as BrandColorKey] || BRAND_COLORS.White;

  return (
    <aside
      className="relative z-40 w-full transition-all duration-300 ease-in-out"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="container mx-auto px-4 py-2 sm:px-6">
        <div
          className={cn(
            'flex min-h-[44px] items-center gap-3 sm:gap-4',
            // Mobile & Tablet: Text left, buttons right (up to 1024px)
            'justify-between',
            // Desktop: 3-column layout to keep text center and buttons right
            'lg:grid lg:grid-cols-[1fr,auto,1fr] lg:items-center lg:gap-4',
          )}
        >
          {/* This column helps center the text on desktop and buttons on the right */}
          <div className="hidden lg:block" />

          <div className="min-w-0 flex-1 lg:flex-none lg:text-center">
            <p
              className={cn(
                'break-words text-sm font-semibold leading-snug tracking-tight sm:text-base',
                'text-start lg:text-center',
              )}
            >
              {data.text}
            </p>
          </div>

          <div className="flex flex-shrink-0 items-center justify-end gap-2 sm:gap-3">
            {data.showLink && data.link && (
              <CustomLink
                link={data.link as CustomLinkType}
                buttonSize="xs"
                className="whitespace-nowrap"
              >
                {data.link.label || 'Read More'}
              </CustomLink>
            )}

            <Button
              onClick={() => setIsVisible(false)}
              aria-label={t('closeAriaLabel')}
              size="icon"
              variant="ghost"
            >
              <Icon iconName="close-circle-fill" className="size-5 text-white sm:size-6" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};
