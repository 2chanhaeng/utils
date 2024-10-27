/**
 * Checks if the given value is either `null` or `undefined`.
 *
 * @param a - The value to check.
 * @returns `true` if the value is `null` or `undefined`, otherwise `false`.
 */
export default function isNullable(a: unknown): a is null | undefined {
  return a === null || a === undefined;
}
