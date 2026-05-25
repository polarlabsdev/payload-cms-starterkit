'use client';

import { getClientSideURL } from '@/lib/utils';
import { PayloadAdminBar, PayloadAdminBarProps } from '@payloadcms/admin-bar';
import { Button } from '@/components/ui/Button';
import { RiListSettingsLine } from '@remixicon/react';
import { useRouter } from '@/i18n/navigation';
import { useCurrentCollection } from '@/providers/CollectionProvider'; // Import the hook

export const ADMIN_BAR_HEIGHT_CLASS = 'h-10';

const Logo: React.FC = () => (
  <Button variant="ghost" size="xs">
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
  stories: {
    plural: 'Stories',
    singular: 'Story',
  },
  'story-categories': {
    plural: 'Story Categories',
    singular: 'Story Category',
  },
  documents: {
    plural: 'Documents',
    singular: 'Document',
  },
  faqs: {
    plural: 'FAQs',
    singular: 'FAQ',
  },
  'faq-tags': {
    plural: 'FAQ Tags',
    singular: 'FAQ Tag',
  },
  exports: {
    plural: 'Exports',
    singular: 'Export',
  },
  default: {
    singular: 'Item',
    plural: 'Items',
  },
} as const;

const AdminBar: React.FC<PayloadAdminBarProps> = (props) => {
  const router = useRouter();
  const { collectionSlug, collectionObject } = useCurrentCollection();

  // Get labels using the map, with a fallback
  // Check if the contextSlug is a valid key in our map
  const labels =
    collectionSlug && collectionSlug in collectionLabelsMap
      ? collectionLabelsMap[collectionSlug as keyof typeof collectionLabelsMap]
      : collectionLabelsMap.default;

  return (
    <PayloadAdminBar
      className={`dark !bg-neutral-900 !py-3 ${ADMIN_BAR_HEIGHT_CLASS}`}
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
