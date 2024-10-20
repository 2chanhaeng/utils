import { isAsyncIterable, isIterable } from "pred";

/**
 * Converts the given input to an iterator object.
 * DO NOT use this function to convert an `AsyncIterable` to an iterator.
 *
 * @template T - The type of the input, which must not be an `AsyncIterable`.
 *
 * @param {T} iter - The input to be converted to an iterator. It can be an `Iterable` or any other type.
 *
 * @returns {T extends Iterable<infer S> ? IteratorObject<S> : T extends AsyncIterable<infer _> ? never : IteratorObject<T>}
 * - If the input is an `Iterable`, returns an `IteratorObject` of the iterated type.
 * - If the input is an `AsyncIterable`, throws a `TypeError`.
 * - Otherwise, returns an `IteratorObject` of the input type.
 *
 * @throws {TypeError} If the input is an `AsyncIterable`.
 */
export default function toIter<
  T,
>(
  iter: Exclude<T, AsyncIterable<unknown>>,
): T extends Iterable<infer S> ? IteratorObject<S>
  : T extends AsyncIterable<infer _> ? never
  : IteratorObject<T> {
  if (isIterable(iter)) {
    return Iterator.from(iter) as T extends Iterable<infer S>
      ? IteratorObject<S>
      : never;
  } else if (isAsyncIterable(iter)) {
    throw new TypeError("Cannot convert async iterable to iterator");
  } else {
    return Iterator.from([iter]) as T extends Iterable<infer _> ? never
      : T extends AsyncIterable<infer _> ? never
      : IteratorObject<T>;
  }
}
