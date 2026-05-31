import React from 'react';
import { Story, Media } from '@/payload-types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/icon';
import { RichText } from '@/components/RichText';
import { RenderBlocks } from '@/blocks/RenderBlocks';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

type StoryDetailProps = {
  story: Story;
  className?: string;
};

export const StoryDetail: React.FC<StoryDetailProps> = ({ story, className }) => {
  const bannerImage = story.bannerImage as Media;
  const categories = Array.isArray(story.categories)
    ? story.categories.filter((cat) => typeof cat === 'object')
    : [];

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <section className="container">
        {/* Full screen banner */}
        {bannerImage?.url && (
          <section className="relative mt-6 h-[34rem] w-full overflow-hidden rounded-lg md:aspect-[16/9]">
            {/* Background Image */}
            <OptimizedImage
              media={bannerImage}
              context="hero"
              defaultAlt={`${story.title} banner`}
              priority
              fill
              className="object-cover opacity-90"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/50 to-dark/20" />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end">
              <div className="px-6 pb-8 sm:px-8 sm:pb-10 md:pb-12 lg:px-0 lg:pb-16">
                <div className="mx-auto max-w-4xl">
                  {/* Categories */}
                  {categories.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-3">
                      {categories.map((category) => (
                        <Badge
                          key={category.id}
                          variant="brand"
                          badgeColor={category.color || 'Teal'}
                          textColor={category.textColor || 'White'}
                          className="text-sm"
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="mb-6 font-header text-3xl font-extrabold leading-tight tracking-tight text-dark-foreground md:text-5xl lg:text-6xl">
                    {story.title}
                  </h1>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-dark-foreground/90 md:text-base">
                    {story.readingTime && (
                      <div className="flex items-center gap-2">
                        <span>
                          <Icon iconName="time-fill" iconSize="lg" />
                        </span>
                        <span className="font-medium">{story.readingTime} min read</span>
                      </div>
                    )}
                    {story.publishedAt && (
                      <div className="flex items-center gap-2">
                        <span>
                          <Icon iconName="calendar-event-fill" iconSize="lg" />
                        </span>
                        <time dateTime={story.publishedAt} className="font-medium">
                          {new Date(story.publishedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <article className="mx-auto max-w-3xl px-4 py-6 sm:py-10 md:py-14 lg:max-w-3xl 2xl:max-w-4xl">
          {/* Summary */}
          {story.summary && (
            <div className="prose prose-base mb-8 max-w-none md:prose-lg 2xl:prose-xl lg:mb-12">
              <RichText data={story.summary} />
            </div>
          )}

          {/* Body */}
          {story.body && (
            <div className="prose prose-base max-w-none md:prose-lg 2xl:prose-xl prose-headings:font-header prose-headings:font-extrabold prose-p:text-foreground/90">
              <RichText data={story.body} />
            </div>
          )}
        </article>
      </section>

      {/* Pre-footer blocks */}
      {story.layout && story.layout.length > 0 && (
        <section>
          <RenderBlocks blocks={story.layout} />
        </section>
      )}
    </div>
  );
};
