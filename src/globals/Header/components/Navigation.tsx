// Main navigation container that orchestrates desktop and mobile navigation rendering.
'use client';

import React, { Fragment, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { RiMenu2Line, RiCloseLine, RiSearchLine } from '@remixicon/react';
import { Header } from '@/payload-types';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { CustomLink } from '@/fields/link/CustomLink';
import { CustomLinkType } from '@/fields/link';
import { ThemeAwareImage } from '@/fields/themeAwareImage';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { NavDropdown, MobileDropdown, NavItem } from './index';
import { SearchModal } from '@/components/search/SearchModal';
import { useTranslations } from 'next-intl';

// These have to be 2 separate classes instead of just appending the value
// to strings in className because Tailwind won't recognize dynamically built class names.
// We abandoned God when we abandoned CSS.
// If you change this don't forget to update the sidebar top offset in StoriesSidebar.tsx
export const HEADER_HEIGHT_CLASS = 'h-16';
export const HEADER_NEGATIVE_MARGIN_CLASS = '-mt-16';
const HEADER_CLASSNAME = cn('sticky top-0 z-50 w-full border-b bg-background', HEADER_HEIGHT_CLASS);

type NavigationProps = {
  header: Header | null;
};

export const Navigation: React.FC<NavigationProps> = ({ header }) => {
  const t = useTranslations('Navigation');
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setOpenMobileDropdown(null);
    }
  };

  if (!header)
    return (
      <header className={HEADER_CLASSNAME}>
        <div className="container flex h-full items-center justify-between">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-8 w-[200px] lg:w-[300px]" />
        </div>
      </header>
    );

  const { logo, navItems, navButtons } = header;

  return (
    <Fragment>
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Navigation Bar */}
      <header className={HEADER_CLASSNAME}>
        <div className="container flex h-full items-center justify-between">
          {logo && (
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-auto">
                <ThemeAwareImage
                  image={logo}
                  defaultAlt="Site logo"
                  className="h-full w-auto object-contain"
                  skeletonClassName="h-full w-[100px]"
                  priority
                />
              </div>
            </Link>
          )}

          <nav className="hidden items-center space-x-6 lg:flex [&_a]:!text-sm 2xl:[&_a]:!text-base">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems?.map((item: NonNullable<Header['navItems']>[number], i: number) =>
                  item.type === 'dropdown' ? (
                    <NavDropdown key={item.id ?? i} item={item} />
                  ) : (
                    <NavigationMenuItem key={item.id ?? i}>
                      <NavItem item={item} index={i} variant="desktop" />
                    </NavigationMenuItem>
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="hidden items-center space-x-2 lg:flex">
            <Button
              onClick={() => setSearchOpen(true)}
              variant="ghost"
              size="icon"
              aria-label={t('searchAriaLabel')}
              className="[&_svg]:size-5"
            >
              <RiSearchLine />
            </Button>
            {navButtons?.map((item, i) => (
              <CustomLink key={i} link={item.link as CustomLinkType} />
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-1 lg:hidden">
            <Button
              onClick={() => setSearchOpen(true)}
              variant="ghost"
              size="icon"
              aria-label={t('searchAriaLabel')}
              className="[&_svg]:size-6"
            >
              <RiSearchLine />
            </Button>
            <Button
              onClick={toggleMenu}
              className="[&_svg]:size-6"
              size={'icon'}
              aria-label={isOpen ? t('closeMenu') : t('openMenu')}
              variant="ghost"
            >
              {isOpen ? <RiCloseLine /> : <RiMenu2Line />}
            </Button>
          </div>
        </div>

        {/* Mobile navigation - moved inside header and anchored to bottom */}
        <div
          className={cn(
            'absolute end-0 start-0 top-full z-40 w-screen transition-all duration-300 ease-in-out',
            isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <nav
            className={cn(
              'm-2 rounded-lg bg-card shadow-md',
              // Max height is now just the viewport minus margins
              'max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain',
            )}
          >
            <div className="divide-y divide-border">
              {navItems?.map((item: NonNullable<Header['navItems']>[number], i: number) => {
                if (item.type === 'dropdown')
                  return (
                    <MobileDropdown
                      key={i}
                      item={item}
                      onLinkClick={toggleMenu}
                      isExpanded={openMobileDropdown === i}
                      onToggle={() => setOpenMobileDropdown(openMobileDropdown === i ? null : i)}
                    />
                  );

                return (
                  <div key={i}>
                    <NavItem item={item} index={i} variant="mobile" onLinkClick={toggleMenu} />
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 px-2 py-3">
              {navButtons?.map((item, i) => (
                <CustomLink
                  onClick={toggleMenu}
                  key={i}
                  link={item.link as CustomLinkType}
                  buttonWidth="full"
                  buttonShape="roundedMedium"
                />
              ))}
            </div>
          </nav>
        </div>
      </header>
    </Fragment>
  );
};
