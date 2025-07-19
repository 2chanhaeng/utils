/**
 * ```python
 * set1 ^ set2 ^ set3 ^ ...
 * ```
 *
 * Symmetric difference of sets.
 *
 * @param {Set<T>} set1 - The first set to compare.
 * @returns {(sets: Set<S>[]) => Set<T | S>} A function that takes multiple sets and returns their symmetric difference.
 *
 * @example
 * ```ts
 * const setA = new Set([1, 2, 3]);
 * const setB = new Set([3, 4, 5]);
 * const result = symDiff(setA)(setB);
 * console.log(result); // Output: Set { 1, 2, 4, 5 }
 * ```
 */
export default function symDiff<T>(
  set1: Set<T>,
): <S>(...sets: Set<S>[]) => Set<T | S> {
  return <S>(...sets: Set<S>[]) => {
    return sets.reduce(
      (acc, set2) => acc.symmetricDifference(set2),
      set1 as Set<T | S>,
    );
  };
}
