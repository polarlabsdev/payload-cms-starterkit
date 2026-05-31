import React, { Fragment } from 'react';
import { Navigation } from './Navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { headers } from 'next/headers';
import AdminBar from '@/components/admin/AdminBar';
import { hasPermissionCheck, RoleName } from '@/accessControl/roles';
import { findGlobalSafe } from '@/lib/payloadSafeApi';
import { draftMode } from 'next/headers';
import { AnnouncementBar } from '@/globals/AnnouncementBar/components/AnnouncementBar';

export const HeaderComponent = async () => {
  const { isEnabled: isDraftMode } = await draftMode();

  let canAccessAdminPanel = false;

  // Get the header data using the safe API
  const headerData = await findGlobalSafe({
    slug: 'header',
  });

  if (!headerData) {
    return null;
  }

  try {
    // Check if user can access admin panel
    const payload = await getPayload({ config: configPromise });
    const requestHeaders = await headers();
    const { user } = await payload.auth({
      headers: requestHeaders,
    });

    if (user?.roles && Array.isArray(user.roles)) {
      canAccessAdminPanel = hasPermissionCheck(user.roles as RoleName[], 'system:adminPanel:read');
    }
  } catch (error) {
    console.error('Error checking admin panel access:', error);
  }

  return (
    <Fragment>
      {canAccessAdminPanel && <AdminBar preview={isDraftMode} style={{ position: 'relative' }} />}
      <AnnouncementBar />
      <Navigation header={headerData} />
    </Fragment>
  );
};
