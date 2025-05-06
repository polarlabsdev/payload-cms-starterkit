'use client';

import { getClientSideURL } from '@/lib/utils';
import { PayloadAdminBar, PayloadAdminBarProps } from '@payloadcms/admin-bar';
import { Button } from './ui/Button';
import { RiListSettingsLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { useCurrentCollection } from '@/providers/CollectionProvider'; // Import the hook

const Logo: React.FC = () => (
  <Button variant="default" size="xs">
    <RiListSettingsLine />
    Admin Panel
  </Button>
);

const collectionLabelsMap = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  users: {
    plural: 'Users',
    singular: 'User',
  },
  media: {
    plural: 'Media',
    singular: 'Media Item',
  },
  default: {
    singular: 'Item',
    plural: 'Items',
  },
};

const AdminBar: React.FC<PayloadAdminBarProps> = (props) => {
  const router = useRouter();
  const { collectionSlug, collectionObject } = useCurrentCollection();

  // Get labels using the map, with a fallback
  // Check if the contextSlug is a valid key in our map
  const labels =
    collectionSlug && collectionSlug in collectionLabelsMap
      ? collectionLabelsMap[collectionSlug] // Type assertion safe due to check
      : collectionLabelsMap.default;

  return (
    <PayloadAdminBar
      className="dark !bg-neutral-900 !py-3"
      cmsURL={getClientSideURL()}
      collectionSlug={collectionSlug || undefined}
      id={String(collectionObject?.id)}
      collectionLabels={{
        singular: labels.singular,
        plural: labels.plural,
      }}
      logo={<Logo />}
      onPreviewExit={() => {
        fetch('/preview/exit').then(() => {
          router.refresh();
        });
      }}
      {...props}
    />
  );
};

export default AdminBar;
