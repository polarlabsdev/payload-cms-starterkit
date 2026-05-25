import React from 'react';
import Image, { ImageProps } from 'next/image';
import type { Media } from '@/payload-types';
import { getOptimizedImageProps, type ImageContext } from '@/lib/imageUtils';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'width' | 'height' | 'alt'> {
  media: Media;
  context: ImageContext;
  className?: string;
  defaultAlt?: string;
}

/**
 * Optimized Image component that automatically uses the best image size from PayloadCMS
 * and applies focal point positioning
 * @param defaultAlt - Optional fallback alt text when media.alt is not provided
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  media,
  context,
  className,
  defaultAlt,
  ...props
}) => {
  const imageProps = getOptimizedImageProps(media, context, props.priority || false, defaultAlt);

  // When using fill prop, don't pass width and height
  const imagePropsToPass = props.fill
    ? {
        src: imageProps.src,
        sizes: imageProps.sizes,
        priority: imageProps.priority,
      }
    : {
        src: imageProps.src,
        width: imageProps.width,
        height: imageProps.height,
        sizes: imageProps.sizes,
        priority: imageProps.priority,
      };

  return (
    <Image
      {...imagePropsToPass}
      alt={imageProps.alt}
      {...props}
      className={cn(className)}
      style={{
        ...imageProps.style,
        ...props.style,
      }}
    />
  );
};

export default OptimizedImage;
