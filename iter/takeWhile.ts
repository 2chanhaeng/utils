import type { Predicate, PredicateLike } from "types";
import enumerate from "./enumerate.ts";

/**
 * ```haskell
 * takeWhile::(a -> Bool) -> [a] -> [a]
 * ```
 *
 * Takes elements from the iterable while the predicate is true.
 */
export default function takeWhile<T>(
  f: Predicate<T> | PredicateLike<T>,
): (iter: Iterable<T>) => Generator<T> {
  return function* (iter: Iterable<T>): Generator<T> {
    for (const [x, i] of enumerate(iter)) {
      if (f(x, i)) yield x;
      else return;
    }
  };
}
