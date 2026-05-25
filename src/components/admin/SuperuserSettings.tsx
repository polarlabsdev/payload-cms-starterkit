'use client';

import React from 'react';
import { useAuth } from '@payloadcms/ui';
import { isAdminCheck } from '@/accessControl/isAdmin';
import type { Config } from '@/payload-types';
import { Separator } from '@/components/ui/Separator';
import ClearPortalDataButton from './ClearPortalDataButton';

export default function SuperuserSettings() {
  const { user } = useAuth();

  if (!isAdminCheck((user ?? null) as Config['user'])) return null;

  return (
    <div className="my-6">
      <Separator className="mb-6" />

      <h2 className="text-xxl mb-6 font-extrabold">Superuser Settings</h2>

      <div className="collections">
        <ul className="collections__card-list">
          <li>
            <div className="card flex-col">
              <h3 className="card__title">Clear Portal Data</h3>
              <p className="mb-3 text-sm text-foreground">
                Permanently wipes all cases, portal users, and partner users. Use before a full
                Meltano resync.
              </p>
              <div>
                <ClearPortalDataButton />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
