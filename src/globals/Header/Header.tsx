import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from './Navigation';
import { Header, Media } from '@/payload-types';
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { autoClassName } from '@/lib/utils';
import { Spinner } from '@/components/ui/Spinner';
import { draftMode } from 'next/headers';
import AdminBar from '@/components/AdminBar';
import { LivePreviewListener } from '@/components/LivePreviewListener';

// These have to be 2 separate classes instead of just appending the value
// to strings in className because Tailwind won't recognize dynamically built class names.
// We abandoned God when we abandoned CSS.
export const HEADER_HEIGHT_CLASS = 'h-16';
export const HEADER_NEGATIVE_MARGIN_CLASS = '-mt-16';

export const HeaderComponent = async () => {
  const { isEnabled: isDraftMode } = await draftMode();

  let logo: Media | null = null;
  let navItems: Header['navItems'] = [];

  try {
    const payload = await getPayload({ config: configPromise });

    const headerData = await payload.findGlobal({
      slug: 'header',
      draft: isDraftMode,
      overrideAccess: isDraftMode,
    });

    logo = headerData?.logo as Media;
    navItems = headerData?.navItems || [];
  } catch (error) {
    console.error('Error fetching header data:', error);
  }

  return (
    <Fragment>
      {isDraftMode && <LivePreviewListener />}
      <AdminBar preview={isDraftMode} style={{ position: 'relative' }} />

      <header
        className={autoClassName(
          `sticky top-0 z-40 w-full border-b bg-background`,
          HEADER_HEIGHT_CLASS,
        )}
      >
        <div
          className={autoClassName(
            'container mx-auto flex h-full items-center justify-between px-4',
          )}
        >
          {logo ? (
            <Link href="/" className={autoClassName('flex items-center')}>
              {logo?.url ? (
                <div className={autoClassName('relative h-8 w-auto')}>
                  <Image
                    src={logo.url}
                    alt={logo.alt || 'Site logo'}
                    width={logo.width || 160}
                    height={logo.height || 40}
                    className={autoClassName('h-full w-auto object-contain')}
                    priority
                  />
                </div>
              ) : (
                <span className={autoClassName('text-xl font-bold')}>Site Logo</span>
              )}
            </Link>
          ) : (
            <Spinner />
          )}

          {/* Navigation */}
          <Navigation navItems={navItems} />
        </div>
      </header>
    </Fragment>
  );
};
