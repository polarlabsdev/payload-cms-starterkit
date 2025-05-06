import { SitemapMapper } from '@/app/sitemap';
import { getClientSideURL } from '@/lib/utils';

const pagesToSitemap: SitemapMapper = async (payload) => {
  const pages = await payload.find({
    collection: 'pages',
    overrideAccess: false,
    draft: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    depth: 0,
    limit: 1000,
    pagination: false,
    select: {
      slug: true,
      updatedAt: true,
      publishedAt: true,
    },
  });

  const baseUrl = getClientSideURL() || 'http://localhost:3000';

  return pages.docs.map((page) => {
    const slug = page.slug === 'home' ? '' : page.slug;

    return {
      url: `${baseUrl}/${slug}`,
      lastModified: page.publishedAt || page.updatedAt,
      changeFrequency: 'weekly',
      // Home page gets highest priority
      priority: slug === '' ? 1.0 : 0.8,
    };
  });
};

export default pagesToSitemap;
