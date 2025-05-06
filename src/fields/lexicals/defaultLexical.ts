import { Config } from 'payload';
import {
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
import { ButtonBlock } from '@/blocks/Button/config';

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: () => {
    return [
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      ParagraphFeature(),
      HeadingFeature({
        enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
      }),
      UnorderedListFeature(),
      OrderedListFeature(),
      LinkFeature({
        // Once we support internal links we can remove this and
        // add the internal link resolver function to RichText
        fields: ({ defaultFields }) => {
          return [...defaultFields.filter((field) => field.name !== 'linkType')];
        },
      }),
      BlocksFeature({
        inlineBlocks: [ButtonBlock],
        blocks: [],
      }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ];
  },
});
