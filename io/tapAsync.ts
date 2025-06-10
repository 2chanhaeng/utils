import tryCopy from "../atom/tryCopy.ts";

/**
 * ```haskell
 * tapAsync::(a -> Promise b) -> a -> Promise a
 * ```
 * Tap into a promise chain to perform a side effect.
 */
export default function tapAsync<T>(
  f: (i: PromiseLike<Awaited<T>>) => unknown,
): (
  i: T | Awaited<T> | PromiseLike<T> | PromiseLike<Awaited<T>>,
) => Promise<Awaited<T>>;
export default function tapAsync<T>(
  f: (i: PromiseLike<T>) => unknown,
): (
  i: T | Awaited<T> | PromiseLike<T> | PromiseLike<Awaited<T>>,
) => Promise<Awaited<T>>;
export default function tapAsync<T>(
  f: (i: Awaited<T>) => unknown,
): (
  i: T | Awaited<T> | PromiseLike<T> | PromiseLike<Awaited<T>>,
) => Promise<Awaited<T>>;
export default function tapAsync<T>(
  f: (i: T) => unknown,
): (
  i: T | Awaited<T> | PromiseLike<T> | PromiseLike<Awaited<T>>,
) => Promise<Awaited<T>>;
export default function tapAsync<T>(
  f: (i: T | Awaited<T> | PromiseLike<T> | PromiseLike<Awaited<T>>) => unknown,
): (
  i: T | Awaited<T> | PromiseLike<T> | PromiseLike<Awaited<T>>,
) => Promise<Awaited<T>> {
  return (i: T | Awaited<T> | PromiseLike<T> | PromiseLike<Awaited<T>>) =>
    Promise.resolve(i).then(tryCopy).then(f).then(() => Promise.resolve(i));
}
