'use client';

import React, { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Spinner } from '@/components/ui/spinner';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item';
import { stripLocaleFromPath } from '@/i18n/routing';
import { RiExternalLinkLine } from '@remixicon/react';
import type { SuggestionResult, SuggestionsResponse } from '@/lib/sharedTypes';

const fetchPageSuggestions = async (path: string, locale: string): Promise<SuggestionResult[]> => {
  const res = await fetch(`/api/suggestions?path=${encodeURIComponent(path)}&locale=${locale}`);
  const data: SuggestionsResponse = await res.json();
  return data.suggestions ?? [];
};

interface NotFoundSuggestionsProps {
  didYouMeanLabel: string;
  noSuggestionsLabel: string;
}

/**
 * Client component that reads the current browser URL, calls the suggestions
 * API to find fuzzy-matched pages/stories, and renders a "Did you mean?" list.
 */
export const NotFoundSuggestions: React.FC<NotFoundSuggestionsProps> = ({
  didYouMeanLabel,
  noSuggestionsLabel,
}) => {
  const [suggestions, setSuggestions] = useState<SuggestionResult[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();

  useEffect(() => {
    const path = stripLocaleFromPath(window.location.pathname);
    fetchPageSuggestions(path, locale)
      .then(setSuggestions)
      .catch(() => setSuggestions([]))
      .finally(() => setLoading(false));
  }, [locale]);

  if (loading) {
    return (
      <div className="mb-6 flex justify-center py-4">
        <Spinner />
      </div>
    );
  }

  if (!suggestions.length) {
    return <p className="mb-6 text-sm text-muted-foreground">{noSuggestionsLabel}</p>;
  }

  return (
    <div className="mb-6 w-full max-w-sm">
      <p className="mb-3 text-center text-xl font-semibold">{didYouMeanLabel}</p>
      <ItemGroup className="overflow-hidden rounded-md border border-border">
        {suggestions.map((s, i) => (
          <React.Fragment key={s.url}>
            {i > 0 && <ItemSeparator />}
            <Item
              asChild
              variant="default"
              size="sm"
              className="text-start no-underline transition-colors hover:bg-card/50"
            >
              <Link href={s.url}>
                <ItemContent>
                  <ItemTitle>{s.title}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <RiExternalLinkLine className="size-4 text-muted-foreground" />
                </ItemActions>
              </Link>
            </Item>
          </React.Fragment>
        ))}
      </ItemGroup>
    </div>
  );
};
