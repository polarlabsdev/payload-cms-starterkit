import { PortalLogin } from '@/blocks/PortalLoginBlock';
import { PortalLoginBlock } from '@/payload-types';
import { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { JSXConverter } from '@payloadcms/richtext-lexical/react';

export const portalLoginConverter: JSXConverter<SerializedBlockNode<PortalLoginBlock>> = ({
  node,
}) => {
  return <PortalLogin {...node.fields} />;
};
