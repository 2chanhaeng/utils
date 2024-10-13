import type { Mappable, Mapper } from "types";
import enumerate from "./enumerate.ts";
import { isIterable, isMappable } from "pred";

export default function map<T, S>(
  f: Mapper<T, S>
): (iter: Mappable<T> | Iterable<T>) => Generator<S>;
export default function map<T, S>(
  f: Mapper<T, S>,
  iter: Mappable<T> | Iterable<T>
): Generator<S>;
export default function* map<T, S>(
  f: Mapper<T, S>,
  iter?: Mappable<T> | Iterable<T>
): Generator<S> | ((iter: Mappable<T>) => Generator<S>) {
  if (iter === undefined) return (iter: Mappable<T>) => map(f, iter);
  if (isMappable(iter)) {
    const mapped = iter.map(f);
    if (isIterable(mapped)) yield* mapped;
    else return mapped;
  } else for (const [x, i] of enumerate(iter)) yield f(x, i);
}
