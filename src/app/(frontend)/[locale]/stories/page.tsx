import React from 'react';
import { findCollectionSafe, findGlobalSafe } from '@/lib/payloadSafeApi';
import { StoriesGrid } from '@/components/stories';
import { Story, StoryCategory } from '@/payload-types';
import { NextPageProps } from '@/lib/sharedTypes';

const StoriesPage: React.FC<NextPageProps<Record<string, never>>> = async ({ searchParams }) => {
  const { category } = await searchParams;
  const selectedCategorySlug = typeof category === 'string' ? category : undefined;

  const [storiesResult, storiesPageConfig, categoriesResult] = await Promise.all([
    findCollectionSafe({
      collection: 'stories',
      where: {
        _status: {
          equals: 'published',
        },
      },
      sort: '-publishedAt',
      depth: 2,
      pagination: false,
    }),
    findGlobalSafe({ slug: 'stories-page', depth: 1 }),
    findCollectionSafe({
      collection: 'story-categories',
      sort: 'name',
      pagination: false,
    }),
  ]);

  const stories = (storiesResult?.docs || []) as Story[];
  const categories = (categoriesResult?.docs || []) as StoryCategory[];
  const selectedCategory = categories.find((item) => item.slug === selectedCategorySlug);

  const filteredStories =
    selectedCategorySlug && selectedCategory
      ? stories.filter((story) =>
          (Array.isArray(story.categories) ? story.categories : []).some((categoryItem) => {
            if (typeof categoryItem === 'object' && categoryItem?.slug) {
              return categoryItem.slug === selectedCategory.slug;
            }
            return false;
          }),
        )
      : stories;

  return (
    <div className="min-h-screen bg-background py-12 md:py-14">
      <div className="container">
        <div className="mb-10 md:mb-12">
          <h1 className="font-header text-3xl font-extrabold tracking-tight md:text-4xl">
            {selectedCategory?.name || storiesPageConfig?.allStoriesLabel || 'All Stories'}
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-foreground/90 md:text-base">
            {selectedCategory?.description ||
              storiesPageConfig?.defaultDescription ||
              'Browse the latest stories from this starterkit.'}
          </p>
        </div>
        <StoriesGrid stories={filteredStories} />
      </div>
    </div>
  );
};

export default StoriesPage;
