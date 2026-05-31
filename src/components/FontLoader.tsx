'use client';
import { AdobeFonts } from 'react-adobe-fonts';

export const FontLoader: React.FC = () => {
  const kitId = process.env.NEXT_PUBLIC_ADOBE_FONTS_KIT_ID || '';
  return <AdobeFonts kitId={kitId} />;
};
