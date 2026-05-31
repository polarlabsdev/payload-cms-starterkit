import { draftMode } from 'next/headers';
import { NextRouteHandler } from '@/lib/sharedTypes';
import { NextResponse } from 'next/server';

export const GET: NextRouteHandler = async () => {
  const draft = await draftMode();
  draft.disable();
  return NextResponse.json({ message: 'Draft mode is disabled' });
};
