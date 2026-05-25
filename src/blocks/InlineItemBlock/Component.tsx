import React from 'react';
import { Button } from '@/components/ui/Button';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemActions,
} from '@/components/ui/Item';
import type { CustomLinkType } from '@/fields/link/config';
import { getLinkUrl } from '@/fields/link';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';

interface InlineItemBlockProps {
  title: string;
  description?: string;
  iconName: string;
  itemVariant?: 'default' | 'outline' | 'muted';
  link?: CustomLinkType;
}

const InlineItemBlock: React.FC<InlineItemBlockProps> = ({
  title,
  description,
  iconName,
  itemVariant = 'muted',
  link,
}) => {
  const hasLink = link;
  const linkUrl = hasLink ? getLinkUrl(link) : '#';

  return (
    <div className="inline-item-block not-prose my-4 w-full">
      <Item variant={itemVariant}>
        <ItemMedia variant="icon">
          <Icon iconName={iconName} iconSize="lg" />
        </ItemMedia>

        <ItemContent className="text-start">
          <ItemTitle className="font-semibold">{title}</ItemTitle>
          {description && <ItemDescription>{description}</ItemDescription>}
        </ItemContent>

        {hasLink && (
          <ItemActions>
            <Button variant="secondary" size="xs" asChild>
              <Link
                href={linkUrl}
                target={link.newTab ? '_blank' : '_self'}
                rel={link.newTab ? 'noopener noreferrer' : undefined}
              >
                {link.label || 'Learn More'}
              </Link>
            </Button>
          </ItemActions>
        )}
      </Item>
    </div>
  );
};

export default InlineItemBlock;
