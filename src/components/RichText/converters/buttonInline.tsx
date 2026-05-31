import { ButtonInlineComponent } from '@/blocks/ButtonInline';
import { ButtonInlineBlock } from '@/payload-types';
import { SerializedInlineBlockNode } from '@payloadcms/richtext-lexical';
import { JSXConverter } from '@payloadcms/richtext-lexical/react';
import type { CustomLinkType } from '@/fields/link/config';

export const buttonInlineConverter: JSXConverter<SerializedInlineBlockNode<ButtonInlineBlock>> = ({
  node,
}) => {
  const { link } = node.fields;
  return <ButtonInlineComponent link={link as CustomLinkType} />;
};
