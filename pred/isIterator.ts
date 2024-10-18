import isObject from "./isObject.ts";

/**
 * ```haskell
 * isIterator:: a -> boolean
 * ```
 * Returns true if the input object is an instance of Iterator(IteratorObject in TS).
 */
export default function isIterator<T>(a: unknown): a is IteratorObject<T> {
  return isObject(a) && a instanceof Iterator;
}
