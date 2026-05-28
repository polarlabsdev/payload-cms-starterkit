import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { findCollectionSafe } from '@/lib/payloadSafeApi';
import { StoryDetail } from '@/components/stories';
import { Story } from '@/payload-types';
import { NextMetadataFunc, NextPageProps } from '@/lib/sharedTypes';
import { generateMeta } from '@/lib/seoMetadata';

const getStoryBySlug = async (slug: string): Promise<Story | null> => {
  const result = await findCollectionSafe({
    collection: 'stories',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
    limit: 1,
    depth: 3,
    pagination: false,
  });

  return (result?.docs?.[0] as Story) || null;
};

const StoryPage: React.FC<NextPageProps<{ slug: string }>> = async ({ params }) => {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  if (story.isExternalLink && story.externalUrl) {
    redirect(story.externalUrl);
  }

  return <StoryDetail story={story} />;
};

const generateMetadata: NextMetadataFunc<{ slug: string }> = async ({ params }) => {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  return generateMeta({ doc: story });
};

export default StoryPage;
export { generateMetadata };
