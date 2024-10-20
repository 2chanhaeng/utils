import isIterable from "pred/isIterable.ts";

/**
 * Checks if the given value is an AsyncIterable.
 *
 * This function first checks if the value is an Iterable using the `isIterable` function.
 * Then, it verifies if the value has a property `Symbol.asyncIterator`.
 *
 * @template T - The type of elements in the AsyncIterable.
 * @param x - The value to check.
 * @returns `true` if the value is an AsyncIterable, otherwise `false`.
 */
export default function isAsyncIterable<T>(x: unknown): x is AsyncIterable<T> {
  return isIterable(x) && Symbol.asyncIterator in x;
}
