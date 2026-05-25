import React from 'react';
import { StandardContentBlock, Media } from '@/payload-types';
import { Skeleton } from '@/components/ui/Skeleton';
import { BRAND_COLORS, TAILWIND_THEME_COLORS } from '@/lib/colors';
import { HighlightedTextHeader } from '@/fields/highlightedTextHeader/HighlightedTextHeader';
import { CustomLink } from '@/fields/link/CustomLink';
import { RichText } from '@/components/RichText';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { cn } from '@/lib/utils';
import type { CustomLinkType } from '@/fields/link/config';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

const StandardContentBlockSkeleton: React.FC = () => (
  <div className="h-96 w-full">
    <Skeleton className="h-full w-full" />
  </div>
);

export const StandardContent: React.FC<StandardContentBlock> = (props) => {
  const {
    themeMode,
    backgroundColor,
    backgroundOverlay,
    backgroundImage,
    imagePosition = 'right',
    header,
    content,
    buttons,
    image,
  } = props;

  // Check if we have required data
  if (!header?.text || !image) {
    return <StandardContentBlockSkeleton />;
  }

  const backgroundImageUrl = typeof backgroundImage === 'object' ? backgroundImage?.url : null;
  const contentImageUrl = typeof image === 'object' ? image?.url : null;

  // Check if we have a valid content image
  if (!contentImageUrl) {
    return <StandardContentBlockSkeleton />;
  }

  // Determine background styling based on whether there's a background image
  const hasBackgroundImage = !!backgroundImageUrl;
  const overlayColor = hasBackgroundImage
    ? BRAND_COLORS[backgroundOverlay as keyof typeof BRAND_COLORS] || BRAND_COLORS.Purple
    : undefined;
  const backgroundColorClass = !hasBackgroundImage
    ? TAILWIND_THEME_COLORS[backgroundColor as keyof typeof TAILWIND_THEME_COLORS] ||
      'bg-background'
    : undefined;

  // Parse header level as number
  const headerLevel = parseInt(header.level) as 1 | 2 | 3 | 4 | 5 | 6;

  // Determine theme class based on themeMode
  const themeClass = themeMode && themeMode !== 'inherit' ? themeMode : undefined;

  // Content and image order classes based on imagePosition
  const isImageLeft = imagePosition === 'left';
  const contentOrderClass = isImageLeft ? 'lg:order-2' : 'lg:order-1';
  const imageOrderClass = isImageLeft ? 'lg:order-1' : 'lg:order-2';

  return (
    <section
      className={cn(
        'relative w-full py-16 lg:py-24',
        !hasBackgroundImage && backgroundColorClass,
        themeClass,
      )}
    >
      {/* Background with image and color overlay */}
      {hasBackgroundImage && (
        <div className="absolute inset-0">
          <OptimizedImage
            media={backgroundImage as Media}
            context="full-width"
            defaultAlt="Background image"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 opacity-85" style={{ backgroundColor: overlayColor }} />
        </div>
      )}

      {/* Content */}
      <div className="container relative z-10">
        <div className="mx-auto flex w-full flex-col gap-10 sm:w-[80%] lg:w-full lg:flex-row lg:items-center lg:gap-12">
          {/* Text Content Container */}
          <div
            className={cn(
              'order-2 flex-1 space-y-6 text-center lg:justify-start lg:text-start',
              contentOrderClass,
            )}
          >
            {/* Header */}
            <HighlightedTextHeader
              text={header.text}
              highlightColor={header.highlightColor as keyof typeof BRAND_COLORS}
              textColor={header.textColor as keyof typeof BRAND_COLORS}
              level={headerLevel}
            />

            {/* Content */}
            {content && (
              <div className="prose prose-base text-foreground xl:prose-lg">
                <RichText data={content as SerializedEditorState} />
              </div>
            )}

            {/* Buttons */}
            {buttons && buttons.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {buttons.map((button, index) => (
                  <CustomLink key={index} buttonSize="md" link={button.link as CustomLinkType} />
                ))}
              </div>
            )}
          </div>

          {/* Image Container */}
          <div className={cn('order-1 flex flex-1 justify-center', imageOrderClass)}>
            <div className="relative w-full">
              <div className="relative max-h-[36rem] min-h-80 w-full overflow-hidden rounded-lg shadow-lg">
                <OptimizedImage
                  media={image as Media}
                  context="inline"
                  defaultAlt="Content image"
                  className="h-full max-h-[36rem] min-h-80 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
