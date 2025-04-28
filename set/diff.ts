/**
 * ```python
 * set1 - set2 - set3 - ...
 * ```
 *
 * Difference of sets.
 */
export default function diff<T>(
  set1: Set<T>,
): <S>(...sets: Set<S>[]) => Set<T | S> {
  return <S>(...sets: Set<S>[]) =>
    sets.reduce((acc, set2) => acc.difference(set2), set1);
}
