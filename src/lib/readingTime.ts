// Calculate reading time based on average reading speed of 200 words per minute
export const calculateReadingTime = (text: string): number => {
  if (!text) return 0;

  // Remove HTML tags and get plain text
  const plainText = text.replace(/<[^>]*>/g, '');

  // Count words (split by whitespace and filter empty strings)
  const wordCount = plainText.split(/\s+/).filter((word) => word.length > 0).length;

  // Calculate reading time in minutes (average 200 words per minute)
  const readingTimeMinutes = Math.ceil(wordCount / 200);

  return readingTimeMinutes;
};
