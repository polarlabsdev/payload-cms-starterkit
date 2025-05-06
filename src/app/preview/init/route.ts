import type { CollectionSlug, PayloadRequest } from 'payload';
import { getPayload } from 'payload';

import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

import configPromise from '@payload-config';
import { NextRouteFunc } from '@/lib/sharedTypes';

// https://payloadcms.com/docs/admin/preview#step-2-create-the-preview-route
// Only made a few changes to the original code on this page, like using correct HTTP status codes
// and adding some logging
export const GET: NextRouteFunc = async (req) => {
  const payload = await getPayload({ config: configPromise });

  payload.logger.info('Received a preview request');

  const { searchParams } = new URL(req.url);

  const path = searchParams.get('path');
  const collection = searchParams.get('collection') as CollectionSlug;
  const slug = searchParams.get('slug');
  const previewSecret = searchParams.get('previewSecret');

  payload.logger.debug('Parsed search params', { path, collection, slug });

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    payload.logger.warn('Invalid preview secret provided');
    return new Response('You are not allowed to preview this page', {
      status: 403,
    });
  }

  if (!path || !collection || !slug) {
    payload.logger.warn('Insufficient search params', { path, collection, slug });
    return new Response('Insufficient search params', { status: 400 });
  }

  if (!path.startsWith('/')) {
    payload.logger.warn('Invalid path provided for preview', { path });
    return new Response('This endpoint can only be used for relative previews', { status: 400 });
  }

  let user;

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    });
    payload.logger.info('User authenticated successfully');
  } catch (error) {
    payload.logger.error({ err: error }, 'Error verifying token for live preview');
    return new Response('You are not allowed to preview this page', {
      status: 401,
    });
  }

  const draft = await draftMode();

  if (!user) {
    payload.logger.warn('User authentication failed');
    draft.disable();
    return new Response('You are not allowed to preview this page', {
      status: 401,
    });
  }

  payload.logger.info('Enabling draft mode for preview');
  draft.enable();

  payload.logger.info('Redirecting to preview path', { path });
  redirect(path);
};
