'use client';

import React from 'react';
import { autoClassName } from '@/lib/utils';
import { Footer } from '@/payload-types';
import { RichText } from '@/components/RichText';

type FooterProps = {
  tagline?: Footer['tagline'];
};

export const FooterClient: React.FC<FooterProps> = ({ tagline }) => {
  return (
    <footer className={autoClassName('mt-6 w-full border-t bg-background py-6')}>
      <div className={autoClassName('container mx-auto px-4 text-center')}>
        {tagline && <RichText data={tagline} />}
      </div>
    </footer>
  );
};
