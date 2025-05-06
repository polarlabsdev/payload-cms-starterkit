import React from 'react'; // Remove Fragment import
import { getPayload } from 'payload';
import { notFound } from 'next/navigation';
import { RenderBlocks } from '@/blocks/RenderBlocks';
import { Page } from '@/payload-types';
import config from '@/payload.config';
import { NextMetadataFunc, NextPageProps } from '@/lib/sharedTypes';
import { generateMeta } from '@/lib/seoMetadata';
import { draftMode } from 'next/headers';
import { autoClassName } from '@/lib/utils';
import { HEADER_NEGATIVE_MARGIN_CLASS } from '@/globals/Header/Header';
import { CurrentCollectionHelper } from '@/components/CurrentCollectionHelper';
import { LivePreviewListener } from '@/components/LivePreviewListener';

// Utility function to fetch page data by slug
const getPageDataBySlug = async (slug: string, isDraftMode: boolean): Promise<Page | null> => {
  const payload = await getPayload({ config });

  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    draft: isDraftMode,
    overrideAccess: isDraftMode,
    pagination: false,
  });

  return pages.docs[0] || null;
};

// Main page component
const PageComponent: React.FC<NextPageProps<{ slug: string }>> = async ({ params }) => {
  const { slug = 'home' } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  const pageData = await getPageDataBySlug(slug, isDraftMode);

  if (!pageData) {
    return notFound();
  }

  return (
    // Use CurrentCollectionHelper to set the global context for the current collection
    // This is used so things like the AdminBar can tell what collection is currently being viewed
    <CurrentCollectionHelper collectionSlug="pages" collectionObject={pageData}>
      <article className={autoClassName(pageData.pullBehindNav && HEADER_NEGATIVE_MARGIN_CLASS)}>
        {isDraftMode && <LivePreviewListener />}
        <RenderBlocks blocks={pageData.layout} />
      </article>
    </CurrentCollectionHelper>
  );
};

const generateMetadata: NextMetadataFunc<{ slug: string }> = async ({ params: paramsPromise }) => {
  const { slug = 'home' } = await paramsPromise;
  const { isEnabled: isDraftMode } = await draftMode();
  const page = await getPageDataBySlug(slug, isDraftMode);

  return generateMeta({ doc: page });
};

export default PageComponent;
export { generateMetadata };
