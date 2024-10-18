import type { Predicate, PredicateLike } from "types";
import prepend from "./prepend.ts";

/**
 * ```haskell
 * dropWhile::(a -> Bool) -> [a] -> [a]
 * ```
 *
 * Drops elements from the iterable while the predicate is true.
 */
export default function dropWhile<T>(
  f: Predicate<T> | PredicateLike<T>
): (iter: Iterable<T>) => Generator<T> {
  return function* (iter: Iterable<T>): Generator<T> {
    yield* dropWhileGen(f, Iterator.from(iter), 0);
  };
}

function* dropWhileGen<T>(
  f: Predicate<T> | PredicateLike<T>,
  iter: IteratorObject<T>,
  n: number
): Generator<T> {
  const curr = iter.next();
  if (curr.done) return;
  if (f(curr.value, n)) yield* dropWhileGen(f, iter, n + 1);
  else yield* prepend(curr.value)(iter);
}
