import type { MetadataRoute } from 'next';
import { getClientSideURL } from '@/lib/utils';

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: '/',
    },
    {
      userAgent: '*',
      disallow: ['/admin/', '/api/'],
    },
  ],
  sitemap: `${getClientSideURL()}/sitemap.xml`,
});

export default robots;
