'use client';

import { useTheme } from '@/providers/ThemeProvider';
import { Button } from './ui/Button';
import { RiSunLine, RiMoonLine } from '@remixicon/react';
import { useEffect, useState } from 'react';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This useEffect hook sets the `mounted` state to true after the component has mounted on the client.
    // It ensures that theme-dependent content (like icons) is only rendered after the client-side rendering phase.
    // This prevents React hydration errors caused by mismatches between the server-rendered HTML and the client-rendered HTML.
    // Without this, the server might render one theme while the client renders another, leading to inconsistencies.
    setMounted(true);
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      shape="circle"
      onClick={() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
      }}
    >
      {mounted ? theme === 'light' ? <RiSunLine /> : <RiMoonLine /> : null}
    </Button>
  );
};
