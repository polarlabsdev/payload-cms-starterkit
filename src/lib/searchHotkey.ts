import { isMacOS } from '@/lib/utils';

export interface SearchHotkeyLabel {
  /** Platform-aware modifier label, e.g. `'⌘ Cmd'` or `'Ctrl'` */
  modifier: string;
  /** The key character, always `'K'` */
  key: string;
  /** Full combined label, e.g. `'⌘ Cmd + K'` or `'Ctrl + K'` */
  full: string;
}

/**
 * Returns the platform-aware search hotkey label parts.
 * Safe to call in both client and server contexts — falls back to Ctrl on SSR.
 */
export const getSearchHotkeyLabel = (): SearchHotkeyLabel => {
  const modifier = isMacOS() ? '⌘ Cmd' : 'Ctrl';
  const key = 'K';
  return { modifier, key, full: `${modifier} + ${key}` };
};
