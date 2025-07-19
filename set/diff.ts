/**
 * ```python
 * set1 - set2 - set3 - ...
 * ```
 *
 * Difference of sets.
 *
 * @param {Set<T>} set1 - The first set to compare.
 * @returns {(sets: Set<S>[]) => Set<T | S>} A function that takes multiple sets and returns the difference.
 *
 * @example
 * ```ts
 * const setA = new Set([1, 2, 3]);
 * const setB = new Set([2, 3, 4]);
 * const result = diff(setA)(setB);
 * console.log(result); // Output: Set { 1 }
 * ```
 */
export default function diff<T>(
  set1: Set<T>,
): <S>(...sets: Set<S>[]) => Set<T | S> {
  return <S>(...sets: Set<S>[]) =>
    sets.reduce((acc, set2) => acc.difference(set2), set1);
}
