import { tryCopy } from "atom";

/**
 * ```haskell
 * tapAwait::(a -> Promise b) -> a -> Promise a
 * ```
 * Tap into a promise chain to perform a side effect.
 */
export default function tapAsync<T>(
  f: (a: T) => Promise<unknown>
): (i: T) => Promise<T> {
  return (i: T) => f(tryCopy(i)).then(() => i);
}
