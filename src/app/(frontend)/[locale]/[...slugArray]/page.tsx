import React from 'react'; // Remove Fragment import
import { TypedLocale } from 'payload';
import { notFound } from 'next/navigation';
import { RenderBlocks } from '@/blocks/RenderBlocks';
import { Page } from '@/payload-types';
import { NextMetadataFunc, NextPageProps } from '@/lib/sharedTypes';
import { generateMeta } from '@/lib/seoMetadata';
import { CurrentCollectionHelper } from '@/components/admin/CurrentCollectionHelper';
import { findCollectionSafe } from '@/lib/payloadSafeApi';

type LocaleString = 'all' | TypedLocale;

// Utility function to fetch page data by slug
const getPageDataBySlug = async (slug: string, locale: LocaleString): Promise<Page | null> => {
  const result = await findCollectionSafe({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    locale: locale,
    pagination: false,
  });

  if (!result) {
    return null;
  }

  return result.docs[0] || null;
};

// Main page component
const PageComponent: React.FC<
  NextPageProps<{ slugArray: string[]; locale: LocaleString }>
> = async ({ params }) => {
  const { slugArray = ['home'], locale } = await params;

  const pageData = await getPageDataBySlug(slugArray[0], locale);

  if (!pageData) {
    return notFound();
  }

  return (
    // Use CurrentCollectionHelper to set the global context for the current collection
    // This is used so things like the AdminBar can tell what collection is currently being viewed
    <CurrentCollectionHelper collectionSlug="pages" collectionObject={pageData}>
      {/* <article className={cn(pageData.pullBehindNav && HEADER_NEGATIVE_MARGIN_CLASS)}> */}
      {/* <article> creates a block-level context, stacking children vertically. */}
      <article>
        <RenderBlocks blocks={pageData.layout} />
      </article>
    </CurrentCollectionHelper>
  );
};

const generateMetadata: NextMetadataFunc<{ slugArray: string[]; locale: LocaleString }> = async ({
  params: paramsPromise,
}) => {
  const { slugArray = ['home'], locale } = await paramsPromise;
  const page = await getPageDataBySlug(slugArray[0], locale);

  return generateMeta({ doc: page });
};

export default PageComponent;
export { generateMetadata };
