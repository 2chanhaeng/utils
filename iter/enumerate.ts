/**
 * ```haskell
 * enumerate::[a] -> [(a, Int)]
 * ```
 *
 * Enumerate the elements of an iterable.
 *
 * @param {Iterable<T>} iter - The iterable to enumerate.
 * @return {IterableIterator<[T, number]>} An iterator that yields tuples of each element and its index.
 * @example
 * ```ts
 * Array.from(enumerate(['a', 'b', 'c']));
 * // [['a', 0], ['b', 1], ['c', 2]]
 * ```
 */
export default function enumerate<T>(
  iter: Iterable<T>,
  start = 0,
  step = 1,
): IterableIterator<[T, number]> {
  return Iterator.from(iter).map((x, i) => [x, i * step + start]);
}
