import type { Mappable, Mapper } from "types";
import enumerate from "./enumerate.ts";
import { isIterable, isMappable } from "pred";

/**
 * ```haskell
 * map::(a -> b) -> [a] -> [b]
 * ```
 * Map a function over an mappable object.
 */

export default function map<T, S>(
  f: Mapper<T, S>,
): (iter: Iterable<T>) => Generator<S>;
export default function map<T, S>(
  f: Mapper<T, S>,
  iter: Iterable<T>,
): Generator<S>;
export default function map<T, S>(
  f: Mapper<T, S>,
): (iter: Mappable<T>) => Mappable<S>;
export default function map<T, S>(
  f: Mapper<T, S>,
  iter: Mappable<T>,
): Mappable<S>;
export default function map<T, S>(
  f: Mapper<T, S>,
  iter: Iterable<T> | Mappable<T>,
): Generator<S> | Mappable<S>;
export default function map<T, S>(
  f: Mapper<T, S>,
  iter?: Iterable<T> | Mappable<T>,
):
  | Generator<S>
  | ((iter: Iterable<T>) => Generator<S>)
  | Mappable<S>
  | ((iter: Mappable<T>) => Mappable<S>) {
  if (iter === undefined) {
    return (iter: Iterable<T> | Mappable<T>) => map(f, iter);
  }
  return isIterable(iter) ? mapGen(f, iter) : iter.map(f);
}

function* mapGen<T, S>(f: Mapper<T, S>, iter: Iterable<T>): Generator<S> {
  if (isMappable<T>(iter)) yield* iter.map(f);
  else for (const [x, i] of enumerate(iter)) yield f(x, i);
}
