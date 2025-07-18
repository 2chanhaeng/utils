import type { ItersItems } from "types";

/**
 * ```haskell
 * zip::([a], [b], ...) -> [a, b, ...]
 * ```
 *
 * Zip iterables together.
 * Inspired by Python's `zip` function.
 *
 * @param {...Iterable<unknown>} iters - The input iterables to zip together.
 * @returns {Generator<ItersItems<T>>} A generator that yields arrays containing one element from each iterable.
 *
 * @example
 * ```ts
 * const iter1 = [1, 2, 3];
 * const iter2 = ['a', 'b', 'c'];
 * const zipped = zip(iter1, iter2);
 * console.log(Array.from(zipped)); // Output: [[1, 'a'], [2, 'b'], [3, 'c']]
 * ```
 */
export default function* zip<T extends Iterable<unknown>[]>(
  ...iters: T
): Generator<ItersItems<T>> {
  const iterators = iters.map(Iterator.from);
  while (true) {
    const results = iterators.map((iterator) => iterator.next());
    if (results.some((result) => result.done)) return;
    yield results.map((result) => result.value) as ItersItems<T>;
  }
}
