import { PortalDataComponent } from '@/blocks/PortalDataBlock';
import { PortalDataBlock } from '@/payload-types';
import { SerializedInlineBlockNode } from '@payloadcms/richtext-lexical';
import { JSXConverter } from '@payloadcms/richtext-lexical/react';

export const portalDataConverter: JSXConverter<SerializedInlineBlockNode<PortalDataBlock>> = ({
  node,
}) => {
  const { portalField, defaultText, renderAs } = node.fields;
  return (
    <PortalDataComponent portalField={portalField} defaultText={defaultText} renderAs={renderAs} />
  );
};
