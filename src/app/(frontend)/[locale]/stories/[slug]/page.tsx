import React from 'react';
import { TypedLocale } from 'payload';
import { NextPageProps } from '@/lib/sharedTypes';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import { StoryDetail } from '@/components/stories';
import { findCollectionSafe } from '@/lib/payloadSafeApi';

type LocaleString = 'all' | TypedLocale;

const StoryDetailPage: React.FC<NextPageProps<{ locale: LocaleString; slug: string }>> = async ({
  params,
}) => {
  const { locale, slug } = await params;

  const result = await findCollectionSafe({
    collection: 'stories',
    where: { slug: { equals: slug } },
    locale: locale,
    limit: 1,
    depth: 3, // Include related categories, author, and media
  });

  if (!result || result.docs.length === 0) {
    return notFound();
  }

  const story = result.docs[0];
  return <StoryDetail story={story} />;
};

export const generateMetadata = async ({
  params,
}: NextPageProps<{ locale: LocaleString; slug: string }>): Promise<Metadata> => {
  const { locale, slug } = await params;

  const result = await findCollectionSafe({
    collection: 'stories',
    where: { slug: { equals: slug } },
    locale: locale,
    limit: 1,
  });

  if (!result || result.docs.length === 0) {
    return {
      title: 'Story Not Found',
      description: 'The requested story could not be found.',
    };
  }

  const story = result.docs[0];

  const title = story.meta?.title || `${story.title} | Rainbow Railroad`;
  const description = story.meta?.description || 'Read our inspiring story';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      ...(story.meta?.image && {
        images: [
          {
            url: typeof story.meta.image === 'object' ? story.meta.image.url || '' : '',
          },
        ],
      }),
    },
    robots: {
      index: !story.meta?.noIndex,
      follow: !story.meta?.noIndex,
    },
  };
};

export default StoryDetailPage;
