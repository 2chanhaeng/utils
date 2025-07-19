import type { Predicate, PredicateLike, Refinement } from "../types/pred.ts";

/**
 * ```haskell
 * takeWhile::(a -> Bool) -> [a] -> [a]
 * ```
 *
 * Takes elements from the iterable while the predicate is true.
 *
 * @param {Predicate<T> | PredicateLike<T>} f - The predicate function to test each element.
 * @returns {(iter: Iterable<T>) => Generator<T>} A function that takes an iterable and returns a generator yielding elements until the predicate returns false.
 *
 * @example
 * ```ts
 * const items = [1, 2, 3, 4, 5];
 * const result = takeWhile(x => x < 4)(items);
 * console.log(Array.from(result)); // [1, 2, 3]
 * ```
 */
export default function takeWhile<T, S>(
  f: Predicate<T> | PredicateLike<T> | Refinement<T, S>,
): (
  iter: Iterable<T>,
) => typeof f extends Refinement<T, S> ? Generator<S> : Generator<T> {
  return function* (iter: Iterable<T>): Generator<T> {
    const iterator = Iterator.from(iter)
      .map((item, index) => [item, f(item, index)] as const);
    for (const [item, condition] of iterator) {
      if (condition) yield item;
      else return;
    }
  };
}
