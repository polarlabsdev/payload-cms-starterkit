import { ALTCHA_HEADER } from './altcha';

/**
 * Client-side utility — builds an ALTCHA header object from a verified payload string.
 * Use the payload provided by the AltchaWidget `onStateChange` callback when
 * `detail.state === 'verified'`.
 *
 * Usage:
 *   onStateChange={(detail) => {
 *     if (detail.state === 'verified' && detail.payload) {
 *       fetch('/api/...', { headers: { 'Content-Type': 'application/json', ...buildAltchaHeader(detail.payload) } });
 *     }
 *   }}
 *
 * @param payload - The verified ALTCHA payload string from the statechange event
 * @returns A headers object with the x-altcha header
 */
export const buildAltchaHeader = (payload: string): Record<string, string> => {
  return { [ALTCHA_HEADER]: payload };
};
