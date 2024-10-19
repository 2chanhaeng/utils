import type { Reducer } from "types";
import { isIterator, isReducible } from "pred";

/**
 * ```haskell
 * reduce::(a -> b -> a) -> a -> [b] -> [a]
 * ```
 * Reduce an reducible object to a single value.
 */
export default function reduce<T, S>(
  f: Reducer<T, S>,
): (init: S) => (iter: Iterable<T>) => S;
export default function reduce<T, S>(
  f: Reducer<T, S>,
): (init: S, iter: Iterable<T>) => S;
export default function reduce<T, S>(
  f: Reducer<T, S>,
  init: S,
): (iter: Iterable<T>) => S;
export default function reduce<T, S>(
  f: Reducer<T, S>,
  init: S,
  iter: Iterable<T>,
): S;
export default function reduce<T, S>(
  f: Reducer<T, S>,
  init?: S,
  iter?: Iterable<T>,
):
  | S
  | ((iter: Iterable<T>) => S)
  | ((init: S, iter?: Iterable<T>) => S | ((iter: Iterable<T>) => S)) {
  if (init === undefined) {
    return (init: S, iter?: Iterable<T>) =>
      iter === undefined
        ? (iter: Iterable<T>) => reduce(f, init, iter)
        : reduce(f, init, iter);
  }
  if (iter === undefined) return (iter: Iterable<T>) => reduce(f, init, iter);
  if (isReducible<T>(iter)) {
    if (Array.isArray(iter)) return iter.reduce(f, init);
    if (isIterator(iter)) return iter.reduce(f, init);
    return iter.reduce(f, init);
  } else return Iterator.from(iter).reduce(f, init);
}
