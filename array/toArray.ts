import { isAsyncIterable, isIterable, isPromise } from "pred";

/**
 * ```haskell
 * toArray::Iterable a -> [a]
 * ```
 * Convert iterable to array.
 * `Array.from`
 */
export default function toArray<T>(array: Iterable<Awaited<T>>): T[];
export default function toArray<T>(array: ArrayLike<Awaited<T>>): T[];
export default function toArray<T>(
  array: AsyncIterable<T>,
): Promise<T[]>;
export default function toArray<T>(
  array: Iterable<PromiseLike<T>>,
): Promise<T[]>;
export default function toArray<T>(
  array: Iterable<PromiseLike<T> | T>,
): Promise<T[]>;
export default function toArray<T>(
  array: ArrayLike<PromiseLike<T>>,
): Promise<T[]>;
export default function toArray<T>(
  array: ArrayLike<PromiseLike<T> | T>,
): Promise<T[]>;
export default function toArray<T>(array: Iterable<T>): T[];
export default function toArray<T>(array: ArrayLike<T>): T[];
export default function toArray<T>(
  iter:
    | AsyncIterable<T>
    | Iterable<Awaited<T>>
    | Iterable<PromiseLike<T>>
    | Iterable<PromiseLike<T> | T>
    | ArrayLike<T>
    | ArrayLike<PromiseLike<T>>
    | ArrayLike<PromiseLike<T> | T>,
): T[] | Promise<T[]> | never {
  if (isAsyncIterable(iter)) return Array.fromAsync(iter);
  if (Array.isArray(iter)) {
    if (iter.some(isPromise)) return Array.fromAsync<T>(iter);
    return iter as T[];
  }
  if (isIterable(iter)) {
    const array = Array.from(iter);
    if (array.some(isPromise)) return Array.fromAsync(array);
    return array as T[];
  }
  throw new TypeError("iter must be iterable");
}
