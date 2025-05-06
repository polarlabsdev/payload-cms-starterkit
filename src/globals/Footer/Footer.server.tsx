import React, { Fragment } from 'react';
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { FooterClient } from './Footer.client';
import { draftMode } from 'next/headers';
import { LivePreviewListener } from '@/components/LivePreviewListener';

export const FooterServer = async () => {
  let footerData = null;
  const { isEnabled: isDraftMode } = await draftMode();

  try {
    const payload = await getPayload({ config: configPromise });

    footerData = await payload.findGlobal({
      slug: 'footer',
      draft: isDraftMode,
      overrideAccess: isDraftMode,
    });
  } catch (error) {
    console.error('Error fetching footer data:', error);
  }

  return (
    <Fragment>
      {isDraftMode && <LivePreviewListener />}
      <FooterClient tagline={footerData?.tagline} />
    </Fragment>
  );
};
