'use client';

import React from 'react';
import { CustomLink } from '@/fields/link/CustomLink';
import { Header, Media } from '@/payload-types';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { cn } from '@/lib/utils';
import { CustomLinkType } from '@/fields/link';

type DropdownItem = NonNullable<NonNullable<Header['navItems']>[number]['dropdownLinks']>[number];

interface FeaturedNavItemProps {
  item: DropdownItem;
  variant: 'mobile' | 'desktop';
  onLinkClick?: () => void;
}

export const FeaturedNavItem: React.FC<FeaturedNavItemProps> = ({ item, variant, onLinkClick }) => {
  const isDesktop = variant === 'desktop';
  const isMobile = variant === 'mobile';

  const content = (
    <CustomLink
      link={item.link as CustomLinkType}
      renderAs="link"
      className="group relative block h-full w-full no-underline hover:no-underline"
      onClick={onLinkClick}
    >
      <div
        className={cn(
          'group relative flex flex-col justify-end overflow-hidden rounded-md',
          isMobile && 'block aspect-video',
          isDesktop && 'h-full w-full p-4 text-start',
        )}
      >
        {item.featuredImage ? (
          <>
            <OptimizedImage
              media={item.featuredImage as Media}
              context="card"
              defaultAlt={item.link?.label || 'Featured link'}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />

            <div
              className="absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-30"
              style={{
                background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 70%)`,
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}

        <div
          className={cn(
            'relative',
            isMobile && 'flex h-full flex-col justify-end p-4',
            isDesktop && 'z-10',
          )}
        >
          <div
            className={cn(
              'font-bold leading-tight text-white',
              isMobile && 'text-sm',
              isDesktop && 'text-base',
            )}
          >
            {item.link?.label}
          </div>
          {item.description && (
            <p
              className={cn(
                'font-light leading-snug text-white/90',
                isMobile && 'mt-0.5 text-[11px]',
                isDesktop && 'mt-1 whitespace-normal text-xs',
              )}
            >
              {item.description}
            </p>
          )}
        </div>
      </div>
    </CustomLink>
  );

  if (isMobile) {
    return <div className="p-3">{content}</div>;
  }

  return <div className="h-auto min-h-[200px] w-[200px] overflow-hidden rounded-md">{content}</div>;
};
