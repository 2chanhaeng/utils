import type { Predicate, PredicateLike, Refinement } from "types";
import { isFilterable } from "pred";
import enumerate from "./enumerate.ts";

/**
 * ```haskell
 * filter::(a -> Bool) -> [a] -> [a]
 * filter::(a -> Truthy | Falsy) -> [a] -> [a] -- TODO: Implement this
 * ```
 * Filter the elements of an iterable.
 */
export default function filter<T, S extends T>(
  f: Refinement<T, S>,
): (iter: Iterable<T>) => Generator<S>;
export default function filter<T>(
  f: Predicate<T>,
): (iter: Iterable<T>) => Generator<T>;
export default function filter<T>(
  f: PredicateLike<T>,
): (iter: Iterable<T>) => Generator<T>;
export default function filter<T, S extends T>(
  f: Refinement<T, S>,
  iter: Iterable<T>,
): Generator<S>;
export default function filter<T>(
  f: Predicate<T>,
  iter: Iterable<T>,
): Generator<T>;
export default function filter<T>(
  f: PredicateLike<T>,
  iter: Iterable<T>,
): Generator<T>;
export default function filter<T, S extends T>(
  f: Predicate<T> | PredicateLike<T> | Refinement<T, S>,
  iter?: Iterable<T>,
): Generator<T> | ((iter: IteratorObject<T>) => Generator<T> | Generator<S>) {
  if (iter === undefined) return (iter: IteratorObject<T>) => filter(f, iter);
  return filterGen(f, iter);
}

function filterGen<T, S extends T>(
  f: Refinement<T, S>,
  iter: Iterable<T>,
): Generator<S>;
function filterGen<T>(f: Predicate<T>, iter: Iterable<T>): Generator<T>;
function filterGen<T>(f: PredicateLike<T>, iter: Iterable<T>): Generator<T>;
function* filterGen<T, S extends T>(
  f: Predicate<T> | PredicateLike<T> | Refinement<T, S>,
  iter: Iterable<T>,
): Generator<T> | Generator<S> {
  if (isFilterable<T>(iter)) yield* iter.filter(f);
  else for (const [x, i] of enumerate(iter)) if (f(x, i)) yield x;
}
