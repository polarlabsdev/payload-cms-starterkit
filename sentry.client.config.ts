import * as Sentry from '@sentry/nextjs';

/**
 * Sentry Client Configuration - Browser Error Tracking
 *
 * Automatically captures all client-side errors including:
 * - JavaScript exceptions and crashes
 * - React component errors
 * - Failed API calls from browser
 * - User interface failures
 *
 * PRODUCTION ONLY - Sentry is disabled during development
 */

// Only initialize Sentry in production
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: 'production',
    tracesSampleRate: 0, // No performance tracking to stay in free tier
    debug: false,

    // Session replay configuration - records user actions leading to errors
    replaysOnErrorSampleRate: 1.0, // Capture replays for 100% of errors
    replaysSessionSampleRate: 0, // No random session recording to save quota

    integrations: [
      Sentry.replayIntegration({
        maskAllText: true, // Keep text hidden for privacy
        maskAllInputs: true, // Hide sensitive user inputs for privacy
        blockAllMedia: true, // Exclude media to reduce bandwidth usage
      }),
    ],
  });
}
