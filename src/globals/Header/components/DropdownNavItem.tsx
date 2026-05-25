'use client';

import React from 'react';
import { CustomLink } from '@/fields/link/CustomLink';
import { Header } from '@/payload-types';
import { CustomLinkType } from '@/fields/link/config';

type DropdownItem = NonNullable<NonNullable<Header['navItems']>[number]['dropdownLinks']>[number];

interface DropdownNavItemProps {
  item: DropdownItem;
  variant: 'mobile' | 'desktop';
  onLinkClick?: () => void;
}

export const DropdownNavItem: React.FC<DropdownNavItemProps> = ({ item, variant, onLinkClick }) => {
  const isMobile = variant === 'mobile';

  if (isMobile) {
    return (
      <div className="border-s-2 border-transparent">
        <CustomLink
          link={item.link as CustomLinkType}
          renderAs="link"
          className="no-underline hover:no-underline"
          onClick={onLinkClick}
        >
          <div className="block p-3 ps-6 hover:border-s-primary hover:bg-card-foreground/5">
            <div className="text-sm font-bold text-card-foreground">{item.link?.label}</div>
            {item.description && (
              <p className="mt-0.5 whitespace-normal break-words text-[11px] font-light leading-snug text-muted-foreground">
                {item.description}
              </p>
            )}
          </div>
        </CustomLink>
      </div>
    );
  }

  return (
    <CustomLink
      link={item.link as CustomLinkType}
      renderAs="link"
      className="no-underline hover:no-underline"
      onClick={onLinkClick}
    >
      <div className="flex w-full flex-col rounded-md p-2 text-start transition-colors hover:bg-muted">
        <div className="text-sm font-bold leading-tight text-card-foreground">
          {item.link?.label}
        </div>
        {item.description && (
          <p className="mt-0.5 whitespace-normal break-words text-[11px] font-light leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </CustomLink>
  );
};
