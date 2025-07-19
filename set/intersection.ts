/**
 * ```python
 * set1 & set2 & set3 & ...
 * ```
 *
 * Intersection of sets.
 *
 * @param {Set<T>} set1 - The first set to compare.
 * @returns {(sets: Set<S>[]) => Set<T | S>} A function that takes multiple sets and returns their intersection.
 *
 * @example
 * ```ts
 * const setA = new Set([1, 2, 3]);
 * const setB = new Set([2, 3, 4]);
 * const result = intersection(setA)(setB);
 * console.log(result); // Output: Set { 2, 3 }
 * ```
 */
export default function intersection<T>(
  set1: Set<T>,
): <S>(...sets: Set<S>[]) => Set<T | S> {
  return <S>(...sets: Set<S>[]) => {
    return sets.reduce((acc, set2) => acc.intersection(set2), set1);
  };
}
