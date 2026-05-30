import { getPayload } from 'payload';
import config from '@/payload.config';
import { NextRequest, NextResponse } from 'next/server';
import type { Config, Search } from '@/payload-types';
import type { SuggestionResult, SuggestionsResponse } from '@/lib/sharedTypes';

export const GET = async (req: NextRequest) => {
  const path = req.nextUrl.searchParams.get('path');
  const localeParam = req.nextUrl.searchParams.get('locale') || 'en';
  const locale = localeParam as Config['locale'];

  try {
    if (!path) {
      return NextResponse.json({ suggestions: [] } satisfies SuggestionsResponse);
    }

    const segments = path.split('/').filter(Boolean);
    const slugSegment = segments[segments.length - 1] || '';

    if (!slugSegment) {
      return NextResponse.json({ suggestions: [] } satisfies SuggestionsResponse);
    }

    const payload = await getPayload({ config });
    const suggestions: SuggestionResult[] = [];

    const searchResults = await payload.find({
      collection: 'search',
      where: {
        and: [{ title: { like: slugSegment } }, { noIndex: { equals: false } }],
      },
      limit: 5,
      locale,
      overrideAccess: true,
    });

    for (const result of searchResults.docs as Search[]) {
      const slug = result.slug || '';
      const isStory = result.doc.relationTo === 'stories';
      suggestions.push({
        title: result.title || '',
        url: isStory ? `/stories/${slug}` : `/${slug}`,
        source: isStory ? 'story' : 'page',
      });
    }

    const seen = new Set<string>();
    const deduplicated = suggestions.filter((s) => {
      if (seen.has(s.url)) return false;
      seen.add(s.url);
      return true;
    });

    const finalSuggestions = deduplicated.slice(0, 8);
    return NextResponse.json({ suggestions: finalSuggestions } satisfies SuggestionsResponse);
  } catch (error) {
    console.error(`[Suggestions] Unexpected error — path: "${path}" locale: ${locale}:`, error);
    return NextResponse.json(
      { suggestions: [], error: 'Failed to load suggestions' } satisfies SuggestionsResponse,
      { status: 500 },
    );
  }
};
