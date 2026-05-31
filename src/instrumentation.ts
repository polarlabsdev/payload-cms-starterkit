import * as Sentry from '@sentry/nextjs';

/**
 * Next.js Instrumentation Hook for Sentry
 * This replaces the old sentry.server.config.ts approach
 */
export async function register() {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: 'production',
      tracesSampleRate: 0, // No performance tracking to stay in free tier
      debug: false,
    });
  }

  // Vercel Fluid Compute pool lifecycle: we intentionally do NOT call getPayload()
  // here to eagerly attach the pool. Calling getPayload() during cold-start when
  // the Supavisor pool is already saturated causes Payload to start a Nodemailer
  // SMTP transport verification (nodemailer.verify) in the background — if that
  // times out, Payload never catches the rejection, resulting in an unhandled
  // rejection that crashes the worker with exit 128.
  //
  // The pool is already configured with idleTimeoutMillis: 5000 (see plugins.ts),
  // which causes pg.Pool to release idle connections within 5 seconds — providing
  // the same essential cleanup that attachDatabasePool would give us.
  // Ref: https://vercel.com/kb/guide/connection-pooling-with-functions
}
