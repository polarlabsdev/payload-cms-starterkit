'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Config } from '@/payload-types'; // Assuming payload-types exports Config

// Utility type to exclude keys starting with "payload-"
type ExcludePayloadInternalCollections<T> = {
  [K in keyof T as K extends `payload-${string}` ? never : K]: T[K];
};

// Get the slugs of user-defined collections
export type UserCollectionSlugs = keyof ExcludePayloadInternalCollections<Config['collections']>;

// Get the union type of all user-defined collection documents
export type UserCollectionTypes = ExcludePayloadInternalCollections<
  Config['collections']
>[UserCollectionSlugs];

interface CollectionContextType {
  collectionSlug: UserCollectionSlugs | null;
  collectionObject: UserCollectionTypes | null;
  setCollection: (slug: UserCollectionSlugs, doc: UserCollectionTypes) => void;
  clearCollection: () => void;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const CollectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [collectionSlug, setCollectionSlug] = useState<UserCollectionSlugs | null>(null);
  const [collectionObject, setCollectionObject] = useState<UserCollectionTypes | null>(null);

  const setCollection = useCallback((slug: UserCollectionSlugs, doc: UserCollectionTypes) => {
    setCollectionSlug(slug);
    setCollectionObject(doc);
  }, []);

  const clearCollection = useCallback(() => {
    setCollectionSlug(null);
    setCollectionObject(null);
  }, []);

  return (
    <CollectionContext.Provider
      value={{ collectionSlug, collectionObject, setCollection, clearCollection }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export const useCurrentCollection = (): CollectionContextType => {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error('useCurrentCollection must be used within a CollectionProvider');
  }
  return context;
};
