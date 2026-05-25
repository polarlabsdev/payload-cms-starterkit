import { verifySolution } from 'altcha-lib';
import type { NextRequest } from 'next/server';

export const ALTCHA_HEADER = 'x-altcha';

/**
 * Server-side utility — validates the ALTCHA proof-of-work solution from the
 * request header. Designed to work with any endpoint (GET or POST).
 *
 * Usage:
 *   const valid = await validateAltchaHeader(request);
 *   if (!valid) return NextResponse.json({ ... }, { status: 400 });
 */
export const validateAltchaHeader = async (request: NextRequest): Promise<boolean> => {
  const hmacKey = process.env.ALTCHA_HMAC_KEY;
  if (!hmacKey) {
    console.error('[ALTCHA] ALTCHA_HMAC_KEY is not configured');
    return false;
  }
  const payload = request.headers.get(ALTCHA_HEADER);
  if (!payload) return false;
  return verifySolution(payload, hmacKey, true);
};
