import type { ItemsItem } from "types";

/**
 * ```haskell
 * chain::[[a]] -> [a]
 *
 * This function takes an array of iterables and yields each element from each iterable in sequence.
 *
 * @template T - A tuple of iterables.
 * @param {T} iters - An array of iterables to be chained.
 * @returns {Generator<ChainGen<T>>} A generator that yields elements from each iterable in sequence.
 *
 * @example
 * const iter1 = new Set([1, 2, 3]);
 * const iter2 = new Set(['a', 'b', 'c']);
 * const chained = chain([iter1, iter2]);
 *
 * console.log(Array.from(chained));
 * // Output: [1, 2, 3, 'a', 'b', 'c']
 */
export default function* chain<T extends Iterable<unknown>>(
  iters: T,
): Generator<ChainGen<T>> {
  for (const iter of iters) yield* iter as Iterable<ChainGen<T>>;
}

type ChainGen<T> = FlatArray<ItemsItem<T>[], 1>;
