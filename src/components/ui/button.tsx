import * as React from 'react';
import { Slot as SlotPrimitive } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { BRAND_COLORS, type BrandColorKey } from '@/lib/colors';

// Be aware that changing the keys in this object is going to trigger migration changes
// as there are some fields like linkFields that reference these keys directly.
export const variantClasses = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
  ghost: 'hover:bg-foreground/5',
  link: 'text-foreground hover:underline underline-offset-8 decoration-2 decoration-foreground p-0',
  brand: '', // Will be dynamically overridden with brand colors
};

export const sizeClasses = {
  default: 'px-4 py-3 text-xs 2xl:text-sm', // sm
  xs: 'px-3 py-2 text-xs',
  sm: 'px-4 py-3 text-xs 2xl:text-sm',
  md: 'px-5 py-3 text-sm 2xl:text-base',
  lg: 'px-6 py-4 text-base 2xl:text-lg',
  icon: 'w-9 h-9',
  'icon-lg': 'w-12 h-12',
};

export const shapeClasses = {
  default: '',
  roundedSmall: 'rounded-sm',
  roundedMedium: 'rounded-md',
  roundedLarge: 'rounded-lg',
  pill: 'rounded-full',
};

export const widthClasses = {
  auto: '',
  full: 'block text-center',
  wide: 'w-full',
};

export const itemsAlignClasses = {
  default: 'items-center',
  center: 'items-center',
  start: 'items-start',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
};

export const justifyClasses = {
  default: 'justify-center',
  center: 'justify-center',
  start: 'justify-start',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export const gapClasses = {
  default: 'gap-2',
  none: '',
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '6': 'gap-6',
  '8': 'gap-8',
};

export const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
};

export const borderColorClasses = {
  none: '',
  default: 'border-border',
  primary: 'border-primary',
  secondary: 'border-secondary',
};

export const backgroundColorClasses = {
  none: '',
  default: 'bg-background',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
};

export const hoverColorClasses = {
  none: '',
  default: 'hover:bg-muted',
  primary: 'hover:bg-primary',
  secondary: 'hover:bg-secondary',
  destructive: 'hover:bg-destructive hover:text-destructive-foreground',
};

const buttonVariants = cva(
  'inline-flex cursor-pointer whitespace-nowrap text-sm font-semibold transition-colors focus:outline-none focus-visible:outline-none active:outline-none outline-none border-0 focus:ring-0 focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: variantClasses,
      size: sizeClasses,
      shape: shapeClasses,
      width: widthClasses,
      itemsAlign: itemsAlignClasses,
      justify: justifyClasses,
      gap: gapClasses,
      shadow: shadowClasses,
      borderColor: borderColorClasses,
      backgroundColor: backgroundColorClasses,
      hoverColor: hoverColorClasses,
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'pill',
      width: 'auto',
      itemsAlign: 'default',
      justify: 'default',
      gap: 'default',
      shadow: 'none',
      borderColor: 'none',
      backgroundColor: 'none',
      hoverColor: 'none',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  buttonColor?: BrandColorKey;
  textColor?: BrandColorKey;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      width,
      itemsAlign,
      justify,
      gap,
      shadow,
      borderColor,
      backgroundColor,
      hoverColor,
      buttonColor,
      textColor,
      asChild = false,
      style,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? SlotPrimitive.Slot : 'button';

    // Handle brand variant styling
    let brandStyle: React.CSSProperties = {};
    if (variant === 'brand') {
      const bgColor = buttonColor ? BRAND_COLORS[buttonColor] : BRAND_COLORS.Teal;
      const color = textColor ? BRAND_COLORS[textColor] : BRAND_COLORS.White;
      brandStyle = {
        backgroundColor: bgColor,
        color: color,
        ...style,
      };
    }

    return (
      <Comp
        className={cn(
          'button-component',
          buttonVariants({
            variant,
            size: variant === 'link' ? null : size,
            shape,
            width,
            itemsAlign,
            justify,
            gap,
            shadow,
            borderColor,
            backgroundColor,
            hoverColor,
            className,
          }),
        )}
        style={variant === 'brand' ? brandStyle : style}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
