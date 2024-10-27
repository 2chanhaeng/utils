/**
 * Checks if the given value is `undefined`.
 *
 * @param a - The value to check.
 * @returns `true` if the value is `undefined`, otherwise `false`.
 */
export default function isUndefined(a: unknown): a is undefined {
  return a === undefined;
}
