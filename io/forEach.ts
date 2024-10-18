import tap from "io/tap.ts";
import map from "iter/map.ts";

/**
 * ```haskell
 * forEach::(a -> b) -> Iterable a -> Iterable a
 * ```
 * Execute a function for each elements.
 * `Iterator.prototype.forEach`
 */
export default function forEach<T>(
  f: (x: T) => unknown
): (x: Iterable<T>) => Iterable<T> {
  return tap<Iterable<T>>(map(f));
}
