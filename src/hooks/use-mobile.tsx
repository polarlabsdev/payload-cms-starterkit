import * as React from 'react';

const MOBILE_BREAKPOINT = 768; // Matches Tailwind's 'md' breakpoint (768px)

/**
 * In sidebar.tsx, the hook detects mobile screens to toggle between a persistent sidebar (desktop)
 * and an overlay sheet (mobile). This requires JavaScript state management—pure CSS responsive
 * utilities wouldn't suffice for showing/hiding interactive
 * elements like sheets or modals based on screen size.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}
