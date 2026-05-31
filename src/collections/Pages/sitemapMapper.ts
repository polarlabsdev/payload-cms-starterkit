import { SitemapMapper } from '@/app/sitemap';
import { getClientSideURL } from '@/lib/utils';

const pagesToSitemap: SitemapMapper = async (payload) => {
  const pages = await payload.find({
    collection: 'pages',
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
          // Exclude pages with noIndex set to true
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

  return pages.docs.map((page) => {
    const slug = page.slug === 'home' ? '' : page.slug;

    return {
      url: `${baseUrl}/${slug}`,
      lastModified: page.updatedAt,
      changeFrequency: 'weekly',
      // Home page gets highest priority
      priority: slug === '' ? 1.0 : 0.8,
    };
  });
};

export default pagesToSitemap;
