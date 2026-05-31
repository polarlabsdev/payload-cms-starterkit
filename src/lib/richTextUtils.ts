import {
  SerializedEditorState,
  SerializedElementNode,
  SerializedTextNode,
} from '@payloadcms/richtext-lexical/lexical';

// Checks if the given rich text content has any non-empty text nodes
export const hasRichTextContent = (richText: SerializedEditorState) => {
  return richText?.root?.children?.some((child) =>
    (child as SerializedElementNode).children?.some(
      (c) => (c as SerializedTextNode).text?.trim().length > 0,
    ),
  );
};

// Helper function to extract text content from Lexical editor JSON
export const extractTextFromLexical = (lexicalData: Record<string, unknown>): string => {
  if (!lexicalData || !lexicalData.root) return '';

  const extractText = (node: Record<string, unknown>): string => {
    if (!node) return '';

    let text = '';

    if (typeof node.text === 'string') {
      text += node.text;
    }

    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        if (typeof child === 'object' && child !== null) {
          text += extractText(child as Record<string, unknown>);
        }
      }
    }

    return text;
  };

  return extractText(lexicalData.root as Record<string, unknown>);
};
