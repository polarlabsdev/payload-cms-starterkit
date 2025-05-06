import { draftMode } from 'next/headers';
import { NextRouteFunc } from '@/lib/sharedTypes';

export const GET: NextRouteFunc = async () => {
  const draft = await draftMode();
  draft.disable();
  return new Response('Draft mode is disabled');
};
