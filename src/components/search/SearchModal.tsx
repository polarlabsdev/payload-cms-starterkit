'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { Spinner } from '@/components/ui/Spinner';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { notFound } from 'next/navigation';
import { isMobileDevice } from '@/lib/utils';
import { getSearchHotkeyLabel } from '@/lib/searchHotkey';
import { SearchResult } from '@/lib/sharedTypes';
import { SearchResultItem } from './SearchResultItem';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ open, onOpenChange }) => {
  const t = useTranslations('Search');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const locale = useLocale();
  const router = useRouter();
  const hotkey = getSearchHotkeyLabel();

  /**
   * Reset search state
   */
  const resetSearch = useCallback(() => {
    setQuery('');
    setResults([]);
  }, []);

  /**
   * Cmd / Ctrl + K shortcut
   */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onOpenChange]);

  /**
   * Search API
   */
  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}&locale=${locale}`,
        );
        const data = await response.json();
        setResults(data?.results ?? []);
      } catch (err) {
        console.error('Search failed:', err);
        resetSearch();
      } finally {
        setLoading(false);
      }
    },
    [locale, resetSearch],
  );

  /**
   * Debounce search
   */
  useEffect(() => {
    if (query.length <= 2) {
      if (query.length === 0) resetSearch();
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, performSearch, resetSearch]);

  /**
   * Handle selection
   */
  const handleSelect = useCallback(
    (result: SearchResult) => {
      if (!result.slug) {
        return notFound();
      } else {
        const path = result.type === 'stories' ? `/stories/${result.slug}` : `/${result.slug}`;

        router.push(path);
      }

      onOpenChange(false);
      resetSearch();
    },
    [router, onOpenChange, resetSearch],
  );

  /**
   * Reset state when closed
   */
  useEffect(() => {
    if (!open) {
      resetSearch();
    }
  }, [open, resetSearch]);

  const pageResults = results.filter((r) => r.type === 'pages');
  const storyResults = results.filter((r) => r.type === 'stories');

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={t('placeholder')} value={query} onValueChange={setQuery} />

      <CommandList className="max-h-[400px]">
        {loading && (
          <div className="flex items-center justify-center py-6">
            <Spinner />
          </div>
        )}

        {!loading && query.length > 0 && query.length <= 2 && (
          <div className="flex items-center justify-center py-6 text-muted-foreground">
            <div className="text-center">
              <p className="text-sm">{t('typeMoreChars')}</p>
            </div>
          </div>
        )}

        {!loading && query.length > 2 && results.length === 0 && (
          <CommandEmpty>{t('noResults')}</CommandEmpty>
        )}

        {!loading && query.length === 0 && (
          <div className="flex items-center justify-center py-6 text-muted-foreground">
            <div className="text-center">
              <p className="mb-2 text-sm">{t('heading')}</p>
              {!isMobileDevice() && (
                <div className="flex items-center justify-center gap-1 text-xs">
                  <KbdGroup>
                    <Kbd>{hotkey.modifier}</Kbd>+<Kbd>{hotkey.key}</Kbd>
                  </KbdGroup>
                  <span>{t('toSearch')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {!loading && (pageResults.length > 0 || storyResults.length > 0) && (
          <>
            {pageResults.length > 0 && (
              <CommandGroup heading="Pages">
                {pageResults.map((result) => (
                  <SearchResultItem key={result.id} result={result} onSelect={handleSelect} />
                ))}
              </CommandGroup>
            )}

            {storyResults.length > 0 && (
              <CommandGroup heading="Stories">
                {storyResults.map((result) => (
                  <SearchResultItem key={result.id} result={result} onSelect={handleSelect} />
                ))}
              </CommandGroup>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
};
