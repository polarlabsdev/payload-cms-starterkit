/**
 * Copy text to clipboard
 * @param text Text to copy
 * @returns true if successful, false otherwise
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!navigator.clipboard || !navigator.clipboard.writeText) {
    console.error('Clipboard API not supported');
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
};
