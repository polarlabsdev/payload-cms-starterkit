import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { type ThemeColorKey } from '@/lib/colors';

export const alertVariantClasses = {
  filled: '',
  outlined: 'border border-solid',
  ghost: 'border-0',
};

const alertVariants = cva(
  'relative w-full rounded-sm px-4 py-3 text-sm [&>svg+div]:translate-y-[-0.2rem] [&>svg]:absolute [&>svg]:start-5 [&>svg]:top-4 [&>svg~*]:ps-10',
  {
    variants: {
      variant: alertVariantClasses,
    },
    defaultVariants: {
      variant: 'outlined',
    },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  color?: ThemeColorKey;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, color = 'muted', ...props }, ref) => {
    // Generate color classes based on variant and color
    const getColorClasses = () => {
      if (!color) return '';

      switch (variant) {
        case 'filled':
          return `bg-${color} text-${color}-foreground [&>svg]:text-${color}-foreground`;
        case 'outlined':
          return `border-${color} text-${color} [&>svg]:text-${color}`;
        case 'ghost':
          return `text-${color} [&>svg]:text-${color}`;
        default:
          return `border-${color} text-${color} [&>svg]:text-${color}`;
      }
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), getColorClasses(), className)}
        {...props}
      />
    );
  },
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
