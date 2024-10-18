import isObject from "./isObject.ts";

/**
 * ```haskell
 * isPromise:: a -> boolean
 * ```
 * Returns true if the input is a Promise.
 */
export default function isPromise<T>(a: unknown): a is Promise<T> {
  return isObject(a) && "then" in a && typeof a.then === "function";
}
