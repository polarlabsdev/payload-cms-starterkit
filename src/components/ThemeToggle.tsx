'use client';

import { useTheme } from '@/providers/ThemeProvider';
import { Button } from './ui/button';
import { Icon } from '@/components/ui/icon';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export const ThemeToggle: React.FC = () => {
  const t = useTranslations('ThemeToggle');
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
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon-lg"
          shape="pill"
          onClick={() => {
            const newTheme = theme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
          }}
          className="bg-background"
        >
          {mounted ? (
            theme === 'light' ? (
              <Icon iconName="moon-fill" iconSize="xl" />
            ) : (
              <Icon iconName="sun-fill" iconSize="xl" />
            )
          ) : (
            <Icon iconName="sun-fill" iconSize="xl" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        {theme === 'light' ? t('toggleDark') : t('toggleLight')}
      </TooltipContent>
    </Tooltip>
  );
};
