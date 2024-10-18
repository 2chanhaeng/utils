import { isObject } from "pred";

/**
 * ```haskell
 * pick::[a] -> { a: b } -> { a: b }
 * ```
 * Returns a new object with only the specified keys.
 * Throws a TypeError if the input is not an object.
 */
export default function pick<Key extends PropertyKey>(keys: Key[]) {
  return <T extends { [K in Key]: Pick<T, Key>[K] }>(
    obj: T
  ): { [K in Key]: Pick<T, Key>[K] } => {
    if (!isObject(obj)) throw new TypeError("Expected an object");
    const keyset = new Set<PropertyKey>(keys);
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => keyset.has(key))
    ) as { [K in Key]: Pick<T, Key>[K] };
  };
}
