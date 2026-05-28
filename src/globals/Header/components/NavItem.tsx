// Unified navigation item component for both desktop and mobile rendering.
'use client';

import React from 'react';
import { CustomLink } from '@/fields/link/CustomLink';
import { CustomLinkType } from '@/fields/link';
import { Header } from '@/payload-types';

type NavItem = NonNullable<Header['navItems']>[number];

interface NavItemProps {
  item: NavItem;
  index: number;
  variant?: 'desktop' | 'mobile';
  onLinkClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  item,
  index,
  variant = 'desktop',
  onLinkClick,
}) => {
  const navItem = item as NavItem;

  switch (navItem.type) {
    case 'link':
      if (variant === 'desktop') {
        return (
          <CustomLink
            key={index}
            link={navItem.linkConfig as CustomLinkType}
            className="no-underline hover:no-underline"
            renderAs="link"
          >
            <div className="h-auto w-max items-center justify-center px-0 py-0 text-sm font-semibold text-foreground decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary hover:underline focus:outline-none disabled:pointer-events-none disabled:opacity-50">
              {navItem.linkConfig?.label}
            </div>
          </CustomLink>
        );
      } else {
        return (
          <CustomLink
            key={index}
            link={navItem.linkConfig as CustomLinkType}
            className="no-underline hover:no-underline"
            renderAs="link"
            onClick={onLinkClick}
          >
            <div className="block p-4 text-sm font-medium text-card-foreground no-underline hover:bg-card-foreground/5 hover:no-underline">
              {navItem.linkConfig?.label}
            </div>
          </CustomLink>
        );
      }

    case 'dropdown':
      return null;

    default:
      return null;
  }
};
