import isObject from "pred/isObject.ts";

/**
 * ```haskell
 * isIterable:: a -> boolean
 * ```
 * Returns true if the input object has Symbol.iterator.
 */
export default function isIterable<T>(a: unknown): a is Iterable<T> {
  return isObject(a) && Symbol.iterator in a;
}
