/**
 * ```haskell
 * identity::a -> a
 * ```
 * Returns the input value as is.
 */
export default function identity<T>(i: T) {
  return i;
}
