'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  offset?: number; // offset for sticky headers
};

export const HashScrollHandler = ({ offset = 64 }: Props) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const scrollToTarget = (hash: string) => {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (!element) return;

      const top = element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    };

    // Intercept internal anchor clicks
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (!link) return;

      if (
        link.hash &&
        link.origin === window.location.origin &&
        link.pathname === window.location.pathname
      ) {
        e.preventDefault();
        window.history.pushState(null, '', link.hash);
        scrollToTarget(link.hash);
      }
    };

    // Scroll to hash if present
    if (window.location.hash) {
      scrollToTarget(window.location.hash);
    }

    window.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('click', handleLinkClick);
    };
  }, [pathname, offset]);

  return null; // This component is for side effects only
};
