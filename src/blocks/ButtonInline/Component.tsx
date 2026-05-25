import React from 'react';
import { CustomLink } from '@/fields/link/CustomLink';
import type { CustomLinkType } from '@/fields/link/config';

interface ButtonInlineBlockProps {
  link: CustomLinkType;
}

const ButtonInlineBlock: React.FC<ButtonInlineBlockProps> = ({ link }) => {
  return <CustomLink className="no-underline" link={link} buttonSize="sm" />;
};

export default ButtonInlineBlock;
