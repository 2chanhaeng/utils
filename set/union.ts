/**
 * ```haskell
 * union::Set a -> Set b -> Set (a | b)
 * ```
 * Unions two sets.
 */
export default function union<T>(set1: Set<T>) {
  return (set2: Set<T>) => set1.union(set2);
}
