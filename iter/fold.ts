import { isIterator } from "pred";
import reduce from "./reduce.ts";

/**
 * ```haskell
 * fold::(a, a) -> [a] -> a
 * fold::(a, a, Int) -> [a] -> a
 * {@link reduce} with the first element as the initial value.
 */
export default function fold<T>(
  f: (acc: T, x: T, i: number) => T,
): (iter: Iterable<T>) => T;
export default function fold<T>(
  f: (acc: T, x: T, i: number) => T,
  iter: Iterable<T>,
): T;
export default function fold<T>(
  f: (acc: T, x: T, i: number) => T,
  iter?: Iterable<T>,
): T | ((iter: Iterable<T>) => T) {
  if (iter === undefined) return (iter: Iterable<T>) => fold(f, iter);
  if (Array.isArray(iter)) return reduce(f, iter[0], iter.slice(1));
  if (isIterator(iter)) return reduce<T, T>(f, iter.next().value as T, iter);
  return reduce(f, iter[Symbol.iterator]().next().value, iter);
}
