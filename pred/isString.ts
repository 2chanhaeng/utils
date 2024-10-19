/**
 * Checks if the provided value is of type string.
 *
 * @param a - The value to check.
 * @returns A boolean indicating whether the value is a string.
 */
export default function isString(a: unknown): a is string {
  return typeof a === "string";
}
