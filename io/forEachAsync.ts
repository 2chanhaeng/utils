import { tryCopy } from "atom";
import { map, toIter } from "iter";
import pipe from "pipe";
import { toAsync } from "promise";
import tapAsync from "./tapAsync.ts";

/**
 * Applies a given function to each element of an iterable asynchronously, controlling side effects.
 *
 * This function is useful for performing operations that have side effects, such as logging or updating a database,
 * on each element of an iterable in an asynchronous manner.
 *
 * @template T - The type of elements in the iterable.
 * @param {function(T): unknown} f - The function to apply to each element of the iterable.
 * @returns {function(Iterable<T>): Promise<Iterable<T>>} - A function that takes an iterable and returns an iterable with the side effects applied.
 *
 * @example
 * const sec = () => new Date().getSeconds();
 *
 * // An async function that logs the current second after a delay.
 * const secWithDelay = async (_: unknown) => {
 *     await delay(1000); // 1-second delay
 *     console.log(sec());
 * };
 *
 * console.log("start:", sec());
 * await forEachAsync(secWithDelay)([1, 2, 3, 4, 5]);
 * // start: 11 12 13 14 15 16
 */
export default function forEachAsync<T>(
  f: (x: T) => unknown,
): (x: Iterable<T>) => Promise<Iterable<T>> {
  return tapAsync<Iterable<T>>(pipe(tryCopy, toIter, map(f), toAsync));
}
