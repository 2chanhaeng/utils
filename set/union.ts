/**
 * ```haskell
 * union::Set a -> Set b -> Set (a | b)
 * ```
 * Unions two sets.
 */
export default function union<T>(
  set1: Set<T>,
): <S>(set2: Set<S>) => Set<T | S> {
  return <S>(set2: Set<S>) => set1.union(set2);
}
