'use client';

import React, { useEffect, useRef } from 'react';

export type AltchaState = 'unverified' | 'verifying' | 'verified' | 'error' | 'expired';

export interface AltchaStateChangeDetail {
  state: AltchaState;
  payload?: string | null;
}

interface AltchaWidgetProps {
  challengeUrl: string;
  name?: string;
  onStateChange?: (detail: AltchaStateChangeDetail) => void;
}

/**
 * Hidden ALTCHA proof-of-work widget that auto-solves on mount.
 * Fires `onStateChange` with the current state and payload via the statechange event.
 * Uses dynamic import to ensure the browser-only `customElements` API is never
 * invoked during server-side rendering.
 */
export const AltchaWidget: React.FC<AltchaWidgetProps> = ({
  challengeUrl,
  name = 'altcha',
  onStateChange,
}) => {
  const widgetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import('altcha').catch(console.error);
  }, []);

  useEffect(() => {
    const el = widgetRef.current;
    if (!el) return;
    const handleStateChange = (ev: Event) => {
      const { detail } = ev as CustomEvent<AltchaStateChangeDetail>;
      onStateChange?.(detail);
    };
    el.addEventListener('statechange', handleStateChange);
    return () => el.removeEventListener('statechange', handleStateChange);
  }, [onStateChange]);

  return React.createElement('altcha-widget', {
    ref: widgetRef,
    challengeurl: challengeUrl,
    auto: 'onload',
    name,
    style: { display: 'none' },
  });
};
