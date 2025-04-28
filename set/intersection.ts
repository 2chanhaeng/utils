/**
 * ```python
 * set1 & set2 & set3 & ...
 * ```
 *
 * Intersection of sets.
 */
export default function intersection<T>(
  set1: Set<T>,
): <S>(...sets: Set<S>[]) => Set<T | S> {
  return <S>(...sets: Set<S>[]) => {
    return sets.reduce((acc, set2) => acc.intersection(set2), set1);
  };
}
