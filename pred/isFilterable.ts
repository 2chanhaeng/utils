import type { Filterable } from "types";
import isObject from "./isObject.ts";

/**
 * ```haskell
 * isFilterable:: a -> boolean
 * ```
 * Returns true if the input has `filter` method.
 */
export default function isFilterable<T>(a: unknown): a is Filterable<T> {
  return isObject(a) && "filter" in a && typeof a.filter === "function";
}
