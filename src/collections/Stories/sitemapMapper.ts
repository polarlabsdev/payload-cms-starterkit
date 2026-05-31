import { SitemapMapper } from '@/app/sitemap';
import { getClientSideURL } from '@/lib/utils';

const storiesToSitemap: SitemapMapper = async (payload) => {
  const stories = await payload.find({
    collection: 'stories',
    overrideAccess: false,
    draft: false,
    where: {
      and: [
        {
          _status: {
            equals: 'published',
          },
        },
        {
          // Exclude stories with noIndex set to true
          'meta.noIndex': {
            equals: false,
          },
        },
      ],
    },
    depth: 0,
    limit: 1000,
    pagination: false,
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const baseUrl = getClientSideURL() || 'http://localhost:3000';

  return stories.docs.map((story) => {
    return {
      url: `${baseUrl}/stories/${story.slug}`,
      lastModified: story.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });
};

export default storiesToSitemap;
