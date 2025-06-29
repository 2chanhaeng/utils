/**
 * ```haskell
 * any :: [a] -> Bool
 * ```
 * Returns true if any value in the iterable is truthy.
 *
 * @param iter - An iterable of values to check.
 * @returns True if at least one value is truthy, false otherwise.
 *
 * @example
 * ```ts
 * console.log(any([0, 1, 0])); // true
 * console.log(any([0, 0, 0])); // false
 * ```
 */
export default function any(
  iter: Iterable<unknown>,
): boolean {
  for (const value of iter) if (value) return true;
  return false;
}
