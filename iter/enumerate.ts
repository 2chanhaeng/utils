import count from "./count.ts";
import zip from "./zip.ts";

/**
 * ```haskell
 * enumerate::[a] -> [(a, Int)]
 * ```
 *
 * Enumerate the elements of an iterable.
 *
 * @param {Iterable<T>} iter - The iterable to enumerate.
 * @return {Generator<[T, number]>} An iterator that yields tuples of each element and its index.
 * @example
 * ```ts
 * Array.from(enumerate(['a', 'b', 'c']));
 * // [['a', 0], ['b', 1], ['c', 2]]
 * ```
 */
export default function* enumerate<T>(
  iter: Iterable<T>,
): Generator<[T, number]> {
  for (const [x, i] of zip(iter, count())) yield [x, i];
}
