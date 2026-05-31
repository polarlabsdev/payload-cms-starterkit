import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import Link from 'next/link';

interface ButtonBlockProps {
  label: string;
  variant: ButtonProps['variant'];
  size: ButtonProps['size'];
  shape: ButtonProps['shape'];
  url: string;
}

const ButtonBlock: React.FC<ButtonBlockProps> = ({ label, variant, size, shape, url }) => {
  return (
    <Button variant={variant} size={size} shape={shape} asChild>
      <Link href={url}>{label}</Link>
    </Button>
  );
};

export default ButtonBlock;
