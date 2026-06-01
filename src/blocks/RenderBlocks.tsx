import React, { Fragment } from 'react';

import type { Page } from '@/payload-types';
import { Hero } from './Hero';
import { StoryCards } from './StoryCards';
import { IconRow } from './IconRow';
import { StandardContent } from './StandardContentBlock';
import { WideImage } from './WideImageBlock';
import { ImageGridBlock as ImageGrid } from './ImageGridBlock';
import { SimpleRichText } from './SimpleRichTextBlock';
import { YoutubeEmbed } from './YoutubeEmbed';
import { InfoBlockComponent } from './InfoBlock/InfoBlock';
import { convertTitleToSlug } from '@/lib/utils';

const blockComponents = {
  hero: Hero,
  'story-cards': StoryCards,
  'icon-row': IconRow,
  'standard-content': StandardContent,
  'wide-image': WideImage,
  'image-grid': ImageGrid,
  'simple-rich-text': SimpleRichText,
  'youtube-embed': YoutubeEmbed,
  'info-block': InfoBlockComponent,
};

export const RenderBlocks: React.FC<{
  blocks: Page['layout'];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          // 1. Tell TS exactly what the block structure looks like
          const { blockType, id, blockName } = block;

          // 2. Validate that blockType is actually a valid key of our component map
          const isValidBlock = blockType in blockComponents;

          if (isValidBlock) {
            // 3. Cast the blockType to the specific keys of your object
            const type = blockType as keyof typeof blockComponents;
            const Block = blockComponents[type];

            const anchorId = blockName ? convertTitleToSlug(blockName) : (id as string);

            return (
              <section key={id || index} id={anchorId}>
                {/* @ts-expect-error - Block components accept disableInnerContainer prop */}
                <Block {...block} disableInnerContainer />
              </section>
            );
          }

          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
