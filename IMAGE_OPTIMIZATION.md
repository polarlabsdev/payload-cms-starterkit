# Image Optimization Guide

This project has been optimized to use PayloadCMS's image sizing capabilities and focal points with Next.js images for better performance and user experience.

## Key Improvements

### 1. Automatic Image Size Selection

- Images now automatically use the most appropriate size from PayloadCMS's generated image variants
- Reduces bandwidth usage and improves loading times
- Available sizes: thumbnail (300px), square (500x500px), small (600px), medium (900px), large (1400px), xlarge (1920px)

### 2. Focal Point Support

- Images now respect the focal point set in PayloadCMS admin
- Uses CSS `object-position` to maintain focus on the important part of the image when cropped
- Automatically calculates percentages from PayloadCMS `focalX` and `focalY` coordinates

### 3. Responsive Image Sizing

- Proper `sizes` attribute for different contexts (hero, card, inline, etc.)
- Optimized for various screen sizes and use cases

## Usage

### Option 1: Use the OptimizedImage Component (Recommended)

```tsx
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import type { Media } from '@/payload-types';

const MyComponent = ({ image }: { image: Media }) => {
  return (
    <OptimizedImage
      media={image}
      context="card" // or 'hero', 'inline', 'thumbnail', 'full-width', 'floating'
      fill // or any other Next.js Image props
      className="object-cover"
    />
  );
};
```

### Option 2: Use the Utility Functions

```tsx
import { getOptimizedImageProps } from '@/lib/imageUtils';
import Image from 'next/image';
import type { Media } from '@/payload-types';

const MyComponent = ({ media }: { media: Media }) => {
  const imageProps = getOptimizedImageProps(media, 'card', false);

  return (
    <Image
      src={imageProps.src}
      width={imageProps.width}
      height={imageProps.height}
      sizes={imageProps.sizes}
      priority={imageProps.priority}
      alt={imageProps.alt}
      className="object-cover"
      style={imageProps.style} // This includes focal point positioning
    />
  );
};
```

## Available Contexts

- `hero`: Large banner images (50vw on desktop, 100vw on mobile)
- `card`: Card/thumbnail images in grids (33vw on desktop, 100vw on mobile)
- `inline`: Images within content (constrained to content width)
- `thumbnail`: Small preview images (150-300px)
- `full-width`: Full viewport width images
- `floating`: Images that break out of containers with complex sizing

## Utility Functions

### `getBestImageSize(media, targetWidth)`

Returns the URL of the best image size for a given width requirement.

### `getFocalPointPosition(media)`

Calculates CSS `object-position` value from PayloadCMS focal point data.

### `getResponsiveSizes(context)`

Returns appropriate `sizes` string for Next.js Image component.

### `getOptimalDimensions(media, context, containerWidth?)`

Calculates optimal width and height for an image based on context.

### `getOptimizedImageProps(media, context, priority?, containerWidth?)`

Returns complete props object for Next.js Image component with all optimizations applied.

## PayloadCMS Configuration

The Media collection is configured with:

- Focal point selection enabled (`focalPoint: true`)
- Multiple image sizes generated automatically
- Proper `position: 'centre'` for all sizes to use focal point

## Next.js Configuration

Added to `next.config.mjs`:

- WebP and AVIF format support
- Optimized device and image sizes
- Proper security policies for SVGs

## Performance Benefits

1. **Reduced Bandwidth**: Serves appropriately sized images instead of always using originals
2. **Better UX**: Focal points ensure important parts of images remain visible when cropped
3. **Faster Loading**: Smaller file sizes lead to faster page loads
4. **SEO Improvements**: Better Core Web Vitals scores due to optimized images
5. **Responsive Design**: Images adapt properly to different screen sizes

## Migration Notes

All existing Image components have been updated to use these optimizations. New components should use the `OptimizedImage` component or the utility functions for consistency.
