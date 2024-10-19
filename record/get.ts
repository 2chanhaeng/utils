/**
 * ```haskell
 * get:: a -> { a: b } -> b
 * ```
 * Returns the value of the key in the object.
 */
export default function get<T extends PropertyKey>(
  key: T,
): <S>(obj: { [K in T]: S }) => S {
  return <S>(obj: { [K in T]: S }) => obj[key];
}
