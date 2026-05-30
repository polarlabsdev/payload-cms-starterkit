import { getPayload } from 'payload';
import config from '@/payload.config';
import { NextRequest, NextResponse } from 'next/server';
import { Search, Config } from '@/payload-types';
import { SearchResponse, SearchResult } from '@/lib/sharedTypes';
import { headers } from 'next/headers';

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams.get('q');
  const localeParam = req.nextUrl.searchParams.get('locale') || 'en';
  const locale = localeParam as Config['locale'];

  try {
    if (!query || query.trim() === '') {
      return NextResponse.json({ results: [] });
    }

    const payload = await getPayload({ config });

    const requestHeaders = await headers();
    const { user } = await payload.auth({
      headers: requestHeaders,
    });

    const searchResults = await payload.find({
      collection: 'search',
      where: {
        and: [
          {
            title: {
              like: query,
            },
          },
          {
            noIndex: {
              equals: false,
            },
          },
        ],
      },
      limit: 20,
      locale,
      overrideAccess: false,
      user,
    });

    const filteredResults: SearchResult[] = searchResults.docs.map((result: Search) => {
      const relationTo = result.doc.relationTo;

      return {
        id: result.id,
        title: result.title || '',
        slug: result.slug || '',
        type: relationTo as 'pages' | 'stories',
      };
    });

    const response: SearchResponse = { results: filteredResults };
    return NextResponse.json(response);
  } catch (error) {
    console.error(`[Search] Unexpected error — query: "${query}" locale: ${locale}:`, error);
    const errorResponse: SearchResponse = { results: [], error: 'Search failed' };
    return NextResponse.json(errorResponse, { status: 500 });
  }
};
