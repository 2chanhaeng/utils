import type { Predicate } from "types";
import isFilterable from "../pred/isFilterable.ts";
import enumerate from "./enumerate.ts";

export default function filter<T>(
  f: Predicate<T>
): (iter: Iterable<T>) => Generator<T>;
export default function filter<T>(
  f: Predicate<T>,
  iter: Iterable<T>
): Generator<T>;
export default function* filter<T>(
  f: Predicate<T>,
  iter?: Iterable<T>
): Generator<T> | ((iter: IteratorObject<T>) => Generator<T>) {
  if (iter === undefined) return (iter: IteratorObject<T>) => filter(f, iter);
  if (isFilterable<T>(iter)) yield* iter.filter(f);
  else for (const [x, i] of enumerate(iter)) if (f(x, i)) yield x;
}
