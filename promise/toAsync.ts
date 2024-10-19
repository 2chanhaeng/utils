import { isIterable } from "pred";

/**
 * ```haskell
 * toAsync::a -> Promise a
 * toAsync::[Promise a] -> Promise [a]
 * ```
 *
 * Converts a value to a promise.
 */
export default function toAsync<T>(a: Iterable<T>): Promise<Awaited<T>[]>;
export default function toAsync<T>(a: T): Promise<T>;
export default function toAsync<T>(
  a: T | T[]
): Promise<T> | Promise<Awaited<T>[]> {
  if (isIterable(a)) return Array.fromAsync(a) as Promise<Awaited<T>[]>;
  return Promise.resolve(a);
}
