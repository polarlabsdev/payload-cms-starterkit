import { InlineItemComponent } from '@/blocks/InlineItemBlock';
import { InlineItemBlock } from '@/payload-types';
import { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { JSXConverter } from '@payloadcms/richtext-lexical/react';
import type { CustomLinkType } from '@/fields/link/config';

export const inlineItemConverter: JSXConverter<SerializedBlockNode<InlineItemBlock>> = ({
  node,
}) => {
  const { title, description, iconName, itemVariant, link } = node.fields;
  return (
    <InlineItemComponent
      title={title}
      description={description || undefined}
      iconName={iconName}
      itemVariant={itemVariant || undefined}
      link={link as CustomLinkType | undefined}
    />
  );
};
