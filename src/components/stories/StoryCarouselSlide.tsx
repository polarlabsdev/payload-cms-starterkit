import React from 'react';
import { Story, Media } from '@/payload-types';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/icon';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

type StoryCarouselSlideProps = {
  story: Story;
  className?: string;
};

export const StoryCarouselSlide: React.FC<StoryCarouselSlideProps> = ({ story, className }) => {
  const thumbnail = story.thumbnail as Media;
  const categories = Array.isArray(story.categories)
    ? story.categories.filter((cat) => typeof cat === 'object')
    : [];

  const storyLink = story.isExternalLink ? story.externalUrl || '#' : `/stories/${story.slug}`;
  const linkTarget = story.isExternalLink ? '_blank' : undefined;
  const linkRel = story.isExternalLink ? 'noopener noreferrer' : undefined;

  return (
    <Link href={storyLink} className={cn('block', className)} target={linkTarget} rel={linkRel}>
      <article className="relative h-[34rem] w-full overflow-hidden rounded-lg bg-muted md:h-[20rem] lg:h-[22rem]">
        {/* Background Image */}
        {thumbnail && (
          <OptimizedImage
            media={thumbnail}
            context="card"
            fill
            className="object-cover opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
            sizes="100vw"
            priority
          />
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/40 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end px-8 py-12 md:p-12 lg:p-14">
          {/* Categories */}
          {categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {categories.slice(0, 2).map((category) => (
                <Badge
                  key={category.id}
                  variant="brand"
                  badgeColor={category.color || 'Teal'}
                  textColor={category.textColor || 'White'}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="mb-4 line-clamp-4 font-header text-2xl font-extrabold leading-tight text-dark-foreground md:text-3xl lg:text-4xl">
            {story.title}
          </h3>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-dark-foreground/80">
            {story.readingTime && (
              <div className="flex items-center gap-2">
                <span>
                  <Icon iconName="time-fill" iconSize="md" />
                </span>
                <span>{story.readingTime} min read</span>
              </div>
            )}
            {story.publishedAt && (
              <div className="flex items-center gap-2">
                <span>
                  <Icon iconName="calendar-event-fill" iconSize="md" />
                </span>
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
      </article>
    </Link>
  );
};
