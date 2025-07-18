import type { Predicate, PredicateLike, Refinement } from "types";

/**
 * ```haskell
 * dropWhile::(a -> Bool) -> [a] -> [a]
 * ```
 *
 * Drops elements from the iterable while the predicate is true.
 *
 * @param {Predicate<T> | PredicateLike<T>} f - The predicate function to test each element.
 * @return {Generator<T>} An iterator that yields the remaining elements after the predicate is false.
 *
 * @example
 * ```ts
 * Array.from(dropWhile(x => x < 3, [1, 2, 3, 4, 5]));
 * // [3, 4, 5]
 * ```
 */
export default function dropWhile<T, S>(
  f: Predicate<T> | PredicateLike<T> | Refinement<T, S>,
): (iter: Iterable<T>) => //
typeof f extends Refinement<T, S> ? Generator<S> : Generator<T> {
  return function* (iter: Iterable<T>): Generator<T> {
    const iterator = Iterator.from(iter).map((x, i) => [x, f(x, i)] as const);
    for (const [item, condition] of iterator) {
      if (condition) continue;
      else {
        yield item;
        yield* iterator.map(([x]) => x);
        return;
      }
    }
  };
}
