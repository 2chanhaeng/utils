import isObject from "./isObject.ts";
import isString from "./isString.ts";

/**
 * ```haskell
 * isIterable:: a -> boolean
 * ```
 * Returns true if the input object has Symbol.iterator.
 */
export default function isIterable<T>(a: unknown): a is Iterable<T> {
  return (isObject(a) && Symbol.iterator in a) || isString(a);
}
