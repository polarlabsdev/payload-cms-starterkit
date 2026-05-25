import React from 'react';
import { cn } from '@/lib/utils';
import { BRAND_COLORS, BrandColorKey } from '@/lib/colors';

/**
 * HighlightedTextHeader Component
 *
 * Creates a multi-line text header with snug, rounded backgrounds that merge seamlessly
 * when text wraps to multiple lines. Uses box-shadow technique to create vertical padding
 * without affecting layout, and tight line-height to ensure background areas merge properly.
 *
 * @example
 * <HighlightedTextHeader
 *   text="Your highlighted header text that can wrap across multiple lines"
 *   highlightColor="Yellow"
 *   textColor="Black"
 *   level={2}
 * />
 */
export interface HighlightedTextHeaderProps {
  text: string;
  highlightColor: BrandColorKey;
  textColor: BrandColorKey;
  headerClassName?: string;
  contentClassName?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const HighlightedTextHeader: React.FC<HighlightedTextHeaderProps> = ({
  text,
  highlightColor,
  textColor,
  headerClassName,
  contentClassName,
  level = 2,
}) => {
  // Get colors from brand colors object
  const bgColor = BRAND_COLORS[highlightColor];
  const color = BRAND_COLORS[textColor];

  // Validate that colors exist
  if (!bgColor || !color) {
    console.warn(
      `HighlightedTextHeader: Invalid color key - highlightColor: ${highlightColor}, textColor: ${textColor}`,
    );
  }

  // Generate the box-shadow values using the background color
  const boxShadowValue = `0 0.35em 0 0 ${bgColor}, 0 -0.35em 0 0 ${bgColor}`;

  const baseClasses = cn(
    'text-4xl font-extrabold text-foreground md:text-5xl !leading-[1.35]',
    headerClassName,
  );
  const spanClasses = cn('decoration-clone inline rounded-lg px-3 font-header', contentClassName);

  const spanStyle = {
    backgroundColor: bgColor,
    color: color,
    boxShadow: boxShadowValue,
  };

  const content = (
    <span className={spanClasses} style={spanStyle}>
      {text}
    </span>
  );

  switch (level) {
    case 1:
      return <h1 className={baseClasses}>{content}</h1>;
    case 2:
      return <h2 className={baseClasses}>{content}</h2>;
    case 3:
      return <h3 className={baseClasses}>{content}</h3>;
    case 4:
      return <h4 className={baseClasses}>{content}</h4>;
    case 5:
      return <h5 className={baseClasses}>{content}</h5>;
    case 6:
      return <h6 className={baseClasses}>{content}</h6>;
    default:
      return <h2 className={baseClasses}>{content}</h2>;
  }
};
