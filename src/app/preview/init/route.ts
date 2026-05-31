import type { CollectionSlug, PayloadRequest } from 'payload';
import { getPayload } from 'payload';

import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

import configPromise from '@payload-config';
import { NextRouteHandler } from '@/lib/sharedTypes';
import { NextResponse } from 'next/server';

// https://payloadcms.com/docs/admin/preview#step-2-create-the-preview-route
// Only made a few changes to the original code on this page, like using correct HTTP status codes
// and adding some logging
export const GET: NextRouteHandler = async (req) => {
  const payload = await getPayload({ config: configPromise });

  payload.logger.info('Received a preview request');

  const { searchParams } = new URL(req.url);

  const path = searchParams.get('path');
  const collection = searchParams.get('collection') as CollectionSlug;
  const slug = searchParams.get('slug');
  const previewSecret = searchParams.get('previewSecret');

  payload.logger.debug({ path, collection, slug }, 'Parsed search params');

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    payload.logger.warn('Invalid preview secret provided');
    return NextResponse.json(
      { message: 'You are not allowed to preview this page' },
      { status: 403 },
    );
  }

  if (!path || !collection || !slug) {
    payload.logger.warn({ path, collection, slug }, 'Insufficient search params');
    return NextResponse.json({ message: 'Insufficient search params' }, { status: 400 });
  }

  if (!path.startsWith('/')) {
    payload.logger.warn({ path }, 'Invalid path provided for preview');
    return NextResponse.json(
      { message: 'This endpoint can only be used for relative previews' },
      { status: 400 },
    );
  }

  let user;

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    });
    payload.logger.info('User authenticated successfully');
  } catch (error) {
    payload.logger.error(`Error verifying token for live preview: ${error}`);
    return NextResponse.json(
      { message: 'You are not allowed to preview this page' },
      { status: 401 },
    );
  }

  const draft = await draftMode();

  if (!user) {
    payload.logger.warn('User authentication failed');
    draft.disable();
    return NextResponse.json(
      { message: 'You are not allowed to preview this page' },
      { status: 401 },
    );
  }

  payload.logger.info('Enabling draft mode for preview');
  draft.enable();

  payload.logger.info({ path }, 'Redirecting to preview path');
  redirect(path);
};
