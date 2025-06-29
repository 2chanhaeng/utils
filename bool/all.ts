/**
 * ```haskell
 * all :: [a] -> Bool
 * ```
 * Returns true if all values in the iterable are truthy.
 *
 * @param iter - An iterable of values to check.
 * @returns True if all values are truthy, false otherwise.
 *
 * @example
 * ```ts
 * console.log(all([1, 2, 3])); // true
 * console.log(all([1, 0, 3])); // false
 * ```
 */
export default function all(
  iter: Iterable<unknown>,
): boolean {
  for (const value of iter) if (!value) return false;
  return true;
}
