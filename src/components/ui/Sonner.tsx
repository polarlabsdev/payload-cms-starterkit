'use client';

import * as React from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { Toaster as SonnerToaster } from 'sonner';

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <SonnerToaster
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        classNames: {
          toast: 'bg-background text-foreground border border-border shadow-lg',
          description: 'text-muted-foreground',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};
