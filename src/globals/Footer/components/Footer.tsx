import React from 'react';
import { FooterClient } from '@/globals/Footer/components/FooterClient';
import { FooterSkeleton } from './FooterSkeleton';
import { findGlobalSafe } from '@/lib/payloadSafeApi';

export const FooterComponent = async () => {
  const footerData = await findGlobalSafe({
    slug: 'footer',
  });

  return (
    <footer className="border-t bg-foreground/5 px-4 py-8 sm:px-6 lg:px-8">
      {footerData ? <FooterClient footer={footerData} /> : <FooterSkeleton />}
    </footer>
  );
};
