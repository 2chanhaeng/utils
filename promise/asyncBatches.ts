import { map } from "iter";

/**
 * ```haskell
 * asyncBatches::(a -> Promise b) -> [[a]] -> [Promise [b]]
 * ```
 * Maps each `iter` in `iters` to a `Promise` that resolves when all
 * items in the `iter` have been processed using the provided asynchronous
 * function `f`. Each `iter` is processed sequentially, meaning the next
 * `iter` will only be processed once the previous one has fully resolved.
 *
 * @template T - The type of elements in the input arrays.
 * @template S - The type of elements returned by the promise from function `f`.
 *
 * @param {function(T): Promise<S>} f - An asynchronous function that takes an element of type `T` and returns a promise resolving to type `S`.
 * @param {T[][]} iters - A two-dimensional array, where each `iter` is an array of items of type `T` to be processed by the function `f`.
 *
 * @returns {Promise<S[]>[]} - An array of promises, each resolving to an array of results from processing each `iter` sequentially.
 *
 * @example
 * const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
 * const sec = () => new Date().getSeconds();
 *
 * // An async function that logs the current second after a delay.
 * const secWithDelay = async (item: unknown) => {
 *   await delay(1000); // 1-second delay
 *   return `Item: ${item}, Second: ${sec()}`;
 * };
 *
 * const iters = [
 *   [1, 2, 3], // First batch
 *   [4, 5], // Second batch
 *   [6, 7, 8], // Third batch
 * ];
 * while (sec() !== 0) void 0;
 * // Process each batch sequentially, logging the second for each item.
 * console.log("Start second:", sec());
 * for await (const batch of asyncBatches(secWithDelay)(iters))
 *   console.log(batch.join(", "));
 * // Start second: 0
 * // Item: 1, Second: 1, Item: 2, Second: 1, Item: 3, Second: 1
 * // Item: 4, Second: 2, Item: 5, Second: 2
 * // Item: 6, Second: 3, Item: 7, Second: 3, Item: 8, Second: 3
 */
export default function asyncBatches<T, S>(
  f: (a: T) => PromiseLike<S>,
): (iters: Iterable<Iterable<T>>) => Generator<Promise<Awaited<S>[]>> {
  return map((it) => Promise.all(map(f)(it)));
}
