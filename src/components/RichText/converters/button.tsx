import { ButtonBlockComponent } from '@/blocks/Button';
import { ButtonBlock } from '@/payload-types';
import { SerializedInlineBlockNode } from '@payloadcms/richtext-lexical';
import { JSXConverter } from '@payloadcms/richtext-lexical/react';

export const buttonConverter: JSXConverter<SerializedInlineBlockNode<ButtonBlock>> = ({ node }) => {
  const { label, variant, size, shape, url } = node.fields;
  return (
    <ButtonBlockComponent label={label} variant={variant} size={size} shape={shape} url={url} />
  );
};
