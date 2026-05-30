'use client';

import React from 'react';
import { StoryCategory, StoriesPage } from '@/payload-types';
import { Link, useRouter } from '@/i18n/navigation';
import { Icon } from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { BRAND_COLORS } from '@/lib/colors';
import { useTranslations } from 'next-intl';

type StoriesSidebarProps = {
  categories: StoryCategory[];
  selectedCategory?: StoryCategory | null;
  config?: StoriesPage | null;
};

const SidebarLink: React.FC<{ category: Partial<StoryCategory>; isSelected: boolean }> = ({
  category,
  isSelected,
}) => {
  let href = '/stories';

  if (category.slug && category.slug !== 'all') {
    href += `?category=${category.slug}`;
  }

  return (
    <Link
      href={href}
      className={cn(
        'relative box-border flex w-full flex-row items-center overflow-hidden rounded-xs border border-transparent px-3 py-2 text-sm font-semibold no-underline transition-all hover:border-border/45 hover:bg-card/60',
        isSelected && 'border-border/45 bg-card/45 font-bold',
      )}
    >
      <div
        className={cn(
          'highlightBorder absolute start-0 top-0 h-full transition-all duration-100',
          isSelected ? 'w-2' : 'w-0',
        )}
        style={{ backgroundColor: BRAND_COLORS[category.color || 'Teal'] }}
      ></div>
      <Icon iconName={category.iconName || 'stack-fill'} iconSize="md" iconClassName="me-2" />
      {category.name}
    </Link>
  );
};

export const StoriesSidebar: React.FC<StoriesSidebarProps> = ({
  categories,
  selectedCategory,
  config,
}) => {
  const t = useTranslations('StoriesSidebar');
  const router = useRouter();

  // Prepare categories for select component
  const allCategories = [
    {
      id: 'all',
      slug: 'all',
      name: config?.allStoriesLabel || 'All',
      color: 'Teal',
    },
    ...categories,
  ];

  const handleCategoryChange = (value: string) => {
    if (value === 'all') {
      router.push('/stories');
    } else {
      router.push(`/stories?category=${value}`);
    }
  };

  const getCurrentValue = () => {
    if (!selectedCategory) {
      return 'all';
    }
    return selectedCategory.slug || 'all';
  };

  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row lg:sticky lg:top-24 lg:flex-col lg:items-start lg:space-y-6">
      {/* Category Select for mobile/tablet - Half width on tablet, full width on mobile */}
      <div className="w-full sm:flex-1 lg:hidden">
        <Select value={getCurrentValue()} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder={t('selectCategory')} />
          </SelectTrigger>
          <SelectContent>
            {allCategories.map((category) => (
              <SelectItem key={category.id} value={category.slug || 'all'}>
                <div className="flex items-center">
                  <Icon
                    iconName={
                      'iconName' in category ? category.iconName || 'stack-fill' : 'stack-fill'
                    }
                    iconSize="sm"
                    iconClassName="me-2"
                  />
                  {category.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categories Navigation for desktop */}
      <div className="hidden w-full lg:block">
        <h3 className="mx-3 mb-4 font-header text-lg font-bold">Categories</h3>
        <nav className="space-y-2">
          <SidebarLink
            category={{
              name: config?.allStoriesLabel || 'All',
              color: 'Teal',
            }}
            isSelected={!selectedCategory}
          />

          {categories.map((category) => (
            <SidebarLink
              key={category.id}
              category={category}
              isSelected={selectedCategory?.id === category.id}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};
