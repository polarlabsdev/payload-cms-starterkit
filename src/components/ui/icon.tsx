'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { BRAND_COLORS, BrandColorKey } from '@/lib/colors';
import { useTheme } from '@/providers/ThemeProvider';

const iconSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl', // New size automatically available in type
} as const;

const backgroundSizeClasses = {
  none: '',
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
  xl: 'h-20 w-20',
  '2xl': 'h-24 w-24', // New size automatically available in type
} as const;

// Legacy size classes for backward compatibility
const legacySizeClasses = {
  sm: 'h-8 w-8 text-base',
  md: 'h-12 w-12 text-2xl',
  lg: 'h-16 w-16 text-3xl',
  xl: 'h-20 w-20 text-4xl',
} as const;

const borderRadiusClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

export interface IconProps {
  iconName: string;
  backgroundColor?: BrandColorKey;
  iconColor?: BrandColorKey;
  iconColorDark?: BrandColorKey;
  borderRadius?: keyof typeof borderRadiusClasses;
  iconSize?: keyof typeof iconSizeClasses;
  backgroundSize?: keyof typeof backgroundSizeClasses;
  /** @deprecated Use iconSize and backgroundSize instead */
  size?: keyof typeof legacySizeClasses;
  align?: 'start' | 'center' | 'end';
  className?: string;
  iconClassName?: string;
}

export const Icon: React.FC<IconProps> = ({
  iconName,
  backgroundColor,
  iconColor,
  iconColorDark,
  borderRadius = 'full',
  iconSize,
  align = 'center',
  backgroundSize,
  size = 'lg', // Legacy fallback
  className,
  iconClassName,
}) => {
  const { theme } = useTheme();
  const [textColor, setTextColor] = React.useState<string | undefined>(undefined);
  const bgColor = backgroundColor ? BRAND_COLORS[backgroundColor] : undefined;

  React.useEffect(() => {
    if (!theme) return;

    if (iconColor && !iconColorDark) {
      // Only light color provided
      setTextColor(BRAND_COLORS[iconColor]);
    } else if (iconColor && iconColorDark) {
      // Both colors provided, use theme to decide
      setTextColor(theme === 'dark' ? BRAND_COLORS[iconColorDark] : BRAND_COLORS[iconColor]);
    } else if (iconColorDark && !iconColor) {
      // Only dark color provided (edge case)
      setTextColor(BRAND_COLORS[iconColorDark]);
    } else {
      setTextColor(undefined);
    }
  }, [theme, iconColor, iconColorDark]);

  // If no background is set, apply border radius only if explicitly provided
  const shouldApplyBorderRadius = backgroundColor || borderRadius !== 'full';

  // Determine size classes - use new props if available, fallback to legacy
  const useNewSizeSystem = iconSize || backgroundSize;
  const finalIconSize = iconSize || (useNewSizeSystem ? 'lg' : undefined);
  const finalBackgroundSize = backgroundSize || (useNewSizeSystem ? 'none' : undefined);

  return (
    <div
      className={cn(
        'flex items-center',
        align === 'start' ? 'justify-start' : align === 'end' ? 'justify-end' : 'justify-center',
        useNewSizeSystem && finalBackgroundSize
          ? backgroundSizeClasses[finalBackgroundSize]
          : legacySizeClasses[size],
        shouldApplyBorderRadius ? borderRadiusClasses[borderRadius] : '',
        className,
      )}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <i
        className={cn(
          `ri-${iconName} font-normal`,
          useNewSizeSystem && finalIconSize ? iconSizeClasses[finalIconSize] : '',
          iconClassName,
        )}
        style={{ color: textColor }}
      />
    </div>
  );
};
