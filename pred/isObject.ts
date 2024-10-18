/**
 * ```haskell
 * isObject:: a -> boolean
 * ```
 * Returns true if the input is an object but not null.
 */
export default function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}
