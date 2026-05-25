'use client';

import React, { Fragment } from 'react';
import Image from 'next/image';
import { Media } from '@/payload-types';
import { useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton';
import { ThemeAwareImageType } from './config';

interface ThemeAwareImageProps {
  image?: ThemeAwareImageType | null;
  width?: number;
  height?: number;
  defaultAlt?: string;
  className?: string;
  skeletonClassName?: string;
  priority?: boolean;
}

export const ThemeAwareImage: React.FC<ThemeAwareImageProps> = ({
  image,
  width,
  height,
  defaultAlt,
  className,
  skeletonClassName,
  priority,
}) => {
  const { theme } = useTheme();
  const [imageToRender, setImageToRender] = React.useState<Media | null>(null);
  const imageAlt = imageToRender?.alt || defaultAlt || 'Image';

  React.useEffect(() => {
    if (theme && image) {
      setImageToRender(theme === 'dark' ? (image.dark as Media) : (image.light as Media));
    }
  }, [theme, image]);

  if (!imageToRender || !theme) {
    return <Skeleton className={cn('h-full w-full', skeletonClassName)} />;
  }

  return (
    <Fragment>
      {imageToRender.url ? (
        <Image
          src={imageToRender.url}
          alt={imageAlt}
          width={width || imageToRender.width || 100}
          height={height || imageToRender.height || 100}
          className={cn(className)}
          priority={priority}
          unoptimized
        />
      ) : (
        <span>{imageAlt}</span>
      )}
    </Fragment>
  );
};
