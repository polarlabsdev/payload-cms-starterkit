import { Config } from 'payload';
import {
  BoldFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  StrikethroughFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical';

export const minimalLexical: Config['editor'] = lexicalEditor({
  features: () => {
    return [
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      LinkFeature(),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ];
  },
});
