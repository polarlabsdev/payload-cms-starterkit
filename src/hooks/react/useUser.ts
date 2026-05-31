'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from '@/payload-types';
import { getClientSideURL } from '@/lib/utils';

const CMS_URL = getClientSideURL();
const API_PATH = '/api';
const AUTH_COLLECTION_SLUG = 'users';

export const fetchMe = async (): Promise<User | null> => {
  try {
    const meRequest = await fetch(`${CMS_URL}${API_PATH}/${AUTH_COLLECTION_SLUG}/me`, {
      credentials: 'include',
      method: 'GET',
    });

    const meResponse = await meRequest.json();
    const { user } = meResponse;

    return user || null;
  } catch (err) {
    console.warn('Error fetching user:', err);
    return null;
  }
};

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUser = await fetchMe();
      setUser(fetchedUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
  };
};
