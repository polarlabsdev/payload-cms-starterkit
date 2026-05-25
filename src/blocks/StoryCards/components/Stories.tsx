import React from 'react';
import { StoryCardsBlock, Media, Story } from '@/payload-types';
import { CustomLink } from '@/fields/link/CustomLink';
import { CustomLinkType } from '@/fields/link';
import { RichText } from '@/components/RichText';
import { StoryPreview } from '@/components/stories/StoryPreview';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import {
  BRAND_COLORS,
  TAILWIND_THEME_COLORS,
  BrandColorKey,
  TailwindThemeColorKey,
} from '@/lib/colors';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface StoryCardProps {
  story: Story;
  color: BrandColorKey;
  textBackground: BrandColorKey;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, color, textBackground }) => {
  const textColor = BRAND_COLORS[color];
  const textBgColor = BRAND_COLORS[textBackground];

  // Extract data from story with null checks
  const thumbnail = story.thumbnail as Media;

  // Handle external vs internal links with defensive checks
  const storyLink = story.isExternalLink
    ? story.externalUrl || '#'
    : `/stories/${story.slug || ''}`;
  const linkTarget = story.isExternalLink ? '_blank' : undefined;
  const linkRel = story.isExternalLink ? 'noopener noreferrer' : undefined;

  // Create read more link to the story
  const readMoreLink: CustomLinkType = {
    url: storyLink,
    label: 'READ MORE →',
    newTab: Boolean(story.isExternalLink),
  };

  // Don't render if essential data is missing
  if (!story.title) {
    return null;
  }

  return (
    <div className="group relative flex h-[28rem] w-full flex-col justify-end overflow-hidden rounded-3xl bg-background text-foreground sm:h-[32rem] lg:h-[38rem]">
      {thumbnail?.url && (
        <OptimizedImage
          media={thumbnail}
          context="card"
          defaultAlt={story.title}
          fill
          className="object-cover opacity-65 transition-all duration-300 group-hover:opacity-85"
        />
      )}

      {/* Content */}
      <div
        className="relative z-10 p-8 text-start"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${textBgColor} 50%)`,
        }}
      >
        <h3
          className="line-clamp-5 text-2xl font-extrabold leading-tight sm:text-3xl"
          style={{ color: textColor }}
        >
          <Link
            href={storyLink}
            className="no-underline hover:underline"
            target={linkTarget}
            rel={linkRel}
          >
            {story.title}
          </Link>
        </h3>

        {story.summary && (
          <div
            className="my-3 line-clamp-4 text-sm leading-relaxed lg:text-base 2xl:text-lg"
            style={{ color: textColor }}
          >
            <RichText data={story.summary} />
          </div>
        )}

        <CustomLink link={readMoreLink} forceButtonVariant="link" style={{ color: textColor }}>
          READ MORE →
        </CustomLink>
      </div>
    </div>
  );
};

export const StoryCards: React.FC<StoryCardsBlock> = ({
  backgroundColor,
  variant = 'featured-cards',
  showTitle,
  title,
  stories,
  showButton,
  bottomButton,
}) => {
  const bgClass = TAILWIND_THEME_COLORS[backgroundColor as TailwindThemeColorKey];

  // Filter out stories that don't exist or aren't properly populated
  const validStories =
    stories?.filter((storyItem) => {
      const story = storyItem.story;
      // Check if story is a full Story object (not just a number ID)
      return story && typeof story === 'object' && 'id' in story && 'title' in story;
    }) || [];

  return (
    <section className={cn(`${bgClass} py-20 text-center`)}>
      <div className="container max-w-[80rem]">
        {/* Section Title */}
        {showTitle && title && (
          <h2 className="text-4xl font-extrabold text-foreground md:text-5xl">{title}</h2>
        )}

        {/* Stories Grid */}
        {validStories.length > 0 ? (
          <div className="my-10 flex flex-col items-stretch gap-4 lg:flex-row lg:items-start">
            {validStories.map((storyItem: StoryCardsBlock['stories'][0], index: number) => {
              const story = storyItem.story as Story;

              return (
                <div key={story.id || index} className="flex-1">
                  {variant === 'story-previews' ? (
                    <StoryPreview story={story} />
                  ) : (
                    <StoryCard
                      story={story}
                      color={storyItem.color as BrandColorKey}
                      textBackground={storyItem.textBackground as BrandColorKey}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="my-10 text-center text-foreground/60">
            <p>No stories available at this time.</p>
          </div>
        )}

        {/* Bottom Button */}
        {showButton && bottomButton && (
          <CustomLink link={bottomButton as CustomLinkType} buttonSize="lg" />
        )}
      </div>
    </section>
  );
};
