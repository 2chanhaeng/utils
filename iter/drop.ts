/**
 * ```haskell
 * drop::Int -> [a] -> [a]
 * ```
 *
 * Drop the first n elements of an iterable.
 * @param {number} n - The number of elements to drop.
 * @return {Generator<T>} An iterator that yields the remaining elements.
 * @example
 * ```ts
 * Array.from(drop(2, [1, 2, 3, 4, 5, 6]));
 * // [3, 4, 5, 6]
 * ```
 */
export default function drop(
  n: number,
): <T>(iter: Iterable<T>) => Generator<T> {
  return function* <T>(iter: Iterable<T>): Generator<T> {
    yield* Iterator.from(iter).filter((_, i) => i >= n);
  };
}
