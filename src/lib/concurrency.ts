/**
 * Runs an async function over an array with bounded concurrency.
 * Preserves output order regardless of completion order.
 *
 * @param items - The array to iterate over
 * @param concurrency - Maximum number of in-flight promises at once
 * @param fn - Async function called with (item, index)
 */
export const mapWithConcurrency = async <T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> => {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  const worker = async (): Promise<void> => {
    while (nextIndex < items.length) {
      const i = nextIndex++;
      results[i] = await fn(items[i], i);
    }
  };

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
};
