import type { Predicate, PredicateLike } from "types";
import enumerate from "./enumerate.ts";

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
export default function dropWhile<T>(
  f: Predicate<T> | PredicateLike<T>,
): (iter: Iterable<T>) => Generator<T> {
  return function* (iter: Iterable<T>): Generator<T> {
    const iterator = Iterator.from(iter);
    for (const [item, index] of enumerate(iterator)) {
      if (f(item, index)) continue;
      else {
        yield item;
        yield* iterator;
        return;
      }
    }
  };
}
