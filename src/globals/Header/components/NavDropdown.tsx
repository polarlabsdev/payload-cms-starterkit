'use client';

import React from 'react';
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import { Header } from '@/payload-types';
import { FeaturedNavItem } from './FeaturedNavItem';
import { DropdownNavItem } from './DropdownNavItem';
import { CustomLink } from '@/fields/link/CustomLink';
import { CustomLinkType } from '@/fields/link';

type NavItem = NonNullable<Header['navItems']>[number];

interface NavDropdownProps {
  item: NavItem;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ item }) => {
  if (!item.dropdownLinks?.length) return null;

  const featured = item.dropdownLinks.find((l) => l.isFeatured);
  const links = item.dropdownLinks.filter((l) => !l.isFeatured);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-sm font-semibold">
        {item.hasDropdownLabelLink ? (
          <CustomLink
            link={item.dropdownLabelLink as CustomLinkType}
            className="flex items-center gap-2 no-underline hover:no-underline"
            renderAs="link"
          >
            <span className="text-sm font-semibold text-foreground decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary hover:underline">
              {item.dropdownLabel}
            </span>

            {item.hasDropdownLabelLink && <div className="h-4 w-[2px] bg-border" />}
          </CustomLink>
        ) : (
          item.dropdownLabel
        )}
      </NavigationMenuTrigger>

      <NavigationMenuContent className="p-0">
        <div className="rounded-lg bg-popover p-3 shadow-lg">
          <div
            className={
              featured
                ? 'grid auto-cols-max grid-flow-col items-stretch gap-3'
                : `flex min-w-[200px] flex-col gap-1`
            }
          >
            {/* Featured card */}
            {featured && <FeaturedNavItem item={featured} variant="desktop" />}

            {/* Links column */}
            {links.length > 0 && (
              <div className="flex max-w-[200px] flex-col gap-1">
                {links.map((item, i) => (
                  <DropdownNavItem key={i} item={item} variant="desktop" />
                ))}
              </div>
            )}
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
