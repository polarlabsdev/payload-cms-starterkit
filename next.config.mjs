import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';
import { withSentryConfig } from '@sentry/nextjs';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // strictMode: false, // Temporarily disable React strict mode to avoid double-fetching data in development
  // Disable browser source maps — generating them during static page generation is a significant
  // memory cost in CI and they are already hidden via Sentry's hideSourceMaps option anyway.
  productionBrowserSourceMaps: false,
  experimental: {
    // Reduces webpack's in-process memory footprint during builds
    webpackMemoryOptimizations: true,
    // In CI, run webpack compilation in the main process instead of separate worker processes.
    // Next.js 14.1+ defaults to spawning separate client + server webpack workers that run
    // concurrently; their combined memory (3 processes × ~2.5 GB each) can exceed the CI
    // container limit even though --max-old-space-size looks correct. Disabling the worker
    // serialises the compilations into one process, capping peak memory to a single heap.
    // Locally we leave workers enabled so parallel compilation stays fast.
    // CI=true is set automatically by Bitbucket Pipelines on every build.
    webpackBuildWorker: !process.env.CI,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

// Apply plugins in order: Next.js Intl -> PayloadCMS -> Sentry
const configWithNextIntl = withNextIntl(nextConfig);
const configWithPayload = withPayload(configWithNextIntl, { devBundleServerPackages: false });

// Sentry webpack plugin configuration
const SENTRY_WEBPACK_PLUGIN_OPTIONS = {
  org: process.env.SENTRY_ORG, // Sentry organization slug
  project: process.env.SENTRY_PROJECT, // Sentry project slug
  hideSourceMaps: true, // Don't expose source maps publicly
  disableLogger: true, // Reduce build noise
  automaticVercelMonitors: false, // Keep costs down - no automatic monitoring

  // Memory optimization settings
  sourcemaps: {
    disable:
      process.env.SENTRY_DISABLE_SOURCE_MAPS === 'true' || process.env.NODE_ENV !== 'production',
    deleteSourcemapsAfterUpload: true, // Clean up source maps after upload
  },

  // Reduce memory usage during build
  silent: true, // Minimize output
  // Skip all Sentry API calls (release creation, source map upload, etc.) in CI.
  // CI=true is set automatically by Bitbucket Pipelines.
  dryRun: !!process.env.CI,
};

// Wrap the entire configuration with Sentry for error tracking
export default withSentryConfig(configWithPayload, SENTRY_WEBPACK_PLUGIN_OPTIONS);
