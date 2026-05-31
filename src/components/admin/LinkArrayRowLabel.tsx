'use client';

import { useRowLabel } from '@payloadcms/ui';
import { getLinkUrl } from '@/fields/link';
import type { CustomLinkType } from '@/fields/link';
import { Header } from '@/payload-types';

type NavigationItemData = NonNullable<Header['navItems']>[number];

type LinkData = {
  link: CustomLinkType;
};

type RowData = NavigationItemData | LinkData;

const isLinkData = (data: RowData): data is LinkData => 'link' in data;

const buildLabel = (title: string, meta?: string) => (meta ? `${title} — ${meta}` : title);

export const ArrayRowLabel = () => {
  const { data } = useRowLabel<RowData>();

  let customLabel = 'Item';

  if (!data) {
    return <div>{customLabel}</div>;
  }

  /** --------------------
   * LinkData (dropdownLinks, navButtons)
   * ------------------- */
  if (isLinkData(data)) {
    const label = data.link.label || 'Nav Link';
    const url = data?.link ? getLinkUrl(data.link) : '#';

    customLabel = url && url !== '#' ? buildLabel(label, url) : buildLabel(label);

    return <div>{customLabel}</div>;
  }

  /** --------------------
   * NavigationItemData (navItems)
   * ------------------- */
  const { type, linkConfig, dropdownLabel, dropdownLinks } = data;

  switch (type) {
    case 'link': {
      const title = linkConfig?.label || 'Link';
      const linkUrl = linkConfig ? getLinkUrl(linkConfig as CustomLinkType) : '#';
      customLabel = linkUrl && linkUrl !== '#' ? buildLabel(title, linkUrl) : buildLabel(title);
      break;
    }

    case 'dropdown': {
      const count = dropdownLinks?.length || 0;
      customLabel = buildLabel(
        dropdownLabel || 'Dropdown',
        `${count} link${count !== 1 ? 's' : ''}`,
      );
      break;
    }

    default:
      customLabel = 'Navigation Item';
  }

  return <div>{customLabel}</div>;
};
