import React from 'react';
import { Link } from '@/i18n/navigation';

import {
  Button,
  itemsAlignClasses,
  justifyClasses,
  gapClasses,
  shapeClasses,
  sizeClasses,
  variantClasses,
  widthClasses,
} from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { CustomLinkType } from './config';
import { getLinkUrl } from './utils';

type CustomLinkProps = React.PropsWithChildren<{
  link: CustomLinkType;
  className?: string;
  style?: React.CSSProperties;
  renderAs?: 'button' | 'link';
  forceButtonVariant?: keyof typeof variantClasses;
  buttonSize?: keyof typeof sizeClasses;
  buttonWidth?: keyof typeof widthClasses;
  buttonShape?: keyof typeof shapeClasses;
  buttonItemsAlign?: keyof typeof itemsAlignClasses;
  buttonJustify?: keyof typeof justifyClasses;
  buttonGap?: keyof typeof gapClasses;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}>;

export const CustomLink: React.FC<CustomLinkProps> = ({
  link,
  className,
  style,
  renderAs = 'button',
  forceButtonVariant,
  buttonSize,
  buttonWidth,
  buttonShape,
  buttonItemsAlign,
  buttonJustify,
  buttonGap,
  onClick,
  children,
}) => {
  const { label = 'Placeholder', newTab, buttonType = 'link', buttonColor, textColor } = link;

  // Get the URL using our reusable utility
  const actualUrl = getLinkUrl(link);

  const target = newTab ? '_blank' : undefined;
  const rel = newTab ? 'noopener noreferrer' : undefined;

  if (renderAs === 'link') {
    return (
      <Link
        href={actualUrl}
        target={target}
        rel={rel}
        onClick={onClick}
        className={className}
        style={style}
        scroll={false}
      >
        {children || label}
      </Link>
    );
  }

  return (
    <Button
      asChild
      variant={forceButtonVariant || buttonType}
      className={cn(className)}
      size={buttonSize || 'md'}
      width={buttonWidth || 'auto'}
      shape={buttonShape || 'pill'}
      buttonColor={buttonColor}
      textColor={textColor}
      itemsAlign={buttonItemsAlign || 'center'}
      justify={buttonJustify || 'center'}
      gap={buttonGap || '2'}
      style={style}
      onClick={onClick}
    >
      <Link href={actualUrl} target={target} rel={rel} scroll={false}>
        {children || label}
      </Link>
    </Button>
  );
};
