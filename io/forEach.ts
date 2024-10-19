import { toArray } from "array";
import { tryCopy } from "atom";
import tap from "./tap.ts";
import { map } from "iter";
import pipe from "pipe";

/**
 * ```haskell
 * forEach::(a -> b) -> Iterable a -> Iterable a
 * ```
 * Execute a function for each elements.
 * `Iterator.prototype.forEach`
 */
export default function forEach<T>(
  f: (x: T) => unknown,
): (x: Iterable<T>) => Iterable<T> {
  return tap<Iterable<T>>(pipe(tryCopy, map(f), toArray));
}
