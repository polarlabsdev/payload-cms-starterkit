import React from 'react';
import { WideImageBlock, Media } from '@/payload-types';
import { Skeleton } from '@/components/ui/Skeleton';
import { BRAND_COLORS, TAILWIND_THEME_COLORS } from '@/lib/colors';
import { HighlightedTextHeader } from '@/fields/highlightedTextHeader/HighlightedTextHeader';
import { RichText } from '@/components/RichText';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

const WideImageBlockSkeleton: React.FC = () => (
  <div className="h-96 w-full">
    <Skeleton className="h-full w-full" />
  </div>
);

export const WideImage: React.FC<WideImageBlock> = (props) => {
  const { backgroundColor, header, content, image } = props;

  // Check if we have required data
  if (!header?.text || !image) {
    return <WideImageBlockSkeleton />;
  }

  const imageUrl = typeof image === 'object' ? image?.url : null;

  // Check if we have a valid image
  if (!imageUrl) {
    return <WideImageBlockSkeleton />;
  }

  // Get background color class
  const backgroundColorClass =
    TAILWIND_THEME_COLORS[backgroundColor as keyof typeof TAILWIND_THEME_COLORS] || 'bg-background';

  // Parse header level as number
  const headerLevel = parseInt(header.level) as 1 | 2 | 3 | 4 | 5 | 6;

  return (
    <section className={cn('relative z-10 w-full py-16 lg:py-20', backgroundColorClass)}>
      <div className="container">
        {/* Wide Image with Overlaid Header */}
        <div className="relative w-full overflow-hidden rounded-lg">
          <div className="relative aspect-[4/3] w-full md:aspect-[16/9]">
            <OptimizedImage
              media={image as Media}
              context="full-width"
              defaultAlt="Wide banner image"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Rich Text Content Below Image */}
        {content && (
          <div className="relative z-20 -mt-8 lg:max-w-[75%]">
            <HighlightedTextHeader
              text={header.text}
              highlightColor={header.highlightColor as keyof typeof BRAND_COLORS}
              textColor={header.textColor as keyof typeof BRAND_COLORS}
              level={headerLevel}
            />

            <div className="prose prose-base mt-8 w-full max-w-full text-foreground lg:prose-lg 2xl:prose-xl md:text-base xl:text-lg">
              <RichText data={content as SerializedEditorState} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
