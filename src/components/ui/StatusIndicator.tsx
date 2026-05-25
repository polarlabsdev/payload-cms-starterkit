import React from 'react';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/Spinner';
import { Icon } from '@/components/ui/Icon';

export type Variant = 'default' | 'info' | 'success' | 'error' | 'loading' | 'partial';

export type StatusIndicatorProps = {
  show?: boolean;
  text?: React.ReactNode;
  variant?: Variant;
  background?: boolean;
  border?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  spinner?: boolean;
  iconName?: string;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  spinnerClassName?: string;
};

export const VARIANT_TEXT: Record<Variant, string> = {
  default: 'text-muted-foreground',
  info: 'text-secondary',
  success: 'text-success',
  error: 'text-destructive',
  loading: 'text-muted',
  partial: 'text-warning',
};

export const VARIANT_BACKGROUND: Record<Variant, string> = {
  default: 'bg-muted border-border',
  info: 'bg-secondary/10 border-secondary/30',
  success: 'bg-success/10 border-success/30',
  error: 'bg-destructive/10 border-destructive/30',
  loading: 'bg-muted border-border',
  partial: 'bg-warning/20 border-warning/50',
};

const ROUNDED_CLASSES: Record<'none' | 'sm' | 'md' | 'lg' | 'full', string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

const SPACING_CLASSES: Record<'none' | 'sm' | 'md' | 'lg', { gap: string; padding: string }> = {
  none: { gap: 'gap-0', padding: 'p-0' },
  sm: { gap: 'gap-1.5', padding: 'px-2 py-0.5' },
  md: { gap: 'gap-3', padding: 'px-3 py-1.5' },
  lg: { gap: 'gap-4', padding: 'px-4 py-2' },
};

export const DEFAULT_ICONS: Record<Variant, string | null> = {
  default: null,
  info: 'information-line',
  success: 'checkbox-circle-line',
  error: 'close-circle-line',
  loading: null,
  partial: 'subtract-line',
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  show = true,
  text,
  variant = 'default',
  background = false,
  rounded = 'md',
  spacing = 'md',
  spinner,
  border = false,
  iconName,
  className,
  textClassName,
  iconClassName,
  spinnerClassName,
}) => {
  if (!show) return null;

  const showSpinner = variant === 'loading' || spinner;
  const textCls = VARIANT_TEXT[variant];
  const defaultIconName = iconName ?? DEFAULT_ICONS[variant];
  const bgCls = background ? VARIANT_BACKGROUND[variant] : '';
  const roundedCls = ROUNDED_CLASSES[rounded];
  const spacingCls = SPACING_CLASSES[spacing];
  const borderCls = border ? 'border' : '';

  return (
    <div
      className={cn(
        'flex items-center',
        spacingCls.gap,
        spacingCls.padding,
        bgCls,
        roundedCls,
        borderCls,
        className,
      )}
      role={showSpinner ? 'status' : undefined}
      aria-live="polite"
    >
      {showSpinner ? (
        <Spinner className={cn('h-4 w-4', spinnerClassName)} />
      ) : defaultIconName ? (
        <Icon
          iconName={defaultIconName}
          iconSize="md"
          backgroundSize="none"
          iconClassName={cn(textCls, iconClassName)}
        />
      ) : null}
      {text != null && <span className={cn('text-sm', textCls, textClassName)}>{text}</span>}
    </div>
  );
};
