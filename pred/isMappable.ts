import type { Mappable } from "types";
import isObject from "./isObject.ts";

/**
 * ```haskell
 * isMappable:: a -> boolean
 * ```
 * Returns true if the input has `map` method.
 */
export default function isMappable<T>(a: unknown): a is Mappable<T> {
  return isObject(a) && "map" in a && typeof a.map === "function";
}
