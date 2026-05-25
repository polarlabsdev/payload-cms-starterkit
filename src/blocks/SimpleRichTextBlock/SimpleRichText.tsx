import React from 'react';
import { SimpleRichTextBlock } from '@/payload-types';
import { TAILWIND_THEME_COLORS, TailwindThemeColorKey } from '@/lib/colors';
import { cn } from '@/lib/utils';
import { RichText } from '@/components/RichText';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

export const SimpleRichText: React.FC<SimpleRichTextBlock> = (props) => {
  const { backgroundColor, title, body } = props;

  // Return null if no content
  if (!body) {
    return null;
  }

  const bgClass = TAILWIND_THEME_COLORS[backgroundColor as TailwindThemeColorKey];

  return (
    <section className={cn('lg:py-18 py-14', bgClass)}>
      <div className="container">
        {/* Title */}
        {title && (
          <div className="mx-auto mb-8 max-w-3xl text-center lg:max-w-3xl 2xl:max-w-4xl">
            <h2 className="font-header text-4xl font-extrabold text-foreground md:text-5xl">
              {title}
            </h2>
          </div>
        )}

        {/* Rich Text Body */}
        {body && (
          <div className="mx-auto max-w-3xl lg:max-w-3xl 2xl:max-w-4xl">
            <div className="prose prose-base max-w-none text-foreground md:prose-lg 2xl:prose-xl prose-headings:font-header prose-headings:font-extrabold">
              <RichText data={body as SerializedEditorState} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
