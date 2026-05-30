'use client';
import React, { useMemo, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { ImageGridBlock as ImageGridBlockType } from '@/payload-types';
import { CustomLink } from '@/fields/link/CustomLink';
import { CustomLinkType, getLinkUrl } from '@/fields/link';
import { TAILWIND_THEME_COLORS, TailwindThemeColorKey } from '@/lib/colors';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Media } from '@/payload-types';

type Category = NonNullable<ImageGridBlockType['category']>[number];

interface GridItemProps {
  image: Media;
  header: string;
  subheader: string;
  showLink?: boolean;
  link?: CustomLinkType;
}

const GridItem: React.FC<GridItemProps> = ({ image, header, subheader, showLink, link }) => {
  const hasLink = showLink && link;
  const linkUrl = hasLink ? getLinkUrl(link) : '#';

  const ImageComponent = (
    <div className="relative aspect-square">
      <OptimizedImage
        media={image}
        context="card"
        defaultAlt={header}
        fill
        className="rounded-lg object-cover shadow-lg group-hover:opacity-90"
      />
    </div>
  );

  return (
    <div className="group">
      {/* Image Container - Clickable if link is provided */}
      {hasLink ? <Link href={linkUrl}>{ImageComponent}</Link> : ImageComponent}

      {/* Content */}
      <div className="mt-3">
        <h3 className="mb-1 font-header text-lg font-bold text-foreground md:text-xl">
          {hasLink ? (
            <Link href={linkUrl} className="no-underline hover:underline">
              {header}
            </Link>
          ) : (
            header
          )}
        </h3>
        <p className="text-sm text-muted-foreground md:text-base">{subheader}</p>

        {/* Link Button */}
        {hasLink && (
          <div className="mt-2">
            <CustomLink buttonSize="sm" link={link} />
          </div>
        )}
      </div>
    </div>
  );
};

export const ImageGridBlock: React.FC<ImageGridBlockType> = ({
  backgroundColor,
  showTitle,
  title,
  columns,
  category,
  showAll,
  items,
}) => {
  const bgClass = TAILWIND_THEME_COLORS[backgroundColor as TailwindThemeColorKey];

  // Normalized category names from the CMS
  const categories = (category || []).map((c) => c.name).filter(Boolean) as string[];

  // Local UI state for filtering — default to 'All' when `showAll` is true,
  // otherwise default to the first category (if available).
  const [selectedCategory, setSelectedCategory] = useState<string>(() =>
    showAll ? 'All' : categories.length > 0 ? categories[0] : 'All',
  );

  // Efficiently compute filtered items
  const filteredItems = useMemo(() => {
    if (!items?.length) return [];

    if (selectedCategory === 'All') return items;

    return items.filter((item) => {
      const assigned = item.assignedCategories;

      if (!assigned) return false;

      let assignedArr: string[] = [];

      if (Array.isArray(assigned)) {
        assignedArr = assigned.map((a) => {
          if (a && typeof a === 'object') return String((a as Category).name ?? a);
          return String(a);
        });
      } else if (
        typeof assigned === 'string' ||
        typeof assigned === 'number' ||
        typeof assigned === 'boolean'
      ) {
        assignedArr = [String(assigned)];
      } else if (assigned && typeof assigned === 'object') {
        assignedArr = [String((assigned as Category).name ?? JSON.stringify(assigned))];
      }

      return assignedArr.includes(selectedCategory);
    });
  }, [items, selectedCategory]);

  // Grid column classes based on selected columns
  const getGridCols = () => {
    switch (columns) {
      case '2':
        return 'grid-cols-1 sm:grid-cols-2';
      case '3':
        return 'grid-cols-1 md:grid-cols-3';
      case '4':
        return 'grid-cols-2 md:grid-cols-4';
      default:
        return 'grid-cols-1 lg:grid-cols-3';
    }
  };

  return (
    <section className={cn(`${bgClass} py-20`)}>
      <div className="container">
        {/* Section Title */}
        {showTitle && title && (
          <div className="mb-6 text-center">
            <h2 className="font-header text-4xl font-extrabold text-foreground md:text-5xl">
              {title}
            </h2>
          </div>
        )}

        {/* Category filter buttons (only show when categories exist) */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            {showAll && (
              <Button
                variant={selectedCategory === 'All' ? 'default' : 'outline'}
                size="md"
                shape="pill"
                onClick={() => setSelectedCategory('All')}
                aria-pressed={selectedCategory === 'All'}
              >
                All
              </Button>
            )}

            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="md"
                shape="pill"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
              >
                {cat}
              </Button>
            ))}
          </div>
        )}

        {/* Image Grid */}
        <div aria-live="polite">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-foreground">No images in this category.</p>
              <p className="mt-2 text-sm text-foreground/90">
                Try another category or check back later.
              </p>
            </div>
          ) : (
            <div
              className={cn('grid gap-6 md:gap-8', getGridCols(), {
                'mt-0': !showTitle || !title,
              })}
            >
              {filteredItems.map((item, index) => (
                <GridItem
                  key={`${selectedCategory}-${item.header}-${index}`}
                  image={item.image as Media}
                  header={item.header}
                  subheader={item.subheader}
                  showLink={item.showLink || false}
                  link={item.link as CustomLinkType}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
