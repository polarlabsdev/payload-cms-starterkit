'use client';

import { useEffect, ReactNode } from 'react';
import {
  useCurrentCollection,
  UserCollectionSlugs,
  UserCollectionTypes,
} from '@/providers/CollectionProvider';

interface CurrentCollectionHelperProps {
  collectionSlug: UserCollectionSlugs | null;
  collectionObject: UserCollectionTypes | null;
  children: ReactNode;
}

export const CurrentCollectionHelper: React.FC<CurrentCollectionHelperProps> = ({
  collectionSlug,
  collectionObject,
  children,
}) => {
  const { setCollection, clearCollection } = useCurrentCollection();

  useEffect(() => {
    if (collectionSlug && collectionObject) {
      setCollection(collectionSlug, collectionObject);
    } else {
      // Clear context if slug or object is null
      clearCollection();
    }
  }, [collectionSlug, collectionObject, setCollection, clearCollection]);

  // Render children
  return <>{children}</>;
};
