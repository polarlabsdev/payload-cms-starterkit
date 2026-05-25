import { PartnerLogin } from '@/blocks/PartnerLoginBlock';
import { PartnerLoginBlock } from '@/payload-types';
import { SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { JSXConverter } from '@payloadcms/richtext-lexical/react';

export const partnerLoginConverter: JSXConverter<SerializedBlockNode<PartnerLoginBlock>> = ({
  node,
}) => {
  return <PartnerLogin {...node.fields} />;
};
