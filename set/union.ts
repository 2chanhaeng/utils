/**
 * ```python
 * set1 | set2 | set3 | ...
 * ```
 *
 * Unions two sets.
 */
export default function union<T>(
  set1: Set<T>,
): <S>(...sets: Set<S>[]) => Set<T | S> {
  return <S>(...sets: Set<S>[]) => {
    return sets.reduce((acc, set) => acc.union(set), set1 as Set<T | S>);
  };
}
