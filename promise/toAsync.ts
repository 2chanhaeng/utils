import { isIterable } from "pred";

/**
 * ```haskell
 * toAsync::a -> Promise a
 * toAsync::[Promise a] -> Promise [a]
 * ```
 * Converts a value to a Promise. If the value is an iterable, it converts each element to a Promise and returns a Promise of an array of resolved values.
 *
 * @template T - The type of the input value.
 *
 * @param {T} a - The value to be converted to a Promise. If the value is an iterable, each element will be converted to a Promise.
 *
 * @returns {T extends Iterable<infer U> ? Promise<Awaited<U>[]> : Promise<Awaited<T>>}
 * - A Promise of the input value. If the input value is an iterable, it returns a Promise of an array of resolved values.
 *
 * @example
 * // Example with a non-iterable value
 * const result = await toAsync(42);
 * console.log(result); // Output: 42
 *
 * @example
 * // Example with an iterable value
 * const result = await toAsync([Promise.resolve(1), Promise.resolve(2)]);
 * console.log(result); // Output: [1, 2]
 *
 * @example
 * // Example with a string (iterable)
 * const result = await toAsync("hello");
 * console.log(result); // Output: ['h', 'e', 'l', 'l', 'o']
 */
export default function toAsync<T>(
  a: T
): T extends Iterable<infer U> ? Promise<Awaited<U>[]> : Promise<Awaited<T>> {
  if (isIterable<T extends Iterable<infer U> ? U : never>(a))
    return Array.fromAsync(a) as T extends Iterable<infer U>
      ? Promise<Awaited<U>[]>
      : never;
  return Promise.resolve(a) as T extends Iterable<infer _>
    ? never
    : Promise<Awaited<T>>;
}
