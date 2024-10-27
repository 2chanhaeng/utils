/**
 * Checks if the given value is defined (i.e., not `undefined` or `null`).
 *
 * @template T - The type of the value being checked.
 * @param a - The value to check.
 * @returns `true` if the value is defined, otherwise `false`.
 *
 * @example
 * ```typescript
 * const value: string | undefined = "hello";
 * if (isDefined<string>(value)) {
 *   console.log(value); // "hello"
 * }
 * ```
 *
 * @example
 * ```typescript
 * const value: number | null = null;
 * if (isDefined<number>(value)) {
 *   console.log(value); // This line will not be executed
 * }
 * ```
 */
export default function isDefined<T>(
  a: unknown,
): a is Exclude<T, undefined | null> {
  return a !== undefined;
}
