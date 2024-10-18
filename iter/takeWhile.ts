import type { Predicate, PredicateLike } from "types";
import enumerate from "./enumerate.ts";

/**
 * ```haskell
 * takeWhile::(a -> Bool) -> [a] -> [a]
 */
export default function takeWhile<T>(
  f: Predicate<T> | PredicateLike<T>
): (iter: Iterable<T>) => Generator<T> {
  return function* (iter: Iterable<T>): Generator<T> {
    yield* takeWhileGen(f, enumerate(iter));
  };
}

function* takeWhileGen<T>(
  f: Predicate<T> | PredicateLike<T>,
  iter: IteratorObject<[T, number]>
): Generator<T> {
  const curr = iter.next();
  if (curr.done || !f(...curr.value)) return;
  yield curr.value[0];
  yield* takeWhileGen(f, iter);
}
