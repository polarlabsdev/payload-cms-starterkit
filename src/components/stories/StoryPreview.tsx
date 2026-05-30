import React from 'react';
import { Story, Media } from '@/payload-types';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { extractTextFromLexical, hasRichTextContent } from '@/lib/richTextUtils';

type StoryPreviewProps = {
  story: Story;
  className?: string;
};

export const StoryPreview: React.FC<StoryPreviewProps> = ({ story, className }) => {
  const thumbnail = story.thumbnail as Media;
  const categories = Array.isArray(story.categories)
    ? story.categories.filter((cat) => typeof cat === 'object')
    : [];

  const storyLink = story.isExternalLink ? story.externalUrl || '#' : `/stories/${story.slug}`;
  const linkTarget = story.isExternalLink ? '_blank' : undefined;
  const linkRel = story.isExternalLink ? 'noopener noreferrer' : undefined;

  return (
    /* Fixed Height only on large screens. On mobile and tablet - cards grow naturally based on content. */
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card text-start shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md md:mx-auto md:w-[75%] lg:max-h-[38rem] lg:min-h-[20rem] lg:w-full',
        className,
      )}
    >
      {/* Thumbnail - Responsive height that scales with card */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {thumbnail?.url && (
          <Link href={storyLink} className="no-underline" target={linkTarget} rel={linkRel}>
            <OptimizedImage
              media={thumbnail}
              context="card"
              defaultAlt={`${story.title} thumbnail`}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {categories.slice(0, 2).map((category) => (
              <Badge
                key={category.id}
                variant="brand"
                badgeColor={category.color}
                textColor={category.textColor}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 font-header text-xl font-extrabold leading-tight md:text-2xl">
          <Link
            href={storyLink}
            className="no-underline hover:underline"
            target={linkTarget}
            rel={linkRel}
          >
            {story.title}
          </Link>
        </h3>

        {/* Summary - Flexible section that grows to fill space */}
        <div className="mb-4 flex-1">
          {story.summary && hasRichTextContent(story.summary) ? (
            <div className="line-clamp-4 text-sm text-foreground/95 md:text-base">
              <p>{extractTextFromLexical(story.summary)}</p>
            </div>
          ) : story.body && hasRichTextContent(story.body) ? (
            <div className="line-clamp-4 text-sm text-foreground/95 md:text-base">
              <p>{extractTextFromLexical(story.body)}</p>
            </div>
          ) : null}
        </div>

        {/* Button and Metadata - Fixed height section at bottom */}
        <div className="mt-auto space-y-4 border-t border-border/70 pt-4">
          {/* Button */}
          <div>
            <Button variant="secondary" size="xs" asChild>
              <Link href={storyLink} target={linkTarget} rel={linkRel}>
                {story.isExternalLink ? 'Read Article' : 'Read Story'}
              </Link>
            </Button>
          </div>

          {/* Metadata - ensuring it's always visible */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/80 sm:gap-4">
            {story.readingTime !== undefined && (
              <div className="flex items-center gap-2">
                <Icon iconName="time-fill" iconSize="md" />
                <span>{story.readingTime} min read</span>
              </div>
            )}

            {story.publishedAt && (
              <div className="flex items-center gap-2">
                <Icon iconName="calendar-event-fill" iconSize="md" />
                <time dateTime={story.publishedAt}>
                  {new Date(story.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
