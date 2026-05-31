import React from 'react';
import { Story } from '@/payload-types';
import { StoryPreview } from './StoryPreview';
import { cn } from '@/lib/utils';

type StoriesGridProps = {
  stories: Story[];
  className?: string;
};

export const StoriesGrid: React.FC<StoriesGridProps> = ({ stories, className }) => {
  if (stories.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-foreground">No stories found.</p>
        <p className="mt-2 text-sm text-foreground/90">
          Try adjusting your filters or check back later for new content.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:gap-7 xl:grid-cols-3',
        className,
      )}
    >
      {stories.map((story) => (
        <StoryPreview key={story.id} story={story} />
      ))}
    </div>
  );
};
