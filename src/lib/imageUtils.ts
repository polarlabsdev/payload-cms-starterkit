import type { Media } from '@/payload-types';

// Context configuration map - single source of truth for all image settings
const IMAGE_CONTEXT_CONFIG = {
  hero: {
    mediaSize: 'lg' as const,
    responsiveSizes: '(max-width: 768px) 100vw, 50vw',
    contextWidth: 1280,
  },
  card: {
    mediaSize: 'sm' as const,
    responsiveSizes: '(max-width: 768px) 100vw, 33vw',
    contextWidth: 640,
  },
  inline: {
    mediaSize: 'md' as const,
    responsiveSizes: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px',
    contextWidth: 960,
  },
  thumbnail: {
    mediaSize: 'xs-square' as const,
    responsiveSizes: '(max-width: 768px) 150px, 320px',
    contextWidth: 320,
  },
  'full-width': {
    mediaSize: 'xl' as const,
    responsiveSizes: '100vw',
    contextWidth: 1920,
  },
  floating: {
    mediaSize: 'md' as const,
    responsiveSizes:
      '(max-width: 640px) 100vw, (max-width: 768px) 40vw, (max-width: 1024px) calc(40vw + 5rem), (max-width: 1280px) calc(40vw + 6rem), calc(40vw + 7rem)',
    contextWidth: 960,
  },
} as const;

export type ImageContext = keyof typeof IMAGE_CONTEXT_CONFIG;

/**
 * Gets the media size name for a given context
 */
export const getMediaSize = (context: ImageContext): string => {
  return IMAGE_CONTEXT_CONFIG[context].mediaSize;
};

/**
 * Gets responsive sizes string for a given context
 */
export const getResponsiveSizes = (context: ImageContext): string => {
  return IMAGE_CONTEXT_CONFIG[context].responsiveSizes;
};

/**
 * Gets the context width for calculating dimensions
 */
export const getContextWidth = (context: ImageContext): number => {
  return IMAGE_CONTEXT_CONFIG[context].contextWidth;
};

/**
 * Gets the best image size URL for a given media size name
 */
export const getBestImageSize = (media: Media, mediaSize: string): string => {
  if (!media.sizes) {
    return media.url || '';
  }

  const sizeKey = mediaSize as keyof typeof media.sizes;
  const sizeData = media.sizes[sizeKey];

  if (sizeData?.url) {
    return sizeData.url;
  }

  // Fallback to original
  return media.url || '';
};

/**
 * Calculates object-position CSS value from PayloadCMS focal point data
 */
export const getFocalPointPosition = (media: Media): string | undefined => {
  if (!media.focalX || !media.focalY || !media.width || !media.height) {
    return undefined;
  }

  return `${media.focalX}% ${media.focalY}%`;
};

/**
 * Gets optimal dimensions for an image based on context
 */
export const getOptimalDimensions = (
  media: Media,
  context: ImageContext,
): { width: number; height: number } => {
  const contextWidth = getContextWidth(context);
  const mediaSize = getMediaSize(context);
  const sizeKey = mediaSize as keyof NonNullable<typeof media.sizes>;
  const sizeData = media.sizes?.[sizeKey];

  // Use actual pre-sized image dimensions when available
  if (sizeData?.width && sizeData?.height) {
    return {
      width: sizeData.width,
      height: sizeData.height,
    };
  }

  // For square variants, return square dimensions
  if (mediaSize.includes('square')) {
    return {
      width: contextWidth,
      height: contextWidth,
    };
  }

  // For non-square, maintain original aspect ratio
  const originalAspectRatio = media.width && media.height ? media.width / media.height : 16 / 9;

  return {
    width: contextWidth,
    height: Math.round(contextWidth / originalAspectRatio),
  };
};

/**
 * Complete image optimization props for Next.js Image component
 */
export const getOptimizedImageProps = (
  media: Media,
  context: ImageContext,
  priority = false,
  defaultAlt?: string,
) => {
  const mediaSize = getMediaSize(context);
  const src = getBestImageSize(media, mediaSize);
  const sizes = getResponsiveSizes(context);
  const { width, height } = getOptimalDimensions(media, context);
  const objectPosition = getFocalPointPosition(media);

  // Use media alt text, fallback to defaultAlt, then empty string
  const altText = media.alt || defaultAlt || '';

  return {
    src,
    width,
    height,
    sizes,
    priority,
    alt: altText,
    style: objectPosition ? { objectPosition } : undefined,
  };
};
