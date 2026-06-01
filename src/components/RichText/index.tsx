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
import {
  ButtonInlineBlock,
  MediaInlineBlock,
  FloatingMediaBlock,
  InlineItemBlock,
  InlineYoutubeEmbedBlock,
} from '@/payload-types';
import { buttonInlineConverter } from './converters/buttonInline';
import { mediaInlineConverter } from './converters/mediaInline';
import { floatingMediaConverter } from './converters/floatingMedia';
import { inlineItemConverter } from './converters/inlineItem';
import { inlineYoutubeEmbedConverter } from './converters/inlineYoutubeEmbed';

// NOTE: This file needs to be customized to use custom blocks in the lexical editor
// The SerializedBlockNode type needs to be updated to include the custom block types (e.g. SerializedBlockNode<CustomBlockType>)
// then the jsxConverter function needs to be updated to include the custom block renders in the blocks object
// (e.g. blocks: { CustomBlockType: <CustomBlock /> })
// https://www.youtube.com/watch?v=7WCxzWIVVDY <- this video explains how to do all this
// https://payloadcms.com/docs/rich-text/converting-jsx#converting-lexical-blocks

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode
  | SerializedInlineBlockNode<ButtonInlineBlock>
  | SerializedBlockNode<MediaInlineBlock>
  | SerializedBlockNode<FloatingMediaBlock>
  | SerializedBlockNode<InlineItemBlock>
  | SerializedBlockNode<InlineYoutubeEmbedBlock>;

type RichTextProps = {
  data: SerializedEditorState;
} & React.HTMLAttributes<HTMLDivElement>;

const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    mediaInline: mediaInlineConverter,
    floatingMedia: floatingMediaConverter,
    inlineItem: inlineItemConverter,
    inlineYoutubeEmbed: inlineYoutubeEmbedConverter,
  },
  inlineBlocks: {
    buttonInline: buttonInlineConverter,
  },
});

export const RichText: React.FC<RichTextProps> = (props) => {
  return <RichTextConverter {...props} converters={jsxConverter} />;
};
