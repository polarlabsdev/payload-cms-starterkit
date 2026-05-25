import { Config } from 'payload';
import {
  AlignFeature,
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical';
import { ButtonInlineBlock } from '@/blocks/ButtonInline/config';
import { InlineItemBlock } from '@/blocks/InlineItemBlock/config';
import { PortalLoginBlock } from '@/blocks/PortalLoginBlock/config';
import { PartnerLoginBlock } from '@/blocks/PartnerLoginBlock/config';
import { PortalDataBlock } from '@/blocks/PortalDataBlock/config';

export const minimalLexical: Config['editor'] = lexicalEditor({
  features: () => {
    return [
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      AlignFeature(),
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
        inlineBlocks: [ButtonInlineBlock, PortalDataBlock],
        blocks: [InlineItemBlock, PortalLoginBlock, PartnerLoginBlock],
      }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ];
  },
});
