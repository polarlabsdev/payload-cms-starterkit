import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const response = intlMiddleware(request);

  // Set the pathname in headers so the Redirects component can access it
  response.headers.set('x-invoke-path', pathname);

  return response;
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|admin|payload|preview|.*\\..*).*)'],
};
