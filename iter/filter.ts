import type { Predicate, PredicateLike } from "types";
import isFilterable from "../pred/isFilterable.ts";
import enumerate from "./enumerate.ts";

/**
 * ```haskell
 * filter::(a -> Bool) -> [a] -> [a]
 * filter::(a -> Truthy | Falsy) -> [a] -> [a] -- TODO: Implement this
 * ```
 * Filter the elements of an iterable.
 */
export default function filter<T>(
  f: Predicate<T>
): (iter: Iterable<T>) => Generator<T>;
export default function filter<T>(
  f: PredicateLike<T>
): (iter: Iterable<T>) => Generator<T>;
export default function filter<T>(
  f: Predicate<T>,
  iter: Iterable<T>
): Generator<T>;
export default function filter<T>(
  f: PredicateLike<T>,
  iter: Iterable<T>
): Generator<T>;
export default function filter<T>(
  f: Predicate<T> | PredicateLike<T>,
  iter?: Iterable<T>
): Generator<T> | ((iter: IteratorObject<T>) => Generator<T>) {
  if (iter === undefined) return (iter: IteratorObject<T>) => filter(f, iter);
  return filterGen(f, iter);
}

function filterGen<T>(f: Predicate<T>, iter: Iterable<T>): Generator<T>;
function filterGen<T>(f: PredicateLike<T>, iter: Iterable<T>): Generator<T>;
function* filterGen<T>(
  f: Predicate<T> | PredicateLike<T>,
  iter: Iterable<T>
): Generator<T> {
  if (isFilterable<T>(iter)) yield* iter.filter(f);
  else for (const [x, i] of enumerate(iter)) if (f(x, i)) yield x;
}
