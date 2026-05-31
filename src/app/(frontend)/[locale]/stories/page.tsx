import React from 'react';
import { TypedLocale, Where } from 'payload';
import { Story } from '@/payload-types';
import { NextPageProps } from '@/lib/sharedTypes';
import { StoriesGallery } from '@/components/stories';
import { Metadata } from 'next';
import { findCollectionSafe, findGlobalSafe } from '@/lib/payloadSafeApi';

type LocaleString = 'all' | TypedLocale;

const STORIES_PER_PAGE = 12;
const MAX_FEATURED_STORIES = 5;

const StoriesPage: React.FC<
  NextPageProps<{ locale: LocaleString; category?: string; page?: string }>
> = async ({ params, searchParams }) => {
  const { locale } = await params;
  const { category, page = '1' } = await searchParams;

  const pageParam = Array.isArray(page) ? page[0] : page;
  const currentPage = parseInt(pageParam) || 1;

  // Get the stories page configuration
  const storiesPageConfig = await findGlobalSafe({
    slug: 'stories-page',
    locale: locale,
  });

  // Get all story categories for the sidebar
  const categoriesResult = await findCollectionSafe({
    collection: 'story-categories',
    locale: locale,
    pagination: false,
    sort: ['name'],
  });

  // Build query for stories
  const categoryParam = Array.isArray(category) ? category[0] : category;

  // Find the selected category object by slug
  const selectedCategory =
    categoryParam && categoryParam !== 'all' && categoriesResult
      ? categoriesResult.docs.find((cat) => cat.slug === categoryParam)
      : null;

  let categoryFilter: Where = {};

  if (selectedCategory) {
    categoryFilter = { categories: { in: [selectedCategory.id] } };
  }

  // Get featured stories (only on first page and no category filter)
  let featuredStories: Story[] = [];
  if (currentPage === 1) {
    const featuredResult = await findCollectionSafe({
      collection: 'stories',
      where: { ...categoryFilter, featured: { equals: true } },
      locale: locale,
      limit: MAX_FEATURED_STORIES,
      sort: ['-publishedAt'],
      depth: 2,
    });
    if (featuredResult) {
      featuredStories = featuredResult.docs;
    }
  }

  const storiesResult = await findCollectionSafe({
    collection: 'stories',
    where: { ...categoryFilter, featured: { not_equals: true } },
    locale: locale,
    limit: STORIES_PER_PAGE,
    page: currentPage,
    sort: ['-publishedAt'],
    depth: 2,
  });

  return (
    <StoriesGallery
      stories={storiesResult?.docs || []}
      featuredStories={featuredStories}
      categories={categoriesResult?.docs || []}
      currentPage={currentPage}
      totalPages={storiesResult ? Math.ceil(storiesResult.totalDocs / STORIES_PER_PAGE) : 0}
      selectedCategory={selectedCategory}
      config={storiesPageConfig}
    />
  );
};

export const generateMetadata = async ({
  params,
}: NextPageProps<{ locale: LocaleString }>): Promise<Metadata> => {
  const { locale } = await params;

  const storiesPageConfig = await findGlobalSafe({
    slug: 'stories-page',
    locale: locale,
  });

  const title = storiesPageConfig?.meta?.title || 'Stories | Rainbow Railroad';
  const description =
    storiesPageConfig?.meta?.description ||
    'Discover inspiring stories from our community - real stories of hope, courage, and resilience from LGBTQI+ individuals around the world.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      ...(storiesPageConfig?.meta?.image && {
        images: [
          {
            url:
              typeof storiesPageConfig.meta.image === 'object'
                ? storiesPageConfig.meta.image.url || ''
                : '',
          },
        ],
      }),
    },
  };
};

export default StoriesPage;
