import type { Predicate, PredicateLike, Refinement } from "types";

/**
 * ```haskell
 * filter::(a -> Bool) -> [a] -> [a]
 * filter::(a -> Truthy | Falsy) -> [a] -> [a] -- TODO: Implement this
 * ```
 * Filter the elements of an iterable.
 *
 * @param {(x: T, i: number) => boolean} f - The predicate function.
 * @return {Generator<T>} An iterator that yields the filtered elements.
 * @example
 * ```ts
 * Array.from(filter((x) => x % 2 === 0, [1, 2, 3, 4, 5]));
 * // [2, 4]
 * ```
 */
export default function filter<T, S>(
  f: Refinement<T, S>,
): (iter: Iterable<T>) => Generator<S>;
export default function filter<T>(
  f: Predicate<T>,
): (iter: Iterable<T>) => Generator<T>;
export default function filter<T>(
  f: PredicateLike<T>,
): (iter: Iterable<T>) => Generator<T>;
export default function filter<T, S>(
  f: Predicate<T> | PredicateLike<T> | Refinement<T, S>,
): (iter: Iterable<T>) => //
typeof f extends Refinement<T, S> ? Generator<S> : Generator<T> {
  return (iter: Iterable<T>) =>
    Iterator.from(iter).filter(f) as typeof f extends Refinement<T, S>
      ? Generator<S>
      : Generator<T>;
}
