'use client';

import React from 'react';
import { Story, StoryCategory, StoriesPage } from '@/payload-types';
import { StoriesSidebar } from './StoriesSidebar';
import { FeaturedStoriesCarousel } from './FeaturedStoriesCarousel';
import { StoriesGrid } from './StoriesGrid';
import { StoriesPagination } from './StoriesPagination';

type StoriesGalleryProps = {
  stories: Story[];
  featuredStories: Story[];
  categories: StoryCategory[];
  currentPage: number;
  totalPages: number;
  selectedCategory?: StoryCategory | null;
  config?: StoriesPage | null;
};

export const StoriesGallery: React.FC<StoriesGalleryProps> = ({
  stories,
  featuredStories,
  categories,
  currentPage,
  totalPages,
  selectedCategory,
  config,
}) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-64">
            <StoriesSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              config={config}
            />
          </aside>

          {/* Main content */}
          <main className="flex-1">
            {/* Page header */}
            <div className="mb-8">
              <h1 className="font-header text-3xl font-extrabold tracking-tight md:text-4xl">
                {selectedCategory
                  ? selectedCategory.name
                  : config?.allStoriesLabel || 'All Stories'}
              </h1>
              <p className="mt-2 text-sm text-foreground/90 md:text-base">
                {selectedCategory && selectedCategory.description
                  ? selectedCategory.description
                  : config?.defaultDescription || 'Discover inspiring stories from our community'}
              </p>
            </div>

            {/* Featured stories carousel - only show on first page without category filter */}
            {featuredStories.length > 0 && (
              <div className="mb-8 lg:mb-12">
                <FeaturedStoriesCarousel stories={featuredStories} />
              </div>
            )}

            {/* Stories grid */}
            <div className="mb-8">
              <StoriesGrid stories={stories} />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-2">
                <StoriesPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  selectedCategory={selectedCategory}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
