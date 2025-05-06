import {
  JSXConvertersFunction,
  RichText as RichTextConverter,
} from '@payloadcms/richtext-lexical/react';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedInlineBlockNode,
} from '@payloadcms/richtext-lexical';
import { ButtonBlock } from '@/payload-types';
import { buttonConverter } from './converters/button';

// NOTE: This file needs to be customized to use custom blocks in the lexical editor
// The SerializedBlockNode type needs to be updated to include the custom block types (e.g. SerializedBlockNode<CustomBlockType>)
// then the jsxConverter function needs to be updated to include the custom block renders in the blocks object
// (e.g. blocks: { CustomBlockType: <CustomBlock /> })
// https://www.youtube.com/watch?v=7WCxzWIVVDY <- this video explains how to do all this
// https://payloadcms.com/docs/rich-text/converting-jsx#converting-lexical-blocks

type NodeTypes = DefaultNodeTypes | SerializedBlockNode | SerializedInlineBlockNode<ButtonBlock>;

type RichTextProps = {
  data: SerializedEditorState;
} & React.HTMLAttributes<HTMLDivElement>;

const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {},
  inlineBlocks: {
    button: buttonConverter,
  },
});

export const RichText: React.FC<RichTextProps> = (props) => {
  return (
    <RichTextConverter
      {...props}
      // @ts-expect-error Payload bug: inline-block converters are not properly typed
      // There seems to be some kind of bug with payload, there was a similar one fixed in 3.15
      // but it seems to be only for blocks not inline-blocks
      converters={jsxConverter}
    />
  );
};
