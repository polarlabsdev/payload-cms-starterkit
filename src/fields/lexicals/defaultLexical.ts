import { Config } from 'payload';
import {
  AlignFeature,
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical';
import { ButtonInlineBlock } from '@/blocks/ButtonInline/config';
import { MediaInlineBlock } from '@/blocks/MediaInline/config';
import { FloatingMediaBlock } from '@/blocks/FloatingMedia/config';
import { InlineItemBlock } from '@/blocks/InlineItemBlock/config';
import { InlineYoutubeEmbedBlock } from '@/blocks/InlineYoutubeEmbed/config';

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: () => {
    return [
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      AlignFeature(),
      ParagraphFeature(),
      HeadingFeature({
        enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
      }),
      UnorderedListFeature(),
      OrderedListFeature(),
      LinkFeature({
        // In the future if Payload fixing their type extensibility we could use CustomLink
        // here. But for now if you don't use their exact fields in the converter typescript has
        // a heart attack.
        fields: ({ defaultFields }) => {
          return [...defaultFields.filter((field) => field.name !== 'linkType')];
        },
      }),
      BlocksFeature({
        inlineBlocks: [ButtonInlineBlock],
        blocks: [
          MediaInlineBlock,
          FloatingMediaBlock,
          InlineItemBlock,
          InlineYoutubeEmbedBlock,
        ],
      }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ];
  },
});
