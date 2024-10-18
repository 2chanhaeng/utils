/**
 * ```haskell
 * tapAwait::(a -> Promise b) -> a -> Promise a
 * ```
 * Tap into a promise chain to perform a side effect.
 */
export default function tapAsync<T>(f: (a: T) => Promise<unknown>) {
  return (i: T) => f(structuredClone(i)).then(() => i);
}