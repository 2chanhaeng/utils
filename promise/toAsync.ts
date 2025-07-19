/**
 * ```haskell
 * toAsync::[Promise a] -> Promise [a]
 * ```
 *
 * Converts an iterable or async iterable to a promise that resolves to an array of awaited values.
 * Alias for `Array.fromAsync`.
 *
 * @param {Iterable<T> | AsyncIterable<T>} iter - An iterable or async iterable of type T.
 * @return {Promise<Awaited<T>[]>} A promise that resolves to an array of awaited values of type T.
 *
 * @example
 * ```ts
 * const promises = await toAsync([Promise.resolve(1), Promise.resolve(2)]);
 * console.log(promises); // Output: [1, 2]
 *
 * const asyncIterable = (async function*() {
 *   yield Promise.resolve(3);
 *   yield Promise.resolve(4);
 * })();
 * const asyncPromises = await toAsync(asyncIterable);
 * console.log(asyncPromises); // Output: [3, 4]
 * ```
 */
export default function toAsync<T>(
  iter: Iterable<T> | AsyncIterable<T>,
): Promise<Awaited<T>[]> {
  return Array.fromAsync<T>(iter) as Promise<Awaited<T>[]>;
}
