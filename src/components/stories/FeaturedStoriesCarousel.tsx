'use client';

import React from 'react';
import { Story } from '@/payload-types';
import { StoryCarouselSlide } from './StoryCarouselSlide';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { cn } from '@/lib/utils';

type FeaturedStoriesCarouselProps = {
  stories: Story[];
};

export const FeaturedStoriesCarousel: React.FC<FeaturedStoriesCarouselProps> = ({ stories }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());
    setCount(stories.length);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, stories]);

  if (stories.length === 0) return null;

  const navButtonsClassname =
    'absolute top-1/2 h-full w-8 md:w-12 -translate-y-1/2 border-none rounded-none bg-gradient-to-r z-20';

  return (
    // group is for the image in the StoryCarouselSlide to scale on hover
    <div className="group relative w-full overflow-hidden rounded-lg">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        setApi={setApi}
        className="h-full w-full"
        autoplay={true}
        autoplayInterval={8000}
      >
        <CarouselContent>
          {stories.map((story) => (
            <CarouselItem key={story.id} className="basis-full">
              <StoryCarouselSlide story={story} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation Buttons - positioned to not overlap sidebar */}
        {count > 1 && (
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              navButtonsClassname,
              'start-0 from-dark/10 to-transparent hover:from-dark/40',
            )}
            onClick={() => api?.scrollPrev()}
          >
            <RiArrowLeftSLine className="!size-6 text-dark-foreground rtl:rotate-180" />
            <span className="sr-only">Previous slide</span>
          </Button>
        )}
        {count > 1 && (
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              navButtonsClassname,
              'end-0 from-transparent to-dark/10 hover:to-dark/40',
            )}
            onClick={() => api?.scrollNext()}
          >
            <RiArrowRightSLine className="!size-6 text-dark-foreground rtl:rotate-180" />
            <span className="sr-only">Next slide</span>
          </Button>
        )}
      </Carousel>

      {/* Dot Indicators */}
      {count > 1 && (
        <div className="absolute bottom-0 end-0 start-0 z-10 flex justify-center gap-2 py-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-200',
                index === current
                  ? 'w-6 bg-primary'
                  : 'bg-dark-foreground/30 hover:bg-dark-foreground/50',
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
