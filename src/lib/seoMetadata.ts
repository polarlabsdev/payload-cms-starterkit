import { Media, Page } from '@/payload-types';
import { Metadata } from 'next';
import { getServerSideURL } from './utils';

type SeoDoc = Partial<Page> | null;

export const generateMeta = async (args: { doc: SeoDoc }): Promise<Metadata> => {
  const { doc } = args;

  const title = doc?.meta?.title || process.env.NEXT_PUBLIC_WEBSITE_NAME;
  const image = doc?.meta?.image as Media;
  const imageUrl = image ? `${getServerSideURL()}${image.url}` : '';

  return {
    title: title,
    description: doc?.meta?.description,
    openGraph: {
      type: 'website',
      description: doc?.meta?.description || '',
      images: [
        {
          url: imageUrl,
        },
      ],
      siteName: title,
      title: title,
    },
  };
};
