import type { ItersItems } from "../types/iter.ts";

/**
 * ```haskell
 * product::[[a], [b], ...] -> [[a, b, ...]]
 * ```
 *
 * Cartesian product of the input iterables.
 * Inspired by Python's `itertools.product`.
 *
 * @param {...Iterable<unknown>} iters - The input iterables to compute the Cartesian product.
 * @returns {Generator<ItersItems<T>>} A generator that yields arrays containing one element from each iterable.
 *
 * @example
 * ```ts
 * const iter1 = [1, 2];
 * const iter2 = ['a', 'b'];
 * const iter3 = [true, false];
 * const productIter = product(iter1, iter2, iter3);
 * console.log(Array.from(productIter)); // Output: [[1, 'a', true], [1, 'a', false], [
 */
export default function* product<T extends Iterable<unknown>[]>(
  ...[head, ...tail]: T
): Generator<ItersItems<T>> {
  if (!head) yield [] as ItersItems<T>;
  else {
    for (const x of head) {
      for (const xs of product(...tail)) yield [x, ...xs] as ItersItems<T>;
    }
  }
}
