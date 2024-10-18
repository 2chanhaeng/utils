/**
 * ```haskell
 * always::a -> (() -> a)
 * ```
 * Returns a function that always returns the same value.
 */
export default function always<T>(i: T) {
  const captured = structuredClone(i);
  return () => structuredClone(captured);
}
