// Mobile dropdown with expandable sections and styled link items.
'use client';

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Header } from '@/payload-types';
import { FeaturedNavItem } from './FeaturedNavItem';
import { DropdownNavItem } from './DropdownNavItem';
import { CustomLink } from '@/fields/link/CustomLink';
import { CustomLinkType } from '@/fields/link';

type NavItem = NonNullable<Header['navItems']>[number];

interface MobileDropdownProps {
  item: NavItem;
  onLinkClick: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}

export const MobileDropdown: React.FC<MobileDropdownProps> = ({
  item,
  onLinkClick,
  isExpanded,
  onToggle,
}) => {
  if (!item.dropdownLinks?.length) return null;

  const featured = item.dropdownLinks.find((l) => l.isFeatured);
  const regularLinks = item.dropdownLinks.filter((l) => !l.isFeatured);

  return (
    <div>
      <div className="w-full">
        {item.hasDropdownLabelLink ? (
          // Label as link with divider and toggle
          <div className="flex w-full items-center text-start text-sm font-medium text-card-foreground hover:bg-card-foreground/5">
            {/* Label as link */}
            <CustomLink
              link={item.dropdownLabelLink as CustomLinkType}
              className="flex-1 no-underline hover:no-underline"
              renderAs="link"
              onClick={onLinkClick}
            >
              <div className="p-4 pe-0">
                <span>{item.dropdownLabel}</span>
              </div>
            </CustomLink>

            {/* Vertical divider (mobile UX) */}
            <div className="h-8 w-[2px] bg-border" />

            {/* Arrow toggle */}
            <button
              onClick={onToggle}
              className="flex h-14 w-14 items-center justify-center rounded-r p-4 transition-colors hover:bg-card-foreground/10"
              aria-label={isExpanded ? 'Close dropdown' : 'Open dropdown'}
            >
              <Icon
                iconSize="xl"
                iconName="arrow-drop-right-line"
                className={cn(
                  'transition-transform duration-200',
                  'rtl:scale-x-[-1]',
                  isExpanded ? 'rotate-90' : 'rotate-0',
                )}
              />
            </button>
          </div>
        ) : (
          // Simple button toggle
          <button
            onClick={onToggle}
            className="flex w-full items-center justify-between p-4 text-start text-sm font-medium text-card-foreground hover:bg-card-foreground/5"
            aria-expanded={isExpanded}
          >
            <span>{item.dropdownLabel}</span>
            <Icon
              iconSize="xl"
              iconName="arrow-drop-right-line"
              className={cn(
                'transition-transform duration-200',
                'rtl:scale-x-[-1]',
                isExpanded ? 'rotate-90' : 'rotate-0',
              )}
            />
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="border-t bg-card-foreground/5">
          {featured ? (
            // Featured link exists - use responsive grid/stack layout
            <>
              {/* Desktop-style grid layout for screens >=xs */}
              <div className="hidden p-3 xs:block">
                <div className="flex items-stretch gap-3">
                  <FeaturedNavItem item={featured} variant="desktop" onLinkClick={onLinkClick} />
                  {regularLinks.length > 0 && (
                    <div className="flex flex-1 flex-col gap-1">
                      {regularLinks.map((dropdownItem, index) => (
                        <DropdownNavItem
                          key={index}
                          item={dropdownItem}
                          variant="desktop"
                          onLinkClick={onLinkClick}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile-style stack layout for screens <xs */}
              <div className="block xs:hidden">
                <FeaturedNavItem item={featured} variant="mobile" onLinkClick={onLinkClick} />
                {regularLinks.map((dropdownItem, index) => (
                  <DropdownNavItem
                    key={index}
                    item={dropdownItem}
                    variant="mobile"
                    onLinkClick={onLinkClick}
                  />
                ))}
              </div>
            </>
          ) : (
            // No featured link - just use simple stack layout always
            <div className="p-3">
              <div className="flex w-full flex-col gap-1">
                {regularLinks.map((dropdownItem, index) => (
                  <DropdownNavItem
                    key={index}
                    item={dropdownItem}
                    variant="desktop"
                    onLinkClick={onLinkClick}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
