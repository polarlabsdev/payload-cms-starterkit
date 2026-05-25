'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { SearchModal } from '@/components/search/SearchModal';
import { NotFoundSuggestions } from '@/components/NotFoundSuggestions';
import { getSearchHotkeyLabel } from '@/lib/searchHotkey';

interface NotFoundContentProps {
  notFoundLabel: string;
  didYouMeanLabel: string;
  noSuggestionsLabel: string;
  goHomeLabel: string;
  searchLabel: string;
  searchHintLabel: string;
}

export const NotFoundContent: React.FC<NotFoundContentProps> = ({
  notFoundLabel,
  didYouMeanLabel,
  noSuggestionsLabel,
  goHomeLabel,
  searchLabel,
  searchHintLabel,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const hotkey = getSearchHotkeyLabel();

  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center py-28 text-center">
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />

      <div className="prose max-w-none dark:prose-invert">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-6">{notFoundLabel}</p>
      </div>

      <NotFoundSuggestions
        didYouMeanLabel={didYouMeanLabel}
        noSuggestionsLabel={noSuggestionsLabel}
      />

      <div className="mb-4 flex gap-3">
        <Button variant="default" asChild>
          <Link href="/">{goHomeLabel}</Link>
        </Button>
        <Button variant="outline" onClick={() => setSearchOpen(true)}>
          {searchLabel}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        {searchHintLabel.replace('{hotkey}', hotkey.full)}
      </p>
    </div>
  );
};
