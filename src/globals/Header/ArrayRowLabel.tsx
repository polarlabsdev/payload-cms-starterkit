'use client';

import { useRowLabel } from '@payloadcms/ui';

export const ArrayRowLabel = () => {
  const { data } = useRowLabel<{ link: { label?: string; url?: string } }>();

  let customLabel = 'Nav Link';

  if (data?.link) {
    if (data.link.url) {
      customLabel = `${data.link.label} <${data.link.url}>`;
    } else {
      customLabel = data.link.label || 'Nav Link';
    }
  }

  return <div>{customLabel}</div>;
};
