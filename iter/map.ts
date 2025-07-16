import type { Mapper } from "types";
import enumerate from "./enumerate.ts";
/**
 * ```haskell
 * map::(a -> b) -> [a] -> [b]
 * ```
 * Map a function over an mappable object.
 */

export default function map<T, S>(
  f: Mapper<T, S>,
): (iter: Iterable<T>) => Generator<S> {
  return function* (iter: Iterable<T>) {
    for (const [value, index] of enumerate(iter)) yield f(value, index);
  };
}
