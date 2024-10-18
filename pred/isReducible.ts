import type { Reducible } from "types";
import isObject from "./isObject.ts";

/**
 * ```haskell
 * isReducible:: a -> boolean
 * ```
 * Returns true if the input has `reduce` method.
 */
export default function isReducible<T>(a: unknown): a is Reducible<T> {
  return isObject(a) && "reduce" in a && typeof a.reduce === "function";
}
