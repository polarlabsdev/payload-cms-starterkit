import React from 'react';
import { CommandItem } from '@/components/ui/command';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '../ui/Icon';
import { SearchResult } from '@/lib/sharedTypes';

interface SearchResultItemProps {
  result: SearchResult;
  onSelect: (result: SearchResult) => void;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ result, onSelect }) => {
  const getIcon = () => {
    switch (result.type) {
      case 'pages':
        return 'pages-line';
      case 'stories':
        return 'window-fill';
      default:
        return 'file-line';
    }
  };

  const getBadgeVariant = () => {
    switch (result.type) {
      case 'pages':
        return 'default';
      case 'stories':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getBadgeText = () => {
    switch (result.type) {
      case 'pages':
        return 'Page';
      case 'stories':
        return 'Story';
      default:
        return result.type;
    }
  };

  return (
    <CommandItem
      key={result.id}
      value={`${result.type}-${result.id}-${result.title}`}
      onSelect={() => onSelect(result)}
      className="cursor-pointer"
    >
      <Icon iconName={getIcon()} size="md" className="me-2 h-4 w-4 text-muted-foreground" />

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between">
          <span>{result.title}</span>
          <Badge variant={getBadgeVariant()} className="text-xs">
            {getBadgeText()}
          </Badge>
        </div>
      </div>
    </CommandItem>
  );
};
