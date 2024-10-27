/**
 * Checks if the given value is `null`.
 *
 * @param a - The value to check.
 * @returns `true` if the value is `null`, otherwise `false`.
 */
export default function isNull(a: unknown): a is null {
  return a === null;
}
