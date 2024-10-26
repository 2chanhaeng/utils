import type { Mapper } from "types";
import enumerate from "./enumerate.ts";
import { isMappable } from "pred";

/**
 * ```haskell
 * map::(a -> b) -> [a] -> [b]
 * ```
 * Map a function over an mappable object.
 */

export default function map<T, S>(
  f: Mapper<T, S>,
): (
  iter: Iterable<T>,
) => Generator<S>;
export default function map<T, S>(
  f: Mapper<T, S>,
  iter: Iterable<T>,
): Generator<S>;
export default function map<T, S>(
  f: Mapper<T, S>,
  iter?: Iterable<T>,
):
  | Generator<S>
  | ((iter: Iterable<T>) => Generator<S>) {
  return (iter === undefined)
    ? ((iter: Iterable<T>) => map(f, iter))
    : mapGen(f, iter);
}

function* mapGen<T, S>(f: Mapper<T, S>, iter: Iterable<T>): Generator<S> {
  if (isMappable<T>(iter)) {
    yield* (iter as (Array<T> | IteratorObject<T>)).map(f);
  } else for (const [x, i] of enumerate(iter)) yield f(x, i);
}
