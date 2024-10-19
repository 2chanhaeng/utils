/**
 * ```python
 * diff = lambda set1: lambda set2: set1 - set2
 * ```
 * Difference of first set with second set.
 */
export default function diff<T>(set1: Set<T>): <S>(set2: Set<S>) => Set<T | S> {
  return <S>(set2: Set<S>) => set1.difference(set2);
}
