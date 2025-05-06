'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RiMenu2Line, RiCloseLine } from '@remixicon/react';
import { Header } from '@/payload-types';
import { Button } from '@/components/ui/Button';
import { autoClassName } from '@/lib/utils';

type NavigationProps = {
  navItems: Header['navItems'];
};

export const Navigation: React.FC<NavigationProps> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Desktop navigation */}
      <nav className="hidden items-center space-x-6 md:flex">
        {navItems?.map((item, i) => (
          <Link
            key={`nav-desktop-${i}`}
            href={item.link.url}
            target={item.link.newTab ? '_blank' : undefined}
            className="text-sm font-medium hover:text-primary"
          >
            {item.link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile menu button */}
      <Button
        onClick={toggleMenu}
        className="md:hidden [&_svg]:size-6"
        size={'icon'}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        variant="ghost"
      >
        {isOpen ? <RiCloseLine /> : <RiMenu2Line />}
      </Button>

      {/* Mobile navigation */}
      <div
        className={autoClassName(
          'fixed top-0 h-screen w-[90vw] bg-background shadow-lg transition-all duration-300 ease-in-out',
          isOpen ? 'right-0' : 'right-[-100vw]',
        )}
      >
        <div className="flex justify-end p-4">
          <Button
            onClick={toggleMenu}
            className="[&_svg]:size-6"
            size={'icon'}
            aria-label="Close menu"
            variant="ghost"
          >
            <RiCloseLine />
          </Button>
        </div>

        <nav className="flex flex-col divide-y divide-border">
          {navItems?.map((item, i) => (
            <React.Fragment key={`nav-full-${i}`}>
              <div className={i === 0 ? 'border-t border-border' : ''}>
                <Link
                  href={item.link.url}
                  target={item.link.newTab ? '_blank' : undefined}
                  rel={item.link.newTab ? 'noopener noreferrer' : undefined}
                  onClick={toggleMenu}
                  className="block px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  {item.link.label}
                </Link>
              </div>
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};
